import Image from "next/image";
import { helloWorld } from "@/lib/db";

export default async function Home() {
  const dbHello = await helloWorld();
  console.log("dbHello", dbHello);
  return (
    <main>
      <h1>Home Page</h1>
    </main>
  );
}

export const runtime = 'edge'
export const preferredRegion = 'auto'

