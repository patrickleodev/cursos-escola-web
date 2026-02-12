"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthGuard from "../../components/AuthGuard";
import PageHeader from "../../components/PageHeader";
import SearchBar from "../../components/SearchBar";
import LoadingSpinner from "../../components/LoadingSpinner";
import EmptyState from "../../components/EmptyState";
import AlunoForm from "../../components/alunos/AlunoForm";
import AlunoList from "../../components/alunos/AlunoList";
import CursoSelector from "../../components/alunos/CursoSelector";
import ManagementSidebar from "../../components/ManagementSidebar";
import type { Aluno, Curso } from "../../types";

function getApiUrl(path: string) {
    return path;
}

export default function GerenciarAlunos() {
    const [alunos, setAlunos] = useState<Aluno[]>([]);
    const [cursos, setCursos] = useState<Curso[]>([]);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [rg, setRg] = useState("");
    const [telefone, setTelefone] = useState("");
    const [editingId, setEditingId] = useState<string | null>(null);
    const [selectingCursosId, setSelectingCursosId] = useState<string | null>(null);
    const [selectedCursos, setSelectedCursos] = useState<string[]>([]);
    const [busca, setBusca] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [savingCursos, setSavingCursos] = useState(false);

    async function fetchAlunos() {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            if (busca) params.append('busca', busca);
            const res = await fetch(getApiUrl(`/api/alunos?${params.toString()}`));
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
        } finally {
            setLoading(false);
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
    }, [busca]);

    useEffect(() => {
        fetchCursos();
    }, []);

    async function handleSave(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);
        // Remover formatação antes de enviar
        const payload = { 
            nome, 
            email, 
            cpf: cpf.replace(/\D/g, ''), 
            telefone: telefone.replace(/\D/g, ''), 
            rg: rg ? rg.replace(/\D/g, '') : null 
        };

        try {
            if (editingId) {
                const res = await fetch(getApiUrl('/api/alunos'), { 
                    method: 'PUT', 
                    body: JSON.stringify({ id: editingId, ...payload }), 
                    headers: { 'Content-Type': 'application/json' } 
                });
                if (!res.ok) console.error('Erro ao atualizar aluno', await res.text());
            } else {
                const res = await fetch(getApiUrl('/api/alunos'), { 
                    method: 'POST', 
                    body: JSON.stringify(payload), 
                    headers: { 'Content-Type': 'application/json' } 
                });
                if (!res.ok) console.error('Erro ao criar aluno', await res.text());
            }
            handleCancelEdit();
            await fetchAlunos();
        } catch (err) { 
            console.error(err); 
        } finally {
            setSaving(false);
        }
    }

    function handleCancelEdit() {
        setEditingId(null);
        setNome('');
        setEmail('');
        setCpf('');
        setRg('');
        setTelefone('');
    }

    async function handleEdit(a: Aluno) {
        setEditingId(a.id);
        setNome(a.nome);
        setEmail(a.email);
        setCpf(a.cpf || '');
        setRg(a.rg || '');
        setTelefone(a.telefone || '');
    }

    function handleToggleCurso(cursoId: string) {
        if (selectedCursos.includes(cursoId)) {
            setSelectedCursos(selectedCursos.filter(id => id !== cursoId));
        } else {
            setSelectedCursos([...selectedCursos, cursoId]);
        }
    }

    async function handleSaveCursos() {
        if (!selectingCursosId) return;
        setSavingCursos(true);
        try {
            const res = await fetch('/api/alunos/cursos', {
                method: 'POST',
                body: JSON.stringify({ alunoId: selectingCursosId, cursoIds: selectedCursos }),
                headers: { 'Content-Type': 'application/json' }
            });
            if (!res.ok) console.error('Erro ao atualizar cursos do aluno', await res.text());
        } catch (err) { 
            console.error(err); 
        }
        setSelectingCursosId(null);
        setSelectedCursos([]);
        await fetchAlunos();
        setSavingCursos(false);
    }

    async function handleDelete(id: string) {
        if (!confirm('Tem certeza que deseja excluir este aluno?')) return;
        try {
            const res = await fetch(getApiUrl(`/api/alunos/${id}`), { method: 'DELETE' });
            if (!res.ok) console.error('Erro ao deletar aluno', await res.text());
            await fetchAlunos();
        } catch (err) { 
            console.error(err); 
        }
    }

    function handleSelectCursos(alunoId: string, cursos: any[]) {
        setSelectingCursosId(alunoId);
        // Pré-selecionar os cursos que o aluno já tem
        const cursosJaMatriculados = cursos.map(c => c.id) || [];
        setSelectedCursos(cursosJaMatriculados);
    }

    if (selectingCursosId) {
        return (
            <AuthGuard>
                <CursoSelector
                    cursos={cursos}
                    selectedCursos={selectedCursos}
                    savingCursos={savingCursos}
                    onToggleCurso={handleToggleCurso}
                    onSave={handleSaveCursos}
                    onCancel={() => setSelectingCursosId(null)}
                />
            </AuthGuard>
        );
    }

    return (
        <AuthGuard>
            <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50 dark:bg-black" style={{ marginLeft: 'var(--sidebar-width, 256px)' }}>
                <ManagementSidebar />
                <div className="px-6 py-8">
                    <div className="mx-auto max-w-6xl bg-white rounded-2xl shadow-lg p-8">
                        <PageHeader 
                            title="Gerenciar Alunos"
                        />
                        
                        <SearchBar
                            value={busca}
                            onChange={setBusca}
                            placeholder="🔍 Pesquisar por nome, e-mail ou CPF..."
                        />
                        
                        <AlunoForm
                            nome={nome}
                            email={email}
                            cpf={cpf}
                            rg={rg}
                            telefone={telefone}
                            editingId={editingId}
                            saving={saving}
                            onNomeChange={setNome}
                            onEmailChange={setEmail}
                            onCpfChange={setCpf}
                            onRgChange={setRg}
                            onTelefoneChange={setTelefone}
                            onSubmit={handleSave}
                            onCancel={handleCancelEdit}
                        />

                        {loading && <LoadingSpinner message="Buscando alunos..." />}
                        {!loading && alunos.length === 0 && <EmptyState message="Nenhum aluno encontrado." />}
                        {!loading && alunos.length > 0 && (
                            <AlunoList
                                alunos={alunos}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                onSelectCursos={handleSelectCursos}
                            />
                        )}
                    </div>
                </div>
            </div>
        </AuthGuard>
    );
}