import "reflect-metadata";
import { initializeDataSource } from "../src/lib/data-source";
import { Cursos } from "../src/database/entities/cursos.entity";

const categoriaFarmacia = "FARMÁCIA";

const conteudoPadrao = JSON.stringify([
  "Fundamentos e conceitos da área farmacêutica",
  "Rotinas de dispensação, orientação e atendimento",
  "Biossegurança, armazenamento e controle de qualidade",
  "Gestão, legislação e boas práticas profissionais",
  "Segurança do paciente e uso racional de medicamentos",
  "Aplicações práticas na rotina da farmácia"
]);

const nomesFarmacia = [
  "ACONSELHAMENTO FARMACÊUTICO",
  "APERFEIÇOAMENTO EM FARMÁCIA HOSPITALAR",
  "ARMAZENAGEM DE MEDICAMENTOS",
  "ASSISTÊNCIA FARMACÊUTICA EM TERAPIAS INTENSIVAS",
  "ASSISTÊNCIA FARMACÊUTICA NO SUS",
  "ATENDENTE DE FARMÁCIA",
  "ATENDIMENTO FARMACÊUTICO DOMICILIAR",
  "ATENDIMENTO FARMACÊUTICO EM DROGARIA",
  "ATENÇÃO FARMACÊUTICA EM ONCOLOGIA",
  "ATENÇÃO FARMACÊUTICA NA FARMÁCIA CLÍNICA",
  "ATUAÇÃO DO FARMACÊUTICO HOSPITALAR NA UTI",
  "ATUAÇÃO DO FARMACÊUTICO NA FARMÁCIA DE MANIPULAÇÃO",
  "ATUAÇÃO DO FARMACÊUTICO NO SUS",
  "AUDITORIA FARMACÊUTICA",
  "AUTOMEDICAÇÃO E SAÚDE PÚBLICA",
  "AUXILIAR DE FARMÁCIA",
  "AUXILIAR DE FARMÁCIA DE MANIPULAÇÃO",
  "AUXILIAR DE FARMÁCIA HOSPITALAR",
  "BALCONISTA DE FARMÁCIA",
  "BÁSICO EM MANIPULAÇÃO DE MEDICAMENTOS",
  "BIOFARMÁCIA",
  "BIOSSEGURANÇA EM FARMÁCIAS E DROGARIAS",
  "BIOSSEGURANÇA EM SALA DE VACINA",
  "BOAS PRÁTICAS DE ARMAZENAMENTO E DISTRIBUIÇÃO DE MEDICAMENTOS",
  "BOAS PRÁTICAS DE DISPENSAÇÃO DE MEDICAMENTOS",
  "BOAS PRÁTICAS DE MANIPULAÇÃO DE MEDICAMENTOS",
  "BOAS PRÁTICAS EM FARMÁCIA HOSPITALAR",
  "BOAS PRÁTICAS EM VACINAÇÃO",
  "BOAS PRÁTICAS FARMACÊUTICAS",
  "CANNABIS MEDICINAL E SUAS APLICAÇÕES",
  "CAPACITAÇÃO DO PROFISSIONAL FARMACÊUTICO",
  "CÓDIGO DE ÉTICA FARMACÊUTICA",
  "CONSULTORIA FARMACÊUTICA",
  "CONTROLE DE ESTOQUE DE MEDICAMENTOS",
  "CONTROLE DE QUALIDADE DE MEDICAMENTOS",
  "CUIDADOS COM PACIENTES AUTISTAS",
  "CUIDADOS FARMACÊUTICOS E ENVELHECIMENTO",
  "DIREITOS E DEVERES DO FARMACÊUTICO",
  "DISPENSAÇÃO DE MEDICAMENTOS",
  "EDUCAÇÃO TERAPÊUTICA DO PACIENTE",
  "ÉTICA E LEGISLAÇÃO FARMACÊUTICA",
  "FARMACÊUTICO INTENSIVISTA E SEU TRABALHO NA UTI",
  "FARMÁCIA 4.0",
  "FARMÁCIA AMBULATORIAL",
  "FARMÁCIA CLÍNICA",
  "FARMÁCIA COMUNITÁRIA",
  "FARMÁCIA DE MANIPULAÇÃO",
  "FARMÁCIA E SAÚDE PÚBLICA",
  "FARMÁCIA ESTÉTICA",
  "FARMÁCIA HOSPITALAR",
  "FARMÁCIA INDUSTRIAL",
  "FARMACOLOGIA",
  "FARMACOLOGIA BÁSICA PARA AUXILIAR DE FARMÁCIA",
  "FARMACOLOGIA CLÍNICA",
  "FARMACOLOGIA GERAL",
  "FARMACOLOGIA OCULAR",
  "FARMACOLOGIA VETERINÁRIA",
  "FARMACOTÉCNICA",
  "FARMACOVIGILÂNCIA HOSPITALAR",
  "FISCALIZAÇÃO SANITÁRIA DE MEDICAMENTOS",
  "GERENTE DE FARMÁCIA",
  "GESTÃO DE FARMÁCIA HOSPITALAR",
  "GESTÃO DE FARMÁCIAS E DROGARIAS",
  "GESTÃO DE MEDICAMENTOS EM HOSPITAIS",
  "GESTÃO DE MEDICAMENTOS NO SUS",
  "GESTÃO DE MEDICAMENTOS PARA IDOSOS",
  "GESTÃO DE MEDICAMENTOS VENCIDOS E DESCARTES",
  "GESTÃO DE PESSOAS NA FARMÁCIA",
  "GESTÃO DE RESÍDUOS DE SERVIÇOS DE SAÚDE",
  "GESTÃO FARMACÊUTICA",
  "HOMEOPATIA",
  "IMPORTÂNCIA DO FARMACÊUTICO NA COSMETOLOGIA",
  "INTOXICAÇÃO POR MEDICAMENTOS",
  "LEI DOS MEDICAMENTOS GENÉRICOS (LEI N. 9.787)",
  "LOGÍSTICA FARMACÊUTICA",
  "LOGÍSTICA FARMACÊUTICA HOSPITALAR",
  "MARKETING FARMACÊUTICO",
  "NEUROFARMACOLOGIA",
  "NEUROPSICOFARMACOLOGIA",
  "NOTIFICAÇÃO DE EVENTOS ADVERSOS",
  "NR 32 - SST EM ESTABELECIMENTOS DE SAÚDE",
  "O PAPEL DO FARMACÊUTICO NA SAÚDE PÚBLICA",
  "ORIENTAÇÃO FARMACÊUTICA",
  "PAPEL DO FARMACÊUTICO NA APS",
  "PAPEL DO FARMACÊUTICO NA FARMÁCIA COMUNITÁRIA",
  "PAPEL DO FARMACÊUTICO NA FARMÁCIA HOSPITALAR",
  "PAPEL DO FARMACÊUTICO NA UTI",
  "POLÍTICA NACIONAL DE MEDICAMENTOS",
  "PROCEDIMENTOS TÉCNICOS EM SALA DE VACINA",
  "PROGRAMA FARMÁCIA POPULAR",
  "PSICOFARMACOLOGIA",
  "RADIOFARMÁCIA BÁSICA",
  "RESPONSABILIDADE SOCIAL DO FARMACÊUTICO",
  "SEGURANÇA DO PACIENTE",
  "SERVIÇOS FARMACÊUTICOS",
  "SERVIÇOS FARMACÊUTICOS EM AMBIENTE HOSPITALAR",
  "SUPERDOSAGEM DE MEDICAMENTOS",
  "TELEFARMÁCIA E ATENÇÃO FARMACÊUTICA",
  "TERAPÊUTICA FARMACOLÓGICA",
  "TERAPIA MEDICAMENTOSA",
  "TOXICOLOGIA DE MEDICAMENTOS",
  "VACINAÇÃO CONTRA DENGUE"
];

const cursosFarmacia = nomesFarmacia.map((nome) => ({
  nome,
  categoria: categoriaFarmacia,
  conteudo: conteudoPadrao
}));

async function seedCursosFarmacia() {
  console.log(` Iniciando seed da categoria ${categoriaFarmacia}...`);

  try {
    const dataSource = await initializeDataSource();
    const cursoRepository = dataSource.getRepository(Cursos);

    console.log(" Verificando cursos existentes...");

    for (const cursoData of cursosFarmacia) {
      const existente = await cursoRepository.findOne({
        where: { nome: cursoData.nome }
      });

      if (existente) {
        console.log(`  Curso já existe: ${cursoData.nome}`);
        continue;
      }

      const curso = cursoRepository.create(cursoData);
      await cursoRepository.save(curso);
      console.log(` Criado curso: ${cursoData.nome}`);
    }

    console.log(`\n Categoria ${categoriaFarmacia} criada com sucesso!`);
    console.log(` ${cursosFarmacia.length} cursos adicionados!`);
    process.exit(0);
  } catch (error) {
    console.error(" Erro ao criar cursos:", error);
    process.exit(1);
  }
}

seedCursosFarmacia();