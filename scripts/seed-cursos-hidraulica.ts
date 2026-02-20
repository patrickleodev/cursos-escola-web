import "reflect-metadata";
import { initializeDataSource } from "../src/lib/data-source";
import { Cursos } from "../src/database/entities/cursos.entity";

const cursosHidraulica = [
  {
    nome: "ENGENHARIA HIDRÁULICA BÁSICA",
    categoria: "HIDRÁULICA",
    conteudo: JSON.stringify([
      "Fundamentos de hidráulica",
      "Propriedades dos fluidos",
      "Escoamento em condutos",
      "Perdas de carga",
      "Noções de hidrologia",
      "Aplicações em sistemas hidráulicos"
    ])
  },
  {
    nome: "HIDRÁULICA BÁSICA",
    categoria: "HIDRÁULICA",
    conteudo: JSON.stringify([
      "Conceitos essenciais de hidráulica",
      "Pressão e vazão",
      "Equações de continuidade",
      "Escoamento laminar e turbulento",
      "Instrumentos de medição",
      "Práticas e segurança"
    ])
  },
  {
    nome: "HIDRÁULICA AMBIENTAL",
    categoria: "HIDRÁULICA",
    conteudo: JSON.stringify([
      "Hidráulica aplicada ao meio ambiente",
      "Qualidade da água",
      "Controle de enchentes",
      "Drenagem urbana",
      "Sistemas de tratamento",
      "Impactos e mitigação"
    ])
  },
  {
    nome: "HIDRÁULICA E PNEUMÁTICA",
    categoria: "HIDRÁULICA",
    conteudo: JSON.stringify([
      "Princípios de hidráulica e pneumática",
      "Componentes e simbologia",
      "Circuitos hidráulicos",
      "Circuitos pneumáticos",
      "Manutenção e diagnóstico",
      "Segurança operacional"
    ])
  },
  {
    nome: "HIDRÁULICA INDUSTRIAL",
    categoria: "HIDRÁULICA",
    conteudo: JSON.stringify([
      "Sistemas hidráulicos industriais",
      "Bombas e válvulas",
      "Atuadores e controles",
      "Eficiência energética",
      "Manutenção preventiva",
      "Normas e boas práticas"
    ])
  },
  {
    nome: "INTRODUÇÃO À ENGENHARIA HIDRÁULICA",
    categoria: "HIDRÁULICA",
    conteudo: JSON.stringify([
      "Panorama da engenharia hidráulica",
      "Aplicações em infraestrutura",
      "Modelagem de escoamentos",
      "Sistemas de abastecimento",
      "Drenagem e saneamento",
      "Projeto e operação"
    ])
  }
];

async function seedCursosHidraulica() {
  try {
    const ds = await initializeDataSource();
    console.log("✅ Conectado ao banco de dados");

    const cursosRepo = ds.getRepository(Cursos);

    for (const cursoData of cursosHidraulica) {
      const cursoExistente = await cursosRepo.findOne({
        where: { nome: cursoData.nome }
      });

      if (cursoExistente) {
        console.log(`⚠️  Curso já existe: ${cursoData.nome}`);
        continue;
      }

      const curso = cursosRepo.create(cursoData);
      await cursosRepo.save(curso);
      console.log(`✅ Criado curso: ${cursoData.nome}`);
    }

    console.log("\n🎉 Categoria HIDRÁULICA criada com sucesso!");
    console.log(`📚 ${cursosHidraulica.length} cursos adicionados!`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Erro ao criar cursos:", error);
    process.exit(1);
  }
}

seedCursosHidraulica();
