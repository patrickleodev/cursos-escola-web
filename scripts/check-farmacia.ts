import { Pool } from "pg";
import fs from "fs";
import path from "path";

let connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  try {
    const ormconfigPath = path.resolve(process.cwd(), "ormconfig.json");
    const ormconfig = JSON.parse(fs.readFileSync(ormconfigPath, "utf8"));
    connectionString = ormconfig.url;
  } catch (e) {
    console.error("Não foi possível ler a configuração do banco");
    process.exit(1);
  }
}

const pool = new Pool({ connectionString });

async function checkFarmacia() {
  try {
    console.log("🔍 Verificando categoria Farmácia...\n");

    // Todas as categorias
    const categorias = await pool.query(
      `
      SELECT DISTINCT categoria 
      FROM cursos 
      ORDER BY categoria ASC
    `
    );

    console.log("📚 Todas as categorias no banco:");
    categorias.rows.forEach((row, idx) => {
      console.log(`  ${idx + 1}. ${row.categoria}`);
    });

    // Cursos da farmácia
    const cursosFarmacia = await pool.query(
      `
      SELECT id, nome, duracao, categoria
      FROM cursos 
      WHERE categoria = 'Farmácia'
      ORDER BY nome ASC
    `
    );

    console.log(`\n💊 Categoria FARMÁCIA:`);
    if (cursosFarmacia.rows.length === 0) {
      console.log("  ❌ Não encontrada ou sem cursos");
    } else {
      console.log(`  ✓ Encontrada com ${cursosFarmacia.rows.length} curso(s):`);
      cursosFarmacia.rows.forEach((curso) => {
        const duracao = curso.duracao ? `${curso.duracao}h` : "sem duração";
        console.log(`    - ${curso.nome} (${duracao})`);
      });
    }

    // Procurar variações
    const farmaciaAlternativas = await pool.query(
      `
      SELECT DISTINCT categoria
      FROM cursos 
      WHERE LOWER(categoria) LIKE '%farmac%'
    `
    );

    if (farmaciaAlternativas.rows.length > 0) {
      console.log(`\n⚠️ Variações encontradas:`);
      farmaciaAlternativas.rows.forEach((row) => {
        if (row.categoria !== "Farmácia") {
          console.log(`    - "${row.categoria}"`);
        }
      });
    }

    // Estatísticas
    const stats = await pool.query(
      `
      SELECT categoria, COUNT(*) as total
      FROM cursos 
      GROUP BY categoria 
      ORDER BY total DESC
    `
    );

    console.log(`\n📊 Resumo de cursos por categoria:`);
    let totalGeral = 0;
    stats.rows.forEach((item) => {
      console.log(`    ${item.categoria}: ${item.total}`);
      totalGeral += parseInt(item.total);
    });
    console.log(`    TOTAL: ${totalGeral}`);

    await pool.end();
  } catch (error) {
    console.error("❌ Erro:", error);
    process.exit(1);
  }
}

checkFarmacia();
