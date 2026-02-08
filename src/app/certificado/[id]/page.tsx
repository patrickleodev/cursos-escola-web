"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import QRCode from "qrcode";
import AuthGuard from "../../../components/AuthGuard";
import type { Aluno, Curso, Matricula } from "../../../types";

// Funções de formatação para exibição
function formatCPF(cpf: string) {
    const numbers = cpf.replace(/\D/g, '');
    if (numbers.length === 11) {
        return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`;
    }
    return cpf;
}

function formatTelefone(tel: string) {
    const numbers = tel.replace(/\D/g, '');
    if (numbers.length === 11) {
        return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
    }
    if (numbers.length === 10) {
        return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6, 10)}`;
    }
    return tel;
}

function formatRG(rg: string) {
    const numbers = rg.replace(/\D/g, '');
    if (numbers.length === 9) {
        return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}-${numbers.slice(8, 9)}`;
    }
    return rg;
}

export default function Certificado() {
  const { id } = useParams();
  const router = useRouter();
  const [aluno, setAluno] = useState<Aluno | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDates, setEditDates] = useState<Record<string, { dataInicio: string; dataFim: string }>>({});
  const [editingDuracao, setEditingDuracao] = useState<string | null>(null);
  const [editDuracoes, setEditDuracoes] = useState<Record<string, number>>({});
  const [saving, setSaving] = useState(false);

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

        // Definir o título da página para o nome do arquivo ao salvar
        document.title = `CERTIFICADO ${data.nome}`;

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
      <style>{`
        /* Estilos gerais para o certificado (desktop e print) */
        .certificado-print {
          background: linear-gradient(135deg, #f5f1e8 0%, #faf8f3 50%, #f5f1e8 100%) !important;
          position: relative;
          overflow: hidden;
          width: 297mm;
          height: 210mm;
          margin: 0 auto;
          padding: 25mm 40mm;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
          color-adjust: exact;
        }

        .certificado-border-top,
        .certificado-border-bottom {
          position: absolute;
          left: 0;
          right: 0;
          height: 40px;
          background: #dc2626;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
          color-adjust: exact;
        }

        .certificado-border-top {
          top: 0;
        }

        .certificado-border-bottom {
          bottom: 0;
        }

        .qr-code-container {
          position: absolute;
          top: 60px;
          right: 40px;
          width: 180px;
          height: 180px;
          border: 2px solid #1e3a8a !important;
          background: white !important;
          padding: 5px;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
          color-adjust: exact;
        }

        .qr-code-container img {
          width: 100%;
          height: 100%;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
          color-adjust: exact;
        }

        .logo-container {
          position: absolute;
          top: 60px;
          left: 40px;
          width: 200px;
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
          color-adjust: exact;
        }

        .logo-container img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
          color-adjust: exact;
        }

        .certificado-titulo {
          color: #1e3a8a !important;
          font-weight: 900 !important;
          font-size: 42px !important;
          letter-spacing: 2px !important;
          margin-top: 10px;
        }

        .instituicao-nome {
          color: #374151 !important;
          font-size: 16px !important;
          font-weight: 500;
          margin: 8px 0 15px 0;
          letter-spacing: 0.5px;
        }

        .certificado-nome {
          color: #1f2937 !important;
          font-size: 32px !important;
          font-weight: bold !important;
          margin: 15px 0;
          letter-spacing: 1px;
        }

        .info-aluno {
          color: #374151 !important;
          font-size: 14px !important;
          margin: 10px 0;
          letter-spacing: 0.5px;
          font-weight: 500;
        }

        .descricao-curso {
          color: #1f2937 !important;
          font-size: 14px !important;
          font-weight: 600;
          margin: 10px 0;
          letter-spacing: 0.5px;
          line-height: 1.6;
        }

        .assinatura-container {
          display: flex;
          justify-content: space-between;
          margin-top: 80px;
          padding-top: 30px;
        }

        .assinatura-item {
          text-align: center;
          flex: 0 0 45%;
        }

        .assinatura-linha {
          border-top: 2px solid #1e3a8a;
          margin: 5px 0;
          width: 100%;
        }

        .assinatura-titulo {
          color: #1f2937 !important;
          font-weight: 600;
          font-size: 12px !important;
          margin-top: 12px;
        }

        @media print {
          .assinatura-container {
            margin-top: 20px;
            padding-top: 10px;
          }

          .assinatura-linha {
            margin: 3px 0;
          }
        }

        .segunda-pagina {
          background: linear-gradient(135deg, #f5f1e8 0%, #faf8f3 50%, #f5f1e8 100%) !important;
          position: relative;
          overflow: hidden;
          width: 297mm;
          height: 210mm;
          margin: 20px auto 0;
          padding: 25mm 40mm;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
          color-adjust: exact;
          page-break-before: always;
        }

        .conteudo-central {
          text-align: center;
          padding-top: 50px;
        }

        .conteudo-grid {
          display: grid;
          gap: 3rem;
          text-align: left;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }

        .conteudo-coluna {
          min-width: 0;
        }

        .conteudo-coluna p {
          margin: 0 0 0.5rem 0;
          line-height: 1.5;
          page-break-inside: avoid;
          break-inside: avoid;
          word-wrap: break-word;
        }

        @page {
          margin: 0;
          size: A4 landscape;
        }

        @media print {
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            background: white !important;
            margin: 0;
            padding: 0;
          }

          html {
            margin: 0;
            padding: 0;
          }

          .certificate-container {
            page-break-after: avoid;
            padding: 0 !important;
            background: white !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            color-adjust: exact;
          }

          .certificado-print {
            width: 297mm;
            height: 210mm;
            margin: 0;
            padding: 25mm 40mm;
            box-shadow: none !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            color-adjust: exact;
          }

          .segunda-pagina {
            width: 297mm;
            height: 210mm;
            margin: 0 !important;
            padding: 25mm 40mm;
            box-shadow: none !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            color-adjust: exact;
          }
        }
      `}</style>

      <div className="certificate-container min-h-screen bg-gradient-to-br from-stone-50 to-amber-50 dark:bg-black px-6 py-8">
        <div className="mx-auto" style={{ maxWidth: '297mm' }}>
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

          {/* Certificados - um para cada curso */}
          {aluno.matriculas && aluno.matriculas.length > 0 ? (
            aluno.matriculas.map((matricula, index) => {
              const duracaoFinal = matricula.duracaoCustomizada ?? matricula.curso.duracao;
              const dataInicio = new Date(matricula.dataInicio).toLocaleDateString('pt-BR');
              const dataFim = new Date(matricula.dataFim).toLocaleDateString('pt-BR');
              
              // Dividir conteúdo em chunks para paginação (30 itens por página em 3 colunas = ~10 por coluna)
              const conteudoLinhas = matricula.curso.conteudo 
                ? matricula.curso.conteudo.split('\n').filter(line => line.trim())
                : [];
              const linhasPorPagina = 30;
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
                  <div
                    className="certificado-print relative bg-white mx-auto"
                    style={index > 0 ? { pageBreakBefore: 'always' } : {}}
                  >
                    {/* Bordas decorativas padrão triangular */}
                    <div className="certificado-border-top"></div>
                    <div className="certificado-border-bottom"></div>

                    {/* Logo */}
                    <div className="logo-container">
                      <img src="/logo.png" alt="Logo" />
                    </div>

                    {/* QR Code */}
                    {qrCodeUrl && (
                      <div className="qr-code-container">
                        <img src={qrCodeUrl} alt="QR Code" />
                      </div>
                    )}

                    {/* Conteúdo do certificado */}
                    <div className="relative z-10" style={{ paddingTop: '20px' }}>
                      {/* Cabeçalho */}
                      <div className="text-center">
                        <h1 className="certificado-titulo">CERTIFICADO</h1>
                        <p className="instituicao-nome">Vecchiato Assessoria Educacional</p>
                      </div>

                      {/* Nome do aluno */}
                      <div className="text-center mt-3 mb-3">
                        <p className="certificado-nome">{aluno.nome}</p>
                      </div>

                      {/* Informações do aluno - CPF e RG na mesma linha */}
                      <div className="text-center mb-3">
                        <p className="info-aluno">
                          CPF: {formatCPF(aluno.cpf || "")} RG: {aluno.rg ? formatRG(aluno.rg) : "Ausente"}
                        </p>
                      </div>

                      {/* Descrição do curso */}
                      <div className="text-center mb-4" style={{ marginTop: '70px' }}>
                        <div className="descricao-curso">
                          <p className="font-bold">CONCLUIU COM ÊXITO AO CURSO DE {matricula.curso.nome.toUpperCase()} COM {duracaoFinal}H</p>
                          <p>REALIZADO DE {dataInicio} A {dataFim}</p>
                        </div>
                      </div>

                      {/* Seção de assinatura */}
                      <div className="assinatura-container">
                        <div className="assinatura-item">
                          <div style={{ height: '60px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', marginBottom: '15px' }}>
                            <p className="text-sm font-semibold mb-0 text-slate-900">{aluno.nome}</p>
                          </div>
                          <div className="assinatura-linha"></div>
                          <p className="text-xs mt-4 mb-0 text-slate-900">{formatCPF(aluno.cpf || "")}</p>
                        </div>
                        <div className="assinatura-item">
                          <div style={{ height: '60px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', marginBottom: '15px' }}>
                            <p className="text-xs font-semibold mb-0 text-slate-900">VECCHIATO ASSESSORIA EDUCACIONAL</p>
                          </div>
                          <div className="assinatura-linha"></div>
                          <p className="assinatura-titulo mb-0 mt-4">DIRETORA EDUCACIONAL</p>
                          <p className="text-xs mt-1 mb-0 text-slate-900">MICHELLE VECCHIATO CRTP 2344</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Verso do Certificado - uma ou mais páginas de conteúdo */}
                  {conteudoPages.map((linhas, pageIdx) => (
                    <div key={`conteudo-${pageIdx}`} className="segunda-pagina relative bg-white mx-auto" style={{ pageBreakBefore: 'always' }}>
                      {/* Bordas decorativas padrão triangular */}
                      <div className="certificado-border-top"></div>
                      <div className="certificado-border-bottom"></div>

                      {/* Logo */}
                      <div className="logo-container">
                        <img src="/logo.png" alt="Logo" />
                      </div>

                      {/* QR Code */}
                      {qrCodeUrl && (
                        <div className="qr-code-container">
                          <img src={qrCodeUrl} alt="QR Code" />
                        </div>
                      )}

                      {/* Conteúdo centralizado */}
                      <div className="conteudo-central relative z-10">
                        <h1 className="certificado-titulo">CONTEÚDO</h1>
                        {linhas.length > 0 && (() => {
                          // Determinar número de colunas baseado na quantidade de itens
                          const numColunas = linhas.length <= 5 ? 1 : linhas.length <= 15 ? 2 : 3;
                          
                          // Distribuir itens de forma equilibrada baseado no comprimento do texto
                          const colunas: string[][] = Array.from({ length: numColunas }, () => []);
                          const alturas = Array(numColunas).fill(0);
                          
                          // Adicionar cada item à coluna com menor altura acumulada
                          linhas.forEach((linha) => {
                            const menorIndice = alturas.indexOf(Math.min(...alturas));
                            colunas[menorIndice].push(linha);
                            // Estimar altura baseada no comprimento do texto
                            alturas[menorIndice] += linha.length;
                          });
                          
                          return (
                            <div className="mt-8 px-12 conteudo-grid" style={{ gridTemplateColumns: `repeat(${numColunas}, 1fr)` }}>
                              {colunas.map((coluna, colIdx) => (
                                <div key={`coluna-${colIdx}`} className="conteudo-coluna">
                                  {coluna.map((topico, idx) => (
                                    <p key={`col${colIdx}-${idx}`} className="text-sm text-slate-800 font-medium">
                                      {topico.trim()}
                                    </p>
                                  ))}
                                </div>
                              ))}
                            </div>
                          );
                        })()}
                      </div>
                    </div>
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
                {aluno.matriculas.map((matricula) => {
                  const duracaoFinal = matricula.duracaoCustomizada ?? matricula.curso.duracao;
                  return (
                    <div key={matricula.id} className="border-t pt-6 mt-6">
                      <p className="font-semibold text-stone-700 mb-4">{matricula.curso.nome}</p>

                      {editingId === matricula.id ? (
                        <div className="space-y-3 mb-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-semibold text-stone-700 mb-1">
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
                                className="w-full border border-stone-300 rounded px-3 py-2 text-stone-800"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-stone-700 mb-1">
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
                                className="w-full border border-stone-300 rounded px-3 py-2 text-stone-800"
                              />
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => saveDates(matricula.id)}
                              disabled={saving}
                              className="flex-1 bg-green-500 hover:bg-green-600 text-white rounded px-3 py-2 font-medium transition disabled:opacity-50"
                            >
                              {saving ? "Salvando..." : "Salvar"}
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              disabled={saving}
                              className="flex-1 border border-stone-300 hover:bg-stone-100 rounded px-3 py-2 font-medium transition"
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      ) : editingDuracao === matricula.id ? (
                        <div className="space-y-3 mb-4">
                          <div>
                            <label className="block text-sm font-semibold text-stone-700 mb-1">
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
                              className="w-full border border-stone-300 rounded px-3 py-2 text-stone-800"
                            />
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => saveDuracao(matricula.id)}
                              disabled={saving}
                              className="flex-1 bg-green-500 hover:bg-green-600 text-white rounded px-3 py-2 font-medium transition disabled:opacity-50"
                            >
                              {saving ? "Salvando..." : "Salvar"}
                            </button>
                            <button
                              onClick={() => setEditingDuracao(null)}
                              disabled={saving}
                              className="flex-1 border border-stone-300 hover:bg-stone-100 rounded px-3 py-2 font-medium transition"
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="mb-4">
                          <p className="text-sm text-stone-600 mb-1">
                            <span className="font-semibold">Início:</span> {new Date(matricula.dataInicio).toLocaleDateString("pt-BR")}
                          </p>
                          <p className="text-sm text-stone-600 mb-1">
                            <span className="font-semibold">Conclusão:</span> {new Date(matricula.dataFim).toLocaleDateString("pt-BR")}
                          </p>
                          <p className="text-sm text-stone-600 mb-3">
                            <span className="font-semibold">Duração:</span> {duracaoFinal}h
                          </p>
                          <div className="flex gap-2 flex-wrap">
                            <button
                              onClick={() => startEditing(matricula.id, matricula.dataInicio, matricula.dataFim)}
                              className="text-sm bg-amber-100 hover:bg-amber-200 text-amber-900 px-3 py-1 rounded font-medium transition"
                            >
                              Editar datas
                            </button>
                            <button
                              onClick={() => startEditingDuracao(matricula.id, duracaoFinal)}
                              className="text-sm bg-blue-100 hover:bg-blue-200 text-blue-900 px-3 py-1 rounded font-medium transition"
                            >
                              Editar horas
                            </button>
                            <button
                              onClick={() => removeCurso(matricula.id)}
                              className="text-sm bg-red-100 hover:bg-red-200 text-red-900 px-3 py-1 rounded font-medium transition"
                            >
                              Remover
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  );
}
