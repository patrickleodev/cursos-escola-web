"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import PinProtection from "../../../components/aluno/PinProtection";
import AlunoInfo from "../../../components/aluno/AlunoInfo";
import CursosSection from "../../../components/aluno/CursosSection";
import type { Aluno } from "../../../types";

export default function AlunoDetalhes() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  const [aluno, setAluno] = useState<Aluno | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [unlocked, setUnlocked] = useState(false);

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
      <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50 dark:bg-black px-6 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg text-stone-600">Carregando...</div>
        </div>
      </div>
    );
  }

  if (error || !aluno) {
    return (
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
    );
  }

  const sanitizedCpf = (aluno?.cpf || '').replace(/\D/g, '');
  const firstThreeCpf = sanitizedCpf.slice(0, 3);

  if (!unlocked) {
    return (
      <PinProtection 
        expectedPin={firstThreeCpf}
        onUnlock={() => setUnlocked(true)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50 dark:bg-black px-6 py-8">
      <div className="mx-auto max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-stone-800 mb-8">Detalhes do Aluno</h1>

        <AlunoInfo aluno={aluno} />
        
        <CursosSection cursos={aluno.cursos} />
      </div>
    </div>
  );
}
