import { individual_awards } from "@prisma/client";
import React from "react";

type propTypes = {
  awards: individual_awards[];
  teamCount: { all_NBA_count: number; all_Def_count: number };
};

export default function AwardCard({ awards, teamCount }: propTypes) {
  if (awards.length === 0) {
    return <></>;
  }

  return (
    <div className="stats stats-vertical shadow">
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title text-md">MVPs</div>
          <div className="stat-value text-secondary text-md">
            {awards[0].mvp_count ? awards[0].mvp_count.toString() : "0"}
          </div>
        </div>
        <div className="stat">
          <div className="stat-title text-md">FMVP</div>
          <div className="stat-value text-primary text-md">
            {awards[0].fmvp_count ? awards[0].fmvp_count.toString() : "0"}
          </div>
        </div>
      </div>
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title text-md">DPOY</div>
          <div className="stat-value text-secondary text-md">
            {awards[0].dpoy_count ? awards[0].dpoy_count.toString() : "0"}
          </div>
        </div>
        <div className="stat">
          <div className="stat-title text-md">All-NBA</div>
          <div className="stat-value text-accent text-md">
            {teamCount.all_NBA_count.toString()}
          </div>
          <div className="stat-desc">After 1979</div>
        </div>
        <div className="stat">
          <div className="stat-title text-md">All-Def</div>
          <div className="stat-value text-primary text-md">
            {teamCount.all_Def_count.toString()}
          </div>
          <div className="stat-desc">After 1979</div>
        </div>
      </div>
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title text-md">MIP</div>
          <div className="stat-value text-accent text-md">
            {awards[0].mip_count ? awards[0].mip_count.toString() : "0"}
          </div>
        </div>
        <div className="stat">
          <div className="stat-title text-md">6MOTY</div>
          <div className="stat-value text-primary text-md">
            {awards[0].smoy_count ? awards[0].smoy_count.toString() : "0"}
          </div>
        </div>
      </div>
    </div>
  );
}
