"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import type { Curso } from "../../../types";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Footer from "../../../components/home/Footer";
import { FaArrowLeft } from "react-icons/fa";

export default function CursosPorArea() {
  const { area } = useParams();
  const router = useRouter();
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Decodificar a área da URL
  const areaDecodificada = decodeURIComponent(area as string);

  useEffect(() => {
    const loadCursos = async () => {
      try {
        const res = await fetch("/api/cursos");
        if (!res.ok) throw new Error("Erro ao carregar cursos");
        const data = await res.json();
        
        // Filtrar cursos pela categoria
        const cursosFiltrados = data.filter(
          (curso: Curso) => curso.categoria === areaDecodificada
        );
        
        setCursos(cursosFiltrados);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao carregar cursos");
      } finally {
        setLoading(false);
      }
    };

    loadCursos();
  }, [areaDecodificada]);

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50 dark:bg-black px-6 py-8">
        <div className="mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => router.push("/home")}
              className="rounded-full bg-gradient-to-r from-amber-400 to-orange-400 text-white px-6 py-3 font-medium hover:shadow-lg transition"
            >
              Voltar para a Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50 dark:bg-black px-6 py-8">
      <div className="mx-auto max-w-7xl">
        {/* Cabeçalho */}
        <div className="mb-8">
          <button
            onClick={() => router.push("/home")}
            className="flex items-center gap-2 text-stone-600 hover:text-amber-600 mb-4 transition"
          >
            <FaArrowLeft /> Voltar para a Home
          </button>
          <h1 className="text-4xl font-bold text-stone-800 mb-2">
            Cursos de {areaDecodificada}
          </h1>
          <p className="text-stone-600">
            {cursos.length} {cursos.length === 1 ? 'curso encontrado' : 'cursos encontrados'}
          </p>
        </div>

        {/* Lista de cursos */}
        {cursos.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <p className="text-stone-600 text-lg mb-6">
              Nenhum curso encontrado na área de {areaDecodificada}
            </p>
            <button
              onClick={() => router.push("/home")}
              className="rounded-full bg-gradient-to-r from-amber-400 to-orange-400 text-white px-6 py-3 font-medium hover:shadow-lg transition"
            >
              Voltar para a Home
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cursos.map((curso) => (
              <div
                key={curso.id}
                className="bg-white rounded-2xl shadow-lg p-6 border border-amber-100 hover:shadow-xl transition-all hover:scale-105"
              >
                <h3 className="text-xl font-bold text-stone-800 mb-3">
                  {curso.nome}
                </h3>
                <div className="text-stone-600">
                  <p className="flex items-center gap-2">
                    <span className="font-semibold">Duração:</span>
                    <span>{curso.duracao} horas</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
