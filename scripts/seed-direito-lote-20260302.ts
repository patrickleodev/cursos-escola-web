import "reflect-metadata";
import { initializeDataSource } from "../src/lib/data-source";
import { Cursos } from "../src/database/entities/cursos.entity";

const categoria = "DIREITO";

const conteudoPadrao = JSON.stringify([
  "Fundamentos jurídicos e conceitos essenciais",
  "Legislação e normas aplicáveis",
  "Análise de casos e jurisprudência",
  "Procedimentos e práticas profissionais",
  "Ética, cidadania e direitos fundamentais",
  "Aplicações práticas no contexto jurídico"
]);

const listaBruta = `
1. ABUSO SEXUAL INFANTIL E MEDIDAS DE PROTEÇÃO
2. ACONSELHAMENTO JURÍDICO
3. ADMISSIBILIDADE CORRECIONAL
4. ADVOCACIA INTERNACIONAL
5. ANTITRUSTE E DIREITO CONCORRENCIONAL
6. ANTROPOLOGIA CRIMINAL
7. ANTROPOLOGIA FORENSE
8. ARGUMENTAÇÃO JURÍDICA
9. ASSISTENTE JURÍDICO
10. ATUAÇÃO DO PSICÓLOGO NO SISTEMA CRIMINAL
1. BALÍSTICA FORENSE
2. BIODIREITO
3. BIOLOGIA FORENSE
4. CÁRCERE E MARGINALIDADE SOCIAL
5. CARTÓRIO DE REGISTRO CIVIL DAS PESSOAS JURÍDICAS
6. CARTÓRIO DE REGISTRO CIVIL DAS PESSOAS NATURAIS
7. CARTÓRIO DE REGISTRO DE CONTRATOS MARÍTIMOS
8. CARTÓRIO DE REGISTRO DE IMÓVEIS
9. CARTÓRIO DE REGISTROS DE TÍTULOS E DOCUMENTOS
10. CIBERSEGURANÇA E CRIMES DIGITAIS
1. CIDADANIA
2. CIDADANIA E DIREITOS HUMANOS
3. CIDADANIA, ÉTICA E EDUCAÇÃO
4. CIÊNCIA FORENSE
5. CIÊNCIAS CRIMINAIS
6. CIÊNCIAS PENAIS
7. CÓDIGO DE DEFESA DO CONSUMIDOR (CDC)
8. CÓDIGO DE TRÂNSITO BRASILEIRO (CTB)
9. CÓDIGO FLORESTAL BRASILEIRO
10. COMBATE À DISCRIMINAÇÃO INTOLERÂNCIA E AO PRECONCEITO
1. COMBATE AO FEMINICÍDIO
2. COMBATE AO RACISMO
3. COMBATE AO TRÁGICO DE ÓRGÃOS
4. COMBATE AO TRÁGICO DE PESSOAS
5. COMPLIANCE TRABALHISTA
6. COMPUTAÇÃO FORENSE
7. CONDUTA E ÉTICA PROFISSIONAL EM CARTÓRIOS
8. CONSOLIDAÇÃO DAS LEIS DE TRABALHO (CLT)
9. CONSTITUIÇÃO FEDERAL DE 1988
10. CONTRATO SOCIAL
1. CONTRATOS BANCÁRIOS
2. CONTRATOS EMPRESARIAIS
3. CONTROLADORIA JURÍDICA
4. CORRESPONDENTE JURÍDICO
5. CORRUPÇÃO POLÍTICA
6. CRIMES CONTRA ANIMAIS
7. CRIMES CONTRA O MEIO AMBIENTE
8. CRIMES DE TRÂNSITO
9. CRIMES ELEITORAIS
10. CRIMINAL COMPLIANCE
1. CRIMINAL PROFILING
2. CRIMINALÍSTICA
3. CRIMINALIZAÇÃO DAS TORCIDAS ORGANIZADAS
4. CRIMINALIZAÇÃO DO RACISMO
5. CRIMINOLOGIA
6. CRIMINOLOGIA AMBIENTAL
7. CRIMINOLOGIA EMPRESARIAL
8. DATILOSCOPIA
9. DECLARAÇÃO UNIVERSAL DOS DIREITOS HUMANOS (DUDH)
10. DEFENSORIA PÚBLICA E DIREITOS HUMANOS
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

async function seedDireitoLote() {
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

    console.log("\n🎉 Lote de DIREITO processado com sucesso!");
    console.log(`📌 Total na lista (sem numeração/duplicatas): ${nomes.length}`);
    console.log(`✅ Criados: ${criados}`);
    console.log(`⏭️  Já existentes: ${existentes}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Erro ao processar lote de DIREITO:", error);
    process.exit(1);
  }
}

seedDireitoLote();
