"use client";

import { useRouter } from "next/navigation";
import { FaSave, FaTimes } from "react-icons/fa";
import type { Curso } from "../../types";

interface CursoSelectorProps {
    cursos: Curso[];
    selectedCursos: string[];
    savingCursos: boolean;
    onToggleCurso: (cursoId: string) => void;
    onSave: () => void;
    onCancel: () => void;
}

export default function CursoSelector({
    cursos, selectedCursos, savingCursos,
    onToggleCurso, onSave, onCancel
}: CursoSelectorProps) {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50 dark:bg-black px-6 py-8">
            <div className="mx-auto max-w-4xl bg-white rounded-2xl shadow-lg p-8">
                <h1 className="text-3xl font-semibold text-stone-800 mb-6">
                    Adicionar Cursos ao Aluno
                </h1>
                
                <div className="space-y-3 mb-8">
                    {cursos.length === 0 ? (
                        <p className="text-stone-600">
                            Nenhum curso disponível.{' '}
                            <button 
                                onClick={() => router.push('/gerenciar-cursos')} 
                                className="text-amber-600 font-medium hover:underline"
                            >
                                Criar um curso
                            </button>
                        </p>
                    ) : (
                        cursos.map((curso) => (
                            <label 
                                key={curso.id} 
                                className="flex items-center p-4 border border-stone-200 rounded-lg hover:bg-stone-50 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedCursos.includes(curso.id)}
                                    onChange={() => onToggleCurso(curso.id)}
                                    className="w-5 h-5 rounded accent-amber-400"
                                />
                                <div className="ml-4 flex-1">
                                    <div className="font-semibold text-stone-800">{curso.nome}</div>
                                    <div className="text-sm text-stone-600">{curso.duracao} horas</div>
                                </div>
                            </label>
                        ))
                    )}
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={onSave}
                        disabled={savingCursos}
                        className="rounded-full bg-gradient-to-r from-amber-400 to-orange-400 text-white px-6 py-3 font-medium hover:shadow-lg transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        <FaSave /> {savingCursos ? 'Salvando...' : 'Salvar Cursos'}
                    </button>
                    <button
                        onClick={onCancel}
                        disabled={savingCursos}
                        className="rounded-full border border-stone-300 text-stone-700 px-6 py-3 hover:bg-stone-100 transition cursor-pointer disabled:opacity-50 flex items-center gap-2"
                    >
                        <FaTimes /> Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
}
