import "reflect-metadata";
import { initializeDataSource } from "./src/lib/data-source";
import { Cursos } from "./src/database/entities/cursos.entity";

async function listarTodosEnfermagem() {
  try {
    const ds = await initializeDataSource();
    const cursosRepo = ds.getRepository(Cursos);

    // Maiúsculas
    const maiusculas = await cursosRepo.find({
      where: { categoria: "ENFERMAGEM" },
      order: { nome: "ASC" }
    });

    // Minúsculas
    const minusculas = await cursosRepo.find({
      where: { categoria: "Enfermagem" },
      order: { nome: "ASC" }
    });

    console.log(`\n📌 ENFERMAGEM (maiúscula): ${maiusculas.length}`);
    maiusculas.forEach((c, i) => console.log(`  ${i + 1}. ${c.nome}`));

    console.log(`\n📌 Enfermagem (minúscula): ${minusculas.length}`);
    minusculas.forEach((c, i) => console.log(`  ${i + 1}. ${c.nome}`));

    // Consolidar - atualizar "Enfermagem" para "ENFERMAGEM"
    if (minusculas.length > 0) {
      console.log(`\n🔄 Consolidando categorias...`);
      for (const curso of minusculas) {
        curso.categoria = "ENFERMAGEM";
        await cursosRepo.save(curso);
      }
      console.log(`✅ ${minusculas.length} cursos consolidados!\n`);
    }

    process.exit(0);
  } catch (error: any) {
    console.error("❌ Erro:", error.message);
    process.exit(1);
  }
}

listarTodosEnfermagem();
