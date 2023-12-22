import { player_stats_per_game } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const year = parseInt(searchParams.get("year")!);
  const playoffs = searchParams.get("playoffs") === "true" ? "Y" : "N";
  try {
    const players: player_stats_per_game[] = await prisma.$queryRaw`SELECT *
      FROM player_stats_per_poss where year=${year} and playoffs_s=${playoffs}`;
    return NextResponse.json(players);
  } catch (error: unknown) {
    return new Response(error as string, { status: 400 });
  }
}
