import { NextRequest, NextResponse } from "next/server";
import { initializeDataSource } from '../../../lib/data-source';
import { Alunos } from '../../../database/entities/alunos.entity';

export async function GET() {
  try {
    const ds = await initializeDataSource();
    const repo = ds.getRepository(Alunos);
    const list = await repo.find({ relations: ['matriculas', 'matriculas.curso'] });
    const mapped = list.map((aluno: any) => ({
      ...aluno,
      cursos: aluno.matriculas ? aluno.matriculas.map((m: any) => m.curso) : [],
    }));
    return NextResponse.json(mapped);
  } catch (error) {
    console.error('GET /api/alunos error:', error);
    const message = error instanceof Error ? error.message : JSON.stringify(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const ds = await initializeDataSource();
    const repo = ds.getRepository(Alunos);
    const aluno = repo.create(data);
    const saved = await repo.save(aluno);
    return NextResponse.json(saved);
  } catch (error) {
    console.error('POST /api/alunos error:', error);
    const message = error instanceof Error ? error.message : JSON.stringify(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const ds = await initializeDataSource();
    const repo = ds.getRepository(Alunos);
    const aluno = await repo.findOneBy({ id: String(data.id) });
    if (!aluno) return NextResponse.json({ error: 'Aluno não encontrado' }, { status: 404 });
    repo.merge(aluno, data);
    const saved = await repo.save(aluno);
    return NextResponse.json(saved);
  } catch (error) {
    console.error('PUT /api/alunos error:', error);
    const message = error instanceof Error ? error.message : JSON.stringify(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const data = await req.json();
    const ds = await initializeDataSource();
    const repo = ds.getRepository(Alunos);
    const aluno = await repo.findOneBy({ id: String(data.id) });
    if (!aluno) return NextResponse.json({ error: 'Aluno não encontrado' }, { status: 404 });
    await repo.remove(aluno);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('DELETE /api/alunos error:', error);
    const message = error instanceof Error ? error.message : JSON.stringify(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}