"use client";

import { useRouter } from "next/navigation";
import { FaUsers, FaBook, FaSignOutAlt } from "react-icons/fa";

interface PageHeaderProps {
    title: string;
    showGerenciarAlunos?: boolean;
    showGerenciarCursos?: boolean;
    showGerenciarAfiliadas?: boolean;
}

export default function PageHeader({ 
    title, 
    showGerenciarAlunos = false, 
    showGerenciarCursos = false,
    showGerenciarAfiliadas = false 
}: PageHeaderProps) {
    const router = useRouter();

    function handleLogout() {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_email');
        location.href = '/login';
    }

    return (
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-semibold text-stone-800">{title}</h1>
            <div className="flex gap-3 items-center">
                {showGerenciarAlunos && (
                    <button 
                        onClick={() => router.push('/gerenciar-alunos')} 
                        className="rounded-full border border-stone-300 text-stone-700 px-4 py-2 hover:bg-stone-100 transition text-sm cursor-pointer flex items-center gap-2"
                    >
                        <FaUsers /> Gerenciar Alunos
                    </button>
                )}
                {showGerenciarCursos && (
                    <button 
                        onClick={() => router.push('/gerenciar-cursos')} 
                        className="rounded-full border border-stone-300 text-stone-700 px-4 py-2 hover:bg-stone-100 transition text-sm cursor-pointer flex items-center gap-2"
                    >
                        <FaBook /> Gerenciar Cursos
                    </button>
                )}
                {showGerenciarAfiliadas && (
                    <button 
                        onClick={() => router.push('/gerenciar-afiliadas')} 
                        className="rounded-full border border-stone-300 text-stone-700 px-4 py-2 hover:bg-stone-100 transition text-sm cursor-pointer flex items-center gap-2"
                    >
                        <FaUsers /> Gerenciar Afiliadas
                    </button>
                )}
                <button 
                    onClick={handleLogout} 
                    className="rounded-full border border-stone-300 text-stone-700 px-4 py-2 hover:bg-stone-100 transition cursor-pointer flex items-center gap-2"
                >
                    <FaSignOutAlt /> Sair
                </button>
            </div>
        </div>
    );
}
