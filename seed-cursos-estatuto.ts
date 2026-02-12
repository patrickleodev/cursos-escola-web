import "reflect-metadata";
import { initializeDataSource } from "./src/lib/data-source";
import { Cursos } from "./src/database/entities/cursos.entity";

const cursosEstatuto = [
  {
    nome: "ECA ESTATUTO DA CRIANÇA E DO ADOLESCENTE",
    categoria: "ESTATUTO",
    conteudo: JSON.stringify([
      "Histórico e finalidades do ECA",
      "Direitos fundamentais da criança e adolescente",
      "Políticas de atendimento",
      "Medidas de proteção e socioeducativas",
      "Conselho Tutelar",
      "Aplicação prática do ECA"
    ])
  },
  {
    nome: "ESTATUTO DA IGUALDADE RACIAL LEI 12.288",
    categoria: "ESTATUTO",
    conteudo: JSON.stringify([
      "Objetivos do estatuto",
      "Direitos e garantias fundamentais",
      "Educação, cultura e lazer",
      "Saúde e segurança",
      "Medidas de ações afirmativas",
      "Implementação e fiscalização"
    ])
  },
  {
    nome: "ESTATUTO DA JUVENTUDE LEI 12.852",
    categoria: "ESTATUTO",
    conteudo: JSON.stringify([
      "Direitos dos jovens",
      "Políticas públicas de juventude",
      "Educação e profissionalização",
      "Cultura, desporto e lazer",
      "Saúde e bem-estar",
      "Cidadania e participação política"
    ])
  },
  {
    nome: "ESTATUTO DA PESSOA COM DEFICIÊNCIA",
    categoria: "ESTATUTO",
    conteudo: JSON.stringify([
      "Direitos e garantias fundamentais",
      "Acessibilidade e inclusão",
      "Educação e capacitação profissional",
      "Saúde e cuidados",
      "Vida independente e autonomia",
      "Proteção contra discriminação"
    ])
  },
  {
    nome: "ESTATUTO DA PESSOA COM DEFICIÊNCIA LEI 13.146",
    categoria: "ESTATUTO",
    conteudo: JSON.stringify([
      "Princípios e direitos gerais",
      "Acessibilidade e desenho universal",
      "Direito à educação inclusiva",
      "Trabalho e emprego",
      "Acesso à justiça",
      "Responsabilidade e sanções"
    ])
  },
  {
    nome: "ESTATUTO DA SEGURANÇA PRIVADA",
    categoria: "ESTATUTO",
    conteudo: JSON.stringify([
      "Conceitos e definições",
      "Direitos e responsabilidades",
      "Fiscalização e controle",
      "Treinamento e capacitação",
      "Normas de conduta profissional",
      "Penalidades e infrações"
    ])
  },
  {
    nome: "ESTATUTO DO DESARMAMENTO",
    categoria: "ESTATUTO",
    conteudo: JSON.stringify([
      "Princípios e objetivos",
      "Registro e concessão de porte",
      "Posse de armas de fogo",
      "Comércio e distribuição",
      "Sanções e penalidades",
      "Educação para o desarmamento"
    ])
  },
  {
    nome: "ESTATUTO DO IDOSO",
    categoria: "ESTATUTO",
    conteudo: JSON.stringify([
      "Direitos fundamentais do idoso",
      "Políticas de atendimento",
      "Direito à saúde e assistência social",
      "Educação, cultura e desporto",
      "Medidas de proteção",
      "Penalidades e infrações administrativas"
    ])
  },
  {
    nome: "ESTATUTO DO ÍNDIO LEI 6.001",
    categoria: "ESTATUTO",
    conteudo: JSON.stringify([
      "Definições e princípios",
      "Direitos dos povos indígenas",
      "Terra indígena e demarcação",
      "Educação e saúde indígena",
      "Intervenção estatal",
      "Regulamentação e aplicação"
    ])
  },
  {
    nome: "ESTATUTO DO VIGILANTE",
    categoria: "ESTATUTO",
    conteudo: JSON.stringify([
      "Definições e categorias",
      "Direitos e deveres do vigilante",
      "Formação e treinamento obrigatório",
      "Normas de conduta",
      "Responsabilidades funcionais",
      "Infrações e sanções disciplinares"
    ])
  }
];

async function seedCursosEstatuto() {
  console.log("🌱 Iniciando seed da categoria ESTATUTO...");

  try {
    const dataSource = await initializeDataSource();
    const cursoRepository = dataSource.getRepository(Cursos);

    console.log("📦 Verificando cursos existentes...");

    for (const cursoData of cursosEstatuto) {
      const existente = await cursoRepository.findOne({
        where: { nome: cursoData.nome }
      });

      if (existente) {
        console.log(`⏭️  Curso já existe: ${cursoData.nome}`);
        continue;
      }

      const curso = cursoRepository.create(cursoData);
      await cursoRepository.save(curso);
      console.log(`✅ Criado curso: ${cursoData.nome}`);
    }

    console.log("\n🎉 Categoria ESTATUTO criada com sucesso!");
    console.log(`📚 ${cursosEstatuto.length} cursos adicionados!`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Erro ao criar cursos:", error);
    process.exit(1);
  }
}

seedCursosEstatuto();
