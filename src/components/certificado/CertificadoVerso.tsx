import type { CSSProperties } from "react";

type CertificadoModel =
    | "vermelho"
    | "marrom"
    | "rosa"
    | "amarelo"
    | "laranja"
    | "azul"
    | "verde"
    | "verde-escuro"
    | "dourado-escuro";

interface CertificadoVersoProps {
    linhas: string[];
    model: CertificadoModel;
    fontFamily: string;
    fontScale: number;
}

export default function CertificadoVerso({ linhas, model, fontFamily, fontScale }: CertificadoVersoProps) {
    // Determinar número de colunas baseado na quantidade de itens
    const numColunas = linhas.length <= 5 ? 1 : linhas.length <= 15 ? 2 : 3;
    
    // Distribuir itens de forma equilibrada baseado no comprimento do texto
    const colunas: string[][] = Array.from({ length: numColunas }, () => []);
    const alturas = Array(numColunas).fill(0);
    
    // Adicionar cada item à coluna com menor altura acumulada
    linhas.forEach((linha) => {
        const menorIndice = alturas.indexOf(Math.min(...alturas));
        colunas[menorIndice].push(linha);
        // Estimar altura baseada no comprimento do texto
        alturas[menorIndice] += linha.length;
    });

    const style: CSSProperties & Record<string, string | number> = {
        pageBreakBefore: "always",
        "--cert-font-family": fontFamily,
        "--cert-font-scale": fontScale,
    };

    return (
        <div className={`segunda-pagina certificado-model-${model} relative bg-white mx-auto`} style={style}>
            {/* Bordas decorativas */}
            <div className="certificado-border-top"></div>
            <div className="certificado-border-bottom"></div>

            {/* Logo */}
            <div className="logo-container">
                <img src="/logo.png" alt="Logo" />
            </div>

            {/* QR Code */}
            <div className="qr-code-container">
                <img src="/vecchiato-cursos.png" alt="QR Code Vecchiato Cursos" />
            </div>

            {/* Conteúdo centralizado */}
            <div className="conteudo-central relative z-10">
                <h1 className="certificado-titulo">CONTEÚDO</h1>
                {linhas.length > 0 && (
                    <div className="px-12 conteudo-grid" style={{ gridTemplateColumns: `repeat(${numColunas}, 1fr)`, marginTop: '60px' }}>
                        {colunas.map((coluna, colIdx) => (
                            <div key={`coluna-${colIdx}`} className="conteudo-coluna">
                                {coluna.map((topico, idx) => (
                                    <p key={`col${colIdx}-${idx}`} className="conteudo-topico">
                                        {topico.trim()}
                                    </p>
                                ))}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
