"use client";

import { useState } from "react";
import type { Matricula } from "../../types";

interface CursoEditFormProps {
    matricula: Matricula;
    onSaveDates: (matriculaId: string, dates: { dataInicio: string; dataFim: string }) => Promise<void>;
    onSaveDuracao: (matriculaId: string, duracao: number) => Promise<void>;
    onRemove: (matriculaId: string) => Promise<void>;
    saving: boolean;
}

export default function CursoEditForm({ 
    matricula, 
    onSaveDates, 
    onSaveDuracao, 
    onRemove, 
    saving 
}: CursoEditFormProps) {
    const [editingDates, setEditingDates] = useState(false);
    const [editingDuracao, setEditingDuracao] = useState(false);
    const [dataInicio, setDataInicio] = useState(matricula.dataInicio.split("T")[0]);
    const [dataFim, setDataFim] = useState(matricula.dataFim.split("T")[0]);
    const [duracao, setDuracao] = useState(matricula.duracaoCustomizada ?? matricula.curso.duracao);

    const duracaoFinal = matricula.duracaoCustomizada ?? matricula.curso.duracao;

    async function handleSaveDates() {
        await onSaveDates(matricula.id, { dataInicio, dataFim });
        setEditingDates(false);
    }

    async function handleSaveDuracao() {
        await onSaveDuracao(matricula.id, duracao);
        setEditingDuracao(false);
    }

    return (
        <div className="border-t pt-6 mt-6">
            <p className="font-semibold text-stone-700 mb-4">{matricula.curso.nome}</p>

            {editingDates ? (
                <div className="space-y-3 mb-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-stone-700 mb-1">
                                Data de Início
                            </label>
                            <input
                                type="date"
                                value={dataInicio}
                                onChange={(e) => setDataInicio(e.target.value)}
                                className="w-full border border-stone-300 rounded px-3 py-2 text-stone-800"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-stone-700 mb-1">
                                Data de Conclusão
                            </label>
                            <input
                                type="date"
                                value={dataFim}
                                onChange={(e) => setDataFim(e.target.value)}
                                className="w-full border border-stone-300 rounded px-3 py-2 text-stone-800"
                            />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={handleSaveDates}
                            disabled={saving}
                            className="flex-1 bg-green-500 hover:bg-green-600 text-white rounded px-3 py-2 font-medium transition disabled:opacity-50"
                        >
                            {saving ? "Salvando..." : "Salvar"}
                        </button>
                        <button
                            onClick={() => setEditingDates(false)}
                            disabled={saving}
                            className="flex-1 border border-stone-300 hover:bg-stone-100 rounded px-3 py-2 font-medium transition"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            ) : editingDuracao ? (
                <div className="space-y-3 mb-4">
                    <div>
                        <label className="block text-sm font-semibold text-stone-700 mb-1">
                            Duração (horas)
                        </label>
                        <input
                            type="number"
                            min="1"
                            value={duracao}
                            onChange={(e) => setDuracao(parseInt(e.target.value) || 0)}
                            className="w-full border border-stone-300 rounded px-3 py-2 text-stone-800"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={handleSaveDuracao}
                            disabled={saving}
                            className="flex-1 bg-green-500 hover:bg-green-600 text-white rounded px-3 py-2 font-medium transition disabled:opacity-50"
                        >
                            {saving ? "Salvando..." : "Salvar"}
                        </button>
                        <button
                            onClick={() => setEditingDuracao(false)}
                            disabled={saving}
                            className="flex-1 border border-stone-300 hover:bg-stone-100 rounded px-3 py-2 font-medium transition"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            ) : (
                <div className="mb-4">
                    <p className="text-sm text-stone-600 mb-1">
                        <span className="font-semibold">Início:</span> {new Date(matricula.dataInicio).toLocaleDateString("pt-BR", { timeZone: 'UTC' })}
                    </p>
                    <p className="text-sm text-stone-600 mb-1">
                        <span className="font-semibold">Conclusão:</span> {new Date(matricula.dataFim).toLocaleDateString("pt-BR", { timeZone: 'UTC' })}
                    </p>
                    <p className="text-sm text-stone-600 mb-3">
                        <span className="font-semibold">Duração:</span> {duracaoFinal}h
                    </p>
                    <div className="flex gap-2 flex-wrap">
                        <button
                            onClick={() => setEditingDates(true)}
                            className="text-sm bg-amber-100 hover:bg-amber-200 text-amber-900 px-3 py-1 rounded font-medium transition"
                        >
                            Editar datas
                        </button>
                        <button
                            onClick={() => setEditingDuracao(true)}
                            className="text-sm bg-blue-100 hover:bg-blue-200 text-blue-900 px-3 py-1 rounded font-medium transition"
                        >
                            Editar horas
                        </button>
                        <button
                            onClick={() => onRemove(matricula.id)}
                            className="text-sm bg-red-100 hover:bg-red-200 text-red-900 px-3 py-1 rounded font-medium transition"
                        >
                            Remover
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
