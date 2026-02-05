import { NextRequest, NextResponse } from "next/server";
import { initializeDataSource } from '../../../../lib/data-source';
import { Alunos } from '../../../../database/entities/alunos.entity';
import { Cursos } from '../../../../database/entities/cursos.entity';

export async function POST(req: NextRequest) {
  try {
    const { alunoId, cursoIds } = await req.json();
    
    const ds = await initializeDataSource();
    const alunosRepo = ds.getRepository(Alunos);
    const cursosRepo = ds.getRepository(Cursos);
    
    const aluno = await alunosRepo.findOne({
      where: { id: String(alunoId) },
      relations: ['cursos']
    });
    
    if (!aluno) {
      return NextResponse.json({ error: 'Aluno não encontrado' }, { status: 404 });
    }
    
    const cursos = await cursosRepo.findByIds(cursoIds);
    aluno.cursos = cursos;
    
    const saved = await alunosRepo.save(aluno);
    return NextResponse.json(saved);
  } catch (error) {
    console.error('POST /api/alunos/cursos error:', error);
    const message = error instanceof Error ? error.message : JSON.stringify(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
