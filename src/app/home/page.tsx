import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-50">
      <header className="mx-auto max-w-7xl px-6 py-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src="/logo.svg" alt="Logo" width={40} height={40} priority />
          <span className="text-xl font-semibold">Escola de Cursos</span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#cursos" className="hover:underline">Cursos</a>
          <a href="#sobre" className="hover:underline">Sobre</a>
          <a href="#depoimentos" className="hover:underline">Depoimentos</a>
          <Link href="#contato" className="rounded-full border px-4 py-2">Contato</Link>
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-6">
        {/* Hero */}
        <section className="grid gap-8 md:grid-cols-2 items-center py-16">
          <div>
            <h1 className="text-4xl font-extrabold leading-tight mb-4">Aprenda habilidades valiosas. Estude no seu ritmo.</h1>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6">Cursos online práticos, instrutores experientes e certificação ao final. Transforme sua carreira com projetos reais e suporte contínuo.</p>
            <div className="flex gap-4">
              <a href="#cursos" className="rounded-full bg-foreground text-background px-6 py-3 font-medium">Ver Cursos</a>
              <a href="#sobre" className="rounded-full border px-6 py-3">Saiba Mais</a>
            </div>
            <div className="mt-6 text-sm text-zinc-500 dark:text-zinc-400">Mais de <strong>12.000</strong> alunos formados • Garantia de 7 dias</div>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md rounded-xl bg-white/60 p-6 shadow-lg">
              <Image src="/hero-courses.png" alt="Cursos" width={560} height={320} className="rounded-md" />
            </div>
          </div>
        </section>

        {/* Benefícios */}
        <section className="py-12">
          <h2 className="text-2xl font-semibold mb-6">O que oferecemos</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border p-5 bg-white">
              <h3 className="font-medium mb-2">Aulas Práticas</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Projetos passo a passo para consolidar conhecimento.</p>
            </div>
            <div className="rounded-lg border p-5 bg-white">
              <h3 className="font-medium mb-2">Mentoria ao Vivo</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Sessões regulares com instrutores experientes.</p>
            </div>
            <div className="rounded-lg border p-5 bg-white">
              <h3 className="font-medium mb-2">Certificado</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Receba um certificado ao concluir os cursos.</p>
            </div>
            <div className="rounded-lg border p-5 bg-white">
              <h3 className="font-medium mb-2">Suporte</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Comunidade ativa e suporte técnico.</p>
            </div>
          </div>
        </section>

        {/* Cursos */}
        <section id="cursos" className="py-12">
          <h2 className="text-2xl font-semibold mb-6">Cursos Populares</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <article className="rounded-lg border bg-white p-5">
              <h3 className="font-medium mb-2">Desenvolvimento Web</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">HTML, CSS, JavaScript e frameworks modernos.</p>
              <div className="flex items-center justify-between text-sm">
                <span>40 aulas</span>
                <a href="#" className="text-primary font-medium">Ver</a>
              </div>
            </article>
            <article className="rounded-lg border bg-white p-5">
              <h3 className="font-medium mb-2">Design UX/UI</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">Crie interfaces intuitivas e bonitas.</p>
              <div className="flex items-center justify-between text-sm">
                <span>28 aulas</span>
                <a href="#" className="text-primary font-medium">Ver</a>
              </div>
            </article>
            <article className="rounded-lg border bg-white p-5">
              <h3 className="font-medium mb-2">Marketing Digital</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">Estratégias, anúncios e SEO para crescer online.</p>
              <div className="flex items-center justify-between text-sm">
                <span>18 aulas</span>
                <a href="#" className="text-primary font-medium">Ver</a>
              </div>
            </article>
          </div>
        </section>

        {/* Depoimentos */}
        <section id="depoimentos" className="py-12">
          <h2 className="text-2xl font-semibold mb-6">O que nossos alunos dizem</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <blockquote className="rounded-lg border bg-white p-6">
              <p className="mb-3">"Os cursos me ajudaram a conseguir um novo emprego em apenas 3 meses."</p>
              <cite className="text-sm text-zinc-500">— Ana, aluna</cite>
            </blockquote>
            <blockquote className="rounded-lg border bg-white p-6">
              <p className="mb-3">"A mentoria e os projetos práticos fizeram toda a diferença."</p>
              <cite className="text-sm text-zinc-500">— Carlos, aluna</cite>
            </blockquote>
          </div>
        </section>

        {/* CTA final */}
        <section id="sobre" className="py-12 text-center">
          <h2 className="text-2xl font-semibold mb-4">Pronto para começar?</h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">Inscreva-se hoje e aproveite o primeiro módulo grátis.</p>
          <div className="flex items-center justify-center gap-4">
            <a href="#cursos" className="rounded-full bg-foreground text-background px-6 py-3 font-medium">Começar Agora</a>
            <a href="#contato" className="rounded-full border px-6 py-3">Falar com um consultor</a>
          </div>
        </section>
      </main>

      <footer id="contato" className="mt-12 border-t bg-transparent py-8">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-zinc-600 dark:text-zinc-400">© {new Date().getFullYear()} Escola de Cursos. Todos os direitos reservados.</div>
          <div className="flex gap-4">
            <a href="#" className="text-sm hover:underline">Termos</a>
            <a href="#" className="text-sm hover:underline">Privacidade</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
