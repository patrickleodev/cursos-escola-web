import "reflect-metadata";
import { initializeDataSource } from "../src/lib/data-source";
import { Cursos } from "../src/database/entities/cursos.entity";

const categoriaEducacao = "EDUCAÇÃO";

const conteudoPadrao = JSON.stringify([
  "Fundamentos e conceitos introdutórios",
  "Práticas pedagógicas e metodologias",
  "Planejamento e organização didática",
  "Estratégias de acompanhamento e avaliação",
  "Relações escola, família e comunidade",
  "Aplicações práticas no contexto educacional"
]);

const nomesEducacao = [
  "A IMPORTÂNCIA DA EDUCAÇÃO ARTÍSTICA NA EDUCAÇÃO BÁSICA",
  "A IMPORTÂNCIA DA LEITURA NA EDUCAÇÃO INFANTIL",
  "A IMPORTÂNCIA DA LITERATURA NO ENSINO MÉDIO",
  "A IMPORTÂNCIA DO REFORÇO ESCOLAR",
  "A IMPORTÂNCIA DA MÚSICA NA EDUCAÇÃO",
  "A RELAÇÃO FAMÍLIA ESCOLA NA EDUCAÇÃO INFANTIL",
  "A IMPORTÂNCIA DAS LINGUAS AFRICANAS NA LÍNGUA PORTUGUESA",
  "ABORDAGEM PIKLER",
  "ABA E O TRATAMENTO DE CRIANÇAS COM AUTISMO",
  "ABANDONO E EVASÃO ESCOLAR",
  "ACOMPANHAMENTO ESCOLAR"
];

const cursosEducacao = nomesEducacao.map((nome) => ({
  nome,
  duracao: 30,
  categoria: categoriaEducacao,
  conteudo: conteudoPadrao
}));

async function seedCursosEducacao() {
  try {
    const ds = await initializeDataSource();
    console.log("✅ Conectado ao banco de dados");

    const cursosRepo = ds.getRepository(Cursos);

    for (const cursoData of cursosEducacao) {
      const cursoExistente = await cursosRepo.findOne({
        where: { nome: cursoData.nome }
      });

      if (cursoExistente) {
        console.log(`⚠️  Curso já existe: ${cursoData.nome}`);
        continue;
      }

      const curso = cursosRepo.create(cursoData);
      await cursosRepo.save(curso);
      console.log(`✅ Criado curso: ${cursoData.nome}`);
    }

    console.log("\n🎉 Cursos de EDUCAÇÃO adicionados com sucesso!");
    console.log(`📚 ${cursosEducacao.length} cursos processados.`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Erro ao criar cursos de EDUCAÇÃO:", error);
    process.exit(1);
  }
}

seedCursosEducacao();
