import { redirect } from "next/navigation";
import { createConnection, ConnectionOptions, getConnectionManager } from "typeorm";
import 'reflect-metadata';

async function startApp() {
  try {
  const connectionManager = getConnectionManager();
  const connection = connectionManager.create({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "123",
    database: "escola_db",
    synchronize: true,
    entities: [__dirname + "/database/entities/*.ts"],
    logging: true
  })

  await connection.connect();
  console.log("TypeORM connected!");

  try {
    const alunos = await connection.getRepository("Alunos").find();

    console.log(alunos);
  } catch (error) {
    console.error("Error fetching Alunos:", error);
  }
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

startApp();
export default function Page() {
  redirect("/home");
}