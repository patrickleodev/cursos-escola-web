"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthGuard from "../../components/AuthGuard";
import PageHeader from "../../components/PageHeader";
import SearchBar from "../../components/SearchBar";
import LoadingSpinner from "../../components/LoadingSpinner";
import EmptyState from "../../components/EmptyState";
import AfiliadaForm from "../../components/afiliadas/AfiliadaForm";
import AfiliadaList from "../../components/afiliadas/AfiliadaList";
import ManagementSidebar from "../../components/ManagementSidebar";
import { FaGlobe } from "react-icons/fa";

interface Afiliada {
    id: string;
    nome: string;
    foto?: string;
    whatsapp: string;
}

function getApiUrl(path: string) {
    return path;
}

export default function GerenciarAfiliadas() {
    const router = useRouter();
    const [afiliadas, setAfiliadas] = useState<Afiliada[]>([]);
    const [nome, setNome] = useState("");
    const [foto, setFoto] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    const [editingId, setEditingId] = useState<string | null>(null);
    const [busca, setBusca] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    async function fetchAfiliadas() {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            if (busca) params.append('busca', busca);
            const res = await fetch(getApiUrl(`/api/afiliadas?${params.toString()}`));
            const data = await res.json();
            if (Array.isArray(data)) {
                setAfiliadas(data);
            } else {
                console.error('Esperado array de afiliadas, recebido:', data);
                setAfiliadas([]);
            }
        } catch (err) {
            console.error('Erro ao buscar afiliadas:', err);
            setAfiliadas([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAfiliadas();
    }, [busca]);

    async function handleSave(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);
        const payload = { 
            nome, 
            foto: foto || undefined,
            whatsapp: whatsapp.replace(/\D/g, '') 
        };

        try {
            if (editingId) {
                const res = await fetch(getApiUrl('/api/afiliadas'), { 
                    method: 'PUT', 
                    body: JSON.stringify({ id: editingId, ...payload }), 
                    headers: { 'Content-Type': 'application/json' } 
                });
                if (!res.ok) console.error('Erro ao atualizar afiliada', await res.text());
            } else {
                const res = await fetch(getApiUrl('/api/afiliadas'), { 
                    method: 'POST', 
                    body: JSON.stringify(payload), 
                    headers: { 'Content-Type': 'application/json' } 
                });
                if (!res.ok) console.error('Erro ao criar afiliada', await res.text());
            }

            resetForm();
            await fetchAfiliadas();
        } catch (err) { 
            console.error(err); 
        } finally {
            setSaving(false);
        }
    }

    function resetForm() {
        setNome("");
        setFoto("");
        setWhatsapp("");
        setEditingId(null);
        // Limpar o input file
        const fileInput = document.getElementById('file-upload') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
    }

    function handleEdit(afiliada: Afiliada) {
        setNome(afiliada.nome);
        setFoto(afiliada.foto || "");
        setWhatsapp(afiliada.whatsapp);
        setEditingId(afiliada.id);
    }

    function processImageFile(file: File) {
        // Validar tipo de arquivo
        if (!file.type.startsWith('image/')) {
            alert('Por favor, selecione apenas arquivos de imagem');
            return;
        }

        // Validar tamanho (máximo 2MB)
        if (file.size > 2 * 1024 * 1024) {
            alert('A imagem deve ter no máximo 2MB');
            return;
        }

        // Converter para base64
        const reader = new FileReader();
        reader.onloadend = () => {
            setFoto(reader.result as string);
        };
        reader.readAsDataURL(file);
    }

    async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        processImageFile(file);
    }

    function handleDrag(e: React.DragEvent) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }

    function handleDrop(e: React.DragEvent) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            processImageFile(e.dataTransfer.files[0]);
        }
    }

    async function handleDelete(id: string) {
        if (!confirm('Tem certeza que deseja excluir esta afiliada?')) return;
        try {
            const res = await fetch(getApiUrl(`/api/afiliadas?id=${id}`), { method: 'DELETE' });
            if (!res.ok) console.error('Erro ao deletar afiliada', await res.text());
            await fetchAfiliadas();
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <AuthGuard>
            <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50 dark:bg-black" style={{ marginLeft: 'var(--sidebar-width, 256px)' }}>
                <ManagementSidebar />
                <div className="px-6 py-8">
                    <div className="mx-auto max-w-6xl bg-white rounded-2xl shadow-lg p-8">
                        <PageHeader 
                            title="Gerenciar Afiliadas"
                        />

                        <SearchBar
                            value={busca}
                            onChange={setBusca}
                            placeholder="🔍 Pesquisar por nome..."
                        />

                        <AfiliadaForm
                            nome={nome}
                            foto={foto}
                            whatsapp={whatsapp}
                            editingId={editingId}
                            saving={saving}
                            dragActive={dragActive}
                            onNomeChange={setNome}
                            onWhatsappChange={setWhatsapp}
                            onImageChange={handleImageChange}
                            onDrag={handleDrag}
                            onDrop={handleDrop}
                            onSubmit={handleSave}
                            onCancel={resetForm}
                        />

                        {loading && <LoadingSpinner message="Buscando afiliadas..." />}
                        {!loading && afiliadas.length === 0 && <EmptyState message="Nenhuma afiliada encontrada." />}
                        {!loading && afiliadas.length > 0 && (
                            <AfiliadaList
                                afiliadas={afiliadas}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        )}

                        <div className="mt-6 text-center">
                            <button 
                                onClick={() => router.push('/afiliadas')} 
                                className="rounded-full bg-gradient-to-r from-purple-500 to-purple-700 text-white px-6 py-3 font-medium hover:shadow-lg transition cursor-pointer flex items-center gap-2 mx-auto"
                            >
                                <FaGlobe /> Ver Página Afiliadas
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthGuard>
    );
}