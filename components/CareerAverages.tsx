import { player_career_avg } from "@prisma/client";
import React from "react";

type propTypes = {
  careerAverages: player_career_avg[];
};

function CareerAverages({ careerAverages }: propTypes) {
  return (
    <div className="stats shadow">
      <div className="stat place-items-center">
        <div className="stat-title">PPG</div>
        <div className="stat-value text-primary">{careerAverages[0].pts}</div>
      </div>

      <div className="stat place-items-center">
        <div className="stat-title">TRB</div>
        <div className="stat-value text-secondary">{careerAverages[0].trb}</div>
      </div>

      <div className="stat place-items-center">
        <div className="stat-title">AST</div>
        <div className="stat-value text-accent">{careerAverages[0].ast}</div>
      </div>
      <div className="stat place-items-center">
        <div className="stat-title">STL</div>
        <div className="stat-value text-success">{careerAverages[0].stl}</div>
      </div>
      <div className="stat place-items-center">
        <div className="stat-title">BLK</div>
        <div className="stat-value text-warning">{careerAverages[0].blk}</div>
      </div>
      <div className="stat place-items-center">
        <div className="stat-title">TOV</div>
        <div className="stat-value text-error">{careerAverages[0].tov}</div>
      </div>
    </div>
  );
}

export default CareerAverages;
