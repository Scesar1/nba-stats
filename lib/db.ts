import { neon } from "@neondatabase/serverless";

const DATABASE_URL = process.env.DATABASE_URL || ""; // Set a default value if DATABASE_URL is undefined
const sql = neon(DATABASE_URL);

//console.log(sql`SELECT NOW()`);

export async function helloWorld() {
  const [dbResponse] = await sql`SELECT NOW();`;
  return dbResponse;
}

/* async function configureDatabase() {
  const dbResponse = await sql`CREATE TABLE IF NOT EXISTS "test" (
    "id" serial NOT NULL PRIMARY KEY,
    "url" text NOT NULL,
    "created_at" timestamp NOT NULL DEFAULT NOW()
  );`;
  console.log("Db response for new table", dbResponse);
}

configureDatabase().catch((err) => console.log("db config err", err)); */

export async function getPlayerData() {
  const dbResponse = await sql`SELECT * FROM player;`;
  return dbResponse;
}

getPlayerData().catch((err) => console.log("db config err", err));
