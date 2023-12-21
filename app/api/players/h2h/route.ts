import {
  player,
  player_career_avg,
  player_stats_per_game,
} from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const p1id = parseInt(searchParams.get("p1id")!);
  const p2id = parseInt(searchParams.get("p2id")!);
  const playoffs = searchParams.get("playoffs") === "true" ? "Y" : "N";
  const type = searchParams.get("type");
  const p1Season = parseInt(searchParams.get("seasonP1")!);
  const p2Season = parseInt(searchParams.get("seasonP2")!);
  const from = parseInt(searchParams.get("from")!);
  const to = parseInt(searchParams.get("to")!);

  try {
    if (type === "career") {
      const player1Career: player_career_avg[] =
        await prisma.$queryRaw`select * from player_career_avg where player_id = ${p1id} and playoffs_s = ${playoffs}`;

      const player2Career: player_career_avg[] =
        await prisma.$queryRaw`select * from player_career_avg where player_id = ${p2id} and playoffs_s = ${playoffs}`;
      const player1: player_career_avg = player1Career[0];
      const player2: player_career_avg = player2Career[0];
      return NextResponse.json([player1, player2]);
    }
    if (type === "season") {
      const player1Season: player_stats_per_game[] =
        await prisma.$queryRaw`SELECT *
      FROM player_stats_per_game
      WHERE player_id = ${p1id} AND year = ${p1Season} AND playoffs_s = ${playoffs}`;
      const player2Season: player_stats_per_game[] =
        await prisma.$queryRaw`SELECT *
      FROM player_stats_per_game
      WHERE player_id = ${p2id} AND year = ${p2Season} AND playoffs_s = ${playoffs}`;

      const player1: player_stats_per_game = player1Season[0];
      const player2: player_stats_per_game = player2Season[0];
      return NextResponse.json([player1, player2]);
    }
    if (type === "range") {
      const player1Range: player_stats_per_game[] =
        await prisma.$queryRaw`SELECT * FROM player_stats_per_game WHERE player_id = ${p1id} AND year >= ${from} AND year <= ${to} AND playoffs_s = ${playoffs}`;
      const player2Range: player_stats_per_game[] =
        await prisma.$queryRaw`SELECT * FROM player_stats_per_game WHERE player_id = ${p2id} AND year >= ${from} AND year <= ${to} AND playoffs_s = ${playoffs}`;

      const player1: player_stats_per_game = player1Range[0];
      const player2: player_stats_per_game = player2Range[0];
      return NextResponse.json([player1, player2]);
    }
    return NextResponse.json([]);
  } catch (error: unknown) {
    return new Response(error as string, { status: 400 });
  }
}
