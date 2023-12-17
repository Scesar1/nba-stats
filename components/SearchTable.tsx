"use client";
import React from "react";
import PlayerTable from "./PlayerTable";
import useSWR from "swr";

const fetcher = (url: any) => fetch(url).then((res) => res.json());

function SearchTable() {
  const { data: players, error, isLoading } = useSWR("/api/players", fetcher);

  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );

  return (
    <div>
      <PlayerTable playerData={players} />
    </div>
  );
}

export default SearchTable;
