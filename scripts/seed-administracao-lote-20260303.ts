import "reflect-metadata";
import { initializeDataSource } from "../src/lib/data-source";
import { Cursos } from "../src/database/entities/cursos.entity";

const categoria = "ADMINISTRAÇÃO";

const conteudoPadrao = JSON.stringify([
  "Fundamentos da administração",
  "Gestão de processos e recursos",
  "Planejamento estratégico e operacional",
  "Liderança, comunicação e cultura organizacional",
  "Compliance, governança e controle",
  "Aplicações práticas em ambientes organizacionais"
]);

const listaBruta = `
1. ADMINISTRAÇÃO DE CASA DE REPOUSO
2. ADMINISTRAÇÃO DE CLÍNICA VETERINÁRIA
3. ADMINISTRAÇÃO DE CONDOMÍNIOS E LOCAÇÃO DE IMÓVEIS
4. ADMINISTRAÇÃO DE EMPRESAS
5. ADMINISTRAÇÃO DE ESTACIONAMENTO
6. ADMINISTRAÇÃO DE FINANÇAS
7. ADMINISTRAÇÃO DE GARAGENS
8. ADMINISTRAÇÃO DE HOTÉIS
9. ADMINISTRAÇÃO DE MARKETING
10. ADMINISTRAÇÃO DE MATERIAIS NA ESCOLA
11. ADMINISTRAÇÃO DE PET SHOP
12. ADMINISTRAÇÃO DE RH
13. ADMINISTRAÇÃO DE SERVIÇO HOSPITALARES
14. ADMINISTRAÇÃO DE VENDAS
15. ADMINISTRAÇÃO DE TEMPO
16. ADMINISTRAÇÃO EM ENFERMAGEM
17. ADMINISTRAÇÃO EM SAÚDE
18. ADMINISTRAÇÃO ESCOLAR
19. ADMINISTRAÇÃO ESTRATÉGICA
20. ADMINISTRAÇÃO FINANCEIRA
21. ADMINISTRAÇÃO HOSPITALAR
22. ADMINISTRAÇÃO PÚBLICA
23. ADMINISTRAÇÃO RURAL
24. ADMINISTRADOR DE CONDOMÍNIOS
25. AGENTE ADMINISTRATIVO
26. AGENTE ADMINISTRATIVO EDUCACIONAL
27. AGENTE ADMINISTRATIVO ESCOLAR
28. ALMOXARIFADO
29. ANALISTA ADMINISTRATIVO
30. ANALISTA DE COMPLIANCE
31. ANALISTA DE CONTRATOS
32. ANALISTA DE PROJETOS
33. APERFEIÇOAMENTO EM COMPLIANCE
34. APERFEIÇOAMENTO EM GESTÃO DE PESSOAS
35. ARQUIVOLOGIA
36. ASSISTENTE ADMINISTRATIVO
37. AUXILIAR ADMINISTRATIVO
38. AUXILIAR DE ALMOXARIFADO
39. AUXILIAR DE CADASTRO
40. AUXILIAR DE COBRANÇA
41. AUXILIAR DE COMPRAS E SUPRIMENTOS
42. AUXILIAR DE ESCRITÓRIO
43. AUXILIAR DE GERÊNCIA
44. BARBEARIA DE SUCESSO
45. BOAS PRÁTICAS DE COMPLIANCE
46. BUSINESS INTELLIGENCE
47. CHEFIA E LIDERANÇA
48. CLIENTOLOGIA
49. CLIMA ORGANIZACIONAL
50. COMÉRCIO EXTERIOR
51. COMPLIANCE CONCORRENCIAL
52. COMPLIANCE DIGITAL
53. COMPLIANCE E GOVERNANÇA CORPORATIVA
54. COMPLIANCE NO SETOR PÚBLICO
55. COMPLIANCE TRABALHISTA
56. COMPORTAMENTO ORGANIZACIONAL
57. COMUNICAÇÃO ADMINITRATIVA
58. COMUNICAÇÃO E LIDERANÇA
59. COMUNICAÇÃO EMPRESARIAL
60. COMUNICAÇÃO INTERNA
61. COMUNICAÇÃO ORGANIZACIONAL
62. COMUNICAÇÃO PARA NEGÓCIOS
63. COMUNICAÇÃO EMPRESARIAL
64. CONSULTORIA COMERCIAL
65. CONSULTORIA EM COMPLIANCE
66. CONSULTORIA EMPRESARIAL
67. CONTRATO SOCIAL
68. CONTRATOS EMPRESARIAIS
69. CONTROLE DE PROCESSOS ADMINISTRATIVOS
70. CONTROLE DE RISCOS E SINISTROS
71. CRIMINAL COMPLIANCE
72. CRIMINOLOGIA EMPRESARIAL
73. CULTURA ORGANIZACIONAL
74. CUSTOMER EXPERIENCE
75. DESENVOLVIMENTO DE EQUIPES
76. DESENVOLVIMENTO DE LIDERANÇAS
77. DESENVOLVIMENTO HUMANO E ORGANIZACIONAL (DHO)
78. DESENVOLVIMENTO ORGANIZACIONAL
79. DESIGN THINKING
80. DIGITADOR
81. DIREITO ADMINISTRATIVO
82. DIREITO CONTRATUAL
83. DIREITO EMPRESARIAL
84. DIREITO SOCIETÁRIO
85. DUE DILIGENCE
86. ECONOMIA CRIATIVA
87. EDUCAÇÃO CORPORATIVA
88. ELABORAÇÃO DE LAUDOS E PARECERES TÉCNICOS
89. EMPREENDEDORISMO
90. EMPREENDEDORISMO DIGITAL
91. EMPREENDEDORISMO SOCIAL
92. EMPREENDEDORISMO DE SUCESSO
93. ENCANTAMENTO DO CLIENTE
94. ESCRITÓRIO DE GERENCIAMENTO DE PROJETOS (EGP)
95. ESPANHOL BÁSICO PARA NEGÓCIOS
96. ESTRATÉGIA COMPETITIVA
97. ÉTICA EMPRESARIAL
98. ÉTICA NO SERVIÇO PÚBLICO
99. EXCEL BÁSICO
100. FINANÇAS EMPRESARIAIS
`;

