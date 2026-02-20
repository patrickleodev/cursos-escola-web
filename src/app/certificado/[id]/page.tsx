"use client";

import React, { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import QRCode from "qrcode";
import { FaArrowLeft, FaPrint } from "react-icons/fa";
import AuthGuard from "../../../components/AuthGuard";
import type { Aluno } from "../../../types";
import CertificadoFrente from "../../../components/certificado/CertificadoFrente";
import CertificadoVerso from "../../../components/certificado/CertificadoVerso";
import CursoEditForm from "../../../components/certificado/CursoEditForm";
import { certificadoStyles } from "../../../components/certificado/styles";

type CertificadoModel =
  | "vermelho"
  | "marrom"
  | "rosa"
  | "amarelo"
  | "laranja"
  | "azul"
  | "verde"
  | "verde-escuro"
  | "dourado-escuro";

const MODELOS: {
  value: CertificadoModel;
  label: string;
  faixaClass: string;
}[] = [
  { value: "vermelho", label: "Vermelha", faixaClass: "bg-red-600" },
  { value: "marrom", label: "Marrom", faixaClass: "bg-amber-800" },
  { value: "rosa", label: "Rosa", faixaClass: "bg-pink-600" },
  { value: "amarelo", label: "Amarela", faixaClass: "bg-yellow-600" },
  { value: "laranja", label: "Laranja", faixaClass: "bg-orange-600" },
  { value: "azul", label: "Azul", faixaClass: "bg-blue-600" },
  { value: "verde", label: "Verde", faixaClass: "bg-green-600" },
  { value: "verde-escuro", label: "Verde escuro", faixaClass: "bg-green-800" },
  { value: "dourado-escuro", label: "Dourado escuro", faixaClass: "bg-yellow-700" },
];

const FONT_OPTIONS = [
  { label: "Serifada clássica", value: '"Georgia", "Times New Roman", serif' },
  { label: "Sans moderna", value: '"Inter", "Segoe UI", Arial, sans-serif' },
  { label: "Didática", value: '"Trebuchet MS", "Verdana", sans-serif' },
  { label: "Formal", value: '"Garamond", "Palatino Linotype", serif' },
];

const FONT_SCALE_MIN = 0.8;
const FONT_SCALE_MAX = 1.3;
const FONT_SCALE_STEP = 0.05;
const FONT_SCALE_PRESETS = [
  { label: "Pequeno", value: 0.9 },
  { label: "Padrão", value: 1 },
  { label: "Grande", value: 1.15 },
];

export default function Certificado() {
  const { id } = useParams();
  const router = useRouter();
  const [aluno, setAluno] = useState<Aluno | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [selectedModel, setSelectedModel] = useState<CertificadoModel>("vermelho");
  const [selectedFont, setSelectedFont] = useState<string>(FONT_OPTIONS[0].value);
  const [fontScale, setFontScale] = useState<number>(1);
  const [isModelMenuOpen, setIsModelMenuOpen] = useState(false);
  const [hoveredModel, setHoveredModel] = useState<CertificadoModel | null>(null);
  const [isFontMenuOpen, setIsFontMenuOpen] = useState(false);
  const [hoveredFont, setHoveredFont] = useState<string | null>(null);
  const modelMenuRef = useRef<HTMLDivElement | null>(null);
  const fontMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadAluno = async () => {
      try {
        const res = await fetch(`/api/alunos/${id}`);
        if (!res.ok) throw new Error("Erro ao carregar aluno");
        const data = await res.json();
        setAluno(data);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;

      if (isModelMenuOpen && modelMenuRef.current && !modelMenuRef.current.contains(target)) {
        setIsModelMenuOpen(false);
        setHoveredModel(null);
      }

      if (isFontMenuOpen && fontMenuRef.current && !fontMenuRef.current.contains(target)) {
        setIsFontMenuOpen(false);
        setHoveredFont(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isModelMenuOpen, isFontMenuOpen]);

  function handleVoltar() {
    router.push("/gerenciar-alunos");
  }

  function handlePrint() {
    window.print();
  }

  function normalizeScale(value: number) {
    const clamped = Math.min(FONT_SCALE_MAX, Math.max(FONT_SCALE_MIN, value));
    return Number(clamped.toFixed(2));
  }

  function adjustFontScale(delta: number) {
    setFontScale((prev) => normalizeScale(prev + delta));
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

  const previewModel = hoveredModel ?? selectedModel;
  const previewConfig = MODELOS.find((modelo) => modelo.value === previewModel) ?? MODELOS[0];
  const selectedModelConfig = MODELOS.find((modelo) => modelo.value === selectedModel) ?? MODELOS[0];
  const previewFont = hoveredFont ?? selectedFont;
  const selectedFontConfig = FONT_OPTIONS.find((font) => font.value === selectedFont) ?? FONT_OPTIONS[0];
  const alunoNomePreview = aluno.nome || "Nome do Aluno";

  return (
    <AuthGuard>
      <style>{certificadoStyles}</style>
      <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50 dark:bg-black px-6 py-8">
        <div className="container mx-auto">
          <aside className="print:hidden mb-6 lg:mb-0 lg:fixed lg:left-0 lg:top-0 lg:bottom-0 lg:w-80 lg:p-4 lg:flex lg:flex-col">
            <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm lg:shadow-none lg:h-full lg:flex lg:flex-col lg:overflow-hidden">
              <div className="space-y-4 lg:overflow-y-auto lg:pr-1">
                <h2 className="text-lg font-semibold text-stone-800">Personalização</h2>

              <div className="space-y-2" onMouseLeave={() => setHoveredModel(null)}>
                <label className="text-sm font-medium text-stone-700">Modelo da faixa</label>
                <div className="relative" ref={modelMenuRef}>
                  <button
                    type="button"
                    onClick={() => setIsModelMenuOpen((prev) => !prev)}
                    className="cursor-pointer w-full inline-flex items-center justify-between rounded-xl border border-stone-300 bg-white px-3 py-2 text-sm text-stone-700 hover:border-stone-500 transition"
                  >
                    <span>Faixa {selectedModelConfig.label.toLowerCase()}</span>
                    <span className="text-xs">▾</span>
                  </button>

                  {isModelMenuOpen && (
                    <div className="absolute left-0 top-full z-30 mt-2 w-full overflow-hidden rounded-xl border border-stone-200 bg-white shadow-lg">
                      {MODELOS.map((modelo) => (
                        <button
                          key={modelo.value}
                          type="button"
                          onMouseEnter={() => setHoveredModel(modelo.value)}
                          onFocus={() => setHoveredModel(modelo.value)}
                          onClick={() => {
                            setSelectedModel(modelo.value);
                            setIsModelMenuOpen(false);
                            setHoveredModel(null);
                          }}
                          className={`cursor-pointer flex w-full items-center justify-between px-3 py-2 text-left text-sm transition ${
                            selectedModel === modelo.value
                              ? "bg-stone-100 text-stone-900"
                              : "text-stone-700 hover:bg-stone-50"
                          }`}
                        >
                          <span>Faixa {modelo.label.toLowerCase()}</span>
                          <span className={`h-3 w-3 rounded-full ${modelo.faixaClass}`}></span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="w-full overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
                  <div className={`h-2 ${previewConfig.faixaClass}`}></div>
                  <div className="px-3 py-3">
                    <p className="text-[10px] font-semibold text-slate-800">PRÉVIA</p>
                    <div className="mt-2 space-y-1">
                      <div className="h-1.5 w-24 rounded bg-stone-300"></div>
                      <div className="h-1.5 w-20 rounded bg-stone-200"></div>
                    </div>
                  </div>
                  <div className={`h-2 ${previewConfig.faixaClass}`}></div>
                </div>
              </div>

              <div className="space-y-2" onMouseLeave={() => setHoveredFont(null)}>
                <label className="text-sm font-medium text-stone-700">Fonte do certificado</label>
                <div className="relative" ref={fontMenuRef}>
                  <button
                    type="button"
                    onClick={() => setIsFontMenuOpen((prev) => !prev)}
                    className="cursor-pointer w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-left text-sm text-stone-700 hover:border-stone-500 transition"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="text-xs text-stone-500">{selectedFontConfig.label}</p>
                        <p className="text-sm text-stone-900" style={{ fontFamily: previewFont }}>
                          {alunoNomePreview}
                        </p>
                      </div>
                      <span className="text-xs">▾</span>
                    </div>
                  </button>

                  {isFontMenuOpen && (
                    <div className="absolute left-0 top-full z-30 mt-2 w-full overflow-hidden rounded-xl border border-stone-200 bg-white shadow-lg max-h-72 overflow-y-auto">
                      {FONT_OPTIONS.map((font) => (
                        <button
                          key={font.label}
                          type="button"
                          onMouseEnter={() => setHoveredFont(font.value)}
                          onFocus={() => setHoveredFont(font.value)}
                          onClick={() => {
                            setSelectedFont(font.value);
                            setIsFontMenuOpen(false);
                            setHoveredFont(null);
                          }}
                          className={`cursor-pointer w-full px-3 py-2 text-left transition ${
                            selectedFont === font.value
                              ? "bg-stone-100"
                              : "hover:bg-stone-50"
                          }`}
                        >
                          <p className="text-xs text-stone-500">{font.label}</p>
                          <p className="text-base text-stone-900" style={{ fontFamily: font.value }}>
                            {alunoNomePreview}
                          </p>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="font-size" className="text-sm font-medium text-stone-700">
                  Tamanho da fonte ({Math.round(fontScale * 100)}%)
                </label>
                <div className="rounded-xl border border-stone-200 bg-stone-50 p-3 space-y-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => adjustFontScale(-FONT_SCALE_STEP)}
                      className="cursor-pointer h-9 w-9 rounded-lg border border-stone-300 bg-white text-stone-700 hover:bg-stone-100 transition"
                      aria-label="Diminuir tamanho da fonte"
                    >
                      −
                    </button>

                    <div className="flex-1 rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-center">
                      <span className="text-xs text-stone-500">Escala</span>
                      <p className="text-sm font-semibold text-stone-800">{Math.round(fontScale * 100)}%</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => adjustFontScale(FONT_SCALE_STEP)}
                      className="cursor-pointer h-9 w-9 rounded-lg border border-stone-300 bg-white text-stone-700 hover:bg-stone-100 transition"
                      aria-label="Aumentar tamanho da fonte"
                    >
                      +
                    </button>
                  </div>

                  <input
                    id="font-size"
                    type="range"
                    min={FONT_SCALE_MIN}
                    max={FONT_SCALE_MAX}
                    step={FONT_SCALE_STEP}
                    value={fontScale}
                    onChange={(event) => setFontScale(normalizeScale(Number(event.target.value)))}
                    className="cursor-pointer w-full accent-amber-500"
                  />

                  <div className="flex flex-wrap gap-2">
                    {FONT_SCALE_PRESETS.map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => setFontScale(preset.value)}
                        className={`cursor-pointer rounded-full border px-3 py-1 text-xs font-medium transition ${
                          fontScale === preset.value
                            ? "border-amber-500 bg-amber-100 text-amber-800"
                            : "border-stone-300 bg-white text-stone-700 hover:bg-stone-100"
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              </div>

              <div className="mt-auto pt-4 border-t border-stone-200 space-y-2">
                <button
                  onClick={handlePrint}
                  className="cursor-pointer w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 py-2.5 font-medium hover:from-blue-700 hover:to-blue-900 transition shadow-sm"
                >
                  <FaPrint />
                  <span>Imprimir Certificado</span>
                </button>
                <button
                  onClick={handleVoltar}
                  className="cursor-pointer w-full inline-flex items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white text-stone-700 px-4 py-2.5 font-medium hover:bg-stone-100 transition"
                >
                  <FaArrowLeft />
                  <span>Voltar</span>
                </button>
              </div>
            </div>
          </aside>

          <div className="lg:ml-80 lg:pl-6 lg:min-w-0">
            {aluno.matriculas && aluno.matriculas.length > 0 ? (
              aluno.matriculas.map((matricula, index) => {
                const duracaoFinal = matricula.duracaoCustomizada ?? matricula.curso.duracao;
                const dataInicio = new Date(matricula.dataInicio).toLocaleDateString("pt-BR", { timeZone: "UTC" });
                const dataFim = new Date(matricula.dataFim).toLocaleDateString("pt-BR", { timeZone: "UTC" });

                const conteudoLinhas = matricula.curso.conteudo
                  ? matricula.curso.conteudo.split("\n").filter((line) => line.trim())
                  : [];
                const linhasPorPagina = 39;
                const conteudoPages: string[][] = [];
                for (let i = 0; i < conteudoLinhas.length; i += linhasPorPagina) {
                  conteudoPages.push(conteudoLinhas.slice(i, i + linhasPorPagina));
                }
                if (conteudoPages.length === 0) {
                  conteudoPages.push([]);
                }

                return (
                  <React.Fragment key={matricula.id}>
                    <CertificadoFrente
                      aluno={aluno}
                      cursoNome={matricula.curso.nome}
                      duracao={duracaoFinal}
                      dataInicio={dataInicio}
                      dataFim={dataFim}
                      qrCodeUrl={qrCodeUrl}
                      isFirstCertificate={index === 0}
                      model={selectedModel}
                      fontFamily={selectedFont}
                      fontScale={fontScale}
                    />

                    {conteudoPages.map((linhas, pageIdx) => (
                      <CertificadoVerso
                        key={`conteudo-${pageIdx}`}
                        linhas={linhas}
                        model={selectedModel}
                        fontFamily={selectedFont}
                        fontScale={fontScale}
                      />
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

            {aluno.matriculas && aluno.matriculas.length > 0 && (
              <div className="mt-8 print:hidden" style={{ maxWidth: "297mm", margin: "2rem auto 0" }}>
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
      </div>
    </AuthGuard>
  );
}
