"use client";

import React from "react";
import { IMaskInput } from "react-imask";
import { FaSave, FaTimes } from "react-icons/fa";

interface AfiliadaFormProps {
    nome: string;
    foto: string;
    whatsapp: string;
    editingId: string | null;
    saving: boolean;
    dragActive: boolean;
    onNomeChange: (value: string) => void;
    onWhatsappChange: (value: string) => void;
    onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onDrag: (e: React.DragEvent) => void;
    onDrop: (e: React.DragEvent) => void;
    onSubmit: (e: React.FormEvent) => void;
    onCancel: () => void;
}

export default function AfiliadaForm({
    nome, foto, whatsapp, editingId, saving, dragActive,
    onNomeChange, onWhatsappChange, onImageChange, onDrag, onDrop,
    onSubmit, onCancel
}: AfiliadaFormProps) {
    return (
        <form onSubmit={onSubmit} className="mb-8 grid gap-3 sm:grid-cols-3 bg-white border border-stone-200 shadow-sm p-6 rounded-2xl">
            <input 
                placeholder="Nome" 
                value={nome} 
                onChange={(e) => onNomeChange(e.target.value)} 
                required
                disabled={saving}
                className="rounded-xl border border-stone-300 bg-white px-4 py-3 text-stone-800 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-300 disabled:opacity-50" 
            />
            <div className="relative">
                <input 
                    type="file"
                    accept="image/*"
                    onChange={onImageChange}
                    disabled={saving}
                    className="hidden"
                    id="file-upload"
                />
                <label 
                    htmlFor="file-upload"
                    onDragEnter={onDrag}
                    onDragLeave={onDrag}
                    onDragOver={onDrag}
                    onDrop={onDrop}
                    className={`rounded-xl border-2 border-dashed px-4 py-3 text-stone-800 w-full cursor-pointer transition flex items-center gap-2 ${
                        dragActive 
                            ? 'border-amber-500 bg-amber-50' 
                            : 'border-stone-300 bg-white hover:bg-stone-50'
                    }`}
                >
                    <span className="py-1 px-3 rounded-full border-0 text-sm font-semibold bg-amber-100 text-amber-700">Escolher imagem</span>
                    <span className="text-stone-600 text-sm flex-1">
                        {dragActive ? 'Solte a imagem aqui' : (foto ? 'Imagem selecionada' : 'Ou arraste aqui')}
                    </span>
                </label>
            </div>
            <IMaskInput 
                mask="(00) 00000-0000" 
                placeholder="WhatsApp" 
                value={whatsapp} 
                onAccept={(value) => onWhatsappChange(value)} 
                required
                disabled={saving}
                className="rounded-xl border border-stone-300 bg-white px-4 py-3 text-stone-800 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-300 disabled:opacity-50" 
            />
            {foto && (
                <div className="sm:col-span-3">
                    <img 
                        src={foto} 
                        alt="Preview" 
                        className="max-w-xs max-h-40 rounded-lg object-cover border border-stone-200" 
                    />
                </div>
            )}
            <div className="sm:col-span-3 flex gap-3">
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
