import Header from "../../components/home/Header";
import HeroSection from "../../components/home/HeroSection";
import WhyChooseUs from "../../components/home/WhyChooseUs";
import AreasSection from "../../components/home/AreasSection";
import Footer from "../../components/home/Footer";

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-stone-50 to-amber-50 dark:bg-black text-stone-900 dark:text-stone-50">
      <Header />

      <main className="mx-auto max-w-7xl px-6">
        <HeroSection />
        <WhyChooseUs />

        {/* O que oferecemos */}
        <section id="oferecemos" className="py-16 mb-12">
          <h2 className="text-3xl font-bold text-stone-800 mb-10 text-center">O que oferecemos</h2>
          <div className="bg-white rounded-2xl shadow-lg p-10 border border-amber-100 mb-8">
            <p className="text-lg text-stone-700 leading-relaxed mb-6">
              Na <span className="font-semibold text-amber-700">Vecchiato Assessoria Educacional</span>, você encontra tudo que precisa para se preparar:
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <span className="bg-amber-400 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 font-bold">✓</span>
                <span className="text-stone-700">Material apostilado com informações direto ao ponto (sem enrolação)</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="bg-amber-400 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 font-bold">✓</span>
                <span className="text-stone-700">Videoaulas conforme curso adquirido</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="bg-amber-400 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 font-bold">✓</span>
                <span className="text-stone-700">Certificado com QRCODE necessário para qualquer seletivo e prova de título</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="bg-amber-400 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 font-bold">✓</span>
                <span className="text-stone-700">Material e certificado liberado em 24 horas</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="bg-amber-400 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 font-bold">✓</span>
                <span className="text-stone-700">Pagamento facilitado via PIX</span>
              </li>
            </ul>
            <p className="text-lg text-stone-700 mt-8 font-semibold text-center text-amber-900">
              Pare de adiar o seu sonho da vaga própria. Garanta sua preparação agora e mude seu patamar profissional ainda este ano!
            </p>
          </div>
        </section>

        {/* Nossa Visão */}
        <section className="py-16 mb-12">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="bg-white rounded-2xl shadow-lg p-10 border border-amber-100">
              <h3 className="text-2xl font-bold text-amber-900 mb-6">Nossa Visão</h3>
              <p className="text-stone-700 leading-relaxed">
                Capacitar os alunos por meio do ensino prático, acessível através do Ensino à Distância, 
                desenvolvendo competências técnicas necessárias para que conquistem seu espaço no mercado profissional.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-10 border border-amber-100">
              <h3 className="text-2xl font-bold text-amber-900 mb-6">Nossa Proposta</h3>
              <p className="text-stone-700 leading-relaxed">
                A Vecchiato Assessoria Educacional é conhecida como uma das principais referências em Educação à Distância 
                dentro e fora do Brasil, fortalecendo e impactando positivamente comunidades. Oferecemos mais de 1200 opções em 
                cursos para a capacitação, especialização técnica, horas complementares para universitários e menor aprendiz.
              </p>
            </div>
          </div>
        </section>

        <AreasSection />

        {/* O que fazemos */}
        <section className="py-16 mb-12">
          <h2 className="text-3xl font-bold text-stone-800 mb-10 text-center">Por que Escolher a Vecchiato?</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-white rounded-2xl shadow-lg p-10 border border-amber-100 text-center">
              <h3 className="text-2xl font-bold text-amber-900 mb-4">O que fazemos?</h3>
              <p className="text-stone-700 text-lg">Ensino EAD de qualidade</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-10 border border-amber-100 text-center">
              <h3 className="text-2xl font-bold text-amber-900 mb-4">Para quem fazemos?</h3>
              <p className="text-stone-700 text-lg">Pessoas que buscam evolução, flexibilidade</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-10 border border-amber-100 text-center">
              <h3 className="text-2xl font-bold text-amber-900 mb-4">Qual o impacto?</h3>
              <p className="text-stone-700 text-lg">Transformação profissional, pessoal</p>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-16 mb-12 text-center">
          <div className="bg-gradient-to-r from-amber-400 to-orange-400 rounded-2xl shadow-xl p-12">
            <h2 className="text-4xl font-bold text-white mb-6">Dê o próximo passo na sua carreira</h2>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
              Estude com quem é especialista em aprovar educadores. A edital saiu e agora? 
              Não basta apenas "passar", é preciso estar entre os primeiros para ser convocado rápido!
            </p>
            <a href="#contato" className="inline-block rounded-full bg-white text-amber-700 px-10 py-4 font-bold text-lg hover:shadow-lg transition">
              Comece Agora
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}