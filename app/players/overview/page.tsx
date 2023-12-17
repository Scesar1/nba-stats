import React, { Suspense } from "react";
import SearchTable from "@/components/SearchTable";

export default function Player() {
  return (
    <div className="mt-10 h-screen">
      <div className="overflow-x-auto">
        <SearchTable />
      </div>
    </div>
  );
}
