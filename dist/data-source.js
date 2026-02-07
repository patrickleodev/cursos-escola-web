require('reflect-metadata');
const { DataSource } = require('typeorm');
const { Alunos } = require('./database/entities/alunos.entity');
const { Cursos } = require('./database/entities/cursos.entity');
const { Matriculas } = require('./database/entities/matriculas.entity');
const fs = require('fs');
const path = require('path');

const ormconfigPath = path.resolve(process.cwd(), 'ormconfig.json');
let ormConfig = {};
if (fs.existsSync(ormconfigPath)) {
  try {
    ormConfig = JSON.parse(fs.readFileSync(ormconfigPath, 'utf8'));
  } catch (e) {
    console.error('Failed to parse ormconfig.json', e);
  }
}

const databaseUrl = process.env.DATABASE_URL || ormConfig.url || undefined;

const options = {
  type: 'postgres',
  entities: [Alunos, Cursos, Matriculas],
  synchronize: ormConfig.synchronize ?? true,
  ssl: ormConfig.ssl || { rejectUnauthorized: false },
};

if (databaseUrl) {
  options.url = databaseUrl;
} else {
  options.host = ormConfig.host || process.env.TYPEORM_HOST || 'localhost';
  options.port = ormConfig.port || Number(process.env.TYPEORM_PORT) || 5432;
  options.username = ormConfig.username || process.env.TYPEORM_USERNAME || 'postgres';
  options.password = ormConfig.password || process.env.TYPEORM_PASSWORD || '';
  options.database = ormConfig.database || process.env.TYPEORM_DATABASE || 'postgres';
}

const AppDataSource = new DataSource(options);

module.exports = AppDataSource;
