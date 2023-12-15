import React from "react";
import { getPlayerData } from "../../lib/db";

export default async function Player() {
  const playerData = await getPlayerData();
  //console.log("playerData", playerData);
  return (
    <div className="mt-10">
      <div className="overflow-x-auto">
        <table className="table table-xs table-pin-rows table-pin-cols">
          <thead>
            <tr>
              <th></th>
              <td>Name</td>
              <td>From</td>
              <td>To</td>
              <td>Position</td>
              <td>Height</td>
              <td>Weight</td>
              <td>Birth Date</td>
              <td>Colleges</td>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {playerData.map((player) => (
              <tr key={player.id}>
                <th></th>
                <td>{player.name}</td>
                <td>{player.from}</td>
                <td>{player.to}</td>
                <td>{player.pos}</td>
                <td>{player.ht}</td>
                <td>{player.wt}</td>
                <td>
                  {player.birth_date instanceof Date
                    ? player.birth_date.toLocaleDateString()
                    : player.birth_date}
                </td>
                <td>{player.colleges}</td>
                <th></th>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <td>Name</td>
              <td>From</td>
              <td>To</td>
              <td>Position</td>
              <td>Height</td>
              <td>Weight</td>
              <td>Birth Date</td>
              <td>Colleges</td>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export const runtime = "edge";
export const preferredRegion = "auto";
