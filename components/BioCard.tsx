import { player } from "@prisma/client";
import React from "react";

function convertHeight(height: number): string {
  const feet = Math.floor(height / 12);
  const inches = height % 12;
  return `${feet}' ${inches}"`;
}

export default function BioCard({ player }: { player: player }) {
  return (
    <div className="m-10">
      <h1 className="card-title text-3xl font-bold justify-center">
        {player.player_name}
      </h1>
      <div className="collapse collapse-arrow border bg-base-100 w-full mt-3">
        <input type="checkbox" />
        <div className="collapse-title text-lg font-bold text-center">
          Biography
        </div>
        <div className="collapse-content">
          <div className="card rounded-lg bg-[#fcf1ce] p-1 w-full h-fit shadow-xl">
            <div className="card-body bg-base-100 p-1">
              <ul className="flex flex-col justify-start list-none mt-2">
                <li className="justify-start text-lg my-1">
                  <span className="font-extrabold ">DOB:</span>{" "}
                  {player.birth_date
                    ? player.birth_date.toLocaleDateString()
                    : "N/A"}
                </li>
                <li className="justify-start text-lg my-1">
                  <span className="font-extrabold ">Height:</span>{" "}
                  {player.ht ? convertHeight(player.ht) : "N/A"}
                </li>
                <li className="justify-start text-lg my-1">
                  <span className="font-extrabold ">Weight: </span>{" "}
                  {player.wt ? player.wt.toString() + " lbs" : "N/A"}
                </li>
                <li className="justify-start text-lg my-1">
                  <span className="font-extrabold ">Active:</span> {player.from}
                  -{player.to}
                </li>
                <li className="justify-start text-lg my-1">
                  <span className="font-extrabold ">Position:</span>{" "}
                  {player.pos}
                </li>
                <li className="justify-start text-lg my-1">
                  <span className="font-extrabold ">College(s):</span>{" "}
                  {player.colleges ? player.colleges : "N/A"}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
