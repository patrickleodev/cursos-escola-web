import "reflect-metadata";
import { AppDataSource } from "./src/lib/data-source";
import { Cursos } from "./src/database/entities/cursos.entity";

async function verificar() {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    
    const repo = AppDataSource.getRepository(Cursos);
    const enfermagem = await repo.count({ where: { categoria: "ENFERMAGEM" } });
    const total = await repo.count();
    
    console.log(`Total de cursos: ${total}`);
    console.log(`Cursos de Enfermagem: ${enfermagem}`);
    
    process.exit(0);
  } catch (error: any) {
    console.error("Erro:", error.message);
    process.exit(1);
  }
}

verificar();
