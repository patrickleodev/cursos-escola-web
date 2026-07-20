"use client";

import React from "react";
import type { Aluno } from "../../types";
import CertificadoFrente from "./CertificadoFrente";
import CertificadoVerso from "./CertificadoVerso";
import CertificadoPaginaExtra from "./CertificadoPaginaExtra";
import CertificadoGradeNotas from "./CertificadoGradeNotas";
import CursoEditForm from "./CursoEditForm";
import { certificadoStyles } from "./styles";

interface Props {
  aluno: Aluno;
  qrCodeUrl: string;
  selectedModel: string;
  selectedFont: string;
  fontScale: number;
  isTechnicalCertificate?: boolean;
  saving: boolean;
  saveDates: (matriculaId: string, dates: { dataInicio: string; dataFim: string }) => Promise<void>;
  saveDuracao: (matriculaId: string, duracao: number) => Promise<void>;
  removeCurso: (matriculaId: string) => Promise<void>;
  randomizeNotaFalta?: boolean;
}

export default function CertificadoPrintArea({ aluno, qrCodeUrl, selectedModel, selectedFont, fontScale, isTechnicalCertificate = false, saving, saveDates, saveDuracao, removeCurso, randomizeNotaFalta = false }: Props) {
  const isCursoTecnico = (categoria?: string) => {
    const normalized = (categoria ?? "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    return normalized.includes("especializacao") && normalized.includes("tecnica");
  };

  const matriculasFiltradas = (aluno.matriculas ?? []).filter((matricula) =>
    isTechnicalCertificate ? isCursoTecnico(matricula.curso.categoria) : !isCursoTecnico(matricula.curso.categoria)
  );

  return (
    <div className="lg:ml-80 lg:pl-6 lg:min-w-0">
      <style>{certificadoStyles}</style>

      {matriculasFiltradas.length > 0 ? (
        matriculasFiltradas.map((matricula, index) => {
          const duracaoFinal = matricula.duracaoCustomizada ?? matricula.curso.duracao;
          const dataInicio = new Date(matricula.dataInicio).toLocaleDateString("pt-BR", { timeZone: "UTC" });
          const dataFim = new Date(matricula.dataFim).toLocaleDateString("pt-BR", { timeZone: "UTC" });

          let conteudoLinhas: string[] = [];
          if (matricula.curso.conteudo) {
            try {
              const parsed = JSON.parse(matricula.curso.conteudo);
              if (Array.isArray(parsed)) {
                conteudoLinhas = parsed.map((i) => (typeof i === 'string' ? i : String(i))).filter((line) => line.trim());
              } else if (typeof parsed === 'string') {
                conteudoLinhas = parsed.split('\n').map((l: string) => l.trim()).filter((l: string) => l);
              } else {
                conteudoLinhas = String(matricula.curso.conteudo).split('\n').map((l) => l.trim()).filter((l) => l);
              }
            } catch (err) {
              conteudoLinhas = String(matricula.curso.conteudo).split('\n').map((l) => l.trim()).filter((l) => l);
            }
          } else {
            conteudoLinhas = [];
          }

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
                isTechnicalCertificate={isTechnicalCertificate}
                model={selectedModel as any}
                fontFamily={selectedFont}
                fontScale={fontScale}
              />

              {(!((matricula.curso.categoria ?? '').toString().toUpperCase().includes('ESPECIALIZA') || (matricula.curso.categoria ?? '').toString().toUpperCase().includes('ESPECIALIZAÇÃO'))) && conteudoPages.map((linhas, pageIdx) => (
                <CertificadoVerso
                  key={`conteudo-${pageIdx}`}
                  linhas={linhas}
                  model={selectedModel as any}
                  fontFamily={selectedFont}
                  fontScale={fontScale}
                />
              ))}

              {/* Página extra: somente para certificados técnicos (especialização técnica) */}
              {((matricula.curso.categoria ?? '').toString().toUpperCase().includes('ESPECIALIZA') || (matricula.curso.categoria ?? '').toString().toUpperCase().includes('ESPECIALIZAÇÃO')) && (
                <CertificadoPaginaExtra
                  aluno={aluno}
                  cursoNome={matricula.curso.nome}
                  duracao={duracaoFinal}
                  model={selectedModel as any}
                  fontFamily={selectedFont}
                  fontScale={fontScale}
                  qrCodeUrl={qrCodeUrl}
                />
              )}

              {((matricula.curso.categoria ?? '').toString().toUpperCase().includes('ESPECIALIZA') || (matricula.curso.categoria ?? '').toString().toUpperCase().includes('ESPECIALIZAÇÃO')) && (
                (() => {
                  const disciplinas = conteudoLinhas.filter((d) => (d || '').toString().trim() !== '');
                  const rowsPerPage = 8;
                  const gradePages: string[][] = [];
                  for (let i = 0; i < disciplinas.length; i += rowsPerPage) {
                    gradePages.push(disciplinas.slice(i, i + rowsPerPage));
                  }
                  if (gradePages.length === 0) {
                    gradePages.push([]);
                  }

                  return gradePages.map((disciplinesChunk, idx) => (
                    <CertificadoGradeNotas
                      key={`grade-${idx}`}
                      aluno={aluno}
                      cursoNome={matricula.curso.nome}
                      disciplinas={disciplinesChunk}
                      model={selectedModel as any}
                      fontFamily={selectedFont}
                      fontScale={fontScale}
                      footerLabel={idx === gradePages.length - 1 ? 'Trabalho de Conclusão Final' : undefined}
                      randomizeNotaFalta={randomizeNotaFalta}
                    />
                  ));
                })()
              )}
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

      {matriculasFiltradas.length > 0 && (
        <div className="mt-8 print:hidden" style={{ maxWidth: "297mm", margin: "2rem auto 0" }}>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-stone-800 mb-6">Editar Certificado</h2>
            {matriculasFiltradas.map((matricula) => (
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
  );
}
