import "reflect-metadata";
import { DataSource } from "typeorm";
import fs from "fs";
import path from "path";

// Importar todas as entidades de um único arquivo centralizado
// Isso garante que os metadados sejam registrados juntos
import { ENTITIES } from "../database/entities/index";

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
  entities: ENTITIES,
  synchronize: ormConfig.synchronize ?? true,
  ssl: ormConfig.ssl || { rejectUnauthorized: false },
  logging: false,
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
let initPromise: Promise<typeof AppDataSource> | null = null;

export async function initializeDataSource() {
  if (initialized) return AppDataSource;
  if (AppDataSource.isInitialized) {
    initialized = true;
    return AppDataSource;
  }

  if (initPromise) {
    return await initPromise;
  }

  initPromise = AppDataSource.initialize()
    .then((ds) => {
      initialized = true;
      initPromise = null;
      return ds;
    })
    .catch((err) => {
      initPromise = null;
      console.error("Failed to initialize DataSource:", err);
      throw err;
    });

  return await initPromise;
}