function extrairNomesDaLista(lista: string): string[] {
  return [...new Set(
    lista
      .split("\n")
      .map((linha) => linha.trim())
      .filter((linha) => linha.length > 0)
      .filter((linha) => /^\d+\./.test(linha))
      .map((linha) => linha.replace(/^\d+\.\s*/, "").trim())
  )];
}

async function seedAdministracaoLote() {
  try {
    const ds = await initializeDataSource();
    const cursosRepo = ds.getRepository(Cursos);

    const nomes = extrairNomesDaLista(listaBruta);
    let criados = 0;
    let existentes = 0;

    for (const nome of nomes) {
      const cursoExistente = await cursosRepo.findOne({ where: { nome } });

      if (cursoExistente) {
        existentes += 1;
        console.log(`⏭️  Já existe: ${nome}`);
        continue;
      }

      const curso = cursosRepo.create({
        nome,
        duracao: 30,
        categoria,
        conteudo: conteudoPadrao
      });

      await cursosRepo.save(curso);
      criados += 1;
      console.log(`✅ Criado curso: ${nome}`);
    }

    console.log("\n🎉 Lote de ADMINISTRAÇÃO processado com sucesso!");
    console.log(`📌 Total na lista (sem numeração/duplicatas): ${nomes.length}`);
    console.log(`✅ Criados: ${criados}`);
    console.log(`⏭️  Já existentes: ${existentes}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Erro ao processar lote de ADMINISTRAÇÃO:", error);
    process.exit(1);
  }
}

seedAdministracaoLote();
