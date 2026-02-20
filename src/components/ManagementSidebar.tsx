"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import gsap from "gsap";
import { FaUsers, FaBook, FaUserTie, FaHome, FaChevronLeft, FaSignOutAlt } from "react-icons/fa";

const SIDEBAR_EXPANDED_WIDTH = 288;
const SIDEBAR_COLLAPSED_WIDTH = 112;

export default function ManagementSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(true);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => pathname === path;

  useEffect(() => {
    if (sidebarRef.current) {
      const targetWidth = isExpanded ? SIDEBAR_EXPANDED_WIDTH : SIDEBAR_COLLAPSED_WIDTH;

      const textSpans = sidebarRef.current.querySelectorAll(".text-label");
      const icons = sidebarRef.current.querySelectorAll("button svg");
      const toggleIcon = sidebarRef.current.querySelector(".toggle-icon");
      
      gsap.to(textSpans, {
        x: isExpanded ? 0 : -30,
        opacity: isExpanded ? 1 : 0,
        duration: 0.4,
        ease: "power2.inOut",
      });

      // Garantir que os ícones sempre fiquem com opacidade 1
      gsap.to(icons, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.inOut",
      });

      // Rotacionar o ícone toggle
      if (toggleIcon) {
        gsap.to(toggleIcon, {
          rotation: isExpanded ? 0 : 180,
          duration: 0.4,
          ease: "power2.inOut",
        });
      }
      
      gsap.to(sidebarRef.current, {
        width: targetWidth,
        duration: 0.4,
        ease: "power2.inOut",
      });

      gsap.to(document.documentElement, {
        duration: 0.4,
        ease: "power2.inOut",
        '--sidebar-width': `${targetWidth}px`,
      });
    }
  }, [isExpanded]);

  useEffect(() => {
    document.documentElement.style.setProperty('--sidebar-width', `${SIDEBAR_EXPANDED_WIDTH}px`);

    return () => {
      document.documentElement.style.removeProperty('--sidebar-width');
    };
  }, []);

  function handleLogout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_email');
    location.href = '/login';
  }

  return (
    <div ref={sidebarRef} className={`fixed left-0 top-0 h-screen flex flex-col w-72 overflow-hidden`}>
      <div className={`h-full transition-all duration-300 ${isExpanded ? "p-4" : "p-3"}`}>
      <div className="h-full rounded-2xl border border-stone-200 bg-white shadow-sm flex flex-col overflow-hidden">
      {/* Toggle button */}
      <div className="p-4 border-b border-stone-200 flex items-center justify-start pl-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 rounded-lg hover:bg-stone-100 transition text-amber-600 text-xl cursor-pointer"
        >
          <FaChevronLeft className="toggle-icon" />
        </button>
      </div>

      {/* Menu items */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        <button
          onClick={() => router.push("/gerenciar-alunos")}
          title="Gerenciar Alunos"
          className={`relative w-full flex items-center px-4 py-3 rounded-xl font-medium transition overflow-hidden cursor-pointer ${
            isActive("/gerenciar-alunos")
              ? "bg-gradient-to-r from-amber-400 to-orange-400 text-white"
              : "bg-stone-100 text-stone-800 hover:bg-stone-200"
          }`}
        >
          <FaUsers className="flex-shrink-0" />
          <span className="absolute ml-8 top-1/2 -translate-y-1/2 whitespace-nowrap text-label">Gerenciar Alunos</span>
        </button>
        
        <button
          onClick={() => router.push("/gerenciar-cursos")}
          title="Gerenciar Cursos"
          className={`relative w-full flex items-center px-4 py-3 rounded-xl font-medium transition overflow-hidden cursor-pointer ${
            isActive("/gerenciar-cursos")
              ? "bg-gradient-to-r from-amber-400 to-orange-400 text-white"
              : "bg-stone-100 text-stone-800 hover:bg-stone-200"
          }`}
        >
          <FaBook className="flex-shrink-0" />
          <span className="absolute ml-8 top-1/2 -translate-y-1/2 whitespace-nowrap text-label">Gerenciar Cursos</span>
        </button>
        
        <button
          onClick={() => router.push("/gerenciar-afiliadas")}
          title="Gerenciar Afiliadas"
          className={`relative w-full flex items-center px-4 py-3 rounded-xl font-medium transition overflow-hidden cursor-pointer ${
            isActive("/gerenciar-afiliadas")
              ? "bg-gradient-to-r from-amber-400 to-orange-400 text-white"
              : "bg-stone-100 text-stone-800 hover:bg-stone-200"
          }`}
        >
          <FaUserTie className="flex-shrink-0" />
          <span className="absolute ml-8 top-1/2 -translate-y-1/2 whitespace-nowrap text-label">Gerenciar Afiliadas</span>
        </button>
      </div>

      {/* Voltar para Home e Sair */}
      <div className="p-4 border-t border-stone-200 space-y-3 mt-auto">
        <button
          onClick={() => router.push("/home")}
          title="Voltar para Home"
          className={`relative w-full flex items-center px-4 py-3 rounded-xl font-medium bg-gradient-to-r from-purple-500 to-purple-700 text-white hover:shadow-lg transition overflow-hidden cursor-pointer`}
        >
          <FaHome className="flex-shrink-0" />
          <span className="absolute ml-6 top-1/2 -translate-y-1/2 whitespace-nowrap text-label">Voltar para Home</span>
        </button>
        
        <button
          onClick={handleLogout}
          title="Sair"
          className={`relative w-full flex items-center px-4 py-3 rounded-xl font-medium bg-red-500 hover:bg-red-600 text-white hover:shadow-lg transition overflow-hidden cursor-pointer`}
        >
          <FaSignOutAlt className="flex-shrink-0" />
          <span className="absolute ml-6 top-1/2 -translate-y-1/2 whitespace-nowrap text-label">Sair</span>
        </button>
      </div>
      </div>
      </div>
    </div>
  );
}
