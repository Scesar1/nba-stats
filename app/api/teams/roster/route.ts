import { player_stats_per_game, teams } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const year = parseInt(searchParams.get("year")!);
  const tm = searchParams.get("tm");
  try {
    const rosterArr: player_stats_per_game[] =
      await prisma.$queryRaw`Select * from player_stats_per_game where year=${year} and tm=${tm} and playoffs_s='N'`;
    return NextResponse.json(rosterArr);
  } catch (error: unknown) {
    return new Response(error as string, { status: 400 });
  }
}
