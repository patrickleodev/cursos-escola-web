import "reflect-metadata";
import { initializeDataSource } from "../src/lib/data-source";
import { Cursos } from "../src/database/entities/cursos.entity";

async function verificarCursos() {
  try {
    const ds = await initializeDataSource();
    console.log("✅ Conectado ao banco de dados\n");

    const cursosRepo = ds.getRepository(Cursos);

    // Contar total de cursos
    const totalCursos = await cursosRepo.count();
    console.log(`📊 Total de cursos no banco: ${totalCursos}\n`);

    // Contar por categoria
    const categorias = await cursosRepo
      .createQueryBuilder("curso")
      .select("curso.categoria", "categoria")
      .addSelect("COUNT(*)", "total")
      .groupBy("curso.categoria")
      .orderBy("total", "DESC")
      .getRawMany();

    console.log("📂 Cursos por categoria:");
    categorias.forEach((cat: any) => {
      console.log(`   ${cat.categoria}: ${cat.total} cursos`);
    });

    // Listar especificamente cursos de Enfermagem
    const enfermagem = await cursosRepo.find({
      where: { categoria: "ENFERMAGEM" }
    });

    console.log(`\n💊 Cursos de ENFERMAGEM (${enfermagem.length}):`);
    enfermagem.forEach((curso, index) => {
      console.log(`   ${index + 1}. ${curso.nome}`);
    });

    process.exit(0);
  } catch (error) {
    console.error("❌ Erro:", error);
    process.exit(1);
  }
}

verificarCursos();
