"use client";

import React, { useState } from "react";

interface PinProtectionProps {
    expectedPin: string;
    onUnlock: () => void;
}

export default function PinProtection({ expectedPin, onUnlock }: PinProtectionProps) {
    const [pin, setPin] = useState('');
    const [attemptError, setAttemptError] = useState<string | null>(null);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setAttemptError(null);
        
        if (!expectedPin) {
            setAttemptError('CPF do aluno não disponível');
            return;
        }
        
        const entered = (pin || '').replace(/\D/g, '');
        if (entered === expectedPin) {
            onUnlock();
        } else {
            setAttemptError('Código incorreto. Tente novamente.');
            setPin('');
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50 dark:bg-black px-6 py-8 flex items-center justify-center">
            <div className="mx-auto max-w-md bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-semibold text-stone-800 mb-4">Protegido</h2>
                <p className="text-stone-600 mb-4">
                    Digite os 3 primeiros dígitos do CPF do aluno para visualizar os detalhes.
                </p>
                {!expectedPin && (
                    <div className="text-red-600 mb-4">CPF não disponível para verificação.</div>
                )}
                <form onSubmit={handleSubmit}>
                    <input
                        aria-label="Três primeiros dígitos do CPF"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        maxLength={3}
                        className="w-full border border-stone-200 rounded-lg px-4 py-3 mb-3 text-stone-800 placeholder:text-stone-600"
                        placeholder="Ex: 123"
                    />
                    {attemptError && <div className="text-red-600 mb-3">{attemptError}</div>}
                    <button
                        type="submit"
                        disabled={!expectedPin}
                        className="w-full rounded-full bg-gradient-to-r from-amber-400 to-orange-400 text-white px-6 py-3 font-medium hover:shadow-lg transition disabled:opacity-50"
                    >
                        Desbloquear
                    </button>
                </form>
            </div>
        </div>
    );
}
