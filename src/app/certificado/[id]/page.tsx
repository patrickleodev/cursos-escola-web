"use client";

import React, { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import QRCode from "qrcode";
import AuthGuard from "../../../components/AuthGuard";

type Curso = {
  id: string;
  nome: string;
  duracao: number;
};

type Matricula = {
  id: string;
  dataInicio: string;
  dataFim: string;
  duracaoCustomizada?: number;
  curso: Curso;
};

type Aluno = {
  id: string;
  nome: string;
  email: string;
  telefone?: string;
  cpf?: string;
  rg?: string;
  criadoEm?: string;
  atualizadoEm?: string;
  matriculas?: Matricula[];
};

export default function Certificado() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [aluno, setAluno] = useState<Aluno | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingDuracao, setEditingDuracao] = useState<string | null>(null);
  const [editDates, setEditDates] = useState<Record<string, { dataInicio: string; dataFim: string }>>({});
  const [editDuracoes, setEditDuracoes] = useState<Record<string, number>>({});
  const [saving, setSaving] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchAluno() {
      try {
        setLoading(true);
        const res = await fetch(`/api/alunos/${id}`);
        if (!res.ok) {
          throw new Error("Aluno não encontrado");
        }
        const data = await res.json();
        setAluno(data);

        // Gerar QR Code para a página do aluno
        const qrUrl = await QRCode.toDataURL(
          `${window.location.origin}/aluno/${id}`
        );
        setQrCodeUrl(qrUrl);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Erro ao buscar aluno"
        );
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
    router.push("/gerenciar-alunos");
  }

  function handlePrint() {
    window.print();
  }

  function startEditing(matriculaId: string, dataInicio: string, dataFim: string) {
    setEditingId(matriculaId);
    setEditDates({
      ...editDates,
      [matriculaId]: {
        dataInicio: dataInicio.split("T")[0],
        dataFim: dataFim.split("T")[0],
      },
    });
  }

  async function saveDates(matriculaId: string) {
    try {
      setSaving(true);
      const dates = editDates[matriculaId];
      const res = await fetch(`/api/matriculas/${matriculaId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dates),
      });

      if (!res.ok) {
        throw new Error("Erro ao atualizar datas");
      }

      // Atualizar o estado do aluno
      if (aluno && aluno.matriculas) {
        const updatedMatriculas = aluno.matriculas.map((m) =>
          m.id === matriculaId
            ? { ...m, dataInicio: dates.dataInicio, dataFim: dates.dataFim }
            : m
        );
        setAluno({ ...aluno, matriculas: updatedMatriculas });
      }

      setEditingId(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erro ao salvar datas");
    } finally {
      setSaving(false);
    }
  }

  function startEditingDuracao(matriculaId: string, duracao: number) {
    setEditingDuracao(matriculaId);
    setEditDuracoes({
      ...editDuracoes,
      [matriculaId]: duracao,
    });
  }

  async function saveDuracao(matriculaId: string) {
    try {
      setSaving(true);
      const duracao = editDuracoes[matriculaId];
      const res = await fetch(`/api/matriculas/${matriculaId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ duracaoCustomizada: duracao }),
      });

      if (!res.ok) {
        throw new Error("Erro ao atualizar duração");
      }

      // Atualizar o estado do aluno
      if (aluno && aluno.matriculas) {
        const updatedMatriculas = aluno.matriculas.map((m) =>
          m.id === matriculaId
            ? { ...m, duracaoCustomizada: duracao }
            : m
        );
        setAluno({ ...aluno, matriculas: updatedMatriculas });
      }

      setEditingDuracao(null);
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

      // Atualizar o estado do aluno removendo a matrícula
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
      <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50 dark:bg-black px-6 py-8">
        <div className="mx-auto max-w-4xl">
          {/* Botões de ação */}
          <div className="flex gap-3 mb-6 print:hidden">
            <button
              onClick={handlePrint}
              className="rounded-full bg-gradient-to-r from-blue-400 to-blue-600 text-white px-6 py-3 font-medium hover:shadow-lg transition"
            >
              Imprimir / Salvar como PDF
            </button>
            <button
              onClick={handleVoltar}
              className="rounded-full border border-stone-300 text-stone-700 px-6 py-3 hover:bg-stone-100 transition font-medium"
            >
              Voltar
            </button>
          </div>

          {/* Certificado */}
          <div
            ref={certificateRef}
            className="bg-gradient-to-br from-amber-50 via-stone-50 to-amber-100 rounded-2xl shadow-2xl p-12 max-w-3xl mx-auto"
          >
            {/* Bordas decorativas */}
            <div className="absolute top-6 left-6 w-12 h-12 border-l-4 border-t-4 border-amber-400 rounded-sm"></div>
            <div className="absolute top-6 right-6 w-12 h-12 border-r-4 border-t-4 border-amber-400 rounded-sm"></div>
            <div className="absolute bottom-6 left-6 w-12 h-12 border-l-4 border-b-4 border-amber-400 rounded-sm"></div>
            <div className="absolute bottom-6 right-6 w-12 h-12 border-r-4 border-b-4 border-amber-400 rounded-sm"></div>

            {/* Cabeçalho */}
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold text-amber-900 mb-2">
                CERTIFICADO
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-400 mx-auto"></div>
            </div>

            {/* Conteúdo */}
            <div className="text-center mb-12">
              <p className="text-stone-700 text-lg mb-6">Certificamos que</p>
              <p className="text-3xl font-bold text-amber-900 mb-8">
                {aluno.nome}
              </p>
              <p className="text-stone-700 text-lg mb-2">
                Com CPF: <span className="font-semibold">{aluno.cpf || "-"}</span>
              </p>
              <p className="text-stone-700 text-lg mb-2">
                E-mail: <span className="font-semibold">{aluno.email || "-"}</span>
              </p>
              <p className="text-stone-700 text-lg mb-8">
                Telefone: <span className="font-semibold">{aluno.telefone || "-"}</span>
              </p>
              <p className="text-stone-700 text-lg mb-8">
                Concluiu com sucesso os seguintes cursos:
              </p>
              
              {/* Cursos */}
              {aluno.matriculas && aluno.matriculas.length > 0 ? (
                <div className="mb-8 text-left max-w-2xl mx-auto">
                  {aluno.matriculas.map((matricula) => {
                    const duracaoFinal = matricula.duracaoCustomizada ?? matricula.curso.duracao;
                    return (
                    <div key={matricula.id} className="mb-4 p-4 border border-amber-200 rounded-lg bg-white">
                      <p className="font-semibold text-amber-900 mb-2">
                        {matricula.curso.nome} ({duracaoFinal}h)
                      </p>
                      
                      {editingId === matricula.id ? (
                        <div className="space-y-3 print:hidden">
                          <div>
                            <label className="block text-xs font-semibold text-stone-700 mb-1">
                              Data de Início
                            </label>
                            <input
                              type="date"
                              value={editDates[matricula.id]?.dataInicio || ""}
                              onChange={(e) =>
                                setEditDates({
                                  ...editDates,
                                  [matricula.id]: {
                                    ...editDates[matricula.id],
                                    dataInicio: e.target.value,
                                  },
                                })
                              }
                              className="w-full border border-stone-300 rounded px-2 py-1 text-sm text-stone-800 placeholder:text-stone-600"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-stone-700 mb-1">
                              Data de Conclusão
                            </label>
                            <input
                              type="date"
                              value={editDates[matricula.id]?.dataFim || ""}
                              onChange={(e) =>
                                setEditDates({
                                  ...editDates,
                                  [matricula.id]: {
                                    ...editDates[matricula.id],
                                    dataFim: e.target.value,
                                  },
                                })
                              }
                              className="w-full border border-stone-300 rounded px-2 py-1 text-sm text-stone-800 placeholder:text-stone-600"
                            />
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => saveDates(matricula.id)}
                              disabled={saving}
                              className="flex-1 bg-green-500 hover:bg-green-600 text-white rounded px-3 py-1 text-sm font-medium transition disabled:opacity-50"
                            >
                              {saving ? "Salvando..." : "Salvar"}
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              disabled={saving}
                              className="flex-1 border border-stone-300 hover:bg-stone-100 rounded px-3 py-1 text-sm font-medium transition disabled:opacity-50"
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      ) : editingDuracao === matricula.id ? (
                        <div className="space-y-3 print:hidden">
                          <div>
                            <label className="block text-xs font-semibold text-stone-700 mb-1">
                              Duração (horas)
                            </label>
                            <input
                              type="number"
                              min="1"
                              value={editDuracoes[matricula.id] || duracaoFinal}
                              onChange={(e) =>
                                setEditDuracoes({
                                  ...editDuracoes,
                                  [matricula.id]: parseInt(e.target.value) || 0,
                                })
                              }
                              className="w-full border border-stone-300 rounded px-2 py-1 text-sm text-stone-800 placeholder:text-stone-600"
                            />
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => saveDuracao(matricula.id)}
                              disabled={saving}
                              className="flex-1 bg-green-500 hover:bg-green-600 text-white rounded px-3 py-1 text-sm font-medium transition disabled:opacity-50"
                            >
                              {saving ? "Salvando..." : "Salvar"}
                            </button>
                            <button
                              onClick={() => setEditingDuracao(null)}
                              disabled={saving}
                              className="flex-1 border border-stone-300 hover:bg-stone-100 rounded px-3 py-1 text-sm font-medium transition disabled:opacity-50"
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="print:invisible">
                          <p className="text-sm text-stone-700 mb-1">
                            <span className="font-semibold">Início:</span> {new Date(matricula.dataInicio).toLocaleDateString("pt-BR")}
                          </p>
                          <p className="text-sm text-stone-700 mb-3">
                            <span className="font-semibold">Conclusão:</span> {new Date(matricula.dataFim).toLocaleDateString("pt-BR")}
                          </p>
                          <div className="flex gap-2 flex-wrap">
                            <button
                              onClick={() => startEditing(matricula.id, matricula.dataInicio, matricula.dataFim)}
                              className="text-sm bg-amber-100 hover:bg-amber-200 text-amber-900 px-3 py-1 rounded font-medium transition print:hidden"
                            >
                              Editar datas
                            </button>
                            <button
                              onClick={() => startEditingDuracao(matricula.id, duracaoFinal)}
                              className="text-sm bg-blue-100 hover:bg-blue-200 text-blue-900 px-3 py-1 rounded font-medium transition print:hidden"
                            >
                              Editar horas
                            </button>
                            <button
                              onClick={() => removeCurso(matricula.id)}
                              disabled={saving}
                              className="text-sm bg-red-100 hover:bg-red-200 text-red-900 px-3 py-1 rounded font-medium transition print:hidden disabled:opacity-50"
                            >
                              Remover curso
                            </button>
                          </div>
                        </div>
                      )}

                      <p className="text-sm text-stone-700 mt-3 print:block hidden">
                        <span className="font-semibold">Início:</span> {new Date(matricula.dataInicio).toLocaleDateString("pt-BR")}
                      </p>
                      <p className="text-sm text-stone-700 print:block hidden">
                        <span className="font-semibold">Conclusão:</span> {new Date(matricula.dataFim).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                  )})}
                  <div className="mt-4 pt-4 border-t border-amber-300">
                    <p className="text-stone-700">
                      <span className="font-semibold">Total:</span> {aluno.matriculas.reduce((acc, m) => acc + (m.duracaoCustomizada ?? m.curso.duracao), 0)} horas
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-stone-600 mb-8 italic">
                  (Nenhum curso designado ainda)
                </p>
              )}
            </div>

            {/* QR Code */}
            <div className="flex flex-col items-center mb-12">
              <p className="text-stone-600 text-sm mb-4">
                Escaneie o código QR para verificar os detalhes:
              </p>
              <div className="bg-white p-4 rounded-xl border-2 border-amber-200">
                <img
                  src={qrCodeUrl}
                  alt="QR Code"
                  className="w-32 h-32"
                />
              </div>
            </div>

            {/* Rodapé */}
            <div className="text-center border-t-2 border-amber-200 pt-8">
              <p className="text-stone-600 text-sm mb-4">
                Data de emissão: {new Date().toLocaleDateString("pt-BR")}
              </p>
              <p className="text-stone-500 text-xs">
                Escola Web - Cursos Online de Excelência
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          body {
            background-color: white;
            margin: 0;
            padding: 0;
          }
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </AuthGuard>
  );
}
