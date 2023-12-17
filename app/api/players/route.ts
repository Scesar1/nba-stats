import { prisma } from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const players = await prisma.player.findMany();
    return NextResponse.json(players);
  } catch (error: any) {
    return new Response(error, { status: 400 });
  }
}
