import "reflect-metadata";
import { initializeDataSource } from "../src/lib/data-source";
import { Cursos } from "../src/database/entities/cursos.entity";

async function updateEstatutoCategoryName() {
  console.log("🔄 Corrigindo categoria 'STATUTO' para 'ESTATUTO'...");

  try {
    const dataSource = await initializeDataSource();
    const cursoRepository = dataSource.getRepository(Cursos);

    const cursos = await cursoRepository.find();

    if (cursos.length === 0) {
      console.log("ℹ️  Nenhum curso encontrado para atualizar.");
      process.exit(0);
    }

    const categoriaErrada = "STATUTO";
    const categoriaCorreta = "ESTATUTO";
    let totalAtualizados = 0;

    for (const curso of cursos) {
      const categoriaOriginal = (curso.categoria ?? "").trim();
      if (!categoriaOriginal) {
        continue;
      }

      if (categoriaOriginal.toLocaleUpperCase("pt-BR") === categoriaErrada) {
        curso.categoria = categoriaCorreta;
        await cursoRepository.save(curso);
        totalAtualizados += 1;
      }
    }

    if (totalAtualizados === 0) {
      console.log("ℹ️  Nenhuma ocorrência de 'STATUTO' encontrada.");
      process.exit(0);
    }

    console.log(`\n🎉 ${totalAtualizados} cursos atualizados para '${categoriaCorreta}'!`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Erro ao atualizar categoria:", error);
    process.exit(1);
  }
}

updateEstatutoCategoryName();