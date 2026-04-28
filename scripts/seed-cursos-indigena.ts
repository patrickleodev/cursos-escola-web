import "reflect-metadata";
import { initializeDataSource } from "../src/lib/data-source";
import { Cursos } from "../src/database/entities/cursos.entity";

const categoriaIndigena = "INDÍGENA";

const conteudoPadrao = JSON.stringify([
  "Fundamentos e conceitos introdutórios",
  "História e contexto dos povos indígenas",
  "Aspectos culturais e sociais",
  "Legislação e políticas públicas",
  "Aplicações práticas e estudos de caso",
  "Reflexões e perspectivas contemporâneas"
]);

const nomesIndigena = [
  "AGENTE INDÍGENA DE SAÚDE",
  "ATENDIMENTO ODONTOLÓGICO INDÍGENA",
  "DIREITO DOS POVOS INDIGENAS",
  "CULTURA INDÍGENA BRASILEIRA",
  "DEMARCAÇÃO DE TERRAS INDIGENAS",
  "EDUCAÇÃO INDÍGENA",
  "EDUCAÇÃO INFANTIL INDÍGENA",
  "ESTATUTO DO INDIO ( LEI 6.001)",
  "ETNOLOGIA INDÍGENA",
  "INDIGENISMO",
  "INDIGENISTA BÁSICO",
  "POLITICA INDIGENISTA",
  "POLÍTICA NACIONAL DE ATENÇÃO À SAÚDE DOS POVOS INDIGENAS",
  "POVOS INDIGENAS E POLÍTICAS PÚBLICAS",
  "POVOS INDIGENAS NO BRASIL",
  "PROTEÇÃO DE TERRAS INDIGENAS",
  "SAÚDE DA POPULAÇÃO INDÍGENA",
  "SAÚDE BUCAL INDÍGENA",
  "TRABALHO SOCIAL COM FAMÍLIAS INDIGENAS",
  "JOGOS DOS POVOS INDIGENAS",
  "MITOLOGIA INDÍGENA BRASILEIRA",
  "ALFABETIZAÇÃO E LETRAMENTO INDÍGENA",
  "COSMOGONIA INDIGENA"
];

const cursosIndigena = nomesIndigena.map((nome) => ({
  nome,
  duracao: 30,
  categoria: categoriaIndigena,
  conteudo: conteudoPadrao
}));

async function seedCursosIndigena() {
  try {
    const ds = await initializeDataSource();
    console.log("✅ Conectado ao banco de dados");

    const cursosRepo = ds.getRepository(Cursos);

    for (const cursoData of cursosIndigena) {
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

    console.log("\n🎉 Cursos de INDÍGENA adicionados com sucesso!");
    console.log(`📚 ${cursosIndigena.length} cursos processados.`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Erro ao criar cursos de INDÍGENA:", error);
    process.exit(1);
  }
}

seedCursosIndigena();
