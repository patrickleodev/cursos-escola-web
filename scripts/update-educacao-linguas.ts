import "reflect-metadata";
import { initializeDataSource } from "../src/lib/data-source";
import { Cursos } from "../src/database/entities/cursos.entity";

const nomeAntigo = "A IMPORTÂNCIA DAS LINGUAS AFRICANAS NA LÍNGUA PORTUGUESA";
const nomeNovo = "A IMPORTÂNCIA DAS LÍNGUAS AFRICANAS NA LÍNGUA PORTUGUESA";

async function updateEducacaoLinguas() {
  try {
    const ds = await initializeDataSource();
    const cursosRepo = ds.getRepository(Cursos);

    const curso = await cursosRepo.findOne({ where: { nome: nomeAntigo } });

    if (!curso) {
      console.log(`⚠️ Curso não encontrado com o nome antigo: ${nomeAntigo}`);
      process.exit(0);
    }

    const jaExisteComNomeNovo = await cursosRepo.findOne({ where: { nome: nomeNovo } });

    if (jaExisteComNomeNovo) {
      console.log(`⚠️ Já existe curso com o nome novo: ${nomeNovo}`);
      process.exit(0);
    }

    curso.nome = nomeNovo;
    await cursosRepo.save(curso);

    console.log("✅ Nome do curso atualizado com sucesso!");
    console.log(`🔤 De: ${nomeAntigo}`);
    console.log(`🔤 Para: ${nomeNovo}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Erro ao atualizar nome do curso:", error);
    process.exit(1);
  }
}

updateEducacaoLinguas();
