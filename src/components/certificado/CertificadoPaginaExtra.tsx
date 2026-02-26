import React, { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import type { Aluno } from "../../types";
import { formatCPF } from "../../lib/formatters";

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

interface Props {
    aluno: Aluno;
    cursoNome: string;
    duracao: number;
    metodo?: string;
    turma?: string;
    periodo?: string;
    model: CertificadoModel;
    fontFamily: string;
    fontScale: number;
}

export default function CertificadoPaginaExtra({ aluno, cursoNome, duracao, metodo = 'EAD', turma = 'A', periodo = 'NOTURNO', model, fontFamily, fontScale }: Props) {
    const style: CSSProperties & Record<string, string | number> = {
        pageBreakBefore: "always",
        "--cert-font-family": fontFamily,
        "--cert-font-scale": fontScale,
    };

    return (
        <div className={`segunda-pagina certificado-model-${model} relative bg-white mx-auto`} style={style}>
            <div className="certificado-border-top"></div>
            <div className="certificado-border-bottom"></div>

            {/* brasão como imagem de fundo centralizada, atrás do conteúdo */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '60%', maxWidth: '480px', opacity: 0.12, zIndex: 0, pointerEvents: 'none' }}>
                <img src="/logo.png" alt="Brasão Vecchiato" style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }} />
            </div>

            <div className="conteudo-central relative z-10" style={{ paddingTop: '20px', color: '#1f2937' }}>
                <div style={{ textAlign: 'left', padding: '0 12mm' }}>
                    <p style={{ fontWeight: 700, color: '#b91c1c', marginBottom: 6 }}>VECCHIATO ASSESSORIA EDUCACIONAL</p>
                    <p style={{ margin: '0 0 6px 0', fontSize: '13px' }}>INSTITUIÇÃO DE ENSINO – VECCHIATO ASSESSORIA EDUCACIONAL</p>
                    <p style={{ margin: '0 0 6px 0', fontSize: '13px' }}>CNPJ:</p>
                    <p style={{ margin: '0 0 6px 0', fontSize: '13px' }}>CONTATO: (15) 99684-2152</p>
                    <p style={{ margin: '0 0 6px 0', fontSize: '13px' }}>DIRETORA EDUCACIONAL: MICHELLE C. VECCHIATO CRTP – 2344</p>
                </div>

                <hr style={{ margin: '14px 12mm', borderColor: '#d1d5db' }} />

                <AlunoDadosSection aluno={aluno} />

                {/* brasão removido daqui — já é renderizado atrás como imagem absoluta */}

                <div style={{ height: 30 }} />

                <hr style={{ margin: '8px 12mm', borderColor: '#e5e7eb' }} />

                <div style={{ padding: '0 12mm', marginTop: 8 }}>
                    <p style={{ margin: '6px 0', fontWeight: 700 }}>CURSO REALIZADO: {cursoNome.toUpperCase()}</p>
                    <p style={{ margin: '6px 0' }}>CARGA HORÁRIA: {duracao}</p>
                    <p style={{ margin: '6px 0' }}>MÉTODO: {metodo}</p>
                    <p style={{ margin: '6px 0' }}>TURMA: {turma}</p>
                    <p style={{ margin: '6px 0' }}>PERÍODO: {periodo}</p>
                </div>

                <div style={{ textAlign: 'center', marginTop: 20 }}>
                    <h2 style={{ letterSpacing: 1.5, color: '#1f2937' }}>CONTEÚDO PROGRAMÁTICO DO CURSO</h2>
                </div>
            </div>
        </div>
    );
}

function AlunoDadosSection({ aluno }: { aluno: Aluno }) {
    const [dataNascimentoValue, setDataNascimentoValue] = useState<string>(() => {
        const raw = ('dataNascimento' in aluno) ? ((aluno as any).dataNascimento ?? '') : '';
        if (!raw) return '';
        // normalize to yyyy-mm-dd for input[type=date]
        const isoMatch = /^\d{4}-\d{2}-\d{2}/.test(raw);
        if (isoMatch) return raw.slice(0, 10);
        const dm = raw.match(/^(\d{2})\/(\d{2})\/(\d{4})/);
        if (dm) return `${dm[3]}-${dm[2]}-${dm[1]}`;
        const d = new Date(raw);
        if (!isNaN(d.getTime())) return d.toISOString().slice(0, 10);
        return '';
    });

    const [informacoes, setInformacoes] = useState<string>(() => ('informacoes' in aluno) ? ((aluno as any).informacoes ?? '') : '');

    useEffect(() => {
        // keep initial sync if aluno prop changes
        const raw = ('dataNascimento' in aluno) ? ((aluno as any).dataNascimento ?? '') : '';
        if (raw) {
            const isoMatch = /^\d{4}-\d{2}-\d{2}/.test(raw);
            if (isoMatch) setDataNascimentoValue(raw.slice(0, 10));
            else {
                const dm = raw.match(/^(\d{2})\/(\d{2})\/(\d{4})/);
                if (dm) setDataNascimentoValue(`${dm[3]}-${dm[2]}-${dm[1]}`);
                else {
                    const d = new Date(raw);
                    if (!isNaN(d.getTime())) setDataNascimentoValue(d.toISOString().slice(0, 10));
                }
            }
        }
        if ('informacoes' in aluno) setInformacoes((aluno as any).informacoes ?? '');
    }, [aluno]);

    const displayDate = dataNascimentoValue ? new Date(dataNascimentoValue + 'T00:00:00').toLocaleDateString('pt-BR') : '';

    return (
        <div style={{ padding: '0 12mm', marginTop: 10 }}>
            <style>{`\n                .cert-input { display: inline-block; }\n                .cert-print-value { display: none; }\n                @media print {\n                  .cert-input { display: none !important; }\n                  .cert-print-value { display: block !important; color: #1f2937; }\n                }\n            `}</style>

            <h3 style={{ fontWeight: 700, marginBottom: 8 }}>DADOS DO ALUNO (A)</h3>
            <p style={{ margin: '6px 0' }}>NOME: {aluno.nome}</p>
            <p style={{ margin: '6px 0' }}>RG: {aluno.rg ?? ''}</p>
            <p style={{ margin: '6px 0' }}>CPF: {formatCPF(aluno.cpf ?? '')}</p>

            <div style={{ margin: '6px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
                <span style={{ minWidth: 0, textAlign: 'center' }}>DATA DE NASCIMENTO:</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
                    <input
                        className="cert-input"
                        type="date"
                        value={dataNascimentoValue}
                        onChange={(e) => setDataNascimentoValue(e.target.value)}
                        style={{ border: '1px solid #cbd5e1', padding: '6px 8px', borderRadius: 6, minWidth: 180, textAlign: 'center' }}
                    />
                    <span className="cert-print-value" aria-hidden style={{ minWidth: 80, textAlign: 'center' }}>{displayDate}</span>
                </div>
            </div>

            <div style={{ marginTop: 8 }}>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>INFORMAÇÕES ADICIONAIS:</label>
                <textarea
                    className="cert-input"
                    value={informacoes}
                    onChange={(e) => setInformacoes(e.target.value)}
                    rows={4}
                    style={{ width: '100%', border: '1px solid #e5e7eb', padding: 8, borderRadius: 6, resize: 'vertical' }}
                />
                <div className="cert-print-value" style={{ whiteSpace: 'pre-wrap', marginTop: 6 }}>{informacoes}</div>
            </div>
        </div>
    );
}
