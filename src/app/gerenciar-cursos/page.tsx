"use client";

import React, { useEffect, useState } from "react";
import AuthGuard from "../../components/AuthGuard";
import PageHeader from "../../components/PageHeader";
import LoadingSpinner from "../../components/LoadingSpinner";
import EmptyState from "../../components/EmptyState";
import FilterBar from "../../components/cursos/FilterBar";
import CursoForm from "../../components/cursos/CursoForm";
import CursoList from "../../components/cursos/CursoList";
import { CATEGORIAS } from "../../lib/constants";

type Curso = {
  id: string;
  nome: string;
  duracao: number;
  categoria?: string;
  conteudo?: string;
};

export default function GerenciarCursos() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [nome, setNome] = useState("");
  const [duracao, setDuracao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [conteudo, setConteudo] = useState("");
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
      } else {
        const res = await fetch("/api/cursos", {
          method: "POST",
          body: JSON.stringify(payload),
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) console.error("Erro ao criar curso", await res.text());
      }
      handleCancelEdit();
      await fetchCursos();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  function handleCancelEdit() {
    setNome("");
    setDuracao("");
    setCategoria("");
    setConteudo("");
    setEditingId(null);
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

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50 dark:bg-black px-6 py-8">
        <div className="mx-auto max-w-6xl bg-white rounded-2xl shadow-lg p-8">
          <PageHeader 
            title="Gerenciar Cursos"
            showGerenciarAlunos
            showGerenciarAfiliadas
          />

          <FilterBar
            busca={busca}
            onBuscaChange={setBusca}
            filtroCategoria={filtroCategoria}
            onFiltroCategoriaChange={setFiltroCategoria}
            categorias={CATEGORIAS}
          />

          <CursoForm
            nome={nome}
            duracao={duracao}
            categoria={categoria}
            conteudo={conteudo}
            editingId={editingId}
            saving={saving}
            categorias={CATEGORIAS}
            onNomeChange={setNome}
            onDuracaoChange={setDuracao}
            onCategoriaChange={setCategoria}
            onConteudoChange={setConteudo}
            onSubmit={handleSave}
            onCancel={handleCancelEdit}
          />

          {loading && <LoadingSpinner message="Buscando cursos..." />}
          {!loading && cursos.length === 0 && <EmptyState message="Nenhum curso encontrado." />}
          {!loading && cursos.length > 0 && (
            <CursoList
              cursos={cursos}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </AuthGuard>
  );
}

