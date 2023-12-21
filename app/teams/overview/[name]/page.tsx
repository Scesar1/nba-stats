import React from "react";
import { teamsLogos } from "@/lib/teamsLogo";
import Image from "next/image";
import PredictionDashboard from "@/components/PredictionDashboard";
import { prisma } from "@/lib/db/prisma";
import { team_forecast, teams } from "@prisma/client";

async function TeamPage({ params }: { params: { name: string } }) {
  const { name } = params;
  const formattedName = name.replaceAll("-", " ");
  const logo = teamsLogos.find((team) => team.name === formattedName)!.logo;
  const teamObj: teams[] =
    await prisma.$queryRaw`Select * from teams where franchise ILIKE ${formattedName}`;
  const team: teams = teamObj[0];

  const prediction: team_forecast[] =
    await prisma.$queryRaw`SELECT * FROM team_forecast WHERE team_id=${team.team_id}`;
  return (
    <div className="mt-3 grid md:grid-cols-4 grid-cols-1 justify-items-center">
      <div className="card col-span-4 rounded-lg bg-[#fcf1ce] w-[95%] p-4 h-full shadow-xl">
        <div className="card-body bg-base-100 flex flex-col items-center p-4">
          <Image src={logo} alt={formattedName} width={200} height={200} />
          <h2 className="card-title text-4xl font-bold justify-center">
            {formattedName}
          </h2>
        </div>
      </div>
      <div className="card mt-10 ml-[-4rem] rounded-lg bg-[#fcf1ce] p-2 w-fit h-fit shadow-xl">
        <div className="stats stats-vertical shadow">
          <div className="stat">
            <div className="stat-title">Games Played</div>
            <div className="stat-value">{team.g.toString()}</div>
            <div className="stat-desc">Since {team.from}</div>
          </div>

          <div className="stat">
            <div className="stat-title">Games Won</div>
            <div className="stat-value">{team.w.toString()}</div>
          </div>

          <div className="stat">
            <div className="stat-title">Games Lost</div>
            <div className="stat-value">{team.l.toString()}</div>
            <div className="stat-desc"></div>
          </div>
          <div className="stat">
            <div className="stat-title">Win/Loss %</div>
            <div className="stat-value">{team.wl_percentage.toString()}</div>
          </div>
        </div>
      </div>

      <div className="card mt-10 ml-[-4rem] rounded-lg bg-[#fcf1ce] p-2 w-fit h-fit shadow-xl">
        <div className="stats stats-vertical shadow">
          <div className="stat">
            <div className="stat-title">Years In Playoffs</div>
            <div className="stat-value">{team.playoffs.toString()}</div>
            <div className="stat-desc">
              Out of {team.years.toString()} years
            </div>
          </div>

          <div className="stat">
            <div className="stat-title">First in Division</div>
            <div className="stat-value">{team.division.toString()}</div>
          </div>

          <div className="stat">
            <div className="stat-title">Conference Championships</div>
            <div className="stat-value">{team.conference.toString()}</div>
          </div>
          <div className="stat">
            <div className="stat-title">League Championships</div>
            <div className="stat-value">{team.championship.toString()}</div>
          </div>
        </div>
      </div>
      <div className="col-span-2">
        <div className="grid-flow-row px-5">
          <div className="mt-10 mb-5 mx-auto items-center max-w-fit card rounded-lg bg-[#fcf1ce] p-2 h-fit shadow-xl">
            <div className="stats shadow w-fit">
              <div className="stat place-items-center">
                <div className="stat-title">Active From</div>
                <div className="stat-value text-secondary">{team.from}</div>
              </div>
              <div className="stat place-items-center">
                <div className="stat-title">To</div>
                <div className="stat-value text-accent">{team.to}</div>
                <div className="stat-desc"></div>
              </div>
            </div>
          </div>
          <div className="justify-center">
            <PredictionDashboard prediction={prediction[0]} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamPage;
