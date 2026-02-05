"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthGuard from "../../components/AuthGuard";

type Aluno = { 
  id: string; 
  nome: string; 
  email: string; 
  cpf: string; 
  telefone: string;
  cursos?: Curso[];
};

type Curso = { 
  id: string; 
  nome: string; 
  duracao: number; 
};

function getApiUrl(path: string) {
    return path;
}

export default function GerenciarAlunos() {
    const router = useRouter();
    const [alunos, setAlunos] = useState<Aluno[]>([]);
    const [cursos, setCursos] = useState<Curso[]>([]);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [rg, setRg] = useState("");
    const [telefone, setTelefone] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [editingId, setEditingId] = useState<string | null>(null);
    const [selectingCursosId, setSelectingCursosId] = useState<string | null>(null);
    const [selectedCursos, setSelectedCursos] = useState<string[]>([]);

    async function fetchAlunos() {
        try {
            const res = await fetch(getApiUrl('/api/alunos'));
            const data = await res.json();
            if (Array.isArray(data)) {
                setAlunos(data);
            } else {
                console.error('Esperado array de alunos, recebido:', data);
                setAlunos([]);
            }
        } catch (err) {
            console.error('Erro ao buscar alunos:', err);
            setAlunos([]);
        }
    }

    async function fetchCursos() {
        try {
            const res = await fetch(getApiUrl('/api/cursos'));
            const data = await res.json();
            if (Array.isArray(data)) {
                setCursos(data);
            } else {
                console.error('Esperado array de cursos, recebido:', data);
                setCursos([]);
            }
        } catch (err) {
            console.error('Erro ao buscar cursos:', err);
            setCursos([]);
        }
    }

    useEffect(() => {
        fetchAlunos();
        fetchCursos();
        setUserEmail(localStorage.getItem("user_email") || "");
    }, []);

    async function handleSave(e: React.FormEvent) {
        e.preventDefault();
        const payload = { nome, email, cpf, telefone };

        if (editingId) {
            try {
                const res = await fetch(getApiUrl('/api/alunos'), { method: 'PUT', body: JSON.stringify({ id: editingId, ...payload }), headers: { 'Content-Type': 'application/json' } });
                if (!res.ok) console.error('Erro ao atualizar aluno', await res.text());
            } catch (err) { console.error(err); }
            setEditingId(null);
        } else {
            try {
                const res = await fetch(getApiUrl('/api/alunos'), { method: 'POST', body: JSON.stringify(payload), headers: { 'Content-Type': 'application/json' } });
                if (!res.ok) console.error('Erro ao criar aluno', await res.text());
            } catch (err) { console.error(err); }
        }
        setNome(''); setEmail(''); setCpf(''); setTelefone('');
        fetchAlunos();
    }

    async function handleEdit(a: Aluno) {
        setEditingId(a.id);
        setNome(a.nome);
        setEmail(a.email);
        setCpf(a.cpf || '');
        setTelefone(a.telefone || '');
    }

    async function handleDelete(id: string) {
        if (!confirm('Excluir este aluno?')) return;
        try {
            const res = await fetch(getApiUrl('/api/alunos'), { method: 'DELETE', body: JSON.stringify({ id }), headers: { 'Content-Type': 'application/json' } });
            if (!res.ok) console.error('Erro ao excluir aluno', await res.text());
        } catch (err) { console.error(err); }
        fetchAlunos();
    }

    function handleSelectCursos(alunoId: string, alunoCursos: Curso[] = []) {
        setSelectingCursosId(alunoId);
        setSelectedCursos(alunoCursos.map(c => c.id));
    }

    async function handleSaveCursos() {
        if (!selectingCursosId) return;
        try {
            const res = await fetch('/api/alunos/cursos', {
                method: 'POST',
                body: JSON.stringify({ alunoId: selectingCursosId, cursoIds: selectedCursos }),
                headers: { 'Content-Type': 'application/json' }
            });
            if (!res.ok) console.error('Erro ao atualizar cursos do aluno', await res.text());
        } catch (err) { console.error(err); }
        setSelectingCursosId(null);
        setSelectedCursos([]);
        fetchAlunos();
    }

    function handleLogout() {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_email');
        location.href = '/login';
    }

    if (selectingCursosId) {
        return (
            <AuthGuard>
                <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50 dark:bg-black px-6 py-8">
                    <div className="mx-auto max-w-2xl bg-white rounded-2xl shadow-lg p-8">
                        <h1 className="text-3xl font-semibold text-stone-800 mb-6">
                            Adicionar Cursos ao Aluno
                        </h1>
                        
                        <div className="space-y-3 mb-8">
                            {cursos.length === 0 ? (
                                <p className="text-stone-600">Nenhum curso disponível. <button onClick={() => router.push('/gerenciar-cursos')} className="text-amber-600 font-medium hover:underline">Criar um curso</button></p>
                            ) : (
                                cursos.map((curso) => (
                                    <label key={curso.id} className="flex items-center p-4 border border-stone-200 rounded-lg hover:bg-stone-50 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={selectedCursos.includes(curso.id)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSelectedCursos([...selectedCursos, curso.id]);
                                                } else {
                                                    setSelectedCursos(selectedCursos.filter(id => id !== curso.id));
                                                }
                                            }}
                                            className="w-5 h-5 rounded accent-amber-400"
                                        />
                                        <div className="ml-4 flex-1">
                                            <div className="font-semibold text-stone-800">{curso.nome}</div>
                                            <div className="text-sm text-stone-600">{curso.duracao} horas</div>
                                        </div>
                                    </label>
                                ))
                            )}
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={handleSaveCursos}
                                className="rounded-full bg-gradient-to-r from-amber-400 to-orange-400 text-white px-6 py-3 font-medium hover:shadow-lg transition"
                            >
                                Salvar Cursos
                            </button>
                            <button
                                onClick={() => setSelectingCursosId(null)}
                                className="rounded-full border border-stone-300 text-stone-700 px-6 py-3 hover:bg-stone-100 transition"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </AuthGuard>
        );
    }

    return (
        <AuthGuard>
            <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50 dark:bg-black px-6 py-8">
                <div className="mx-auto max-w-4xl bg-white rounded-2xl shadow-lg p-8">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-3xl font-semibold text-stone-800">Gerenciar Alunos</h1>
                        <div className="flex gap-3 items-center">
                            <button onClick={() => router.push('/gerenciar-cursos')} className="rounded-full border border-stone-300 text-stone-700 px-4 py-2 hover:bg-stone-100 transition text-sm">Gerenciar Cursos</button>
                            <div className="text-sm text-stone-600">{userEmail}</div>
                            <button onClick={handleLogout} className="rounded-full border border-stone-300 text-stone-700 px-4 py-2 hover:bg-stone-100 transition">Sair</button>
                        </div>
                    </div>

                    <form onSubmit={handleSave} className="mb-8 grid gap-3 sm:grid-cols-4 bg-gradient-to-br from-amber-50 to-stone-50 p-6 rounded-xl">
                        <input placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} className="rounded-lg border border-stone-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400" />
                        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-lg border border-stone-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400" />
                        <input placeholder="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} className="rounded-lg border border-stone-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400" />
                        <input placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} className="rounded-lg border border-stone-300 px-4 py-3 sm:col-span-2 focus:outline-none focus:ring-2 focus:ring-amber-400" />
                        <div className="sm:col-span-2 flex gap-3">
                            <button className="rounded-full bg-gradient-to-r from-amber-400 to-orange-400 text-white px-6 py-3 font-medium hover:shadow-lg transition">{editingId ? 'Salvar' : 'Criar'}</button>
                            {editingId && <button type="button" onClick={() => { setEditingId(null); setNome(''); setEmail(''); setCpf(''); setTelefone(''); }} className="rounded-full border border-stone-300 text-stone-700 px-6 py-3 hover:bg-stone-100 transition">Cancelar</button>}
                        </div>
                    </form>

                    <div className="grid gap-4">
                        {alunos.length === 0 && <div className="text-center py-8 text-stone-500">Nenhum aluno encontrado.</div>}
                        {alunos.map((a) => (
                            <div key={a.id} className="flex items-center justify-between bg-gradient-to-r from-stone-50 to-amber-50 rounded-xl border border-stone-200 p-5 hover:shadow-md transition">
                                <div className="flex-1">
                                    <div className="font-semibold text-stone-800">{a.nome}</div>
                                    <div className="text-sm text-stone-600">{a.email}</div>
                                    <div className="text-sm text-stone-600">CPF: {a.cpf || '-'}</div>
                                    <div className="text-sm text-stone-600">Telefone: {a.telefone || '-'}</div>
                                    {a.cursos && a.cursos.length > 0 && (
                                        <div className="mt-2 text-xs text-amber-600">
                                            <strong>Cursos:</strong> {a.cursos.map(c => c.nome).join(', ')}
                                        </div>
                                    )}
                                </div>
                                <div className="flex gap-3 flex-wrap justify-end">
                                    <button onClick={() => router.push(`/certificado/${a.id}`)} className="rounded-full bg-gradient-to-r from-green-400 to-emerald-400 text-white px-4 py-2 text-sm font-medium hover:shadow-lg transition">Certificado</button>
                                    <button onClick={() => handleSelectCursos(a.id, a.cursos || [])} className="rounded-full bg-gradient-to-r from-blue-400 to-blue-600 text-white px-4 py-2 text-sm font-medium hover:shadow-lg transition">Cursos</button>
                                    <button onClick={() => handleEdit(a)} className="rounded-full border border-stone-300 text-stone-700 px-4 py-2 text-sm hover:bg-stone-100 transition">Editar</button>
                                    <button onClick={() => handleDelete(a.id)} className="rounded-full border border-red-300 text-red-600 px-4 py-2 text-sm hover:bg-red-50 transition">Excluir</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthGuard>
    );
}