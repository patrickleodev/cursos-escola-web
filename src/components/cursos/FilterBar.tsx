"use client";

interface FilterBarProps {
    busca: string;
    onBuscaChange: (value: string) => void;
    filtroCategoria: string;
    onFiltroCategoriaChange: (value: string) => void;
    categorias: string[];
}

export default function FilterBar({ 
    busca, 
    onBuscaChange, 
    filtroCategoria, 
    onFiltroCategoriaChange, 
    categorias 
}: FilterBarProps) {
    return (
        <div className="mb-6 space-y-3">
            <input
                placeholder="🔍 Pesquisar por nome do curso..."
                value={busca}
                onChange={(e) => onBuscaChange(e.target.value)}
                className="w-full rounded-lg border border-stone-300 px-4 py-3 text-stone-800 placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-400 bg-stone-100"
            />
            <select
                value={filtroCategoria}
                onChange={(e) => onFiltroCategoriaChange(e.target.value)}
                className="w-full rounded-lg border border-stone-300 px-4 py-3 text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-400 bg-stone-100"
            >
                <option value="todas">📚 Todas as categorias</option>
                {categorias.map((cat) => (
                    <option key={cat} value={cat}>
                        {cat}
                    </option>
                ))}
            </select>
        </div>
    );
}
