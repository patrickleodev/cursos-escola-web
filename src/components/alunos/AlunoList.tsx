"use client";

import { useRouter } from "next/navigation";
import { FaCertificate, FaBook, FaEdit, FaTrash } from "react-icons/fa";
import { formatCPF, formatTelefone } from "../../lib/formatters";
import type { Aluno } from "../../types";

interface AlunoListProps {
    alunos: Aluno[];
    onEdit: (aluno: Aluno) => void;
    onDelete: (id: string) => void;
    onSelectCursos: (alunoId: string, cursos: any[]) => void;
}

export default function AlunoList({ alunos, onEdit, onDelete, onSelectCursos }: AlunoListProps) {
    const router = useRouter();

    return (
        <div className="grid gap-4">
            {alunos.map((a) => (
                <div key={a.id} className="flex items-center justify-between bg-gradient-to-r from-stone-50 to-amber-50 rounded-xl border border-stone-200 p-5 hover:shadow-md transition">
                    <div className="flex-1">
                        <div className="font-semibold text-stone-800">{a.nome}</div>
                        <div className="text-sm text-stone-600">{a.email}</div>
                        <div className="text-sm text-stone-600">CPF: {formatCPF(a.cpf || '')}</div>
                        <div className="text-sm text-stone-600">Telefone: {formatTelefone(a.telefone || '')}</div>
                        {a.cursos && a.cursos.length > 0 && (
                            <div className="mt-2 text-xs text-amber-600">
                                <strong>Cursos:</strong> {a.cursos.map(c => c.nome).join(', ')}
                            </div>
                        )}
                    </div>
                    <div className="flex gap-3 flex-wrap justify-end">
                        {/* Mostrar botão de Certificado Técnico somente se o aluno tiver pelo menos um curso de especialização técnica */}
                        {(() => {
                            const hasTecnico = (a.cursos || []).some((c) => {
                                const cat = (c.categoria || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                                return cat.includes('especializacao') && cat.includes('tecnica');
                            });

                            return hasTecnico ? (
                                <button 
                                    onClick={() => router.push(`/certificado-tecnico/${a.id}`)} 
                                    className="rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-4 py-2 text-sm font-medium hover:shadow-lg transition cursor-pointer flex items-center gap-2"
                                >
                                    <FaCertificate /> Certificado Técnico
                                </button>
                            ) : null;
                        })()}
                        <button 
                            onClick={() => router.push(`/certificado/${a.id}`)} 
                            className="rounded-full bg-gradient-to-r from-green-400 to-emerald-400 text-white px-4 py-2 text-sm font-medium hover:shadow-lg transition cursor-pointer flex items-center gap-2"
                        >
                            <FaCertificate /> Certificado
                        </button>
                        {/* botão de Certificado Técnico já renderizado condicionalmente acima */}
                        <button 
                            onClick={() => onSelectCursos(a.id, a.cursos || [])} 
                            className="rounded-full bg-gradient-to-r from-blue-400 to-blue-600 text-white px-4 py-2 text-sm font-medium hover:shadow-lg transition cursor-pointer flex items-center gap-2"
                        >
                            <FaBook /> Cursos
                        </button>
                        <button 
                            onClick={() => onEdit(a)} 
                            className="rounded-full border border-stone-300 text-stone-700 px-4 py-2 text-sm hover:bg-stone-100 transition cursor-pointer flex items-center gap-2"
                        >
                            <FaEdit /> Editar
                        </button>
                        <button 
                            onClick={() => onDelete(a.id)} 
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
