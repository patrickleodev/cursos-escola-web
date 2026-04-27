import "reflect-metadata";
import { initializeDataSource } from "../src/lib/data-source";
import { Cursos } from "../src/database/entities/cursos.entity";

async function fixEmptyCategory() {
  console.log("Limpando categorias vazias...");
  
  try {
    const dataSource = await initializeDataSource();
    const cursoRepository = dataSource.getRepository(Cursos);

    // Find courses with empty category
    const emptyCategoria = await cursoRepository.find({
      where: { categoria: "" }
    });

    console.log(`Encontrados ${emptyCategoria.length} cursos com categoria vazia`);

    if (emptyCategoria.length > 0) {
      // Update to NUTRIÇÃO E ALIMENTAÇÃO instead of deleting
      for (const curso of emptyCategoria) {
        curso.categoria = "NUTRIÇÃO E ALIMENTAÇÃO";
        await cursoRepository.save(curso);
        console.log(`Atualizado: ${curso.nome} → NUTRIÇÃO E ALIMENTAÇÃO`);
      }
      console.log("✓ Categorias vazias atualizadas para NUTRIÇÃO E ALIMENTAÇÃO!");
    }

    process.exit(0);
  } catch (error) {
    console.error("Erro:", error);
    process.exit(1);
  }
}

fixEmptyCategory();
