"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import QRCode from "qrcode";
import AuthGuard from "../../../components/AuthGuard";
import type { Aluno } from "../../../types";
import ActionButtons from "../../../components/certificado/ActionButtons";
import CertificadoFrente from "../../../components/certificado/CertificadoFrente";
import CertificadoVerso from "../../../components/certificado/CertificadoVerso";
import CursoEditForm from "../../../components/certificado/CursoEditForm";
import { certificadoStyles } from "../../../components/certificado/styles";

export default function Certificado() {
  const { id } = useParams();
  const router = useRouter();
  const [aluno, setAluno] = useState<Aluno | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadAluno = async () => {
      try {
        const res = await fetch(`/api/alunos/${id}`);
        if (!res.ok) throw new Error("Erro ao carregar aluno");
        const data = await res.json();
        setAluno(data);

        // Gerar QR Code
        const qrData = `${process.env.NEXT_PUBLIC_BASE_URL || window.location.origin}/aluno/${id}`;
        const qr = await QRCode.toDataURL(qrData);
        setQrCodeUrl(qr);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao carregar aluno");
      } finally {
        setLoading(false);
      }
    };

    loadAluno();
  }, [id]);

  function handleVoltar() {
    router.push("/gerenciar-alunos");
  }

  function handlePrint() {
    window.print();
  }

  async function saveDates(matriculaId: string, dates: { dataInicio: string; dataFim: string }) {
    try {
      setSaving(true);
      const res = await fetch(`/api/matriculas/${matriculaId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dates),
      });

      if (!res.ok) {
        throw new Error("Erro ao atualizar datas");
      }

      if (aluno && aluno.matriculas) {
        const updatedMatriculas = aluno.matriculas.map((m) =>
          m.id === matriculaId
            ? { ...m, dataInicio: dates.dataInicio, dataFim: dates.dataFim }
            : m
        );
        setAluno({ ...aluno, matriculas: updatedMatriculas });
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erro ao salvar datas");
    } finally {
      setSaving(false);
    }
  }

  async function saveDuracao(matriculaId: string, duracao: number) {
    try {
      setSaving(true);
      const res = await fetch(`/api/matriculas/${matriculaId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ duracaoCustomizada: duracao }),
      });

      if (!res.ok) {
        throw new Error("Erro ao atualizar duração");
      }

      if (aluno && aluno.matriculas) {
        const updatedMatriculas = aluno.matriculas.map((m) =>
          m.id === matriculaId
            ? { ...m, duracaoCustomizada: duracao }
            : m
        );
        setAluno({ ...aluno, matriculas: updatedMatriculas });
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erro ao salvar duração");
    } finally {
      setSaving(false);
    }
  }

  async function removeCurso(matriculaId: string) {
    if (!confirm("Tem certeza que deseja remover este curso do aluno?")) {
      return;
    }

    try {
      setSaving(true);
      const res = await fetch(`/api/matriculas/${matriculaId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Erro ao remover curso");
      }

      if (aluno && aluno.matriculas) {
        const updatedMatriculas = aluno.matriculas.filter((m) => m.id !== matriculaId);
        setAluno({ ...aluno, matriculas: updatedMatriculas });
      }

      alert("Curso removido com sucesso!");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erro ao remover curso");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50 dark:bg-black px-6 py-8 flex items-center justify-center">
          <div className="text-center">
            <div className="text-lg text-stone-600">Gerando certificado...</div>
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
              <div className="text-red-600 mb-6 text-lg font-medium">
                {error || "Aluno não encontrado"}
              </div>
              <button
                onClick={handleVoltar}
                className="rounded-full bg-gradient-to-r from-amber-400 to-orange-400 text-white px-6 py-3 font-medium hover:shadow-lg transition"
              >
                Voltar
              </button>
            </div>
          </div>
        </div>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <style>{certificadoStyles}</style>
      <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50 dark:bg-black px-6 py-8">
        <div className="container mx-auto">
          <ActionButtons onPrint={handlePrint} onBack={handleVoltar} />

          {/* Certificados - um para cada curso */}
          {aluno.matriculas && aluno.matriculas.length > 0 ? (
            aluno.matriculas.map((matricula, index) => {
              const duracaoFinal = matricula.duracaoCustomizada ?? matricula.curso.duracao;
              const dataInicio = new Date(matricula.dataInicio).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
              const dataFim = new Date(matricula.dataFim).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
              
              // Dividir conteúdo em chunks para paginação (39 itens por página em 3 colunas)
              const conteudoLinhas = matricula.curso.conteudo 
                ? matricula.curso.conteudo.split('\n').filter(line => line.trim())
                : [];
              const linhasPorPagina = 39;
              const conteudoPages: string[][] = [];
              for (let i = 0; i < conteudoLinhas.length; i += linhasPorPagina) {
                conteudoPages.push(conteudoLinhas.slice(i, i + linhasPorPagina));
              }
              // Se não houver conteúdo, criar uma página vazia
              if (conteudoPages.length === 0) {
                conteudoPages.push([]);
              }
              
              return (
                <React.Fragment key={matricula.id}>
                  {/* Frente do Certificado */}
                  <CertificadoFrente
                    aluno={aluno}
                    cursoNome={matricula.curso.nome}
                    duracao={duracaoFinal}
                    dataInicio={dataInicio}
                    dataFim={dataFim}
                    qrCodeUrl={qrCodeUrl}
                    isFirstCertificate={index === 0}
                  />

                  {/* Verso do Certificado - uma ou mais páginas de conteúdo */}
                  {conteudoPages.map((linhas, pageIdx) => (
                    <CertificadoVerso key={`conteudo-${pageIdx}`} linhas={linhas} />
                  ))}
                </React.Fragment>
              );
            })
          ) : (
            <div className="certificado-print relative bg-white mx-auto">
              <div className="flex items-center justify-center h-full">
                <p className="text-xl text-stone-500">Nenhum curso encontrado para este aluno</p>
              </div>
            </div>
          )}

          {/* Seção de edição de cursos - visível apenas na tela */}
          {aluno.matriculas && aluno.matriculas.length > 0 && (
            <div className="mt-8 print:hidden" style={{ maxWidth: '297mm', margin: '2rem auto 0' }}>
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-stone-800 mb-6">Editar Certificado</h2>
                {aluno.matriculas.map((matricula) => (
                  <CursoEditForm
                    key={matricula.id}
                    matricula={matricula}
                    onSaveDates={saveDates}
                    onSaveDuracao={saveDuracao}
                    onRemove={removeCurso}
                    saving={saving}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  );
}
