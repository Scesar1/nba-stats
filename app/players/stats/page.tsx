"use client";
import SeasonTable from "@/components/SeasonTable";
import SeasonTableAdv from "@/components/SeasonTableAdv";
import SeasonTablePoss from "@/components/SeasonTablePoss";
import {
  player_stats_advanced,
  player_stats_per_game,
  player_stats_per_poss,
  player_stats_totals,
} from "@prisma/client";
import React, { FormEvent, useEffect, useState } from "react";
import useSWR from "swr";

const nba_seasons_from_1979_to_2023 = {
  "1979-80": 1980,
  "1980-81": 1981,
  "1981-82": 1982,
  "1982-83": 1983,
  "1983-84": 1984,
  "1984-85": 1985,
  "1985-86": 1986,
  "1986-87": 1987,
  "1987-88": 1988,
  "1988-89": 1989,
  "1989-90": 1990,
  "1990-91": 1991,
  "1991-92": 1992,
  "1992-93": 1993,
  "1993-94": 1994,
  "1994-95": 1995,
  "1995-96": 1996,
  "1996-97": 1997,
  "1997-98": 1998,
  "1998-99": 1999,
  "1999-00": 2000,
  "2000-01": 2001,
  "2001-02": 2002,
  "2002-03": 2003,
  "2003-04": 2004,
  "2004-05": 2005,
  "2005-06": 2006,
  "2006-07": 2007,
  "2007-08": 2008,
  "2008-09": 2009,
  "2009-10": 2010,
  "2010-11": 2011,
  "2011-12": 2012,
  "2012-13": 2013,
  "2013-14": 2014,
  "2014-15": 2015,
  "2015-16": 2016,
  "2016-17": 2017,
  "2017-18": 2018,
  "2018-19": 2019,
  "2019-20": 2020,
  "2020-21": 2021,
  "2021-22": 2022,
  "2022-23": 2023,
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function PlayerStatPage() {
  const nba_to_years = Object.values(nba_seasons_from_1979_to_2023);
  const [selectedYear, setSelectedYear] = useState(
    nba_to_years[nba_to_years.length - 1]
  );
  const [playerData, setPlayerData] = useState<
    | player_stats_per_game[]
    | player_stats_advanced[]
    | player_stats_per_poss[]
    | player_stats_totals[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [playoffs, setPlayoffs] = useState(false);
  const [statType, setStatType] = useState("basic");

  useEffect(() => {
    setIsLoading(true);
    if (statType === "basic") {
      fetch(`/api/players/stats?year=${selectedYear}&playoffs=${playoffs}`)
        .then((res) => res.json())
        .then((data) => {
          setPlayerData(data);
          setIsLoading(false);
        });
    } else if (statType === "advanced") {
      fetch(
        `/api/players/stats/advanced?year=${selectedYear}&playoffs=${playoffs}`
      )
        .then((res) => res.json())
        .then((data) => {
          setPlayerData(data);
          setIsLoading(false);
        });
    } else if (statType === "per_poss") {
      fetch(
        `/api/players/stats/per_poss?year=${selectedYear}&playoffs=${playoffs}`
      )
        .then((res) => res.json())
        .then((data) => {
          setPlayerData(data);
          setIsLoading(false);
        });
    } else if (statType === "totals") {
      fetch(
        `/api/players/stats/totals?year=${selectedYear}&playoffs=${playoffs}`
      )
        .then((res) => res.json())
        .then((data) => {
          setPlayerData(data);
          setIsLoading(false);
        });
    }
  }, [selectedYear, playoffs, statType]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );

  return (
    <div className="container container-main h-screen">
      <div className="flex flex-col justify-center items-center mt-10">
        <h1 className="text-2xl font-extrabold">
          Season Stats {playoffs ? "(Playoffs)" : "(Regular Season)"}
        </h1>
      </div>
      <div className="flex flex-row justify-center items-center mt-10">
        <h2>Select Year: </h2>
        <select
          className="select select-bordered mx-2"
          defaultValue={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
        >
          <option disabled value="">
            Pick one
          </option>
          {nba_to_years.map((year, i) => {
            return (
              <option key={i} value={year}>
                {year}
              </option>
            );
          })}
        </select>
        <select
          className="select select-bordered mx-2"
          defaultValue={statType}
          onChange={(e) => setStatType(e.target.value)}
        >
          <option disabled value="">
            Pick one
          </option>
          <option value="basic">Basic</option>
          <option value="advanced">Advanced</option>
          <option value="per_poss">Per 100 Possessions</option>
          <option value="totals">Total</option>
        </select>
        <button
          className={`btn btn-sm mx-2 ${
            playoffs ? "btn-error" : "btn-primary"
          }`}
          onClick={() => {
            setPlayoffs(!playoffs);
          }}
        >
          {!playoffs ? `Playoffs Stats` : `Regular Season Stats`}
        </button>
      </div>
      <div className="px-10">
        {
          {
            basic: <SeasonTable careerData={playerData} name={false} />,
            advanced: <SeasonTableAdv careerData={playerData} name={false} />,
            per_poss: <SeasonTablePoss careerData={playerData} name={false} />,
            totals: <SeasonTable careerData={playerData} name={false} />,
          }[statType]
        }
      </div>
    </div>
  );
}

export default PlayerStatPage;
