"use client";
import AutoCompleteInput from "@/components/AutoCompleteInput";
import PlayerImage from "@/components/PlayerImage";
import { player, player_stats_per_game } from "@prisma/client";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useSWR from "swr";
const fetcher = (url: string) => fetch(url).then((res) => res.json());

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

function H2HPlayerPage() {
  const apiUrl = "/api/players";
  const { data: players, error, isLoading } = useSWR(apiUrl, fetcher);
  const nba_keys = Object.keys(nba_seasons_from_1979_to_2023);
  const nba_to_years = Object.values(nba_seasons_from_1979_to_2023);

  const [player1, setPlayer1] = useState<player>();
  const [player2, setPlayer2] = useState<player>();
  const [playerStats, setPlayerStats] = useState<player_stats_per_game[]>([]);
  const [criteria, setCriteria] = useState({
    playoffs: false,
    criteriaType: "career",
    seasonP1: 0,
    seasonP2: 0,
    from: 0,
    to: 0,
  });
  const [submitStatus, setSubmitStatus] = useState(false);
  const url = `${apiUrl}/h2h?p1id=${player1?.player_id}&p2id=${player2?.player_id}&playoffs=${criteria.playoffs}&type=${criteria.criteriaType}&seasonP1=${criteria.seasonP1}&seasonP2=${criteria.seasonP2}&from=${criteria.from}&to=${criteria.to}`;

  /* const {
    data: playerStats,
    error: error2,
    isLoading: isLoading2,
  } = useSWR(() => (shouldFetch ? url : null), fetcher); */

  useEffect(() => {
    const shouldFetch = player1 && player2 && submitStatus;
    if (shouldFetch) {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setPlayerStats(data);
          setSubmitStatus(false);
        });
    }
  }, [player1, player2, submitStatus]);

  const notify = () => {
    toast.success("Criteria Applied!", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );

  if (error) return <div>failed to load</div>;

  function handleOnSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    setSubmitStatus(true);
  }

  function handleCriteriaSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    notify();
  }

  return (
    <div>
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <div className="flex flex-row justify-center items-center mt-10">
            <label
              htmlFor="my-drawer"
              className="btn btn-primary drawer-button mr-5"
            >
              Show Criteria
            </label>
            <form
              className="flex flex-row justify-center items-center"
              onSubmit={handleOnSubmit}
            >
              <AutoCompleteInput
                onSelect={setPlayer1}
                players={players}
                label={"Player 1"}
              />
              <h2 className="mx-6">vs.</h2>
              <AutoCompleteInput
                onSelect={setPlayer2}
                players={players}
                label={"Player 2"}
              />
              <div className="form-control">
                <label className="label cursor-pointer mr-1">
                  <span className="label-text mx-2">Playoffs</span>
                  <input
                    type="checkbox"
                    onChange={() =>
                      setCriteria({ ...criteria, playoffs: !criteria.playoffs })
                    }
                    className="checkbox"
                    value="true"
                  />
                </label>
              </div>
              <button className="submit btn btn-primary">Compare</button>
            </form>
          </div>
          {playerStats &&
          playerStats.length === 2 &&
          playerStats[0] !== null &&
          playerStats[1] !== null ? (
            <div>
              <div className="flex flex-row mt-20 mx-10">
                <PlayerImage
                  name={player1!.player_name}
                  src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${
                    playerStats[0]!.player_id
                  }.png`}
                  fallbackSrc={`https://cdn.nba.com/headshots/nba/latest/1040x760/fallback.png`}
                  width={200}
                  height={200}
                />
                <div className="mx-10"></div>
                <PlayerImage
                  name={player2!.player_name}
                  src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${
                    playerStats[1]!.player_id
                  }.png`}
                  fallbackSrc={`https://cdn.nba.com/headshots/nba/latest/1040x760/fallback.png`}
                  width={200}
                  height={200}
                />
              </div>
              <div className="flex flex-col mx-10 w-1/2 h-10 border ">
                <div className="grid h-20 card bg-base-500 rounded-box place-items-center">
                  <h1 className="text-2xl font-extrabold">Overall Stats</h1>
                </div>
                <table className="table border text-lg">
                  {/* head */}
                  <thead className="border">
                    <tr className="border">
                      <th></th>
                      <th>{playerStats[0]?.player_name}</th>
                      <th className=""></th>
                      <th>{playerStats[1]?.player_name}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 2 */}
                    <tr className="hover">
                      <th>PPG</th>
                      <td>{playerStats[0].pts}</td>
                      <td></td>
                      <td>{playerStats[1].pts}</td>
                    </tr>
                    {/* row 3 */}
                    <tr className="hover">
                      <th>TRB/G</th>
                      <td>{playerStats[0].trb}</td>
                      <td></td>
                      <td>{playerStats[1].trb}</td>
                    </tr>
                    <tr className="hover">
                      <th>AST/G</th>
                      <td>{playerStats[0].ast}</td>
                      <td></td>
                      <td>{playerStats[1].ast}</td>
                    </tr>
                    <tr className="hover">
                      <th>STL/G</th>
                      <td>{playerStats[0].stl}</td>
                      <td></td>
                      <td>{playerStats[1].stl}</td>
                    </tr>
                    <tr className="hover">
                      <th>BLK/G</th>
                      <td>{playerStats[0].blk}</td>
                      <td></td>
                      <td>{playerStats[1].blk}</td>
                    </tr>
                    <tr className="hover">
                      <th>FG%</th>
                      <td>{playerStats[0].fg_percent}</td>
                      <td></td>
                      <td>{playerStats[1].fg_percent}</td>
                    </tr>
                    <tr className="hover">
                      <th>3P%</th>
                      <td>{playerStats[0].three_percent}</td>
                      <td></td>
                      <td>{playerStats[1].three_percent}</td>
                    </tr>
                    <tr className="hover">
                      <th>FT%</th>
                      <td>{playerStats[0].ft_percent}</td>
                      <td></td>
                      <td>{playerStats[1].ft_percent}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (playerStats &&
              playerStats.length == 2 &&
              playerStats[0] === null) ||
            playerStats[1] === null ? (
            <div className="flex flex-col justify-center items-center mt-10">
              <h1 className="text-2xl font-extrabold">
                One of the players you selected has no stats for the given
                criteria. Please try again!
              </h1>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center mt-10">
              <h1 className="text-2xl font-extrabold">
                Please select two players to compare!
              </h1>
            </div>
          )}
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <h1 className="text-4xl text-center font-extrabold">CRITERIA</h1>
            <form onSubmit={handleCriteriaSubmit}>
              <div className="form-control mt-20">
                <label className="label cursor-pointer">
                  <span className="label-text text-xl">Career: </span>
                  <input
                    type="radio"
                    name="range-radio"
                    className="radio checked:bg-red-500"
                    value={"career"}
                    checked={criteria.criteriaType === "career"}
                    onChange={() =>
                      setCriteria({ ...criteria, criteriaType: "career" })
                    }
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="mt-10 label cursor-pointer">
                  <span className="label-text text-xl">Season: </span>
                  <input
                    type="radio"
                    name="range-radio"
                    className="radio checked:bg-blue-500"
                    value={"season"}
                    onChange={() =>
                      setCriteria({ ...criteria, criteriaType: "season" })
                    }
                    checked={criteria.criteriaType === "season"}
                  />
                </label>
                <div className="">
                  <label className="form-control w-2/5 max-w-xs">
                    <div className="label">
                      <span className="label-text w-full first-letter:text-center">
                        Player 1:
                      </span>
                    </div>
                    <select
                      className="select select-bordered"
                      onChange={(e) =>
                        setCriteria({
                          ...criteria,
                          seasonP1: parseInt(e.target.value),
                        })
                      }
                      disabled={criteria.criteriaType != "season"}
                    >
                      <option disabled value="">
                        Pick one
                      </option>
                      {nba_to_years.map((season, i) => {
                        return (
                          <option key={i} value={season}>
                            {season}
                          </option>
                        );
                      })}
                    </select>
                  </label>
                  <label className="form-control w-2/5 max-w-xs">
                    <div className="label">
                      <span className="label-text w-full first-letter:text-center">
                        Player 2:
                      </span>
                    </div>
                    <select
                      className="select select-bordered"
                      onChange={(e) =>
                        setCriteria({
                          ...criteria,
                          seasonP2: parseInt(e.target.value),
                        })
                      }
                      disabled={criteria.criteriaType != "season"}
                    >
                      <option disabled value="">
                        Pick one
                      </option>
                      {nba_to_years.map((season, i) => {
                        return (
                          <option key={i} value={season}>
                            {season}
                          </option>
                        );
                      })}
                    </select>
                  </label>
                </div>
              </div>
              <div className="form-control mt-5">
                <label className="label cursor-pointer">
                  <span className="label-text text-xl">Time Span: </span>
                  <input
                    type="radio"
                    name="range-radio"
                    className="radio checked:bg-accent"
                    value={"range"}
                    onChange={() =>
                      setCriteria({ ...criteria, criteriaType: "range" })
                    }
                    checked={criteria.criteriaType === "range"}
                  />
                </label>
                <div className="">
                  <label className="form-control w-2/5 max-w-xs">
                    <div className="label">
                      <span className="label-text w-full first-letter:text-center">
                        From:
                      </span>
                    </div>
                    <select
                      onChange={(e) =>
                        setCriteria({
                          ...criteria,
                          from: parseInt(e.target.value),
                        })
                      }
                      className="select select-bordered"
                      disabled={criteria.criteriaType != "range"}
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
                  </label>
                  <label className="form-control w-2/5 max-w-xs">
                    <div className="label">
                      <span className="label-text w-full first-letter:text-center">
                        To:
                      </span>
                    </div>
                    <select
                      className="select select-bordered"
                      onChange={(e) =>
                        setCriteria({
                          ...criteria,
                          to: parseInt(e.target.value),
                        })
                      }
                      disabled={criteria.criteriaType != "range"}
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
                  </label>
                </div>
              </div>
              <button className="btn btn-primary w-full mt-10">Apply</button>
            </form>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default H2HPlayerPage;
