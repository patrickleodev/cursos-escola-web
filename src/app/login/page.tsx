"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password === "Vecch@01" && email === "vecchiatosuporte01@gmail.com") {
      localStorage.setItem("auth_token", "demo-token");
      localStorage.setItem("user_email", email);
      router.push("/gerenciar-alunos");
    } else {
      setError("Credenciais inválidas.");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50 dark:bg-black px-6 py-8 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-2xl shadow-lg p-10 border border-amber-100">
        <h1 className="text-3xl font-bold text-stone-800 mb-8 text-center">Entrar</h1>
        
        <div className="space-y-5 mb-8">
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-2">Email</label>
            <input 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full border border-stone-200 rounded-lg px-4 py-3 text-stone-800 placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-400 transition" 
              placeholder="seu.email@exemplo.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-2">Senha</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full border border-stone-200 rounded-lg px-4 py-3 text-stone-800 placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-400 transition" 
              placeholder="••••••••"
            />
          </div>
        </div>
        
        {error && <div className="text-sm text-red-600 mb-6 bg-red-50 p-3 rounded-lg">{error}</div>}
        
        <button 
          type="submit"
          className="w-full rounded-full bg-gradient-to-r from-amber-400 to-orange-400 text-white px-6 py-3 font-semibold hover:shadow-lg transition"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
