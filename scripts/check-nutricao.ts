import "reflect-metadata";
import { initializeDataSource } from "../src/lib/data-source";
import { Cursos } from "../src/database/entities/cursos.entity";

async function checkNutricao() {
  const dataSource = await initializeDataSource();
  const cursoRepository = dataSource.getRepository(Cursos);

  // Check all unique categories
  const categorias = await cursoRepository
    .createQueryBuilder()
    .select("DISTINCT(categoria)", "categoria")
    .getRawMany();

  console.log("✓ Categorias no BD:");
  categorias.forEach((c: any) => console.log(`  - ${c.categoria}`));

  // Check nutrition courses
  const nutricaoCursos = await cursoRepository.find({
    where: { categoria: "NUTRIÇÃO E ALIMENTAÇÃO" }
  });

  console.log(`\n✓ Cursos em NUTRIÇÃO E ALIMENTAÇÃO: ${nutricaoCursos.length}`);
  if (nutricaoCursos.length > 0) {
    nutricaoCursos.slice(0, 5).forEach(c => console.log(`  - ${c.nome}`));
  }

  process.exit(0);
}

checkNutricao().catch(err => {
  console.error(err);
  process.exit(1);
});
