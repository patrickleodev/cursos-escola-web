const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

function extractArrayStrings(content, varName) {
  const re = new RegExp(`const\\s+${varName}\\s*=\\s*\\[([\\s\\S]*?)\\];`, 'm');
  const m = content.match(re);
  if (!m) return [];
  const inside = m[1];
  const items = [];
  const strRe = /(['"])(.*?)\1/g;
  let mm;
  while ((mm = strRe.exec(inside)) !== null) {
    items.push(mm[2]);
  }
  return items;
}

async function insertList(client, names, categoria) {
  let created = 0;
  for (const nome of names) {
    const conteudo = JSON.stringify({ descricao: `Curso de ${nome.toLowerCase()}` });
    const res = await client.query(
      `INSERT INTO cursos (nome, categoria, conteudo) VALUES ($1, $2, $3) ON CONFLICT (nome, categoria) DO NOTHING RETURNING id`,
      [nome, categoria, conteudo]
    );
    if (res.rowCount && res.rows.length > 0) created++;
  }
  return created;
}

async function main() {
  const base = path.resolve(process.cwd(), 'scripts');
  const esteticaPath = path.join(base, 'seed-cursos-estetica-beleza.ts');
  const fisioPath = path.join(base, 'seed-cursos-fisioterapia-pilates.ts');

  if (!fs.existsSync(esteticaPath) || !fs.existsSync(fisioPath)) {
    console.error('One or both seed files not found');
    process.exit(2);
  }

  const esteticaContent = fs.readFileSync(esteticaPath, 'utf8');
  const fisioContent = fs.readFileSync(fisioPath, 'utf8');

  const nomesEstetica = extractArrayStrings(esteticaContent, 'nomesEstetica');
  const cursosFisio = extractArrayStrings(fisioContent, 'cursosFisioterapia');

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

  try {
    console.log('Inserindo cursos de ESTÉTICA E BELEZA...');
    const c1 = await insertList(client, nomesEstetica, 'ESTÉTICA E BELEZA');
    console.log(`  Inseridos: ${c1}`);

    console.log('Inserindo cursos de FISIOTERAPIA E PILATES...');
    const c2 = await insertList(client, cursosFisio, 'FISIOTERAPIA E PILATES');
    console.log(`  Inseridos: ${c2}`);

    console.log('\nConcluído.');
  } catch (err) {
    console.error('Erro ao inserir:', err);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
}

main();
