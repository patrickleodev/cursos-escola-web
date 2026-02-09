"use client";

import { FaEdit, FaTrash } from "react-icons/fa";
import { formatWhatsApp } from "../../lib/formatters";

interface Afiliada {
    id: string;
    nome: string;
    foto?: string;
    whatsapp: string;
}

interface AfiliadaListProps {
    afiliadas: Afiliada[];
    onEdit: (afiliada: Afiliada) => void;
    onDelete: (id: string) => void;
}

export default function AfiliadaList({ afiliadas, onEdit, onDelete }: AfiliadaListProps) {
    return (
        <div className="grid gap-4">
            {afiliadas.map((afiliada) => (
                <div 
                    key={afiliada.id} 
                    className="flex items-center justify-between bg-gradient-to-r from-stone-50 to-amber-50 rounded-xl border border-stone-200 p-5 hover:shadow-md transition"
                >
                    <div className="flex items-center gap-4 flex-1">
                        {afiliada.foto && (
                            <img 
                                src={afiliada.foto} 
                                alt={afiliada.nome}
                                className="w-20 h-20 rounded-lg object-cover border border-stone-200"
                            />
                        )}
                        <div className="flex-1">
                            <div className="font-semibold text-stone-800">{afiliada.nome}</div>
                            <div className="text-sm text-stone-600">WhatsApp: {formatWhatsApp(afiliada.whatsapp)}</div>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button 
                            onClick={() => onEdit(afiliada)} 
                            className="rounded-full border border-stone-300 text-stone-700 px-4 py-2 text-sm hover:bg-stone-100 transition cursor-pointer flex items-center gap-2"
                        >
                            <FaEdit /> Editar
                        </button>
                        <button 
                            onClick={() => onDelete(afiliada.id)} 
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
