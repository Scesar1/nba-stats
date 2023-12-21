import React from "react";
import Card from "./Card";
import { teamsLogos } from "../lib/teamsLogo";
function CardGrid() {
  return (
    <div className="container mx-auto p-4">
      <div className="mt-10 grid md:grid-cols-4 md:gap-4 grid-cols-1 justify-items-center gap-4 max-h-[700px] overflow-y-auto">
        {teamsLogos.map((team) => (
          <Card key={team.id} logo={team.logo} name={team.name} />
        ))}
      </div>
    </div>
  );
}

export default CardGrid;
