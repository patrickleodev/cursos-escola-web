import "reflect-metadata";
import { initializeDataSource } from "../src/lib/data-source";
import { Cursos } from "../src/database/entities/cursos.entity";

const cursosEspecializacaoTecnica = [
  {
    nome: "TÉCNICO EM ADMINISTRAÇÃO",
    duracao: 1200,
    categoria: "ESPECIALIZAÇÃO TÉCNICA",
    conteudo: JSON.stringify([
      "Fundamentos da administração",
      "Gestão de recursos humanos",
      "Administração financeira e orçamentária",
      "Planejamento estratégico",
      "Gestão de processos e qualidade",
      "Marketing e vendas",
      "Legislação empresarial e trabalhista",
      "Empreendedorismo e inovação",
      "Tecnologia da informação aplicada",
      "Ética e responsabilidade social"
    ])
  },
  {
    nome: "TÉCNICO EM INFORMÁTICA",
    duracao: 1200,
    categoria: "ESPECIALIZAÇÃO TÉCNICA",
    conteudo: JSON.stringify([
      "Fundamentos de computação",
      "Sistemas operacionais",
      "Redes de computadores",
      "Programação e desenvolvimento de software",
      "Banco de dados",
      "Segurança da informação",
      "Manutenção de hardware",
      "Desenvolvimento web",
      "Suporte técnico e help desk",
      "Gestão de projetos de TI"
    ])
  },
  {
    nome: "TÉCNICO EM VENDAS",
    duracao: 1200,
    categoria: "ESPECIALIZAÇÃO TÉCNICA",
    conteudo: JSON.stringify([
      "Fundamentos de vendas e marketing",
      "Técnicas de negociação avançada",
      "Comportamento do consumidor",
      "Gestão de relacionamento com clientes (CRM)",
      "Estratégias de vendas B2B e B2C",
      "Marketing digital e vendas online",
      "Gestão de equipes comerciais",
      "Planejamento e controle de vendas",
      "Análise de mercado e concorrência",
      "Ética e legislação comercial"
    ])
  },
  {
    nome: "TÉCNICO EM CUIDADOR DE ALUNOS",
    duracao: 1200,
    categoria: "ESPECIALIZAÇÃO TÉCNICA",
    conteudo: JSON.stringify([
      "Desenvolvimento infantil e adolescente",
      "Psicologia educacional",
      "Necessidades educacionais especiais",
      "Primeiros socorros e saúde escolar",
      "Atividades recreativas e pedagógicas",
      "Comunicação e relacionamento interpessoal",
      "Alimentação e nutrição infantil",
      "Higiene e cuidados pessoais",
      "Legislação e direitos da criança e adolescente",
      "Ética profissional e inclusão"
    ])
  },
  {
    nome: "TÉCNICO EM CUIDADOR DE IDOSOS",
    duracao: 1200,
    categoria: "ESPECIALIZAÇÃO TÉCNICA",
    conteudo: JSON.stringify([
      "Envelhecimento e gerontologia",
      "Cuidados básicos com idosos",
      "Doenças comuns na terceira idade",
      "Primeiros socorros e emergências",
      "Administração de medicamentos",
      "Nutrição e alimentação do idoso",
      "Atividades terapêuticas e recreativas",
      "Comunicação e relacionamento com idosos",
      "Cuidados paliativos",
      "Legislação e direitos do idoso",
      "Ética profissional e humanização"
    ])
  }
];

async function seedCursosEspecializacaoTecnica() {
  try {
    const ds = await initializeDataSource();
    console.log("✅ Conectado ao banco de dados");

    const cursosRepo = ds.getRepository(Cursos);

    // Criar os 5 cursos de especialização técnica
    for (const cursoData of cursosEspecializacaoTecnica) {
      // Verificar se o curso já existe
      const cursoExistente = await cursosRepo.findOne({
        where: { nome: cursoData.nome }
      });

      if (cursoExistente) {
        console.log(`⚠️  Curso já existe: ${cursoData.nome}`);
        continue;
      }

      const curso = cursosRepo.create(cursoData);
      await cursosRepo.save(curso);
      console.log(`✅ Criado curso: ${cursoData.nome} (${cursoData.duracao}h)`);
    }

    console.log("\n🎉 Categoria ESPECIALIZAÇÃO TÉCNICA criada com sucesso!");
    console.log(`📚 ${cursosEspecializacaoTecnica.length} cursos técnicos adicionados!`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Erro ao criar cursos:", error);
    process.exit(1);
  }
}

seedCursosEspecializacaoTecnica();
