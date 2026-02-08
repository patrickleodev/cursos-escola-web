import "reflect-metadata";
import { NextRequest, NextResponse } from "next/server";
import { initializeDataSource } from '../../../lib/data-source';
import { Cursos } from '../../../database/entities/cursos.entity';
import { Like } from 'typeorm';

export async function GET(req: NextRequest) {
  try {
    const ds = await initializeDataSource();
    const repo = ds.getRepository(Cursos);
    
    // Obter parâmetros de busca
    const searchParams = req.nextUrl.searchParams;
    const busca = searchParams.get('busca');
    const categoria = searchParams.get('categoria');
    
    // Construir filtros
    const where: any = {};
    if (busca) {
      where.nome = Like(`%${busca}%`);
    }
    if (categoria && categoria !== 'todas') {
      where.categoria = categoria;
    }
    
    const list = await repo.find({ where });
    return NextResponse.json(list);
  } catch (error) {
    console.error('GET /api/cursos error:', error);
    const message = error instanceof Error ? error.message : JSON.stringify(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const ds = await initializeDataSource();
    const repo = ds.getRepository(Cursos);
    const curso = repo.create(data);
    const saved = await repo.save(curso);
    return NextResponse.json(saved);
  } catch (error) {
    console.error('POST /api/cursos error:', error);
    const message = error instanceof Error ? error.message : JSON.stringify(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const ds = await initializeDataSource();
    const repo = ds.getRepository(Cursos);
    const curso = await repo.findOneBy({ id: String(data.id) });
    if (!curso) return NextResponse.json({ error: 'Curso não encontrado' }, { status: 404 });
    repo.merge(curso, data);
    const saved = await repo.save(curso);
    return NextResponse.json(saved);
  } catch (error) {
    console.error('PUT /api/cursos error:', error);
    const message = error instanceof Error ? error.message : JSON.stringify(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const data = await req.json();
    const ds = await initializeDataSource();
    const repo = ds.getRepository(Cursos);
    const curso = await repo.findOneBy({ id: String(data.id) });
    if (!curso) return NextResponse.json({ error: 'Curso não encontrado' }, { status: 404 });
    await repo.remove(curso);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('DELETE /api/cursos error:', error);
    const message = error instanceof Error ? error.message : JSON.stringify(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
