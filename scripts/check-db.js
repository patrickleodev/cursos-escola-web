require('reflect-metadata');
const { initializeDataSource } = require('../src/lib/data-source');
const { Cursos } = require('../src/database/entities/cursos.entity');

async function check() {
  try {
    const dataSource = await initializeDataSource();
    const repo = dataSource.getRepository(Cursos);
    
    // Get all categories
    const allCategorias = await repo.createQueryBuilder('curso').select('DISTINCT curso.categoria').getRawMany();
    console.log('\n=== CATEGORIAS NO BD ===');
    allCategorias.forEach(cat => console.log(`  ${cat.curso_categoria}`));
    
    // Count nutrition courses
    const nutCount = await repo.count({ where: { categoria: 'NUTRIÇÃO E ALIMENTAÇÃO' } });
    console.log(`\n=== CURSOS NUTRIÇÃO E ALIMENTAÇÃO ===`);
    console.log(`Total: ${nutCount}`);
    
    if (nutCount > 0) {
      const samples = await repo.find({ where: { categoria: 'NUTRIÇÃO E ALIMENTAÇÃO' }, take: 5 });
      console.log('Exemplos:');
      samples.forEach(s => console.log(`  - ${s.nome}`));
    }
    
    process.exit(0);
  } catch (e) {
    console.error('ERRO:', e.message);
    process.exit(1);
  }
}

check();
