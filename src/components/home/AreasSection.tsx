import { CATEGORIAS } from "../../lib/constants";

export default function AreasSection() {
  // Adicionar "E muito mais..." ao final da lista
  const areas = [...CATEGORIAS, "E muito mais..."];

  return (
    <section id="areas" className="py-16 mb-12">
      <h2 className="text-3xl font-bold text-stone-800 mb-10 text-center">Áreas de Estudo</h2>
      <div className="bg-white rounded-2xl shadow-lg p-10 border border-amber-100">
        <p className="text-lg text-stone-700 mb-8 font-semibold text-center">
          Oferecemos mais de 1200 opções em cursos nas seguintes áreas:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {areas.map((area, idx) => (
            <div key={idx} className="bg-gradient-to-br from-amber-50 to-stone-50 rounded-lg p-4 border border-amber-200 text-center">
              <p className="font-semibold text-stone-800">{area}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
