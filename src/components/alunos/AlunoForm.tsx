"use client";

import React from "react";
import { IMaskInput } from "react-imask";
import { FaSave, FaTimes } from "react-icons/fa";

interface AlunoFormProps {
    nome: string;
    email: string;
    cpf: string;
    rg: string;
    telefone: string;
    editingId: string | null;
    saving: boolean;
    onNomeChange: (value: string) => void;
    onEmailChange: (value: string) => void;
    onCpfChange: (value: string) => void;
    onRgChange: (value: string) => void;
    onTelefoneChange: (value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    onCancel: () => void;
}

export default function AlunoForm({
    nome, email, cpf, rg, telefone, editingId, saving,
    onNomeChange, onEmailChange, onCpfChange, onRgChange, onTelefoneChange,
    onSubmit, onCancel
}: AlunoFormProps) {
    return (
        <form onSubmit={onSubmit} className="mb-8 grid gap-3 sm:grid-cols-4 bg-white border border-stone-200 shadow-sm p-6 rounded-2xl">
            <input 
                placeholder="Nome" 
                value={nome} 
                onChange={(e) => onNomeChange(e.target.value)} 
                disabled={saving} 
                className="rounded-xl border border-stone-300 bg-white px-4 py-3 text-stone-800 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-300 disabled:opacity-50" 
            />
            <input 
                placeholder="Email" 
                value={email} 
                onChange={(e) => onEmailChange(e.target.value)} 
                disabled={saving} 
                className="rounded-xl border border-stone-300 bg-white px-4 py-3 text-stone-800 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-300 disabled:opacity-50" 
            />
            <IMaskInput 
                mask="000.000.000-00" 
                placeholder="CPF" 
                value={cpf} 
                onAccept={(value) => onCpfChange(value)} 
                disabled={saving}
                className="rounded-xl border border-stone-300 bg-white px-4 py-3 text-stone-800 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-300 disabled:opacity-50" 
            />
            <IMaskInput 
                mask="00.000.000-0" 
                placeholder="RG (opcional)" 
                value={rg} 
                onAccept={(value) => onRgChange(value)} 
                disabled={saving}
                className="rounded-xl border border-stone-300 bg-white px-4 py-3 text-stone-800 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-300 disabled:opacity-50" 
            />
            <IMaskInput 
                mask="(00) 00000-0000" 
                placeholder="Telefone" 
                value={telefone} 
                onAccept={(value) => onTelefoneChange(value)} 
                disabled={saving}
                className="rounded-xl border border-stone-300 bg-white px-4 py-3 sm:col-span-2 text-stone-800 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-300 disabled:opacity-50" 
            />
            <div className="sm:col-span-2 flex gap-3">
                <button 
                    disabled={saving} 
                    className="rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 text-white px-6 py-3 font-medium hover:shadow-lg transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    <FaSave /> {saving ? 'Salvando...' : (editingId ? 'Salvar' : 'Criar')}
                </button>
                {editingId && (
                    <button 
                        type="button" 
                        onClick={onCancel} 
                        disabled={saving} 
                        className="rounded-xl border border-stone-300 bg-white text-stone-700 px-6 py-3 hover:bg-stone-100 transition cursor-pointer disabled:opacity-50 flex items-center gap-2"
                    >
                        <FaTimes /> Cancelar
                    </button>
                )}
            </div>
        </form>
    );
}
