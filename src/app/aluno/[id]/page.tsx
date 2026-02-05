"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AuthGuard from "../../../components/AuthGuard";

type Curso = {
  id: string;
  nome: string;
  duracao: number;
};

type Aluno = { 
  id: string; 
  nome: string; 
  email: string; 
  cpf?: string; 
  rg?: string; 
  telefone?: string;
  criadoEm?: string;
  atualizadoEm?: string;
  cursos?: Curso[];
};

export default function AlunoDetalhes() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  const [aluno, setAluno] = useState<Aluno | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAluno() {
      try {
        setLoading(true);
        const res = await fetch(`/api/alunos/${id}`);
        if (!res.ok) {
          throw new Error('Aluno não encontrado');
        }
        const data = await res.json();
        setAluno(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao buscar aluno');
        setAluno(null);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchAluno();
    }
  }, [id]);

  function handleVoltar() {
    router.push('/gerenciar-alunos');
  }

  if (loading) {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50 dark:bg-black px-6 py-8 flex items-center justify-center">
          <div className="text-center">
            <div className="text-lg text-stone-600">Carregando...</div>
          </div>
        </div>
      </AuthGuard>
    );
  }

  if (error || !aluno) {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50 dark:bg-black px-6 py-8">
          <div className="mx-auto max-w-2xl bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center">
              <div className="text-red-600 mb-6 text-lg font-medium">{error || 'Aluno não encontrado'}</div>
              <button
                onClick={handleVoltar}
                className="rounded-full bg-gradient-to-r from-amber-400 to-orange-400 text-white px-6 py-3 font-medium hover:shadow-lg transition"
              >
                Voltar para Gerenciamento
              </button>
            </div>
          </div>
        </div>
      </AuthGuard>
    );
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const totalHoras = aluno.cursos?.reduce((acc, curso) => acc + curso.duracao, 0) || 0;

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50 dark:bg-black px-6 py-8">
        <div className="mx-auto max-w-2xl bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-semibold text-stone-800">Detalhes do Aluno</h1>
            <button
              onClick={handleVoltar}
              className="rounded-full border border-stone-300 text-stone-700 px-6 py-3 hover:bg-stone-100 transition font-medium"
            >
              Voltar
            </button>
          </div>

          <div className="space-y-4 mb-8">
            <div className="border-b border-stone-200 pb-4">
              <label className="block text-sm font-semibold text-stone-700">Nome</label>
              <div className="mt-2 text-lg text-stone-800">{aluno.nome}</div>
            </div>

            <div className="border-b border-stone-200 pb-4">
              <label className="block text-sm font-semibold text-stone-700">Email</label>
              <div className="mt-2 text-lg text-stone-800">{aluno.email}</div>
            </div>

            <div className="border-b border-stone-200 pb-4">
              <label className="block text-sm font-semibold text-stone-700">Telefone</label>
              <div className="mt-2 text-lg text-stone-800">{aluno.telefone || '-'}</div>
            </div>

            <div className="border-b border-stone-200 pb-4">
              <label className="block text-sm font-semibold text-stone-700">CPF</label>
              <div className="mt-2 text-lg text-stone-800">{aluno.cpf || '-'}</div>
            </div>
          </div>

          {/* Seção de Cursos */}
          <div className="bg-gradient-to-br from-amber-50 to-stone-50 rounded-xl p-6 border border-stone-200">
            <h2 className="text-xl font-semibold text-stone-800 mb-4">Cursos Realizados</h2>
            
            {aluno.cursos && aluno.cursos.length > 0 ? (
              <div className="space-y-3">
                {aluno.cursos.map((curso) => (
                  <div key={curso.id} className="bg-white rounded-lg p-4 border border-stone-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold text-stone-800">{curso.nome}</div>
                        <div className="text-sm text-stone-600">{curso.duracao} horas</div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="bg-white rounded-lg p-4 border-2 border-amber-200 mt-4">
                  <div className="font-semibold text-stone-800">
                    Total de horas: <span className="text-amber-600">{totalHoras} horas</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-stone-600">
                <p>Nenhum curso assignado ainda.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
