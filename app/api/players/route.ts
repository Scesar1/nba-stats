import { prisma } from "@/lib/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("query");
  let players;
  try {
    if (query) {
      players = await prisma.$queryRaw`SELECT * 
        FROM player 
        WHERE player_name ILIKE CONCAT('%', ${query}, '%') 
          OR pos ILIKE CONCAT('%', ${query}, '%')  
          OR colleges ILIKE CONCAT('%', ${query}, '%')  
          OR "from" = ${parseInt(query)} 
          OR "to" = ${parseInt(query)} 
          OR ht = ${parseInt(query)} 
          OR wt = ${parseInt(query)}`;
    } else {
      players = await prisma.$queryRaw`SELECT * FROM player`;
    }
    return NextResponse.json(players);
  } catch (error: unknown) {
    return new Response(error as string, { status: 400 });
  }
}
