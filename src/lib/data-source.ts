import "reflect-metadata";
import { DataSource } from "typeorm";
import { Alunos } from "../database/entities/alunos.entity";
import fs from "fs";
import path from "path";

const ormconfigPath = path.resolve(process.cwd(), "ormconfig.json");
let ormConfig: any = {};
if (fs.existsSync(ormconfigPath)) {
  try {
    ormConfig = JSON.parse(fs.readFileSync(ormconfigPath, "utf8"));
  } catch (e) {
    console.error("Failed to parse ormconfig.json", e);
  }
}

const databaseUrl = process.env.DATABASE_URL || ormConfig.url || undefined;

const options: any = {
  type: "postgres",
  entities: [Alunos],
  synchronize: ormConfig.synchronize ?? true,
  ssl: ormConfig.ssl || { rejectUnauthorized: false },
  extra: { ssl: ormConfig.ssl || { rejectUnauthorized: false } },
};

if (databaseUrl) {
  options.url = databaseUrl;
} else {
  options.host = ormConfig.host || process.env.TYPEORM_HOST || "localhost";
  options.port = ormConfig.port || Number(process.env.TYPEORM_PORT) || 5432;
  options.username = ormConfig.username || process.env.TYPEORM_USERNAME || "postgres";
  options.password = ormConfig.password || process.env.TYPEORM_PASSWORD || "";
  options.database = ormConfig.database || process.env.TYPEORM_DATABASE || "postgres";
}

export const AppDataSource = new DataSource(options);

let initialized = false;
export async function initializeDataSource() {
  if (initialized) return AppDataSource;
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  initialized = true;
  return AppDataSource;
}