import React, { Suspense } from "react";
import { getPlayerData } from "../../lib/db";
import PlayerTable from "@/components/PlayerTable";

export default async function Player() {
  const playerData = await getPlayerData();
  return (
    <div className="mt-10 h-screen">
      <div className="overflow-x-auto">
        <Suspense fallback={<div>Loading...</div>}>
          <PlayerTable playerData={playerData} />
        </Suspense>
      </div>
    </div>
  );
}

export const runtime = "edge";
export const preferredRegion = "auto";
