"use client";

import type { Curso } from "../../types";

interface CursosSectionProps {
    cursos: Curso[] | undefined;
}

export default function CursosSection({ cursos }: CursosSectionProps) {
    const formatDate = (dateString?: string) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    };

    const totalHoras = cursos?.reduce(
        (acc, curso) => acc + (curso.duracaoCustomizada ?? curso.duracao), 
        0
    ) || 0;

    return (
        <div className="bg-gradient-to-br from-amber-50 to-stone-50 rounded-xl p-6 border border-stone-200">
            <h2 className="text-xl font-semibold text-stone-800 mb-4">Cursos Realizados</h2>
            
            {cursos && cursos.length > 0 ? (
                <div className="space-y-3">
                    {cursos.map((curso) => {
                        const duracaoFinal = curso.duracaoCustomizada ?? curso.duracao;
                        return (
                            <div key={curso.id} className="bg-white rounded-lg p-4 border border-stone-200">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="font-semibold text-stone-800">{curso.nome}</div>
                                        <div className="text-sm text-stone-600">{duracaoFinal} horas</div>
                                        {(curso.dataInicio || curso.dataFim) && (
                                            <div className="text-sm text-stone-500 mt-2 space-y-1">
                                                {curso.dataInicio && (
                                                    <div>Início: {formatDate(curso.dataInicio)}</div>
                                                )}
                                                {curso.dataFim && (
                                                    <div>Conclusão: {formatDate(curso.dataFim)}</div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    <div className="bg-white rounded-lg p-4 border-2 border-amber-200 mt-4">
                        <div className="font-semibold text-stone-800">
                            Total de horas: <span className="text-amber-600">{totalHoras} horas</span>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center py-8 text-stone-600">
                    <p>Nenhum curso assignado ainda.</p>
                </div>
            )}
        </div>
    );
}
