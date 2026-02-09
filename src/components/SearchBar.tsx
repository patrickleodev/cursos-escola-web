"use client";

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder = "🔍 Pesquisar..." }: SearchBarProps) {
    return (
        <div className="mb-6">
            <input
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full rounded-lg border border-stone-300 px-4 py-3 text-stone-800 placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-400 bg-stone-100"
            />
        </div>
    );
}
