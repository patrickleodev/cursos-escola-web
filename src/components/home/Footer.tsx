import { FaWhatsapp, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer id="contato" className="border-t border-amber-200 bg-gradient-to-t from-amber-50 to-stone-50 py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-8 md:grid-cols-3 mb-8">
          <div>
            <h3 className="text-lg font-bold text-amber-900 mb-4">Vecchiato Assessoria Educacional</h3>
            <p className="text-stone-700">Transformando vidas através da educação a distância desde 2017.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-amber-900 mb-4">Navegação</h3>
            <ul className="space-y-2 text-stone-700">
              <li><a href="#sobre" className="hover:underline">Sobre</a></li>
              <li><a href="#oferecemos" className="hover:underline">O que oferecemos</a></li>
              <li><a href="#areas" className="hover:underline">Áreas de estudo</a></li>
              <li><a href="/afiliadas" className="hover:underline">Afiliadas</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-amber-900 mb-4">Entre em Contato</h3>
            <div className="flex items-center gap-6">
              <a href="https://wa.me/5515996842152" target="_blank" rel="noopener noreferrer" className="text-4xl text-green-500 hover:text-green-600 hover:scale-110 transition" title="WhatsApp">
                <FaWhatsapp />
              </a>
              <a href="https://www.instagram.com/vecchiatoassessoriaeducacional" target="_blank" rel="noopener noreferrer" className="text-4xl text-pink-500 hover:text-pink-600 hover:scale-110 transition" title="Instagram">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-amber-200 pt-8 text-center text-stone-600">
          <p>© {new Date().getFullYear()} Vecchiato Assessoria Educacional. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
