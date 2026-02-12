import "reflect-metadata";
import { initializeDataSource } from "./src/lib/data-source";
import { Cursos } from "./src/database/entities/cursos.entity";

async function updateVeterinariaCategoryName() {
  console.log("🔄 Iniciando atualização da categoria VETERINÁRIA E ZOOTECNIA...");

  try {
    const dataSource = await initializeDataSource();
    const cursoRepository = dataSource.getRepository(Cursos);

    // Encontrar todos os cursos com a categoria antiga
    const cursosAntigos = await cursoRepository.find({
      where: { categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP" }
    });

    if (cursosAntigos.length === 0) {
      console.log("ℹ️  Nenhum curso encontrado com a categoria antiga.");
      process.exit(0);
    }

    console.log(`📦 Encontrados ${cursosAntigos.length} cursos com a categoria antiga...`);

    // Atualizar a categoria
    for (const curso of cursosAntigos) {
      curso.categoria = "VETERINÁRIA E ZOOTECNIA";
      await cursoRepository.save(curso);
      console.log(`✅ Atualizado: ${curso.nome}`);
    }

    console.log(`\n🎉 ${cursosAntigos.length} cursos atualizados com sucesso!`);
    console.log("✨ Categoria renomeada de 'VETERINÁRIA, ZOOTECNIA, PET SHOP' para 'VETERINÁRIA E ZOOTECNIA'");
    process.exit(0);
  } catch (error) {
    console.error("❌ Erro ao atualizar cursos:", error);
    process.exit(1);
  }
}

updateVeterinariaCategoryName();
