import "reflect-metadata";
import { initializeDataSource } from "../src/lib/data-source";

async function resetDatabase() {
  try {
    const ds = await initializeDataSource();
    await ds.dropDatabase();
    await ds.synchronize();
    console.log("✅ Banco resetado com sucesso!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Erro ao resetar banco:", error);
    process.exit(1);
  }
}

resetDatabase();
