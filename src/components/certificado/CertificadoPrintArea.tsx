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
  saving: boolean;
  saveDates: (matriculaId: string, dates: { dataInicio: string; dataFim: string }) => Promise<void>;
  saveDuracao: (matriculaId: string, duracao: number) => Promise<void>;
  removeCurso: (matriculaId: string) => Promise<void>;
}

export default function CertificadoPrintArea({ aluno, qrCodeUrl, selectedModel, selectedFont, fontScale, saving, saveDates, saveDuracao, removeCurso }: Props) {
  return (
    <div className="lg:ml-80 lg:pl-6 lg:min-w-0">
      <style>{certificadoStyles}</style>

      {aluno.matriculas && aluno.matriculas.length > 0 ? (
        aluno.matriculas.map((matricula, index) => {
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
                model={selectedModel as any}
                fontFamily={selectedFont}
                fontScale={fontScale}
              />

              {conteudoPages.map((linhas, pageIdx) => (
                <CertificadoVerso
                  key={`conteudo-${pageIdx}`}
                  linhas={linhas}
                  model={selectedModel as any}
                  fontFamily={selectedFont}
                  fontScale={fontScale}
                />
              ))}

              <CertificadoPaginaExtra
                aluno={aluno}
                cursoNome={matricula.curso.nome}
                duracao={duracaoFinal}
                model={selectedModel as any}
                fontFamily={selectedFont}
                fontScale={fontScale}
              />

              {((matricula.curso.categoria ?? '').toString().toUpperCase().includes('ESPECIALIZA') || (matricula.curso.categoria ?? '').toString().toUpperCase().includes('ESPECIALIZAÇÃO')) && (
                (() => {
                  const disciplinas = conteudoLinhas;
                  const rowsPerPage = 18;
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
  );
}
