import "reflect-metadata";
import { initializeDataSource } from "../src/lib/data-source";
import { Cursos } from "../src/database/entities/cursos.entity";

const cursosGeografia = [
  "BIOGEOGRAFIA",
  "BNCC E O ENSINO DA GEOGRAFIA",
  "ENSINO DA GEOGRAFIA",
  "ENSINO DA GEOGRAFIA NO ENSINO INFANTIL",
  "GEOGRAFIA",
  "GEOGRAFIA HUMANA",
  "FITOGEOGRAFIA",
  "GEOGRAFIA GERAL",
  "GEOGRAFIA BRASIL",
  "GEOGRAFIA DA POPULAÇÃO",
  "GEOGRAFIA AGRÁRIA"
];

const conteudoPadrao = JSON.stringify([
  "Fundamentos da geografia",
  "Espaço geográfico e sociedade",
  "Leitura e interpretação cartográfica",
  "Território, paisagem e região",
  "Aspectos físicos e humanos",
  "Aplicações pedagógicas no ensino"
]);

async function seedCursosGeografia() {
  try {
    const ds = await initializeDataSource();
    console.log("✅ Conectado ao banco de dados");

    const cursosRepo = ds.getRepository(Cursos);
    let criados = 0;
    let existentes = 0;

    for (const nome of cursosGeografia) {
      const cursoExistente = await cursosRepo.findOne({ where: { nome } });

      if (cursoExistente) {
        existentes += 1;
        console.log(`⏭️  Já existe: ${nome}`);
        continue;
      }

      const curso = cursosRepo.create({
        nome,
        duracao: 30,
        categoria: "GEOGRAFIA",
        conteudo: conteudoPadrao
      });

      await cursosRepo.save(curso);
      criados += 1;
      console.log(`✅ Criado curso: ${nome}`);
    }

    console.log("\n🎉 Cursos de GEOGRAFIA processados com sucesso!");
    console.log(`✅ Criados: ${criados}`);
    console.log(`⏭️  Já existentes: ${existentes}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Erro ao criar cursos de GEOGRAFIA:", error);
    process.exit(1);
  }
}

seedCursosGeografia();
