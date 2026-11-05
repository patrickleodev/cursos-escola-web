import "reflect-metadata";
import { NextRequest, NextResponse } from "next/server";
import { initializeDataSource } from '../../../../lib/data-source';
import { Alunos } from '../../../../database/entities/alunos.entity';
import { Cursos } from '../../../../database/entities/cursos.entity';
import { Matriculas } from '../../../../database/entities/matriculas.entity';
import { In } from 'typeorm';

export async function POST(req: NextRequest) {
  try {
    const { alunoId, cursoIds } = await req.json();

    if (!alunoId || !Array.isArray(cursoIds)) {
      return NextResponse.json({ error: 'Aluno e lista de cursos são obrigatórios' }, { status: 400 });
    }

    const alunoIdString = String(alunoId);
    const normalizedCursoIds = [...new Set(cursoIds.map((id: unknown) => String(id)).filter(Boolean))];
    const ds = await initializeDataSource();
    const cursosRepo = ds.getRepository(Cursos);
    const cursos = normalizedCursoIds.length > 0
      ? await cursosRepo.findBy({ id: In(normalizedCursoIds) })
      : [];

    if (cursos.length !== normalizedCursoIds.length) {
      return NextResponse.json({ error: 'Um ou mais cursos não foram encontrados' }, { status: 400 });
    }

    await ds.transaction(async (manager) => {
      const alunosRepo = manager.getRepository(Alunos);
      const matriculasRepo = manager.getRepository(Matriculas as any);
      const aluno = await alunosRepo.findOneBy({ id: alunoIdString });

      if (!aluno) {
        throw new Error('Aluno não encontrado');
      }

      const existingMatriculas = await matriculasRepo.find({
        where: { aluno: { id: alunoIdString } },
      });
      const selectedCursoIds = new Set(normalizedCursoIds);
      const matriculasToRemove = existingMatriculas.filter(
        (matricula: any) => !selectedCursoIds.has(String(matricula.curso.id))
      );
      const existingCursoIds = new Set(
        existingMatriculas.map((matricula: any) => String(matricula.curso.id))
      );

      if (matriculasToRemove.length > 0) {
        await matriculasRepo.remove(matriculasToRemove);
      }

      const today = new Date().toISOString().slice(0, 10);
      const matriculasToAdd = cursos
        .filter((curso) => !existingCursoIds.has(String(curso.id)))
        .map((curso) => matriculasRepo.create({
          aluno,
          curso,
          dataInicio: today,
          dataFim: today,
        }));

      if (matriculasToAdd.length > 0) {
        await matriculasRepo.save(matriculasToAdd);
      }
    });

    const alunosRepo = ds.getRepository(Alunos);
    const updated = await alunosRepo.findOne({
      where: { id: alunoIdString },
      relations: ['matriculas', 'matriculas.curso'],
    });
    const mapped = {
      ...updated,
      cursos: updated?.matriculas ? updated.matriculas.map((m: any) => m.curso) : [],
    };
    return NextResponse.json(mapped);
  } catch (error) {
    console.error('POST /api/alunos/cursos error:', error);
    const message = error instanceof Error ? error.message : JSON.stringify(error);
    const status = message === 'Aluno não encontrado' ? 404 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
