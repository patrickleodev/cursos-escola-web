"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthGuard from "../../components/AuthGuard";
import { FaSave, FaTimes, FaEdit, FaTrash, FaUsers, FaBook, FaSignOutAlt } from "react-icons/fa";

const CATEGORIAS = [
  'Educação',
  'Educação Especial',
  'Estética',
  'Direito',
  'Administração',
  'Enfermagem',
  'Massagem',
  'Psicologia',
  'Engenharia',
  'Nutrição',
  'Segurança',
  'Manicure/Pedicure',
  'Cosmetologia',
  'Terapia Holística',
  'Serviços Gerais',
  'Motorista',
  'Cuidador de Idosos',
  'Setor Imobiliário',
  'Informática',
  'Idiomas',
  'VENDAS',
  'ESPECIALIZAÇÃO TÉCNICA',
];

type Curso = {
  id: string;
  nome: string;
  duracao: number;
  categoria?: string;
  conteudo?: string;
};

export default function GerenciarCursos() {
  const router = useRouter();
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [nome, setNome] = useState("");
  const [duracao, setDuracao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [busca, setBusca] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("todas");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function fetchCursos() {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (busca) params.append('busca', busca);
      if (filtroCategoria !== 'todas') params.append('categoria', filtroCategoria);
      
      const res = await fetch(`/api/cursos?${params.toString()}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setCursos(data);
      } else {
        console.error("Esperado array de cursos, recebido:", data);
        setCursos([]);
      }
    } catch (err) {
      console.error("Erro ao buscar cursos:", err);
      setCursos([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCursos();
    setUserEmail(localStorage.getItem("user_email") || "");
  }, [busca, filtroCategoria]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const payload = { nome, duracao: parseInt(duracao), categoria, conteudo };

    try {
      if (editingId) {
        const res = await fetch("/api/cursos", {
          method: "PUT",
          body: JSON.stringify({ id: editingId, ...payload }),
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) console.error("Erro ao atualizar curso", await res.text());
        setEditingId(null);
      } else {
        const res = await fetch("/api/cursos", {
          method: "POST",
          body: JSON.stringify(payload),
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) console.error("Erro ao criar curso", await res.text());
      }
      setNome("");
      setDuracao("");
      setCategoria("");
      setConteudo("");
      await fetchCursos();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  async function handleEdit(c: Curso) {
    setEditingId(c.id);
    setNome(c.nome);
    setDuracao(c.duracao.toString());
    setCategoria(c.categoria || "");
    setConteudo(c.conteudo || "");
  }

  async function handleDelete(id: string) {
    if (!confirm("Excluir este curso?")) return;
    try {
      const res = await fetch("/api/cursos", {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) console.error("Erro ao excluir curso", await res.text());
    } catch (err) {
      console.error(err);
    }
    fetchCursos();
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
            <h1 className="text-3xl font-semibold text-stone-800">
              Gerenciar Cursos
            </h1>
            <div className="flex gap-3 items-center">
              <button onClick={() => router.push('/gerenciar-alunos')} className="rounded-full border border-stone-300 text-stone-700 px-4 py-2 hover:bg-stone-100 transition text-sm cursor-pointer flex items-center gap-2"><FaUsers /> Gerenciar Alunos</button>
              <button onClick={() => router.push('/gerenciar-afiliadas')} className="rounded-full border border-stone-300 text-stone-700 px-4 py-2 hover:bg-stone-100 transition text-sm cursor-pointer flex items-center gap-2"><FaUsers /> Gerenciar Afiliadas</button>
              <button
                onClick={handleLogout}
                className="rounded-full border border-stone-300 text-stone-700 px-4 py-2 hover:bg-stone-100 transition cursor-pointer flex items-center gap-2"
              >
                <FaSignOutAlt />
                Sair
              </button>
            </div>
          </div>

          {/* Campos de busca e filtro */}
          <div className="mb-6 grid gap-3 sm:grid-cols-2 bg-stone-100 p-4 rounded-xl">
            <input
              placeholder="🔍 Pesquisar por nome do curso..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="rounded-lg border border-stone-300 px-4 py-3 text-stone-800 placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <select
              value={filtroCategoria}
              onChange={(e) => setFiltroCategoria(e.target.value)}
              className="rounded-lg border border-stone-300 px-4 py-3 text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <option value="todas">Todas as categorias</option>
              {CATEGORIAS.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <form
            onSubmit={handleSave}
            className="mb-8 bg-gradient-to-br from-amber-50 to-stone-50 p-6 rounded-xl space-y-4"
          >
            <div className="grid gap-3 sm:grid-cols-3">
              <input
                placeholder="Nome do Curso"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                disabled={saving}
                className="rounded-lg border border-stone-300 px-4 py-3 text-stone-800 placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:opacity-50"
              />
              <input
                placeholder="Duração (horas)"
                type="number"
                value={duracao}
                onChange={(e) => setDuracao(e.target.value)}
                disabled={saving}
                className="rounded-lg border border-stone-300 px-4 py-3 text-stone-800 placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:opacity-50"
              />
              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                disabled={saving}
                className="rounded-lg border border-stone-300 px-4 py-3 text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:opacity-50"
              >
                <option value="">Selecione categoria</option>
                {CATEGORIAS.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <textarea
              placeholder="Conteúdo do curso (um tópico por linha, ex: desenvolvimento de canva, aplicação de pacote office, etc.)"
              value={conteudo}
              onChange={(e) => setConteudo(e.target.value)}
              disabled={saving}
              rows={4}
              className="w-full rounded-lg border border-stone-300 px-4 py-3 text-stone-800 placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:opacity-50 resize-none"
            />
            <div className="flex gap-3">
              <button disabled={saving} className="rounded-full bg-gradient-to-r from-amber-400 to-orange-400 text-white px-6 py-3 font-medium hover:shadow-lg transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                <FaSave /> {saving ? "Salvando..." : (editingId ? "Salvar" : "Criar")}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setNome("");
                    setDuracao("");
                    setCategoria("");
                    setConteudo("");
                  }}
                  disabled={saving}
                  className="rounded-full border border-stone-300 text-stone-700 px-6 py-3 hover:bg-stone-100 transition cursor-pointer disabled:opacity-50 flex items-center gap-2"
                >
                  <FaTimes />
                  Cancelar
                </button>
              )}
            </div>
          </form>

          <div className="grid gap-4">
            {loading && <div className="text-center py-8 text-amber-600 font-medium">Buscando cursos...</div>}
            {!loading && cursos.length === 0 && (
              <div className="text-center py-8 text-stone-500">
                Nenhum curso encontrado.
              </div>
            )}
            {!loading && cursos.map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between bg-gradient-to-r from-stone-50 to-amber-50 rounded-xl border border-stone-200 p-5 hover:shadow-md transition"
              >
                <div>
                  <div className="font-semibold text-stone-800">{c.nome}</div>
                  <div className="text-sm text-stone-600">
                    Duração: {c.duracao} horas
                  </div>
                  {c.categoria && (
                    <div className="text-xs text-amber-700 bg-amber-100 rounded-full px-3 py-1 inline-block mt-1">
                      {c.categoria}
                    </div>
                  )}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(c)}
                    className="rounded-full border border-stone-300 text-stone-700 px-4 py-2 text-sm hover:bg-stone-100 transition cursor-pointer flex items-center gap-2"
                  >
                    <FaEdit /> Editar
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="rounded-full border border-red-300 text-red-600 px-4 py-2 text-sm hover:bg-red-50 transition cursor-pointer flex items-center gap-2"
                  >
                    <FaTrash />
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
