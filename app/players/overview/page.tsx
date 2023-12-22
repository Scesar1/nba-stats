import React, { Suspense } from "react";
import SearchTable from "@/components/SearchTable";

export default function PlayerOverview() {
  return (
    <div className="mt-10 h-screen">
      <div className="no-scrollbar overflow-auto">
        <SearchTable />
      </div>
    </div>
  );
}
