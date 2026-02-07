import { NextRequest, NextResponse } from "next/server";
import { initializeDataSource } from '../../../../lib/data-source';
import { Alunos } from '../../../../database/entities/alunos.entity';
import { Cursos } from '../../../../database/entities/cursos.entity';
import { Matriculas } from '../../../../database/entities/matriculas.entity';

export async function POST(req: NextRequest) {
  try {
    const { alunoId, cursoIds } = await req.json();
    
    const ds = await initializeDataSource();
    const alunosRepo = ds.getRepository(Alunos);
    const cursosRepo = ds.getRepository(Cursos);
    const aluno = await alunosRepo.findOneBy({ id: String(alunoId) });

    if (!aluno) {
      return NextResponse.json({ error: 'Aluno não encontrado' }, { status: 404 });
    }

    const cursos = await cursosRepo.findByIds(cursoIds || []);

    const matriculasRepo = ds.getRepository(Matriculas as any);

    // Remove existing matriculas for these cursos for this aluno (optional)
    for (const curso of cursos) {
      // create new matricula with default dates (today)
      const m = matriculasRepo.create({
        aluno: aluno,
        curso: curso,
        dataInicio: new Date(),
        dataFim: new Date(),
      });
      await matriculasRepo.save(m);
    }

    // Return updated aluno with derived cursos
    const updated = await alunosRepo.findOne({ where: { id: String(alunoId) }, relations: ['matriculas', 'matriculas.curso'] });
    const mapped = {
      ...updated,
      cursos: updated?.matriculas ? updated.matriculas.map((m: any) => m.curso) : [],
    };
    return NextResponse.json(mapped);
  } catch (error) {
    console.error('POST /api/alunos/cursos error:', error);
    const message = error instanceof Error ? error.message : JSON.stringify(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
