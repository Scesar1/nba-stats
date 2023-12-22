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
import { player_stats_advanced, player_stats_per_game } from "@prisma/client";

type propTypes = {
  careerData: Record<string, any>[];
  name: boolean;
};

export default function CareerTableAdv(props: propTypes) {
  const columnHelper = createColumnHelper<player_stats_advanced>();
  const userColumnDefs = useMemo<
    ColumnDef<player_stats_advanced, any>[]
  >(() => {
    return [
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
      columnHelper.accessor("g", {
        header: "Games",
      }),
      columnHelper.accessor("mp", {
        header: "Minutes Played",
      }),
      columnHelper.accessor("per", {
        header: "PER",
      }),
      columnHelper.accessor("ts_percent", {
        header: "TS%",
      }),
      columnHelper.accessor("par", {
        header: "PAR",
      }),
      columnHelper.accessor("ftr", {
        header: "FTr",
      }),
      columnHelper.accessor("orb_percent", {
        header: "ORB%",
      }),
      columnHelper.accessor("drb_percent", {
        header: "DRB%",
      }),
      columnHelper.accessor("trb_percent", {
        header: "TRB%",
      }),
      columnHelper.accessor("ast_percent", {
        header: "AST%",
      }),
      columnHelper.accessor("stl_percent", {
        header: "STL%",
      }),
      columnHelper.accessor("blk_percent", {
        header: "BLK%",
      }),
      columnHelper.accessor("tov_percent", {
        header: "TOV%",
      }),
      columnHelper.accessor("usg_percent", {
        header: "USG%",
      }),
      columnHelper.accessor("ows", {
        header: "OWS",
      }),
      columnHelper.accessor("dws", {
        header: "DWS",
      }),
      columnHelper.accessor("ws", {
        header: "WS",
      }),
      columnHelper.accessor("ws_48", {
        header: "WS/48",
      }),
      columnHelper.accessor("obpm", {
        header: "OBPM",
      }),
      columnHelper.accessor("dbpm", {
        header: "DBPM",
      }),
      columnHelper.accessor("bpm", {
        header: "BPM",
      }),
      columnHelper.accessor("vorp", {
        header: "VORP",
      }),
    ];
  }, [columnHelper]);
  const { careerData, name } = props;
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "year", // Must be equal to the accessorKey of the coulmn you want sorted by default
      desc: false,
    },
  ]);
  const [data, setData] = useState(() => [
    ...(careerData as player_stats_advanced[]),
  ]);
  const table = useReactTable({
    columns: userColumnDefs,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
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
    </div>
  );
}
