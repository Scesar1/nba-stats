import { prisma } from "@/lib/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const name = searchParams.get("name");
  try {
    const teamObj: number[] =
      await prisma.$queryRaw`Select year from team_stats_per_game where team ILIKE ${name}`;
    return NextResponse.json(teamObj);
  } catch (error: unknown) {
    return new Response(error as string, { status: 400 });
  }
}
