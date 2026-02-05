import "reflect-metadata";
import { DataSource } from "typeorm";
import { Alunos } from "../database/entities/alunos.entity";
import fs from 'fs';
import path from 'path';

const ormconfigPath = path.resolve(process.cwd(), 'ormconfig.json');
let ormConfig: any = {};
if (fs.existsSync(ormconfigPath)) {
  ormConfig = JSON.parse(fs.readFileSync(ormconfigPath, 'utf8'));
}

const databaseUrl = process.env.DATABASE_URL || ormConfig.url || null;

const dataSourceOptions: any = {
  type: 'postgres',
  entities: [Alunos],
  synchronize: ormConfig.synchronize ?? true,
};

if (databaseUrl) {
  dataSourceOptions.url = databaseUrl;
} else {
  dataSourceOptions.host = ormConfig.host || 'localhost';
  dataSourceOptions.port = ormConfig.port || 5432;
  dataSourceOptions.username = ormConfig.username || 'postgres';
  dataSourceOptions.password = ormConfig.password || '';
  dataSourceOptions.database = ormConfig.database || 'escola_db';
}

export const AppDataSource = new DataSource(dataSourceOptions);

let initialized = false;
export async function initializeDataSource() {
  if (initialized) return AppDataSource;
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  initialized = true;
  return AppDataSource;
}
