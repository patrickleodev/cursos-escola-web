import { NextRequest, NextResponse } from "next/server";
import { initializeDataSource } from '../../../lib/data-source';
import { Alunos } from '../../../database/entities/alunos.entity';

export async function GET() {
  try {
    const ds = await initializeDataSource();
    const repo = ds.getRepository(Alunos);
    const list = await repo.find();
    return NextResponse.json(list);
  } catch (error) {
    console.error('GET /api/alunos error:', error);
    const message = error instanceof Error ? error.message : JSON.stringify(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { path, method, body } = await req.json();
  const dbUrl = process.env.DATABASE_URL || "http://localhost:3000";
  
  try {
    const res = await fetch(`${dbUrl}${path}`, {
      method,
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
    return NextResponse.json(await res.json());
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function PUT(req: Request) {
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

export async function DELETE(req: Request) {
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
