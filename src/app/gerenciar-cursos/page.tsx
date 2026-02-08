"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthGuard from "../../components/AuthGuard";

const CATEGORIAS = [
  'Educação',
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
];

type Curso = {
  id: string;
  nome: string;
  duracao: number;
  categoria?: string;
};

export default function GerenciarCursos() {
  const router = useRouter();
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [nome, setNome] = useState("");
  const [duracao, setDuracao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [busca, setBusca] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("todas");

  async function fetchCursos() {
    try {
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
    }
  }

  useEffect(() => {
    fetchCursos();
    setUserEmail(localStorage.getItem("user_email") || "");
  }, [busca, filtroCategoria]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const payload = { nome, duracao: parseInt(duracao), categoria };

    if (editingId) {
      try {
        const res = await fetch("/api/cursos", {
          method: "PUT",
          body: JSON.stringify({ id: editingId, ...payload }),
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) console.error("Erro ao atualizar curso", await res.text());
      } catch (err) {
        console.error(err);
      }
      setEditingId(null);
    } else {
      try {
        const res = await fetch("/api/cursos", {
          method: "POST",
          body: JSON.stringify(payload),
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) console.error("Erro ao criar curso", await res.text());
      } catch (err) {
        console.error(err);
      }
    }
    setNome("");
    setDuracao("");
    setCategoria("");
    fetchCursos();
  }

  async function handleEdit(c: Curso) {
    setEditingId(c.id);
    setNome(c.nome);
    setDuracao(c.duracao.toString());
    setCategoria(c.categoria || "");
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
        <div className="mx-auto max-w-4xl bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-semibold text-stone-800">
              Gerenciar Cursos
            </h1>
            <div className="flex gap-3 items-center">
              <div className="text-sm text-stone-600">{userEmail}</div>
              <button
                onClick={handleLogout}
                className="rounded-full border border-stone-300 text-stone-700 px-4 py-2 hover:bg-stone-100 transition"
              >
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
            className="mb-8 grid gap-3 sm:grid-cols-4 bg-gradient-to-br from-amber-50 to-stone-50 p-6 rounded-xl"
          >
            <input
              placeholder="Nome do Curso"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="rounded-lg border border-stone-300 px-4 py-3 text-stone-800 placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <input
              placeholder="Duração (horas)"
              type="number"
              value={duracao}
              onChange={(e) => setDuracao(e.target.value)}
              className="rounded-lg border border-stone-300 px-4 py-3 text-stone-800 placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="rounded-lg border border-stone-300 px-4 py-3 text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <option value="">Selecione categoria</option>
              {CATEGORIAS.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <div className="flex gap-3">
              <button className="rounded-full bg-gradient-to-r from-amber-400 to-orange-400 text-white px-6 py-3 font-medium hover:shadow-lg transition">
                {editingId ? "Salvar" : "Criar"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setNome("");
                    setDuracao("");
                    setCategoria("");
                  }}
                  className="rounded-full border border-stone-300 text-stone-700 px-6 py-3 hover:bg-stone-100 transition"
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>

          <div className="grid gap-4">
            {cursos.length === 0 && (
              <div className="text-center py-8 text-stone-500">
                Nenhum curso encontrado.
              </div>
            )}
            {cursos.map((c) => (
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
                    className="rounded-full border border-stone-300 text-stone-700 px-4 py-2 text-sm hover:bg-stone-100 transition"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="rounded-full border border-red-300 text-red-600 px-4 py-2 text-sm hover:bg-red-50 transition"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-stone-200">
            <button
              onClick={() => router.push("/gerenciar-alunos")}
              className="rounded-full border border-stone-300 text-stone-700 px-6 py-3 hover:bg-stone-100 transition font-medium"
            >
              ← Voltar para Alunos
            </button>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
