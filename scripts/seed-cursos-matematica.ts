import "reflect-metadata";
import { initializeDataSource } from "../src/lib/data-source";
import { Cursos } from "../src/database/entities/cursos.entity";

const cursosMatemática = [
  {
    nome: "A importância da matemática nos anos iniciais",
    categoria: "MATEMÁTICA",
    conteudo: JSON.stringify([
      "Papel da matemática na formação infantil",
      "Desenvolvimento cognitivo e pensamento matemático",
      "Métodos de ensino adequados para primeiros anos",
      "Dificuldades comuns e superação",
      "Avaliação e acompanhamento",
      "Recursos didáticos eficazes"
    ])
  },
  {
    nome: "BNCC e o ensino da matemática",
    categoria: "MATEMÁTICA",
    conteudo: JSON.stringify([
      "Base Nacional Comum Curricular",
      "Competências matemáticas na BNCC",
      "Habilidades por ano escolar",
      "Integração com outras disciplinas",
      "Planejamento de aulas alinhadas à BNCC",
      "Avaliação conforme BNCC"
    ])
  },
  {
    nome: "Educação Matemática",
    categoria: "MATEMÁTICA",
    conteudo: JSON.stringify([
      "Fundamentos da educação matemática",
      "Teorias e metodologias de ensino",
      "Aprendizagem significativa",
      "Resolução de problemas",
      "Pensamento crítico matemático",
      "Formação de professores"
    ])
  },
  {
    nome: "Ensino de matemática na Educação Infantil",
    categoria: "MATEMÁTICA",
    conteudo: JSON.stringify([
      "Características do desenvolvimento infantil",
      "Conceitos básicos: números, formas, medidas",
      "Atividades lúdicas e exploratórias",
      "Ambientes preparados para aprendizagem",
      "Interação com crianças",
      "Acompanhamento do progresso"
    ])
  },
  {
    nome: "Jogos matemáticos na educação infanto-juvenil",
    categoria: "MATEMÁTICA",
    conteudo: JSON.stringify([
      "Importância do jogo na aprendizagem",
      "Tipos de jogos matemáticos",
      "Desenvolvimento de habilidades através do jogo",
      "Seleção de jogos adequados por faixa etária",
      "Regras e facilitação",
      "Avaliação através de jogos"
    ])
  },
  {
    nome: "Numeramento e alfabetização matemática",
    categoria: "MATEMÁTICA",
    conteudo: JSON.stringify([
      "Conceitos de numeramento e letramento matemático",
      "Desenvolvimento da compreensão numérica",
      "Processos de contagem e representação",
      "Operações básicas e raciocínio",
      "Conexão com a leitura e escrita matemática",
      "Superação de dificuldades"
    ])
  }
];

async function seedCursosMatemática() {
  console.log("🌱 Iniciando seed da categoria MATEMÁTICA...");

  try {
    const dataSource = await initializeDataSource();
    const cursoRepository = dataSource.getRepository(Cursos);

    console.log("📦 Verificando cursos existentes...");

    for (const cursoData of cursosMatemática) {
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

    console.log("\n🎉 Categoria MATEMÁTICA criada com sucesso!");
    console.log(`📚 ${cursosMatemática.length} cursos adicionados!`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Erro ao criar cursos:", error);
    process.exit(1);
  }
}

seedCursosMatemática();
