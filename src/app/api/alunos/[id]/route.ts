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
      relations: ['cursos']
    });
    
    if (!aluno) {
      return NextResponse.json({ error: 'Aluno não encontrado' }, { status: 404 });
    }
    
    return NextResponse.json(aluno);
  } catch (error) {
    console.error('GET /api/alunos/[id] error:', error);
    const message = error instanceof Error ? error.message : JSON.stringify(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
