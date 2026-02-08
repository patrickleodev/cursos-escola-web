import "reflect-metadata";
import { NextRequest, NextResponse } from "next/server";
import { initializeDataSource } from '../../../lib/data-source';
import { Afiliadas } from '../../../database/entities/afiliadas.entity';
import { Like } from 'typeorm';

export async function GET(req: NextRequest) {
  try {
    const ds = await initializeDataSource();
    const repo = ds.getRepository(Afiliadas);
    
    // Obter parâmetro de busca
    const searchParams = req.nextUrl.searchParams;
    const busca = searchParams.get('busca');
    
    const where: any = {};
    if (busca) {
      where.nome = Like(`%${busca}%`);
    }
    
    const list = await repo.find({ where, order: { nome: 'ASC' } });
    return NextResponse.json(list);
  } catch (error) {
    console.error('GET /api/afiliadas error:', error);
    const message = error instanceof Error ? error.message : JSON.stringify(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const ds = await initializeDataSource();
    const repo = ds.getRepository(Afiliadas);
    const afiliada = repo.create(data);
    const saved = await repo.save(afiliada);
    return NextResponse.json(saved);
  } catch (error) {
    console.error('POST /api/afiliadas error:', error);
    const message = error instanceof Error ? error.message : JSON.stringify(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const ds = await initializeDataSource();
    const repo = ds.getRepository(Afiliadas);
    const afiliada = await repo.findOneBy({ id: String(data.id) });
    if (!afiliada) return NextResponse.json({ error: 'Afiliada não encontrada' }, { status: 404 });
    repo.merge(afiliada, data);
    const saved = await repo.save(afiliada);
    return NextResponse.json(saved);
  } catch (error) {
    console.error('PUT /api/afiliadas error:', error);
    const message = error instanceof Error ? error.message : JSON.stringify(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID não fornecido' }, { status: 400 });
    const ds = await initializeDataSource();
    const repo = ds.getRepository(Afiliadas);
    const afiliada = await repo.findOneBy({ id });
    if (!afiliada) return NextResponse.json({ error: 'Afiliada não encontrada' }, { status: 404 });
    await repo.remove(afiliada);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/afiliadas error:', error);
    const message = error instanceof Error ? error.message : JSON.stringify(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
