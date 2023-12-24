import { prisma } from "@/lib/db/prisma";
import { player_career_avg } from "@prisma/client";
import React, { useEffect } from "react";

type propTypes = {
  careerAverages: player_career_avg[];
};

function round(value: any, precision: number) {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

function CareerAverages({ careerAverages }: propTypes) {
  return (
    <div className="stats shadow">
      <div className="stat place-items-center">
        <div className="stat-title">PPG</div>
        <div className="stat-value text-primary">
          {round(careerAverages[0].pts, 1).toString()}
        </div>
      </div>

      <div className="stat place-items-center">
        <div className="stat-title">TRB</div>
        <div className="stat-value text-secondary">
          {round(careerAverages[0].trb, 1).toString()}
        </div>
      </div>

      <div className="stat place-items-center">
        <div className="stat-title">AST</div>
        <div className="stat-value text-accent">
          {round(careerAverages[0].ast, 1).toString()}
        </div>
      </div>
      <div className="stat place-items-center">
        <div className="stat-title">STL</div>
        <div className="stat-value text-success">
          {round(careerAverages[0].stl, 1).toString()}
        </div>
      </div>
      <div className="stat place-items-center">
        <div className="stat-title">BLK</div>
        <div className="stat-value text-warning">
          {round(careerAverages[0].blk, 1).toString()}
        </div>
      </div>
      <div className="stat place-items-center">
        <div className="stat-title">TOV</div>
        <div className="stat-value text-error">
          {round(careerAverages[0].tov, 1).toString()}
        </div>
      </div>
    </div>
  );
}

export default CareerAverages;
