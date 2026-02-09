export const certificadoStyles = `
  /* Estilos gerais para o certificado (desktop e print) */
  .certificado-print {
    background: linear-gradient(135deg, #f5f1e8 0%, #faf8f3 50%, #f5f1e8 100%) !important;
    position: relative;
    overflow: hidden;
    width: 297mm;
    height: 210mm;
    margin: 0 auto;
    padding: 25mm 40mm;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    color-adjust: exact;
  }

  .certificado-border-top,
  .certificado-border-bottom {
    position: absolute;
    left: 0;
    right: 0;
    height: 40px;
    background: #dc2626;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    color-adjust: exact;
  }

  .certificado-border-top {
    top: 0;
  }

  .certificado-border-bottom {
    bottom: 0;
  }

  .qr-code-container {
    position: absolute;
    top: 60px;
    right: 40px;
    width: 120px;
    height: 120px;
    border: 2px solid #1e3a8a !important;
    background: white !important;
    padding: 5px;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    color-adjust: exact;
  }

  .qr-code-container img {
    width: 100%;
    height: 100%;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    color-adjust: exact;
  }

  .logo-container {
    position: absolute;
    top: 60px;
    left: 40px;
    width: 140px;
    height: 140px;
    display: flex;
    align-items: center;
    justify-content: center;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    color-adjust: exact;
  }

  .logo-container img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    color-adjust: exact;
  }

  .certificado-titulo {
    color: #1e3a8a !important;
    font-weight: 900 !important;
    font-size: 42px !important;
    letter-spacing: 2px !important;
    margin-top: 10px;
  }

  .instituicao-nome {
    color: #374151 !important;
    font-size: 16px !important;
    font-weight: 500;
    margin: 8px 0 15px 0;
    letter-spacing: 0.5px;
  }

  .certificado-nome {
    color: #1f2937 !important;
    font-size: 32px !important;
    font-weight: bold !important;
    margin: 15px 0;
    letter-spacing: 1px;
  }

  .info-aluno {
    color: #374151 !important;
    font-size: 14px !important;
    margin: 10px 0;
    letter-spacing: 0.5px;
    font-weight: 500;
  }

  .descricao-curso {
    color: #1f2937 !important;
    font-size: 14px !important;
    font-weight: 600;
    margin: 10px 0;
    letter-spacing: 0.5px;
    line-height: 1.6;
  }

  .assinatura-container {
    display: flex;
    justify-content: space-between;
    margin-top: 80px;
    padding-top: 30px;
  }

  .assinatura-item {
    text-align: center;
    flex: 0 0 45%;
  }

  .assinatura-linha {
    border-top: 2px solid #1e3a8a;
    margin: 5px 0;
    width: 100%;
  }

  .assinatura-titulo {
    color: #1f2937 !important;
    font-weight: 600;
    font-size: 12px !important;
    margin-top: 12px;
  }

  @media print {
    .assinatura-container {
      margin-top: 120px;
      padding-top: 30px;
    }

    .assinatura-linha {
      margin: 3px 0;
    }
  }

  .segunda-pagina {
    background: linear-gradient(135deg, #f5f1e8 0%, #faf8f3 50%, #f5f1e8 100%) !important;
    position: relative;
    overflow: hidden;
    width: 297mm;
    height: 210mm;
    margin: 20px auto 0;
    padding: 25mm 40mm;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    color-adjust: exact;
    page-break-before: always;
  }

  .conteudo-central {
    text-align: center;
    padding-top: 20px;
  }

  .conteudo-grid {
    display: grid;
    gap: 3rem;
    text-align: left;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .conteudo-coluna {
    min-width: 0;
  }

  .conteudo-coluna p {
    margin: 0 0 0.4rem 0;
    line-height: 1.4;
    page-break-inside: avoid;
    break-inside: avoid;
    word-wrap: break-word;
  }

  @page {
    margin: 0;
    size: A4 landscape;
  }

  @media print {
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      background: white !important;
      margin: 0;
      padding: 0;
    }

    html {
      margin: 0;
      padding: 0;
    }

    .certificate-container {
      page-break-after: avoid;
      padding: 0 !important;
      background: white !important;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
      color-adjust: exact;
    }

    .certificado-print {
      width: 297mm;
      height: 210mm;
      margin: 0;
      padding: 25mm 40mm;
      box-shadow: none !important;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
      color-adjust: exact;
    }

    .segunda-pagina {
      width: 297mm;
      height: 210mm;
      margin: 0 !important;
      padding: 25mm 40mm;
      box-shadow: none !important;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
      color-adjust: exact;
    }
  }
`;
