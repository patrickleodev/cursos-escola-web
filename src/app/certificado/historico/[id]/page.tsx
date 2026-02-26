"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AuthGuard from "../../../components/AuthGuard";
import LoadingSpinner from "../../../components/LoadingSpinner";
import type { Aluno } from "../../../types";
import CertificadoPaginaExtra from "../../../components/certificado/CertificadoPaginaExtra";
import CertificadoGradeNotas from "../../../components/certificado/CertificadoGradeNotas";
import { certificadoStyles } from "../../../components/certificado/styles";

export default function HistoricoPage() {
  const { id } = useParams();
  const [aluno, setAluno] = useState<Aluno | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`/api/alunos/${id}`);
        if (!res.ok) throw new Error("Erro ao carregar aluno");
        const data = await res.json();
        setAluno(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao carregar aluno");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <AuthGuard><LoadingSpinner message="Carregando histórico..." /></AuthGuard>;
  if (error || !aluno) return (
    <AuthGuard>
      <div className="min-h-screen flex items-center justify-center">{error || 'Aluno não encontrado'}</div>
    </AuthGuard>
  );

  return (
    <AuthGuard>
      <style>{certificadoStyles}</style>
      <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50 dark:bg-black px-6 py-8">
        <div className="container mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h1 className="text-2xl font-semibold mb-4">Histórico / Disciplinas</h1>
            {aluno.matriculas?.map((matricula) => {
              let conteudoLinhas: string[] = [];
              if (matricula.curso.conteudo) {
                try {
                  const parsed = JSON.parse(matricula.curso.conteudo);
                  if (Array.isArray(parsed)) conteudoLinhas = parsed.map((i) => (typeof i === 'string' ? i : String(i))).filter(Boolean);
                  else if (typeof parsed === 'string') conteudoLinhas = parsed.split('\n').map((l: string) => l.trim()).filter(Boolean);
                  else conteudoLinhas = String(matricula.curso.conteudo).split('\n').map((l) => l.trim()).filter(Boolean);
                } catch {
                  conteudoLinhas = String(matricula.curso.conteudo).split('\n').map((l) => l.trim()).filter(Boolean);
                }
              }

              const rowsPerPage = 18;
              const gradePages: string[][] = [];
              for (let i = 0; i < conteudoLinhas.length; i += rowsPerPage) gradePages.push(conteudoLinhas.slice(i, i + rowsPerPage));
              if (gradePages.length === 0) gradePages.push([]);

              return (
                <div key={matricula.id} className="mb-8">
                  <h2 className="text-lg font-semibold">{matricula.curso.nome}</h2>
                  <CertificadoPaginaExtra
                    aluno={aluno}
                    cursoNome={matricula.curso.nome}
                    duracao={matricula.duracaoCustomizada ?? matricula.curso.duracao}
                    model={"vermelho" as any}
                    fontFamily={'"Inter", "Segoe UI", Arial, sans-serif'}
                    fontScale={1}
                  />

                  {gradePages.map((chunk, idx) => (
                    <CertificadoGradeNotas
                      key={`hist-grade-${matricula.id}-${idx}`}
                      aluno={aluno}
                      cursoNome={matricula.curso.nome}
                      disciplinas={chunk}
                      model={"vermelho" as any}
                      fontFamily={'"Inter", "Segoe UI", Arial, sans-serif'}
                      fontScale={1}
                      footerLabel={idx === gradePages.length - 1 ? 'Trabalho de Conclusão Final' : undefined}
                    />
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
