import { Player } from "@/app/types/Player";
import { prisma } from "@/lib/db/prisma";
import React from "react";
import Image from "next/image";

async function playerPage({ params }: { params: { id: number } }) {
  const { id } = params;
  const intId = parseInt(id as any);
  const player = await prisma.player.findUnique({
    where: {
      player_id: intId,
    },
  });

  if (!player) {
    return <div>Player not found</div>;
  }

  return (
    <div className="container">
      <div className="card mt-10 rounded-lg bg-[#fcf1ce] p-2 w-fit h-fit shadow-xl">
        <div className="card-body bg-base-100 flex flex-col items-center p-4">
          <Image
            src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${intId}.png`}
            alt={player.name}
            width={200}
            height={200}
          />
        </div>
      </div>
      <h1>{player.name}</h1>
    </div>
  );
}

export default playerPage;
