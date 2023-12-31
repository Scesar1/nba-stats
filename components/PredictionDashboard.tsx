import { team_forecast } from "@prisma/client";
import React from "react";

type propTypes = {
  prediction: team_forecast;
};
function PredictionDashboard(props: propTypes) {
  const { prediction } = props;
  const playoffs = prediction.playoff_percentage;
  const finals = prediction.finals_percentage;
  const championship = prediction.champ_percentage;

  return (
    <div className="card shadow-lg w-full compact bg-[#fcf1ce] p-2">
      <div className="card-body bg-base-100">
        <h2 className="card-title justify-center text-center">
          2023-24 Predictions
        </h2>
        <div className="grid grid-cols-3 gap-2 justify-items-center items-baseline">
          <h3 className="mr-5"> Playoffs Chance</h3>
          <div className="grid grid-col-2 gap-4 justify-items-center">
            <div
              className="col-span-1 radial-progress bg-neutral text-info border-4 border-neutral"
              style={{ "--value": `${playoffs}` } as React.CSSProperties}
            >
              {playoffs.toString()}
            </div>
            <div
              className="col-span-1 radial-progress bg-neutral text-warning border-4 border-neutral"
              style={{ "--value": `${finals}` } as React.CSSProperties}
            >
              {finals.toString()}
            </div>
            <div className="col-span-2 md:col-start-1 md:col-end-3 text-center ">
              <div
                className="radial-progress bg-neutral text-success border-4 border-neutral"
                style={{ "--value": `${championship}` } as React.CSSProperties}
              >
                {championship.toString()}
              </div>
            </div>
          </div>
          <h3> Finals Chance</h3>
          <h3 className="col-span-3 "> Championship Chance</h3>
        </div>
      </div>
    </div>
  );
}

export default PredictionDashboard;
