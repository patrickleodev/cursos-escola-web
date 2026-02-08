"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IMaskInput } from "react-imask";
import AuthGuard from "../../components/AuthGuard";
import { FaSave, FaTimes, FaEdit, FaTrash, FaUsers, FaBook, FaSignOutAlt, FaGlobe } from "react-icons/fa";

interface Afiliada {
    id: string;
    nome: string;
    foto?: string;
    whatsapp: string;
}

function getApiUrl(path: string) {
    return path;
}

function formatWhatsAppDisplay(whatsapp: string) {
    const numbers = whatsapp.replace(/\D/g, '');
    if (numbers.length === 11) {
        return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
    }
    if (numbers.length === 10) {
        return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6, 10)}`;
    }
    return whatsapp;
}

export default function GerenciarAfiliadas() {
    const router = useRouter();
    const [afiliadas, setAfiliadas] = useState<Afiliada[]>([]);
    const [nome, setNome] = useState("");
    const [foto, setFoto] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    const [userEmail, setUserEmail] = useState("");
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
        setUserEmail(localStorage.getItem("user_email") || "");
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

    function handleLogout() {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user_email");
        location.href = "/login";
    }

    return (
        <AuthGuard>
            <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50 dark:bg-black px-6 py-8">
                <div className="mx-auto max-w-6xl bg-white rounded-2xl shadow-lg p-8">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-3xl font-semibold text-stone-800">Gerenciar Afiliadas</h1>
                        <div className="flex gap-3 items-center">
                            <button onClick={() => router.push('/gerenciar-alunos')} className="rounded-full border border-stone-300 text-stone-700 px-4 py-2 hover:bg-stone-100 transition text-sm cursor-pointer flex items-center gap-2"><FaUsers /> Gerenciar Alunos</button>
                            <button onClick={() => router.push('/gerenciar-cursos')} className="rounded-full border border-stone-300 text-stone-700 px-4 py-2 hover:bg-stone-100 transition text-sm cursor-pointer flex items-center gap-2"><FaBook /> Gerenciar Cursos</button>
                            <button onClick={handleLogout} className="rounded-full border border-stone-300 text-stone-700 px-4 py-2 hover:bg-stone-100 transition cursor-pointer flex items-center gap-2"><FaSignOutAlt /> Sair</button>
                        </div>
                    </div>

                    {/* Campo de busca */}
                    <div className="mb-6">
                        <input
                            placeholder="🔍 Pesquisar por nome..."
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                            className="w-full rounded-lg border border-stone-300 px-4 py-3 text-stone-800 placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-400 bg-stone-100"
                        />
                    </div>

                    <form onSubmit={handleSave} className="mb-8 grid gap-3 sm:grid-cols-3 bg-gradient-to-br from-amber-50 to-stone-50 p-6 rounded-xl">
                        <input 
                            placeholder="Nome" 
                            value={nome} 
                            onChange={(e) => setNome(e.target.value)} 
                            required
                            disabled={saving}
                            className="rounded-lg border border-stone-300 px-4 py-3 text-stone-800 placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:opacity-50" 
                        />
                        <div className="relative">
                            <input 
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                disabled={saving}
                                className="hidden"
                                id="file-upload"
                            />
                            <label 
                                htmlFor="file-upload"
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                                className={`rounded-lg border-2 border-dashed px-4 py-3 text-stone-800 w-full cursor-pointer transition flex items-center gap-2 ${
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
                            onAccept={(value) => setWhatsapp(value)} 
                            required
                            disabled={saving}
                            className="rounded-lg border border-stone-300 px-4 py-3 text-stone-800 placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:opacity-50" 
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
                            <button disabled={saving} className="rounded-full bg-gradient-to-r from-amber-400 to-orange-400 text-white px-6 py-3 font-medium hover:shadow-lg transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"><FaSave /> {saving ? 'Salvando...' : (editingId ? 'Salvar' : 'Criar')}</button>
                            {editingId && <button type="button" onClick={resetForm} disabled={saving} className="rounded-full border border-stone-300 text-stone-700 px-6 py-3 hover:bg-stone-100 transition cursor-pointer disabled:opacity-50 flex items-center gap-2"><FaTimes /> Cancelar</button>}
                        </div>
                    </form>

                    <div className="grid gap-4">
                        {loading && <div className="text-center py-8 text-amber-600 font-medium">Buscando afiliadas...</div>}
                        {!loading && afiliadas.length === 0 && <div className="text-center py-8 text-stone-500">Nenhuma afiliada encontrada.</div>}
                        {!loading && afiliadas.map((afiliada) => (
                            <div key={afiliada.id} className="flex items-center justify-between bg-gradient-to-r from-stone-50 to-amber-50 rounded-xl border border-stone-200 p-5 hover:shadow-md transition">
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
                                        <div className="text-sm text-stone-600">WhatsApp: {formatWhatsAppDisplay(afiliada.whatsapp)}</div>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <button onClick={() => handleEdit(afiliada)} className="rounded-full border border-stone-300 text-stone-700 px-4 py-2 text-sm hover:bg-stone-100 transition cursor-pointer flex items-center gap-2"><FaEdit /> Editar</button>
                                    <button onClick={() => handleDelete(afiliada.id)} className="rounded-full border border-red-300 text-red-600 px-4 py-2 text-sm hover:bg-red-50 transition cursor-pointer flex items-center gap-2"><FaTrash /> Excluir</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 text-center">
                        <button onClick={() => router.push('/afiliadas')} className="rounded-full bg-gradient-to-r from-purple-500 to-purple-700 text-white px-6 py-3 font-medium hover:shadow-lg transition cursor-pointer flex items-center gap-2 mx-auto">
                            <FaGlobe /> Ver Página Afiliadas
                        </button>
                    </div>
                </div>
            </div>
        </AuthGuard>
    );
}
