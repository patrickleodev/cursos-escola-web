"use client";

import React, { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import QRCode from "qrcode";
import AuthGuard from "../../../components/AuthGuard";
import LoadingSpinner from "../../../components/LoadingSpinner";
import type { Aluno } from "../../../types";
import { certificadoStyles } from "../../../components/certificado/styles";
import CertificadoSidebar from "../../../components/certificado/CertificadoSidebar";
import CertificadoPrintArea from "../../../components/certificado/CertificadoPrintArea";

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
  { label: "Arial (padrão)", value: '"Arial", "Helvetica", sans-serif' },
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

export default function CertificadoTecnico() {
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

  function handleVoltar() { router.push("/gerenciar-alunos"); }
  function handlePrint() { window.print(); }
  function normalizeScale(value: number) { const clamped = Math.min(FONT_SCALE_MAX, Math.max(FONT_SCALE_MIN, value)); return Number(clamped.toFixed(2)); }
  function adjustFontScale(delta: number) { setFontScale((prev) => normalizeScale(prev + delta)); }

  async function saveDates(matriculaId: string, dates: { dataInicio: string; dataFim: string }) { try { setSaving(true); const res = await fetch(`/api/matriculas/${matriculaId}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(dates), }); if (!res.ok) throw new Error("Erro ao atualizar datas"); if (aluno && aluno.matriculas) { const updatedMatriculas = aluno.matriculas.map((m) => m.id === matriculaId ? { ...m, dataInicio: dates.dataInicio, dataFim: dates.dataFim } : m ); setAluno({ ...aluno, matriculas: updatedMatriculas }); } } catch (err) { alert(err instanceof Error ? err.message : "Erro ao salvar datas"); } finally { setSaving(false); } }

  async function saveDuracao(matriculaId: string, duracao: number) { try { setSaving(true); const res = await fetch(`/api/matriculas/${matriculaId}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ duracaoCustomizada: duracao }), }); if (!res.ok) throw new Error("Erro ao atualizar duração"); if (aluno && aluno.matriculas) { const updatedMatriculas = aluno.matriculas.map((m) => (m.id === matriculaId ? { ...m, duracaoCustomizada: duracao } : m)); setAluno({ ...aluno, matriculas: updatedMatriculas }); } } catch (err) { alert(err instanceof Error ? err.message : "Erro ao salvar duração"); } finally { setSaving(false); } }

  async function removeCurso(matriculaId: string) { if (!confirm("Tem certeza que deseja remover este curso do aluno?")) return; try { setSaving(true); const res = await fetch(`/api/matriculas/${matriculaId}`, { method: "DELETE" }); if (!res.ok) throw new Error("Erro ao remover curso"); if (aluno && aluno.matriculas) { const updatedMatriculas = aluno.matriculas.filter((m) => m.id !== matriculaId); setAluno({ ...aluno, matriculas: updatedMatriculas }); } alert("Curso removido com sucesso!"); } catch (err) { alert(err instanceof Error ? err.message : "Erro ao remover curso"); } finally { setSaving(false); } }

  if (loading) return (<AuthGuard><LoadingSpinner message="Gerando certificado técnico..." /></AuthGuard>);
  if (error || !aluno) return (<AuthGuard><div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50 dark:bg-black px-6 py-8"><div className="mx-auto max-w-2xl bg-white rounded-2xl shadow-lg p-8"><div className="text-center"><div className="text-red-600 mb-6 text-lg font-medium">{error || "Aluno não encontrado"}</div><button onClick={handleVoltar} className="rounded-full bg-gradient-to-r from-amber-400 to-orange-400 text-white px-6 py-3 font-medium hover:shadow-lg transition">Voltar</button></div></div></div></AuthGuard>);

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
          <CertificadoSidebar
            alunoNomePreview={alunoNomePreview}
            previewConfig={previewConfig as any}
            selectedModelConfig={selectedModelConfig as any}
            MODELOS={MODELOS as any}
            selectedModel={selectedModel}
            setSelectedModel={setSelectedModel as any}
            hoveredModel={hoveredModel as any}
            setHoveredModel={setHoveredModel as any}
            isModelMenuOpen={isModelMenuOpen}
            setIsModelMenuOpen={setIsModelMenuOpen}
            modelMenuRef={modelMenuRef}
            FONT_OPTIONS={FONT_OPTIONS as any}
            selectedFontConfig={selectedFontConfig as any}
            selectedFont={selectedFont}
            setSelectedFont={setSelectedFont as any}
            hoveredFont={hoveredFont}
            setHoveredFont={setHoveredFont as any}
            isFontMenuOpen={isFontMenuOpen}
            setIsFontMenuOpen={setIsFontMenuOpen}
            fontMenuRef={fontMenuRef}
            fontScale={fontScale}
            adjustFontScale={adjustFontScale}
            normalizeScale={normalizeScale}
            FONT_SCALE_PRESETS={FONT_SCALE_PRESETS}
            handlePrint={handlePrint}
            handleVoltar={handleVoltar}
          />

          <CertificadoPrintArea
            aluno={aluno}
            qrCodeUrl={qrCodeUrl}
            selectedModel={selectedModel}
            selectedFont={selectedFont}
            fontScale={fontScale}
            saving={saving}
            saveDates={saveDates}
            saveDuracao={saveDuracao}
            removeCurso={removeCurso}
          />
        </div>
      </div>
    </AuthGuard>
  );
}
