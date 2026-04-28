import "reflect-metadata";
import { NextRequest, NextResponse } from "next/server";
import { ILike, Not, FindOperator } from "typeorm";
import { Cursos } from "../../../database/entities/cursos.entity";
import { initializeDataSource } from "../../../lib/data-source";

type CursoPayloadInput = {
  id?: string;
  nome?: string;
  categoria?: string;
  conteudo?: string;
  duracao?: number;
};

function normalizeCursoPayload(data: CursoPayloadInput) {
  return {
    ...data,
    nome: typeof data?.nome === "string" ? data.nome.trim() : "",
    categoria: typeof data?.categoria === "string" ? data.categoria.trim() : "",
    conteudo: typeof data?.conteudo === "string" ? data.conteudo.trim() : data?.conteudo,
  };
}

export async function GET(req: NextRequest) {
  try {
    const ds = await initializeDataSource();
    const repo = ds.getRepository(Cursos);

    const searchParams = req.nextUrl.searchParams;
    const busca = searchParams.get("busca");
    const categoria = searchParams.get("categoria");

    const where: { nome?: FindOperator<string>; categoria?: string } = {};
    if (busca) {
      where.nome = ILike(`%${busca}%`);
    }
    if (categoria && categoria !== "todas") {
      where.categoria = categoria;
    }

    const list = await repo.find({ where });
    return NextResponse.json(list);
  } catch (error) {
    console.error("GET /api/cursos error:", error);
    const message = error instanceof Error ? error.message : JSON.stringify(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = normalizeCursoPayload(await req.json());
    const ds = await initializeDataSource();
    const repo = ds.getRepository(Cursos);

    if (!data.nome) {
      return NextResponse.json({ error: "Nome do curso é obrigatório" }, { status: 400 });
    }

    if (!data.categoria) {
      return NextResponse.json({ error: "Categoria do curso é obrigatória" }, { status: 400 });
    }

    const existente = await repo.findOne({
      where: {
        nome: data.nome,
        categoria: data.categoria,
      },
    });

    if (existente) {
      return NextResponse.json(
        { error: "Já existe um curso com esse nome nessa categoria" },
        { status: 409 }
      );
    }

    const curso = repo.create(data);
    const saved = await repo.save(curso);
    return NextResponse.json(saved);
  } catch (error) {
    console.error("POST /api/cursos error:", error);
    const message = error instanceof Error ? error.message : JSON.stringify(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const data = normalizeCursoPayload(await req.json());
    const ds = await initializeDataSource();
    const repo = ds.getRepository(Cursos);
    const curso = await repo.findOneBy({ id: String(data.id) });

    if (!curso) {
      return NextResponse.json({ error: "Curso não encontrado" }, { status: 404 });
    }

    if (!data.nome) {
      return NextResponse.json({ error: "Nome do curso é obrigatório" }, { status: 400 });
    }

    if (!data.categoria) {
      return NextResponse.json({ error: "Categoria do curso é obrigatória" }, { status: 400 });
    }

    const duplicado = await repo.findOne({
      where: {
        nome: data.nome,
        categoria: data.categoria,
        id: Not(String(data.id)),
      },
    });

    if (duplicado) {
      return NextResponse.json(
        { error: "Já existe um curso com esse nome nessa categoria" },
        { status: 409 }
      );
    }

    repo.merge(curso, data);
    const saved = await repo.save(curso);
    return NextResponse.json(saved);
  } catch (error) {
    console.error("PUT /api/cursos error:", error);
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

    if (!curso) {
      return NextResponse.json({ error: "Curso não encontrado" }, { status: 404 });
    }

    await repo.remove(curso);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("DELETE /api/cursos error:", error);
    const message = error instanceof Error ? error.message : JSON.stringify(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
