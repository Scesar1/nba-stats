"use client";
import React, { FormEvent, useState } from "react";
import PlayerTable from "./PlayerTable";
import useSWR, { SWRConfig } from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const apiUrl = "/api/players";
function SearchTable() {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  const url = query ? `${apiUrl}?query=${query}` : apiUrl;
  const { data: players, error, isLoading } = useSWR(url, fetcher);

  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );

  if (error) return <div>failed to load</div>;

  function handleOnSubmit(event: FormEvent<HTMLFormElement>): void {
    setQuery(search);
  }

  return (
    <div>
      <form className="flex" onSubmit={handleOnSubmit}>
        <input
          className="input input-bordered w-full max-w-xs"
          type="text"
          placeholder="Search for a player"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <button className="submit btn btn-primary ml-2">Search</button>
      </form>
      <PlayerTable playerData={players} />
    </div>
  );
}

export default SearchTable;
