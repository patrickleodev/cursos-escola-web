import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-stone-50 to-amber-50 dark:bg-black text-stone-900 dark:text-stone-50">
      {/* Header */}
      <header className="mx-auto max-w-7xl px-6 py-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-2xl font-bold text-amber-700">Vecchiato</div>
          <span className="text-sm text-stone-600">Assessoria Educacional</span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#sobre" className="hover:underline text-stone-700">Sobre</a>
          <a href="#oferecemos" className="hover:underline text-stone-700">O que oferecemos</a>
          <a href="#areas" className="hover:underline text-stone-700">Áreas</a>
          <a href="#contato" className="rounded-full border border-stone-300 text-stone-700 px-4 py-2 hover:bg-stone-100 transition">Contato</a>
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-6">
        {/* Hero Section */}
        <section className="py-16 text-center">
          <h1 className="text-5xl font-extrabold text-amber-900 mb-6 leading-tight">
            Sua carreira na educação não pode depender da sorte.
          </h1>
          <p className="text-xl text-stone-700 mb-8 max-w-2xl mx-auto leading-relaxed">
            Você dedica sua vida a ensinar, mas na hora de enfrentar um processo seletivo, 
            sente que falta o direcionamento certo? Na Vecchiato, <span className="font-semibold">transformamos sua vocação em aprovação</span>.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a href="#oferecemos" className="rounded-full bg-gradient-to-r from-amber-400 to-orange-400 text-white px-8 py-4 font-semibold hover:shadow-lg transition">
              Conheça nossos cursos
            </a>
            <a href="#contato" className="rounded-full border-2 border-amber-400 text-amber-700 px-8 py-4 font-semibold hover:bg-amber-50 transition">
              Fale com um consultor
            </a>
          </div>
        </section>

        {/* Por que escolher */}
        <section id="sobre" className="py-16 mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-10 border border-amber-100">
            <h2 className="text-3xl font-bold text-stone-800 mb-8 text-center">Por que escolher a Vecchiato?</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="p-6 bg-gradient-to-br from-amber-50 to-stone-50 rounded-xl border border-amber-200">
                <h3 className="font-semibold text-amber-900 mb-3 text-lg">📚 Método Focado</h3>
                <p className="text-stone-700">Conteúdo focado no que realmente cai nas provas da área da educação, sem enrolação.</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-amber-50 to-stone-50 rounded-xl border border-amber-200">
                <h3 className="font-semibold text-amber-900 mb-3 text-lg">📖 Material Apostilado</h3>
                <p className="text-stone-700">Informações direto ao ponto com material apostilado de qualidade.</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-amber-50 to-stone-50 rounded-xl border border-amber-200">
                <h3 className="font-semibold text-amber-900 mb-3 text-lg">🎥 Vídeo Aulas</h3>
                <p className="text-stone-700">Videoaulas conforme o curso adquirido para melhor aprendizado.</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-amber-50 to-stone-50 rounded-xl border border-amber-200">
                <h3 className="font-semibold text-amber-900 mb-3 text-lg">✅ Certificado com QR Code</h3>
                <p className="text-stone-700">Certificado com QRCODE necessário para qualquer seletivo, prova de título.</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-amber-50 to-stone-50 rounded-xl border border-amber-200">
                <h3 className="font-semibold text-amber-900 mb-3 text-lg">⚡ Acesso Rápido</h3>
                <p className="text-stone-700">Material e certificado liberado em 24 horas após conclusão.</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-amber-50 to-stone-50 rounded-xl border border-amber-200">
                <h3 className="font-semibold text-amber-900 mb-3 text-lg">💳 Pagamento Facilitado</h3>
                <p className="text-stone-700">Pagamento facilitado via PIX para sua conveniência.</p>
              </div>
            </div>
          </div>
        </section>

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
                Capacitar os alunos por meio do ensino prático, acessível como o Ensino à Distância, 
                desenvolvendo competências técnicas necessárias para que conquistem seu espaço no mercado profissional.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-10 border border-amber-100">
              <h3 className="text-2xl font-bold text-amber-900 mb-6">Nossa Proposta</h3>
              <p className="text-stone-700 leading-relaxed">
                A Vecchiato Assessoria Educacional é conhecida como uma das principais referências em Educação à Distância 
                dentro e fora do Brasil, fortalecendo e impactando positivamente comunidades. Oferecemos mais de 1200 opções em 
                cursos para capacitação, especialização técnica, horas complementares para universitários e menor aprendiz.
              </p>
            </div>
          </div>
        </section>

        {/* Áreas de Estudo */}
        <section id="areas" className="py-16 mb-12">
          <h2 className="text-3xl font-bold text-stone-800 mb-10 text-center">Áreas de Estudo</h2>
          <div className="bg-white rounded-2xl shadow-lg p-10 border border-amber-100">
            <p className="text-lg text-stone-700 mb-8 font-semibold text-center">
              Oferecemos mais de 1200 opções em cursos nas seguintes áreas:
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                'Educação', 'Estética', 'Direito', 'Administração',
                'Enfermagem', 'Massagem', 'Psicologia', 'Engenharia',
                'Nutrição', 'Segurança', 'Manicure/Pedicure', 'Cosmetologia',
                'Terapia Holística', 'Serviços Gerais', 'Motorista', 'Cuidador de Idosos',
                'Setor Imobiliário', 'E muito mais...'
              ].map((area, idx) => (
                <div key={idx} className="bg-gradient-to-br from-amber-50 to-stone-50 rounded-lg p-4 border border-amber-200 text-center">
                  <p className="font-semibold text-stone-800">{area}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

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
              <p className="text-stone-700 text-lg">Pessoas que buscam evolução ou flexibilidade</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-10 border border-amber-100 text-center">
              <h3 className="text-2xl font-bold text-amber-900 mb-4">Qual o impacto?</h3>
              <p className="text-stone-700 text-lg">Transformação profissional ou pessoal</p>
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

      {/* Footer com Contato */}
      <footer id="contato" className="border-t border-amber-200 bg-gradient-to-t from-amber-50 to-stone-50 py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-3 mb-8">
            <div>
              <h3 className="text-lg font-bold text-amber-900 mb-4">Vecchiato Assessoria</h3>
              <p className="text-stone-700">Transformando vidas através da educação de qualidade e acessível.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-amber-900 mb-4">Navegação</h3>
              <ul className="space-y-2 text-stone-700">
                <li><a href="#sobre" className="hover:underline">Sobre</a></li>
                <li><a href="#oferecemos" className="hover:underline">O que oferecemos</a></li>
                <li><a href="#areas" className="hover:underline">Áreas de estudo</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-amber-900 mb-4">Entre em Contato</h3>
              <a href="https://wa.me/5515996842152" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white rounded-full px-6 py-3 font-semibold transition">
                💬 WhatsApp: (15) 99684-2152
              </a>
            </div>
          </div>
          <div className="border-t border-amber-200 pt-8 text-center text-stone-600">
            <p>© {new Date().getFullYear()} Vecchiato Assessoria Educacional. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
