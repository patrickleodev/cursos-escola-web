"use client";

import { formatCPF, formatTelefone, formatRG } from "../../lib/formatters";
import type { Aluno } from "../../types";

interface AlunoInfoProps {
    aluno: Aluno;
}

export default function AlunoInfo({ aluno }: AlunoInfoProps) {
    return (
        <div className="space-y-4 mb-8">
            <div className="border-b border-stone-200 pb-4">
                <label className="block text-sm font-semibold text-stone-700">Nome</label>
                <div className="mt-2 text-lg text-stone-800">{aluno.nome}</div>
            </div>

            <div className="border-b border-stone-200 pb-4">
                <label className="block text-sm font-semibold text-stone-700">Email</label>
                <div className="mt-2 text-lg text-stone-800">{aluno.email}</div>
            </div>

            <div className="border-b border-stone-200 pb-4">
                <label className="block text-sm font-semibold text-stone-700">Telefone</label>
                <div className="mt-2 text-lg text-stone-800">{formatTelefone(aluno.telefone || '')}</div>
            </div>

            <div className="border-b border-stone-200 pb-4">
                <label className="block text-sm font-semibold text-stone-700">CPF</label>
                <div className="mt-2 text-lg text-stone-800">{formatCPF(aluno.cpf || '')}</div>
            </div>

            <div className="border-b border-stone-200 pb-4">
                <label className="block text-sm font-semibold text-stone-700">RG</label>
                <div className="mt-2 text-lg text-stone-800">{aluno.rg ? formatRG(aluno.rg) : 'Ausente'}</div>
            </div>
        </div>
    );
}
