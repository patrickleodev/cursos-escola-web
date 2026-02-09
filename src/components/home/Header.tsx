import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="mx-auto max-w-7xl px-6 py-8 flex items-center justify-between">
      <Link href="/gerenciar-alunos" className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition">
        <Image src="/logo.png" alt="Vecchiato Assessoria Educacional" width={180} height={60} className="h-12 w-auto" priority />
      </Link>
      <nav className="hidden md:flex items-center gap-6">
        <a href="#sobre" className="hover:underline text-stone-700">Sobre</a>
        <a href="#oferecemos" className="hover:underline text-stone-700">O que oferecemos</a>
        <a href="#areas" className="hover:underline text-stone-700">Áreas</a>
        <a href="/afiliadas" className="hover:underline text-stone-700">Afiliadas</a>
        <a href="#contato" className="rounded-full border border-stone-300 text-stone-700 px-4 py-2 hover:bg-stone-100 transition">Contato</a>
      </nav>
    </header>
  );
}
