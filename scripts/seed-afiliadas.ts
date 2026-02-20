import "reflect-metadata";
import { initializeDataSource } from "../src/lib/data-source";
import { Afiliadas } from "../src/database/entities/afiliadas.entity";

const nomesAleatorios = [
  "Ana Silva",
  "Maria Santos",
  "Juliana Oliveira",
  "Carla Souza",
  "Beatriz Costa",
  "Fernanda Lima",
  "Patricia Almeida",
  "Renata Ferreira",
  "Camila Rodrigues",
  "Luciana Martins",
  "Mariana Pereira",
  "Gabriela Ribeiro",
  "Amanda Cardoso",
  "Bruna Mendes",
  "Vanessa Barbosa",
];

// Cores variadas para os avatares
const cores = ["FF6B6B", "4ECDC4", "45B7D1", "FFA07A", "98D8C8", "F7DC6F", "BB8FCE", "85C1E2", "F8B88B", "A8E6CF"];

async function seedAfiliadas() {
  try {
    const ds = await initializeDataSource();
    console.log("✅ Conectado ao banco de dados");

    const afiliadasRepo = ds.getRepository(Afiliadas);

    // Criar 15 afiliadas
    for (let i = 0; i < 15; i++) {
      const nome = nomesAleatorios[i];
      const cor = cores[i % cores.length];
      const iniciais = nome.split(' ').map(n => n[0]).join('');
      
      // Gerar avatar usando UI Avatars (texto no lugar de foto real)
      const fotoUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(nome)}&size=200&background=${cor}&color=fff&bold=true`;
      
      const afiliada = afiliadasRepo.create({
        nome: nome,
        foto: fotoUrl,
        whatsapp: "15981004777",
      });

      await afiliadasRepo.save(afiliada);
      console.log(`✅ Criada afiliada: ${nome}`);
    }

    console.log("\n🎉 15 afiliadas criadas com sucesso!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Erro ao criar afiliadas:", error);
    process.exit(1);
  }
}

seedAfiliadas();
