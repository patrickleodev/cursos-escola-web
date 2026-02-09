export default function HeroSection() {
  return (
    <section className="py-16 text-center">
      <h1 className="text-5xl font-extrabold text-amber-900 mb-6 leading-tight">
        Sua carreira na educação não pode depender da sorte.
      </h1>
      <p className="text-xl text-stone-700 mb-8 max-w-2xl mx-auto leading-relaxed">
        Você dedica sua vida a ensinar, mas na hora de enfrentar um processo seletivo, 
        sente que falta o direcionamento certo? Na <span className="font-semibold">Vecchiato Assessoria Educacional</span>, transformamos sua vocação em aprovação.
      </p>
      <div className="flex justify-center mb-12">
        <a href="#oferecemos" className="rounded-full bg-gradient-to-r from-amber-400 to-orange-400 text-white px-8 py-4 font-semibold hover:shadow-lg transition">
          Conheça nossos cursos
        </a>
      </div>
    </section>
  );
}
