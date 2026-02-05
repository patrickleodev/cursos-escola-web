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
    // Mock auth: aceite qualquer usuário com senha "senha123" para demo
    if (password === "senha123") {
      localStorage.setItem("auth_token", "demo-token");
      localStorage.setItem("user_email", email);
      router.push("/gerenciar-alunos");
    } else {
      setError("Credenciais inválidas. Use senha: senha123 para demo.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-lg p-8 shadow">
        <h1 className="text-2xl font-semibold mb-4">Entrar</h1>
        <label className="block mb-2 text-sm">Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mb-4 rounded border px-3 py-2" />
        <label className="block mb-2 text-sm">Senha</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full mb-4 rounded border px-3 py-2" />
        {error && <div className="text-sm text-red-600 mb-4">{error}</div>}
        <div className="flex gap-3">
          <button className="rounded-full bg-foreground text-background px-5 py-2">Entrar</button>
          <button type="button" onClick={() => { setEmail('admin@demo.com'); setPassword('senha123'); }} className="rounded-full border px-5 py-2">Demo</button>
        </div>
      </form>
    </div>
  );
}
