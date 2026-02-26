import React, { useState } from "react";
import type { CSSProperties } from "react";
import type { Aluno } from "../../types";

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
  disciplinas: string[]; // disciplinas this page should render (chunked by caller)
  model: CertificadoModel;
  fontFamily: string;
  fontScale: number;
  footerLabel?: string;
}

export default function CertificadoGradeNotas({
  aluno,
  cursoNome,
  disciplinas,
  model,
  fontFamily,
  fontScale,
  footerLabel,
}: Props) {
  const style: CSSProperties & Record<string, string | number> = {
    pageBreakBefore: "always",
    "--cert-font-family": fontFamily,
    "--cert-font-scale": fontScale,
  };

  // ensure we render 18 rows per page (caller chunks by 18, but pad if needed)
  const rowsPerPage = 18;
  const padded = Array.from({ length: rowsPerPage }, (_, i) => disciplinas[i] ?? "");

  return (
    <div className={`segunda-pagina certificado-model-${model} relative bg-white mx-auto`} style={style}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "60%", maxWidth: 480, opacity: 0.08, zIndex: 0, pointerEvents: "none" }}>
        <img src="/logo.png" alt="Brasão" style={{ width: "100%", height: "auto", display: "block", objectFit: "contain" }} />
      </div>

      <div className="conteudo-central relative z-10" style={{ paddingTop: 20, color: "#1f2937" }}>
        <h3 style={{ color: "#b91c1c", fontWeight: 700, marginBottom: 10 }}>VECCHIATO ASSESSORIA EDUCACIONAL</h3>

        <div style={{ width: "100%", maxWidth: 780, margin: "0 auto" }}>
          <TableSection disciplinas={padded} footerLabel={footerLabel} />
        </div>

        <div style={{ height: 28 }} />

        <div style={{ textAlign: "center", marginTop: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 6 }}>
            <img src="/assinatura_michelle.png" alt="Assinatura Michelle" style={{ width: 220, maxWidth: '60%', height: 'auto', display: 'block' }} />
          </div>
          <p style={{ fontWeight: 700 }}>VECCHIATO ASSESSORIA EDUCACIONAL</p>
          <p>DIRETORA EDUCACIONAL</p>
          <p>MICHELLE C. VECCHIATO CRTP 2344</p>
        </div>
      </div>
    </div>
  );
}

function TableSection({ disciplinas, footerLabel }: { disciplinas: string[]; footerLabel?: string }) {
  // initialize state with disciplina from provided array; nota/falta/ch are editable
  const [data, setData] = useState(() =>
    disciplinas.map((d) => ({ disciplina: d ?? "", nota: "", falta: "", ch: "" }))
  );

  function updateCell(index: number, key: 'nota' | 'falta' | 'ch', value: string) {
    setData((prev) => {
      const copy = prev.slice();
      copy[index] = { ...copy[index], [key]: value };
      return copy;
    });
  }

  return (
    <div style={{ border: '1px solid #111827', padding: 8 }}>
      <style>{`
        .cert-input { display: inline-block; width: 100%; box-sizing: border-box; }
        .cert-print-value { display: none; }
        @media print {
          .cert-input { display: none !important; }
          .cert-print-value { display: block !important; }
        }
      `}</style>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f8fafc' }}>
            <th style={{ border: '1px solid #111827', padding: '8px 6px', textAlign: 'left', width: '70%' }}>DISCIPLINA</th>
            <th style={{ border: '1px solid #111827', padding: '8px 6px', width: '10%', textAlign: 'center' }}>NOTA</th>
            <th style={{ border: '1px solid #111827', padding: '8px 6px', width: '10%', textAlign: 'center' }}>FALTA</th>
            <th style={{ border: '1px solid #111827', padding: '8px 6px', width: '10%', textAlign: 'center' }}>CH</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              <td style={{ border: '1px solid #111827', padding: '6px' }}>
                <p style={{ margin: 0 }}>{row.disciplina}</p>
              </td>
              <td style={{ border: '1px solid #111827', padding: '6px', textAlign: 'center' }}>
                <input
                  className="cert-input"
                  type="number"
                  value={row.nota}
                  onChange={(e) => updateCell(i, 'nota', e.target.value)}
                  placeholder=""
                  style={{ textAlign: 'center' }}
                />
                <div className="cert-print-value" style={{ textAlign: 'center' }}>{row.nota}</div>
              </td>
              <td style={{ border: '1px solid #111827', padding: '6px', textAlign: 'center' }}>
                <input
                  className="cert-input"
                  type="number"
                  value={row.falta}
                  onChange={(e) => updateCell(i, 'falta', e.target.value)}
                  placeholder=""
                  style={{ textAlign: 'center' }}
                />
                <div className="cert-print-value" style={{ textAlign: 'center' }}>{row.falta}</div>
              </td>
              <td style={{ border: '1px solid #111827', padding: '6px', textAlign: 'center' }}>
                <input
                  className="cert-input"
                  value={row.ch}
                  onChange={(e) => updateCell(i, 'ch', e.target.value)}
                  placeholder=""
                  style={{ textAlign: 'center' }}
                />
                <div className="cert-print-value" style={{ textAlign: 'center' }}>{row.ch}</div>
              </td>
            </tr>
          ))}

          {/* footer row removed as requested */}
        </tbody>
      </table>
    </div>
  );
}
