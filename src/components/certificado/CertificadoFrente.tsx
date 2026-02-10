import { formatCPF, formatRG } from "../../lib/formatters";
import type { Aluno } from "../../types";

interface CertificadoFrenteProps {
    aluno: Aluno;
    cursoNome: string;
    duracao: number;
    dataInicio: string;
    dataFim: string;
    qrCodeUrl: string;
    isFirstCertificate?: boolean;
}

export default function CertificadoFrente({
    aluno, cursoNome, duracao, dataInicio, dataFim, qrCodeUrl, isFirstCertificate = true
}: CertificadoFrenteProps) {
    return (
        <div
            className="certificado-print relative bg-white mx-auto"
            style={!isFirstCertificate ? { pageBreakBefore: 'always' } : {}}
        >
            {/* Bordas decorativas */}
            <div className="certificado-border-top"></div>
            <div className="certificado-border-bottom"></div>

            {/* Logo */}
            <div className="logo-container">
                <img src="/logo.png" alt="Logo" />
            </div>

            {/* QR Code */}
            {qrCodeUrl && (
                <div className="qr-code-container">
                    <img src={qrCodeUrl} alt="QR Code" />
                </div>
            )}

            {/* Conteúdo do certificado */}
            <div className="relative z-10" style={{ paddingTop: '20px' }}>
                {/* Cabeçalho */}
                <div className="text-center">
                    <h1 className="certificado-titulo">CERTIFICADO</h1>
                    <p className="instituicao-nome">Vecchiato Assessoria Educacional</p>
                </div>

                {/* Nome do aluno */}
                <div className="text-center mt-3 mb-3">
                    <p className="certificado-nome">{aluno.nome}</p>
                </div>

                {/* Informações do aluno - CPF e RG na mesma linha */}
                <div className="text-center mb-3">
                    <p className="info-aluno">
                        CPF: {formatCPF(aluno.cpf || "")} RG: {aluno.rg ? formatRG(aluno.rg) : ""}
                    </p>
                </div>

                {/* Descrição do curso */}
                <div className="text-center mb-4" style={{ marginTop: '70px' }}>
                    <div className="descricao-curso">
                        <p className="font-bold">CONCLUIU COM ÊXITO AO CURSO DE {cursoNome.toUpperCase()} COM {duracao}H</p>
                        <p>REALIZADO DE {dataInicio} A {dataFim}</p>
                    </div>
                </div>

                {/* Seção de assinatura */}
                <div className="assinatura-container">
                    <div className="assinatura-item">
                        <div style={{ height: '60px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', marginBottom: '15px' }}>
                            <p className="text-sm font-semibold mb-0 text-slate-900">{aluno.nome}</p>
                        </div>
                        <div className="assinatura-linha"></div>
                        <p className="text-xs mt-4 mb-0 text-slate-900">{formatCPF(aluno.cpf || "")}</p>
                    </div>
                    <div className="assinatura-item">
                        <div style={{ height: '60px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', marginBottom: '15px', position: 'relative' }}>
                            <p className="text-xs font-semibold mb-0 text-slate-900">VECCHIATO ASSESSORIA EDUCACIONAL</p>
                            <img 
                                src="/assinatura_michelle.png" 
                                alt="Assinatura Michelle Vecchiato" 
                                style={{ 
                                    position: 'absolute', 
                                    maxHeight: '200px', 
                                    maxWidth: '450px', 
                                    objectFit: 'contain', 
                                    bottom: '-50px', 
                                    left: '50%', 
                                    transform: 'translateX(-50%)', 
                                    zIndex: 10 
                                }} 
                            />
                        </div>
                        <div className="assinatura-linha"></div>
                        <p className="assinatura-titulo mb-0 mt-4">DIRETORA EDUCACIONAL</p>
                        <p className="text-xs mt-1 mb-0 text-slate-900">MICHELLE VECCHIATO CRTP 2344</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
