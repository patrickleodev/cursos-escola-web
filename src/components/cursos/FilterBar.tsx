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
        <div className="mb-6 grid gap-3 sm:grid-cols-2 bg-stone-100 p-4 rounded-xl">
            <input
                placeholder="🔍 Pesquisar por nome do curso..."
                value={busca}
                onChange={(e) => onBuscaChange(e.target.value)}
                className="rounded-lg border border-stone-300 px-4 py-3 text-stone-800 placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <select
                value={filtroCategoria}
                onChange={(e) => onFiltroCategoriaChange(e.target.value)}
                className="rounded-lg border border-stone-300 px-4 py-3 text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
                <option value="todas">Todas as categorias</option>
                {categorias.map((cat) => (
                    <option key={cat} value={cat}>
                        {cat}
                    </option>
                ))}
            </select>
        </div>
    );
}
