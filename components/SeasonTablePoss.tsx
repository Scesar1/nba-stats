"use client";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  SortingState,
  getSortedRowModel,
  getPaginationRowModel,
  createColumnHelper,
  ColumnDef,
} from "@tanstack/react-table";
import React, { useMemo, useState } from "react";
//import { userColumnDefs } from "./UserColumnDefs";
import Pagination from "./Pagination";
import CellLink from "./CellLink";
import moment from "moment";
import { player_stats_per_game, player_stats_per_poss } from "@prisma/client";

type propTypes = {
  careerData: Record<string, any>[];
  name: boolean;
};

export default function SeasonTablePoss(props: propTypes) {
  const columnHelper = createColumnHelper<player_stats_per_poss>();
  const userColumnDefs = useMemo<
    ColumnDef<player_stats_per_poss, any>[]
  >(() => {
    return [
      columnHelper.accessor("player_name", {
        header: "Name",
        cell: (props) => (
          <CellLink getValue={props.getValue()} row={props.row} />
        ),
      }),
      columnHelper.accessor("pos", {
        header: "Position",
      }),
      columnHelper.accessor("age", {
        header: "Age",
      }),
      columnHelper.accessor("year", {
        header: "Year",
      }),
      columnHelper.accessor("tm", {
        header: "Team",
      }),
      columnHelper.accessor("games", {
        header: "G",
      }),
      columnHelper.accessor("gs", {
        header: "GS",
      }),
      columnHelper.accessor("mp", {
        header: "MP",
      }),
      columnHelper.accessor("pts", {
        header: "PTS",
      }),
      columnHelper.accessor("trb", {
        header: "TRB",
      }),
      columnHelper.accessor("ast", {
        header: "AST",
      }),
      columnHelper.accessor("stl", {
        header: "STL",
      }),
      columnHelper.accessor("blk", {
        header: "BLK",
      }),
      columnHelper.accessor("orb", {
        header: "ORB",
      }),
      columnHelper.accessor("drb", {
        header: "DRB",
      }),
      columnHelper.accessor("fg", {
        header: "FG",
      }),
      columnHelper.accessor("fga", {
        header: "FGA",
      }),
      columnHelper.accessor("fg_percent", {
        header: "FG%",
      }),
      columnHelper.accessor("threeP", {
        header: "3P",
      }),
      columnHelper.accessor("threePA", {
        header: "3PA",
      }),
      columnHelper.accessor("three_percent", {
        header: "3P%",
      }),
      columnHelper.accessor("twoP", {
        header: "2P",
      }),
      columnHelper.accessor("two_percent", {
        header: "2P%",
      }),
      columnHelper.accessor("ft", {
        header: "FT",
      }),
      columnHelper.accessor("fta", {
        header: "FTA",
      }),
      columnHelper.accessor("ft_percent", {
        header: "FT%",
      }),

      columnHelper.accessor("tov", {
        header: "TOV",
      }),
      columnHelper.accessor("pf", {
        header: "PF",
      }),
      columnHelper.accessor("ortg", {
        header: "ORtg",
      }),
      columnHelper.accessor("drtg", {
        header: "DRtg",
      }),
    ];
  }, [columnHelper]);
  const { careerData, name } = props;
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "year",
      desc: false,
    },
  ]);
  const [data, setData] = useState(() => [
    ...(careerData as player_stats_per_poss[]),
  ]);
  const table = useReactTable({
    columns: userColumnDefs,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  });
  const headers = table.getFlatHeaders();
  const rows = table.getRowModel().rows;
  return (
    <div>
      <div className="max-h-[600px] noscroll-bar overflow-y-scroll overflow-x-scroll">
        <table className="table table-zebra my-4 w-full  ">
          <thead>
            <tr>
              {headers.map((header) => {
                const direction = header.column.getIsSorted();
                const arrow: any = {
                  asc: "🔼",
                  desc: "🔽",
                };
                const sort_indicator = direction && arrow[direction];
                return (
                  <th key={header.id}>
                    {header.isPlaceholder ? null : (
                      <div
                        onClick={header.column.getToggleSortingHandler()}
                        className="cursor-pointer flex gap-4"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {direction && <span>{sort_indicator}</span>}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!name && <Pagination table={table} />}
    </div>
  );
}
