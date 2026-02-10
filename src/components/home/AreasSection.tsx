"use client";

import { useRouter } from "next/navigation";
import { CATEGORIAS } from "../../lib/constants";

export default function AreasSection() {
  const router = useRouter();

  return (
    <section id="areas" className="py-16 mb-12">
      <h2 className="text-3xl font-bold text-stone-800 mb-10 text-center">Áreas de Estudo</h2>
      <div className="bg-white rounded-2xl shadow-lg p-10 border border-amber-100">
        <p className="text-lg text-stone-700 mb-8 font-semibold text-center">
          Oferecemos mais de 1200 opções em cursos nas seguintes áreas:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIAS.map((area, idx) => (
            <button
              key={idx}
              onClick={() => router.push(`/cursos/${encodeURIComponent(area)}`)}
              className="bg-gradient-to-br from-amber-50 to-stone-50 rounded-lg p-4 border border-amber-200 text-center hover:from-amber-100 hover:to-stone-100 hover:shadow-lg hover:scale-105 transition-all cursor-pointer"
            >
              <p className="font-semibold text-stone-800">{area}</p>
            </button>
          ))}
          <div className="bg-gradient-to-br from-amber-50 to-stone-50 rounded-lg p-4 border border-amber-200 text-center">
            <p className="font-semibold text-stone-800">E muito mais...</p>
          </div>
        </div>
      </div>
    </section>
  );
}
