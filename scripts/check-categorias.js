const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

async function check() {
  const ormPath = path.resolve(process.cwd(), 'ormconfig.json');
  if (!fs.existsSync(ormPath)) {
    console.error('ormconfig.json not found');
    process.exit(2);
  }

  const orm = JSON.parse(fs.readFileSync(ormPath, 'utf8'));
  const connectionString = orm.url || process.env.DATABASE_URL;
  if (!connectionString) {
    console.error('Database URL not found');
    process.exit(2);
  }

  const client = new Client({ connectionString });
  await client.connect();

  const esteticaSamples = [
    'ATENDENTE DE PERFUMARIA',
    'AUTOMAQUIAGEM',
    'CABELEIREIRO'
  ];

  const fisioSamples = [
    'FISIOTERAPIA BÁSICA',
    'INSTRUTOR DE PILATES',
    'BENEFÍCIOS DO PILATES PARA A SAÚDE'
  ];

  try {
    console.log('Verificando categoria ESTÉTICA E BELEZA...');
    const resE = await client.query('SELECT count(*)::int AS total FROM cursos WHERE categoria = $1', ['ESTÉTICA E BELEZA']);
    console.log(' Total de cursos encontrados:', resE.rows[0].total);

    for (const nome of esteticaSamples) {
      const r = await client.query('SELECT id FROM cursos WHERE nome = $1 LIMIT 1', [nome]);
      console.log(`  ${nome}:`, r.rowCount ? 'ENCONTRADO' : 'NÃO ENCONTRADO');
    }

    console.log('\nVerificando categoria FISIOTERAPIA E PILATES...');
    const resF = await client.query('SELECT count(*)::int AS total FROM cursos WHERE categoria = $1', ['FISIOTERAPIA E PILATES']);
    console.log(' Total de cursos encontrados:', resF.rows[0].total);

    for (const nome of fisioSamples) {
      const r = await client.query('SELECT id FROM cursos WHERE nome = $1 LIMIT 1', [nome]);
      console.log(`  ${nome}:`, r.rowCount ? 'ENCONTRADO' : 'NÃO ENCONTRADO');
    }

  } catch (err) {
    console.error('Erro na verificação:', err);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
}

check();
