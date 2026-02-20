import "reflect-metadata";
import { initializeDataSource } from "../src/lib/data-source";
import { Cursos } from "../src/database/entities/cursos.entity";

const cursosAFalta = [
  {
    nome: "ASSISTÊNCIA DE ENFERMAGEM AO PACIENTE ACAMADO",
    duracao: 35,
    categoria: "ENFERMAGEM",
    conteudo: JSON.stringify([
      "Mobilização adequada do paciente",
      "Prevenção de úlceras por pressão",
      "Higiene e conforto do acamado",
      "Monitorização contínua",
      "Comunicação com paciente dependente",
      "Orientação à família cuidadora"
    ])
  },
  {
    nome: "ASSISTÊNCIA DE ENFERMAGEM AO PACIENTE ONCOLÓGICO",
    duracao: 40,
    categoria: "ENFERMAGEM",
    conteudo: JSON.stringify([
      "Oncologia e tipos de câncer",
      "Tratamentos oncológicos",
      "Efeitos colaterais e manejo",
      "Apoio psicológico em câncer",
      "Prevenção de complicações",
      "Qualidade de vida oncológica"
    ])
  },
  {
    nome: "ACOLHIMENTO HUMANIZADO",
    duracao: 25,
    categoria: "ENFERMAGEM",
    conteudo: JSON.stringify([
      "Humanização em saúde",
      "Comunicação não violenta",
      "Aspectos emocionais do paciente",
      "Acolhimento na recepção",
      "Gestão de conflitos humanizado",
      "Qualidade de vida do paciente"
    ])
  },
  {
    nome: "ATENDIMENTO HUMANIZADO NA SAÚDE",
    duracao: 25,
    categoria: "ENFERMAGEM",
    conteudo: JSON.stringify([
      "Humanização em saúde",
      "Relação interpessoal efetiva",
      "Acolhimento ao paciente",
      "Respeito à diversidade",
      "Comunicação empática",
      "Satisfação do usuário"
    ])
  },
  {
    nome: "AUXILIAR DE COLETA DE EXAMES LABORATORIAIS",
    duracao: 30,
    categoria: "ENFERMAGEM",
    conteudo: JSON.stringify([
      "Tipos de exames laboratoriais",
      "Técnica de punção venosa",
      "Tipos de tubos de coleta",
      "Identificação de amostras",
      "Cuidados com o paciente",
      "Biossegurança na coleta"
    ])
  },
  {
    nome: "BIOSSEGURANÇA EM SALA DE VACINA",
    duracao: 25,
    categoria: "ENFERMAGEM",
    conteudo: JSON.stringify([
      "Imunizações básicas",
      "Conservação de vacinas",
      "Técnica de aplicação",
      "Protocolo de biossegurança",
      "Manejo de resíduos vacinais",
      "Eventos adversos pós-vacinação"
    ])
  }
];

async function adicionarFaltantes() {
  try {
    const ds = await initializeDataSource();
    console.log("✅ Conectado ao banco de dados");

    const cursosRepo = ds.getRepository(Cursos);

    for (const curso of cursosAFalta) {
      const existente = await cursosRepo.findOne({
        where: { nome: curso.nome }
      });

      if (!existente) {
        const novoCurso = cursosRepo.create(curso);
        await cursosRepo.save(novoCurso);
        console.log(`✅ Adicionado: ${curso.nome}`);
      } else {
        console.log(`⏭️  Já existe: ${curso.nome}`);
      }
    }

    console.log("\n🎉 Cursos de enfermagem completados!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Erro:", error);
    process.exit(1);
  }
}

adicionarFaltantes();
