"use client";

import { FaEdit, FaTrash } from "react-icons/fa";

type Curso = {
    id: string;
    nome: string;
    duracao: number;
    categoria?: string;
    conteudo?: string;
};

interface CursoListProps {
    cursos: Curso[];
    onEdit: (curso: Curso) => void;
    onDelete: (id: string) => void;
}

export default function CursoList({ cursos, onEdit, onDelete }: CursoListProps) {
    return (
        <div className="grid gap-4">
            {cursos.map((c) => (
                <div
                    key={c.id}
                    className="flex items-center justify-between bg-gradient-to-r from-stone-50 to-amber-50 rounded-xl border border-stone-200 p-5 hover:shadow-md transition"
                >
                    <div>
                        <div className="font-semibold text-stone-800">{c.nome}</div>
                        <div className="text-sm text-stone-600">
                            Duração: {c.duracao} horas
                        </div>
                        {c.categoria && (
                            <div className="text-xs text-amber-700 bg-amber-100 rounded-full px-3 py-1 inline-block mt-1">
                                {c.categoria}
                            </div>
                        )}
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => onEdit(c)}
                            className="rounded-full border border-stone-300 text-stone-700 px-4 py-2 text-sm hover:bg-stone-100 transition cursor-pointer flex items-center gap-2"
                        >
                            <FaEdit /> Editar
                        </button>
                        <button
                            onClick={() => onDelete(c.id)}
                            className="rounded-full border border-red-300 text-red-600 px-4 py-2 text-sm hover:bg-red-50 transition cursor-pointer flex items-center gap-2"
                        >
                            <FaTrash /> Excluir
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
