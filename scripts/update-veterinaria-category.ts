import "reflect-metadata";
import { initializeDataSource } from "../src/lib/data-source";
import { Cursos } from "../src/database/entities/cursos.entity";

async function updateVeterinariaCategoryName() {
  console.log("🔄 Iniciando normalização das categorias...");

  try {
    const dataSource = await initializeDataSource();
    const cursoRepository = dataSource.getRepository(Cursos);

    const cursos = await cursoRepository.find();

    if (cursos.length === 0) {
      console.log("ℹ️  Nenhum curso encontrado para atualizar.");
      process.exit(0);
    }

    const categoriaVeterinariaNova = "VETERINÁRIA, ZOOTECNIA E PETSHOP";
    const categoriasVeterinariaAntigas = new Set([
      "VETERINÁRIA E ZOOTECNIA",
      "VETERINÁRIA, ZOOTECNIA, PET SHOP",
      "VETERINÁRIA, ZOOTECNIA E PET SHOP",
    ]);

    let totalAtualizados = 0;
    let veterinariaAtualizados = 0;

    for (const curso of cursos) {
      const categoriaOriginal = (curso.categoria ?? "").trim();
      if (!categoriaOriginal) {
        continue;
      }

      const categoriaMaiuscula = categoriaOriginal.toLocaleUpperCase("pt-BR");
      const categoriaFinal = categoriasVeterinariaAntigas.has(categoriaMaiuscula)
        ? categoriaVeterinariaNova
        : categoriaMaiuscula;

      if (categoriaFinal !== categoriaOriginal) {
        curso.categoria = categoriaFinal;
        await cursoRepository.save(curso);
        totalAtualizados += 1;

        if (categoriaFinal === categoriaVeterinariaNova) {
          veterinariaAtualizados += 1;
        }
      }
    }

    if (totalAtualizados === 0) {
      console.log("ℹ️  Nenhuma alteração necessária. Categorias já estavam normalizadas.");
      process.exit(0);
    }

    console.log(`\n🎉 ${totalAtualizados} cursos atualizados com sucesso!`);
    console.log(`✨ ${veterinariaAtualizados} cursos definidos como '${categoriaVeterinariaNova}'.`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Erro ao atualizar cursos:", error);
    process.exit(1);
  }
}

updateVeterinariaCategoryName();
