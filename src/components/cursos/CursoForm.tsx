"use client";

import React from "react";
import { FaSave, FaTimes } from "react-icons/fa";

interface CursoFormProps {
    nome: string;
    duracao: string;
    categoria: string;
    conteudo: string;
    editingId: string | null;
    saving: boolean;
    categorias: string[];
    onNomeChange: (value: string) => void;
    onDuracaoChange: (value: string) => void;
    onCategoriaChange: (value: string) => void;
    onConteudoChange: (value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    onCancel: () => void;
}

export default function CursoForm({
    nome, duracao, categoria, conteudo, editingId, saving, categorias,
    onNomeChange, onDuracaoChange, onCategoriaChange, onConteudoChange,
    onSubmit, onCancel
}: CursoFormProps) {
    return (
        <form onSubmit={onSubmit} className="mb-8 bg-gradient-to-br from-amber-50 to-stone-50 p-6 rounded-xl space-y-4">
            <div className="grid gap-3 sm:grid-cols-3">
                <input
                    placeholder="Nome do Curso"
                    value={nome}
                    onChange={(e) => onNomeChange(e.target.value)}
                    disabled={saving}
                    className="rounded-lg border border-stone-300 px-4 py-3 text-stone-800 placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:opacity-50"
                />
                <input
                    placeholder="Duração (horas)"
                    type="number"
                    value={duracao}
                    onChange={(e) => onDuracaoChange(e.target.value)}
                    disabled={saving}
                    className="rounded-lg border border-stone-300 px-4 py-3 text-stone-800 placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:opacity-50"
                />
                <select
                    value={categoria}
                    onChange={(e) => onCategoriaChange(e.target.value)}
                    disabled={saving}
                    className="rounded-lg border border-stone-300 px-4 py-3 text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:opacity-50"
                >
                    <option value="">Selecione categoria</option>
                    {categorias.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
            </div>
            <textarea
                placeholder="Conteúdo do curso (um tópico por linha, ex: desenvolvimento de canva, aplicação de pacote office, etc.)"
                value={conteudo}
                onChange={(e) => onConteudoChange(e.target.value)}
                disabled={saving}
                rows={4}
                className="w-full rounded-lg border border-stone-300 px-4 py-3 text-stone-800 placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:opacity-50 resize-none"
            />
            <div className="flex gap-3">
                <button 
                    disabled={saving} 
                    className="rounded-full bg-gradient-to-r from-amber-400 to-orange-400 text-white px-6 py-3 font-medium hover:shadow-lg transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    <FaSave /> {saving ? "Salvando..." : (editingId ? "Salvar" : "Criar")}
                </button>
                {editingId && (
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={saving}
                        className="rounded-full border border-stone-300 text-stone-700 px-6 py-3 hover:bg-stone-100 transition cursor-pointer disabled:opacity-50 flex items-center gap-2"
                    >
                        <FaTimes /> Cancelar
                    </button>
                )}
            </div>
        </form>
    );
}
