import "reflect-metadata";
import "reflect-metadata";
import { NextRequest, NextResponse } from "next/server";
import { initializeDataSource } from '../../../../lib/data-source';
import { Alunos } from '../../../../database/entities/alunos.entity';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    
    const ds = await initializeDataSource();
    const repo = ds.getRepository(Alunos);
    const aluno = await repo.findOne({
      where: { id },
      relations: ['matriculas', 'matriculas.curso']
    });
    
    if (!aluno) {
      return NextResponse.json({ error: 'Aluno não encontrado' }, { status: 404 });
    }
    
    const mapped = {
      ...aluno,
      cursos: aluno?.matriculas ? aluno.matriculas.map((m: any) => ({
        ...m.curso,
        dataInicio: m.dataInicio,
        dataFim: m.dataFim,
        duracaoCustomizada: m.duracaoCustomizada,
      })) : [],
    };

    return NextResponse.json(mapped);
  } catch (error) {
    console.error('GET /api/alunos/[id] error:', error);
    const message = error instanceof Error ? error.message : JSON.stringify(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
