import { prisma } from "@/lib/db/prisma";
import React from "react";
import PlayerImage from "@/components/PlayerImage";
import BioCard from "@/components/BioCard";
import AwardCard from "@/components/AwardCard";
import CareerTable from "@/components/CareerTable";
import {
  Prisma,
  individual_awards,
  player,
  player_career_avg,
  player_stats_advanced,
  player_stats_per_game,
  team_selection,
} from "@prisma/client";
import CareerAverages from "@/components/CareerAverages";
import CareerTableAdv from "@/components/CareerTableAdv";
import CareerTablePoss from "@/components/CareerTablePoss";

async function playerPage({ params }: { params: { id: number } }) {
  const { id } = params;
  const intId = parseInt(id as any);
  const player: player | null = await prisma.player.findUnique({
    where: {
      player_id: intId,
    },
  });

  const awards: individual_awards[] =
    await prisma.$queryRaw`SELECT * FROM individual_awards WHERE player_id = ${intId}`;
  const teamAwards: team_selection[] = await prisma.$queryRaw`SELECT * 
  FROM team_selection WHERE player_one=${intId} OR player_two=${intId} OR player_three=${intId} OR player_four=${intId} OR player_five=${intId} OR player_six=${intId}`;
  const careerDataBasic: player_stats_per_game[] =
    await prisma.$queryRaw`SELECT * FROM player_stats_per_game WHERE player_id = ${intId} AND playoffs_s='N'`;
  const careerBasic = JSON.parse(JSON.stringify(careerDataBasic));
  const careerDataBasicPlayoffs: player_stats_per_game[] =
    await prisma.$queryRaw`SELECT * FROM player_stats_per_game WHERE player_id = ${intId} AND playoffs_s='Y'`;
  const careerBasicPlayoffs = JSON.parse(
    JSON.stringify(careerDataBasicPlayoffs)
  );
  const careerAveragesData: player_career_avg[] =
    await prisma.$queryRaw`SELECT * FROM player_career_avg WHERE player_id = ${intId} and playoffs_s='N'`;
  const careerAverages = JSON.parse(JSON.stringify(careerAveragesData));
  const careerDataAdvancedRS: player_stats_advanced[] =
    await prisma.$queryRaw`SELECT * FROM player_stats_advanced WHERE player_id = ${intId} AND playoffs_s='N'`;
  const careerAdvancedRS = JSON.parse(JSON.stringify(careerDataAdvancedRS));

  const careerDataAdvancedPlayoffs: player_stats_advanced[] =
    await prisma.$queryRaw`SELECT * FROM player_stats_advanced WHERE player_id = ${intId} AND playoffs_s='Y'`;
  const careerAdvancedPlayoffs = JSON.parse(
    JSON.stringify(careerDataAdvancedPlayoffs)
  );
  const careerDataPerPossRS: player_stats_advanced[] =
    await prisma.$queryRaw`SELECT * FROM player_stats_per_poss WHERE player_id = ${intId} AND playoffs_s='N'`;
  const careerPerPossRS = JSON.parse(JSON.stringify(careerDataPerPossRS));
  const careerDataPerPossPlayoffs: player_stats_advanced[] =
    await prisma.$queryRaw`SELECT * FROM player_stats_per_poss WHERE player_id = ${intId} AND playoffs_s='Y'`;
  const careerPerPossPlayoffs = JSON.parse(
    JSON.stringify(careerDataPerPossPlayoffs)
  );

  function countTeamAwards(awards: team_selection[]) {
    const all_NBA_count = awards.filter(
      (award) => award.type === "All League"
    ).length;
    const all_Def_count = awards.filter(
      (award) => award.type === "All Defensive"
    ).length;
    return { all_NBA_count, all_Def_count };
  }

  if (!player) {
    return <div>Player not found</div>;
  }

  return (
    <div>
      <div className="overflow-x-hidden">
        <div className="flex flex-row">
          <div className="card my-20 ml-4 rounded-lg bg-[#fcf1ce] p-1 w-fit h-fit shadow-xl">
            <div className="card-body bg-base-100 flex flex-col items-center p-4">
              <PlayerImage
                width={200}
                height={200}
                src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${intId}.png`}
                fallbackSrc="https://cdn.nba.com/headshots/nba/latest/1040x760/fallback.png"
                name={player.player_name}
              />
            </div>
          </div>
          <BioCard player={player} />
          <div className="w-fit mx-10 my-20">
            <AwardCard
              awards={awards}
              teamCount={countTeamAwards(teamAwards)}
            />
          </div>
        </div>
        <div className="mx-6 mt-[-3rem] mb-14">
          <h1 className="text-3xl">Career Averages (Regular Season)</h1>

          <CareerAverages careerAverages={careerAverages} />
        </div>
        <div className="mx-6">
          <h1 className="text-3xl">Basic Stats (Regular Season)</h1>
          <CareerTable careerData={careerBasic} name={false} />
        </div>
        <div className="mx-6 my-20">
          <h1 className="text-3xl">Basic Stats (Playoffs)</h1>
          <CareerTable careerData={careerBasicPlayoffs} name={false} />
        </div>
        <div className="mx-6 my-20">
          <h1 className="text-3xl">Advanced Stats (Regular Season)</h1>
          <CareerTableAdv careerData={careerAdvancedRS} name={true} />
        </div>
        <div className="mx-6 my-20">
          <h1 className="text-3xl">Advanced Stats (Playoffs)</h1>
          <CareerTableAdv careerData={careerAdvancedPlayoffs} name={true} />
        </div>
        <div className="mx-6 my-20">
          <h1 className="text-3xl">Per 100 Possessions (Regular Season)</h1>
          <CareerTablePoss careerData={careerPerPossRS} name={true} />
        </div>
        <div className="mx-6 my-20">
          <h1 className="text-3xl">Per 100 Possessions (Playoffs)</h1>
          <CareerTablePoss careerData={careerPerPossPlayoffs} name={true} />
        </div>
      </div>
    </div>
  );
}

export default playerPage;
