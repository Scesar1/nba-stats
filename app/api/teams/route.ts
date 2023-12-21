import { player_stats_per_game, teams } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const name = parseInt(searchParams.get("name")!);
  try {
    const teamObj: teams[] =
      await prisma.$queryRaw`Select * from teams where franchise ILIKE ${name}`;
      const team : teams = teamObj[0];
    return NextResponse.json(team);
  } catch (error: unknown) {
    return new Response(error as string, { status: 400 });
  }
}
