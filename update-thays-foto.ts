import "reflect-metadata";
import { initializeDataSource } from "./src/lib/data-source";
import { Afiliadas } from "./src/database/entities/afiliadas.entity";

async function updateThaysFoto() {
  try {
    const ds = await initializeDataSource();
    console.log("✅ Conectado ao banco de dados");

    const afiliadasRepo = ds.getRepository(Afiliadas);

    // Encontrar Thays Oliveira
    const thays = await afiliadasRepo.findOne({
      where: { nome: "Thays Oliveira" }
    });

    if (!thays) {
      console.error("❌ Afiliada Thays Oliveira não encontrada");
      process.exit(1);
    }

    // Atualizar com a foto
    thays.foto = "/afiliadas/thays-oliveira.jpg";
    await afiliadasRepo.save(thays);

    console.log(`✅ Foto de Thays Oliveira atualizada com sucesso!`);
    console.log(`📸 Foto: /afiliadas/thays-oliveira.jpg`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Erro ao atualizar foto:", error);
    process.exit(1);
  }
}

updateThaysFoto();
