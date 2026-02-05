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

export default function Certificado() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [aluno, setAluno] = useState<Aluno | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
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
              <p className="text-stone-700 text-lg mb-8">
                Concluiu com sucesso os seguintes cursos:
              </p>
              
              {/* Cursos */}
              {aluno.cursos && aluno.cursos.length > 0 ? (
                <div className="mb-8 text-left max-w-md mx-auto">
                  {aluno.cursos.map((curso) => (
                    <div key={curso.id} className="mb-2 text-stone-700">
                      <span className="font-semibold">•</span> {curso.nome} ({curso.duracao}h)
                    </div>
                  ))}
                  <div className="mt-4 pt-4 border-t border-amber-300">
                    <p className="text-stone-700">
                      <span className="font-semibold">Total:</span> {aluno.cursos.reduce((acc, c) => acc + c.duracao, 0)} horas
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
