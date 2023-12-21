"use client";
import React, { useState } from "react";
import useSWR from "swr";
import { nbaSeasons, teamAbbreviations } from "@/lib/teamsLogo";
import { teamsLogos } from "@/lib/teamsLogo";
import SeasonTable from "@/components/SeasonTable";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
function RosterPage() {
  const [year, setYear] = useState(2023);
  const [tm, setTm] = useState("ATL");

  /*  const {
    data: availableYears,
    error: error2,
    isLoading: isLoading2,
  } = useSWR(`/api/teams/roster/years?name=${team}`, fetcher); */
  const {
    data: rosterData,
    error,
    isLoading,
  } = useSWR(`/api/teams/roster?year=${year}&tm=${tm}`, fetcher);

  console.log(rosterData);

  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );

  return (
    <div className="container h-screen">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Rosters</h1>
        <div className="flex flex-row items-center justify-start mt-5">
          <label className="form-control mx-10 w-full max-w-sm">
            <div className="label">
              <span className="label-text">Franchise</span>
            </div>
            <select
              className="select select-bordered"
              onChange={(e) => {
                setTm(e.target.value);
              }}
              value={tm}
            >
              {teamsLogos.map((team, i) => {
                return (
                  <option
                    key={teamAbbreviations[i]}
                    value={teamAbbreviations[i]}
                  >
                    {team.name}
                  </option>
                );
              })}
            </select>
          </label>
          <label className="mx-10 w-full max-w-sm">
            <div className="label">
              <span className="label-text">Year</span>
            </div>
            <select
              className="select select-bordered"
              onChange={(e) => setYear(parseInt(e.target.value))}
              value={year}
            >
              {nbaSeasons.map((season) => {
                return (
                  <option key={season} value={season}>
                    {season}
                  </option>
                );
              })}
            </select>
          </label>
        </div>
        <div className="w-full">
          <SeasonTable careerData={rosterData} name={true} />
        </div>
      </div>
    </div>
  );
}

export default RosterPage;
