import { neon } from '@neondatabase/serverless'

const DATABASE_URL = process.env.DATABASE_URL || '' // Set a default value if DATABASE_URL is undefined
const sql = neon(DATABASE_URL)

//console.log(sql`SELECT NOW()`);

export async function helloWorld() {
  const [dbResponse] = await sql`SELECT NOW();`
  return dbResponse;
}
