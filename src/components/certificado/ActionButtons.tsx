"use client";

interface ActionButtonsProps {
    onPrint: () => void;
    onBack: () => void;
}

export default function ActionButtons({ onPrint, onBack }: ActionButtonsProps) {
    return (
        <div className="print:hidden flex flex-wrap justify-center lg:justify-start items-center gap-4 mb-6">
            <button
                onClick={onPrint}
                className="cursor-pointer rounded-full bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-3 hover:from-blue-700 hover:to-blue-900 transition font-medium shadow-lg"
            >
                Imprimir Certificado
            </button>
            <button
                onClick={onBack}
                className="cursor-pointer rounded-full border border-stone-300 text-stone-700 px-6 py-3 hover:bg-stone-100 transition font-medium"
            >
                Voltar
            </button>
        </div>
    );
}
