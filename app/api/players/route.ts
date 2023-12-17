import { prisma } from "@/lib/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("query");
  let players;
  try {
    if (query) {
      players = await prisma.player.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { from: { equals: parseInt(query) } },
            { to: { equals: parseInt(query) } },
            { pos: { contains: query, mode: "insensitive" } },
            { ht: { equals: parseInt(query) } },
            { wt: { equals: parseInt(query) } },
            { colleges: { contains: query, mode: "insensitive" } },
          ],
        },
      });
    } else {
      players = await prisma.player.findMany();
    }
    return NextResponse.json(players);
  } catch (error: any) {
    return new Response("Invalid request", { status: 400 });
  }
}
