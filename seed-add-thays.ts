import "reflect-metadata";
import { initializeDataSource } from "./src/lib/data-source";
import { Afiliadas } from "./src/database/entities/afiliadas.entity";

async function addThaysOliveira() {
  try {
    const ds = await initializeDataSource();
    console.log("✅ Conectado ao banco de dados");

    const afiliadasRepo = ds.getRepository(Afiliadas);

    // Gerar avatar com o nome da afiliada
    const nome = "Thays Oliveira";
    const cor = "FF6B6B"; // Vermelho vibrante
    const fotoUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(nome)}&size=200&background=${cor}&color=fff&bold=true`;

    const afiliada = afiliadasRepo.create({
      nome: nome,
      foto: fotoUrl,
      whatsapp: "+55 95 9175-3953",
    });

    await afiliadasRepo.save(afiliada);
    console.log(`✅ Afiliada adicionada com sucesso: ${nome}`);
    console.log(`📱 WhatsApp: +55 95 9175-3953`);

    console.log("\n🎉 Thays Oliveira foi adicionada ao sistema!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Erro ao adicionar afiliada:", error);
    process.exit(1);
  }
}

addThaysOliveira();
