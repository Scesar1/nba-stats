import React from "react";
import { teams } from "@/lib/teams";
import Image from "next/image";
import PredictionDashboard from "@/components/PredictionDashboard";

function TeamPage({ params }: { params: { name: string } }) {
  const { name } = params;
  const formattedName = name.replaceAll("-", " ");
  const logo = teams.find((team) => team.name === formattedName)!.logo;
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
            <div className="stat-value">5,878</div>
            <div className="stat-desc">Since 1949-50</div>
          </div>

          <div className="stat">
            <div className="stat-title">Games Won</div>
            <div className="stat-value">2,900</div>
          </div>

          <div className="stat">
            <div className="stat-title">Games Lost</div>
            <div className="stat-value">2,978</div>
            <div className="stat-desc"></div>
          </div>
          <div className="stat">
            <div className="stat-title">Win/Loss %</div>
            <div className="stat-value">0.493</div>
          </div>
        </div>
      </div>

      <div className="card mt-10 ml-[-4rem] rounded-lg bg-[#fcf1ce] p-2 w-fit h-fit shadow-xl">
        <div className="stats stats-vertical shadow">
          <div className="stat">
            <div className="stat-title">Years In Playoffs</div>
            <div className="stat-value">49</div>
            <div className="stat-desc">Out of 75 years</div>
          </div>

          <div className="stat">
            <div className="stat-title">First in Division</div>
            <div className="stat-value">12 times</div>
          </div>

          <div className="stat">
            <div className="stat-title">Conference Championships</div>
            <div className="stat-value">0</div>
          </div>
          <div className="stat">
            <div className="stat-title">League Championships</div>
            <div className="stat-value">1</div>
          </div>
        </div>
      </div>
      <div className="col-span-2">
        <div className="grid-flow-row px-5">
          <div className="mt-10 mb-5 mx-auto items-center max-w-fit card rounded-lg bg-[#fcf1ce] p-2 h-fit shadow-xl">
            <div className="stats shadow w-fit">
              <div className="stat place-items-center">
                <div className="stat-title">Active From</div>
                <div className="stat-value text-secondary">1949-50</div>
              </div>
              <div className="stat place-items-center">
                <div className="stat-title">To</div>
                <div className="stat-value text-accent">2023-24</div>
                <div className="stat-desc"></div>
              </div>
            </div>
          </div>
          <div className="justify-center">
            <PredictionDashboard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamPage;
