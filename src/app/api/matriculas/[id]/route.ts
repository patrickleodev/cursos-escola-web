import "reflect-metadata";
import { NextRequest, NextResponse } from "next/server";
import { initializeDataSource } from '../../../../lib/data-source';
import { Matriculas } from '../../../../database/entities/matriculas.entity';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();

    const ds = await initializeDataSource();
    const repo = ds.getRepository(Matriculas as any);

    const matricula = await repo.findOneBy({ id: String(id) });
    if (!matricula) {
      return NextResponse.json({ error: 'Matrícula não encontrada' }, { status: 404 });
    }

    if (body.dataInicio) matricula.dataInicio = new Date(body.dataInicio);
    if (body.dataFim) matricula.dataFim = new Date(body.dataFim);
    if (body.duracaoCustomizada !== undefined) matricula.duracaoCustomizada = body.duracaoCustomizada;

    const saved = await repo.save(matricula);
    return NextResponse.json(saved);
  } catch (error) {
    console.error('PUT /api/matriculas/[id] error:', error);
    const message = error instanceof Error ? error.message : JSON.stringify(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const ds = await initializeDataSource();
    const repo = ds.getRepository(Matriculas as any);

    const matricula = await repo.findOneBy({ id: String(id) });
    if (!matricula) {
      return NextResponse.json({ error: 'Matrícula não encontrada' }, { status: 404 });
    }

    await repo.remove(matricula);
    return NextResponse.json({ success: true, message: 'Matrícula removida com sucesso' });
  } catch (error) {
    console.error('DELETE /api/matriculas/[id] error:', error);
    const message = error instanceof Error ? error.message : JSON.stringify(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
