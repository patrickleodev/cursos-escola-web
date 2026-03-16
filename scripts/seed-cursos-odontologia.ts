import "reflect-metadata";
import { initializeDataSource } from "../src/lib/data-source";
import { Cursos } from "../src/database/entities/cursos.entity";

const categoriaOdontologia = "ODONTOLOGIA";

const conteudoPadrao = JSON.stringify([
  "Fundamentos e conceitos de saúde bucal",
  "Protocolos de atendimento odontológico",
  "Biossegurança e prevenção de riscos",
  "Comunicação e humanização no cuidado",
  "Ética, legislação e políticas públicas",
  "Aplicações práticas na rotina profissional"
]);

const nomesOdontologia = [
  "ACOLHIMENTO NA ODONTOLÓGICO",
  "ASPECTOS PSICOLÓGICOS E SOCIAIS DA SAÚDE BUCAL",
  "ATENDIMENTO DE CONSULTÓRIO ODONTOLÓGICO",
  "ATENDIMENTO AO PACIENTE ODONTOLÓGICO",
  "ATENDIMENTO ODONTOLÓGICO INDÍGENA",
  "ATUAÇÃO DO ASB NOS CENTROS DE SAÚDE",
  "AUTISMO E ODONTOLOGIA",
  "AUXILIAR DE PRÓTESE DENTÁRIA",
  "AUXILIAR DE SAÚDE BUCAL",
  "AVALIAÇÃO CLÍNICA DE PACIENTES ODONTOLÓGICOS",
  "BIOSSEGURANÇA EM ODONTOLOGIA",
  "CIMENTOS ODONTOLÓGICOS",
  "CONSULTÓRIO ODONTOLÓGICO ITINERANTE",
  "CUIDADOS PÓS-OPERATÓRIOS EM CIRURGIA BUCAL",
  "DOENÇAS BUCAIS",
  "EMERGÊNCIAS E URGÊNCIAS ODONTOLÓGICAS",
  "ENDODONTIA",
  "ÉTICA PROFISSIONAL EM ODONTOLOGIA",
  "GESTÃO EM ODONTOLOGIA",
  "HUMANIZAÇÃO NO ATENDIMENTO ODONTOLÓGICO",
  "LIMPEZA DE PRÓTESE DENTÁRIA",
  "MANEJO DA DOR EM ODONTOLOGIA",
  "MARKETING PARA DENTISTAS",
  "NR 32 - SST EM ESTABELECIMENTOS DE SAÚDE",
  "O IMPACTO DA PERDA DENTÁRIA NA AUTOESTIMA",
  "ODONTOFOBIA E SAÚDE BUCAL",
  "ODONTOGERIATRIA",
  "ODONTOLOGIA DO TRABALHO",
  "ODONTOLOGIA ESTÉTICA BÁSICA",
  "ODONTOLOGIA FORENSE",
  "ODONTOLOGIA INTEGRATIVA",
  "ODONTOLOGIA MINIMAMENTE INVASIVA",
  "ODONTOLOGIA NO SUS",
  "ODONTOLOGIA PARA PACIENTES ESPECIAIS",
  "ODONTOLOGIA PREVENTIVA",
  "ODONTOPEDIATRIA",
  "POLÍTICA NACIONAL DE SAÚDE BUCAL",
  "PRÁTICAS DE AUTOCUIDADO PARA PROFISSIONAIS DE SAÚDE",
  "PREVENÇÃO DE CÁRIES E PLACA BACTERIANA",
  "PROGRAMA BRASIL SORRIDENTE",
  "RADIOGRAFIA ODONTOLÓGICA BÁSICA",
  "RELAÇÃO DENTISTA-PACIENTE",
  "SAÚDE BUCAL",
  "SAÚDE BUCAL DA CRIANÇA",
  "SAÚDE BUCAL DO IDOSO",
  "SAÚDE BUCAL E DESIGUALDADE SOCIAL",
  "SAÚDE BUCAL EM COMUNIDADES CARENTES",
  "SAÚDE BUCAL INDÍGENA",
  "SAÚDE BUCAL NO SISTEMA ÚNICO DE SAÚDE",
  "SAÚDE BUCAL QUILOMBOLA",
  "SAÚDE BUCAL RIBEIRINHA",
  "TRABALHO DE TSB NOS CENTROS DE SAÚDE",
  "TRABALHO EM EQUIPE NO SETOR DE SAÚDE",
  "USO DE PRÓTESES DENTÁRIAS EM IDOSOS"
];

const cursosOdontologia = nomesOdontologia.map((nome) => ({
  nome,
  categoria: categoriaOdontologia,
  conteudo: conteudoPadrao
}));

async function seedCursosOdontologia() {
  try {
    const dataSource = await initializeDataSource();
    const cursoRepository = dataSource.getRepository(Cursos);

    for (const cursoData of cursosOdontologia) {
      const existente = await cursoRepository.findOne({
        where: { nome: cursoData.nome }
      });

      if (existente) {
        console.log(`Curso já existe: ${cursoData.nome}`);
        continue;
      }

      const curso = cursoRepository.create(cursoData);
      await cursoRepository.save(curso);
      console.log(`Criado curso: ${cursoData.nome}`);
    }

    console.log(`Categoria ${categoriaOdontologia} criada com sucesso.`);
    console.log(`${cursosOdontologia.length} cursos processados.`);
    process.exit(0);
  } catch (error) {
    console.error("Erro ao criar cursos:", error);
    process.exit(1);
  }
}

seedCursosOdontologia();
