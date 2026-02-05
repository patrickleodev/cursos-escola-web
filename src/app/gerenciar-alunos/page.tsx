// ...existing code...
"use client";

import React, { useEffect, useState } from "react";
import AuthGuard from "../../components/AuthGuard";

type Aluno = { id: string; nome: string; email: string; cpf?: string; rg?: string; telefone?: string };

function getApiUrl(path: string) {
  return path;
}

export default function GerenciarAlunos() {
    const [alunos, setAlunos] = useState<Aluno[]>([]);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [rg, setRg] = useState("");
    const [telefone, setTelefone] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [editingId, setEditingId] = useState<string | null>(null);

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

    useEffect(() => {
        fetchAlunos();
        setUserEmail(localStorage.getItem("user_email") || "");
    }, []);

    async function handleSave(e: React.FormEvent) {
        e.preventDefault();
        const payload = { nome, email, cpf, rg, telefone };
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
        setNome(''); setEmail(''); setCpf(''); setRg(''); setTelefone('');
        fetchAlunos();
    }

    async function handleEdit(a: Aluno) {
        setEditingId(a.id);
        setNome(a.nome);
        setEmail(a.email);
        setCpf(a.cpf || '');
        setRg(a.rg || '');
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

    function handleLogout() {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_email');
        location.href = '/login';
    }

    return (
        <AuthGuard>
            <div className="min-h-screen bg-zinc-50 dark:bg-black px-6 py-8">
                <div className="mx-auto max-w-4xl bg-white rounded shadow p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-xl font-semibold">Gerenciar Alunos</h1>
                        <div className="flex gap-2">
                            <div className="text-sm text-zinc-500">{userEmail}</div>
                            <button onClick={handleLogout} className="rounded border px-3 py-1">Sair</button>
                        </div>
                    </div>

                    <form onSubmit={handleSave} className="mb-6 grid gap-3 sm:grid-cols-4">
                        <input placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} className="rounded border px-3 py-2" />
                        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded border px-3 py-2" />
                        <input placeholder="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} className="rounded border px-3 py-2" />
                        <input placeholder="RG" value={rg} onChange={(e) => setRg(e.target.value)} className="rounded border px-3 py-2" />
                        <input placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} className="rounded border px-3 py-2 sm:col-span-2" />
                        <div className="sm:col-span-2 flex gap-2">
                            <button className="rounded-full bg-foreground text-background px-4 py-2">{editingId ? 'Salvar' : 'Criar'}</button>
                            {editingId && <button type="button" onClick={() => { setEditingId(null); setNome(''); setEmail(''); setCpf(''); setRg(''); setTelefone(''); }} className="rounded-full border px-4 py-2">Cancelar</button>}
                        </div>
                    </form>

                    <div className="grid gap-3">
                        {alunos.length === 0 && <div className="text-zinc-500">Nenhum aluno encontrado.</div>}
                        {alunos.map((a) => (
                            <div key={a.id} className="flex items-center justify-between rounded border p-3">
                                <div>
                                    <div className="font-medium">{a.nome}</div>
                                    <div className="text-sm text-zinc-500">{a.email}</div>
                                    <div className="text-sm text-zinc-500">CPF: {a.cpf || '-'}</div>
                                    <div className="text-sm text-zinc-500">RG: {a.rg || '-'}</div>
                                    <div className="text-sm text-zinc-500">Telefone: {a.telefone || '-'}</div>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => handleEdit(a)} className="rounded border px-3 py-1">Editar</button>
                                    <button onClick={() => handleDelete(a.id)} className="rounded border px-3 py-1 text-red-600">Excluir</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthGuard>
    );
}
// ...existing code...