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
import { player } from "@prisma/client";

type propTypes = {
  playerData: Record<string, any>[];
};

const PlayerTable = (props: propTypes) => {
  const columnHelper = createColumnHelper<player>();
  const userColumnDefs = useMemo<ColumnDef<player, any>[]>(() => {
    return [
      columnHelper.accessor("player_name", {
        header: "Name",
        cell: (props) => (
          <CellLink getValue={props.getValue()} row={props.row} />
        ),
      }),
      columnHelper.accessor("from", {
        header: "From",
      }),
      columnHelper.accessor("to", {
        header: "To",
      }),
      columnHelper.accessor("pos", {
        header: "Position",
      }),
      columnHelper.accessor("ht", {
        header: "Height (in.)",
      }),
      columnHelper.accessor("wt", {
        header: "Weight (lbs)",
      }),
      columnHelper.accessor("birth_date", {
        header: "Birth Date",
        cell: (props) => (
          <span>{moment(props.getValue()).format("MM/DD/yyyy")}</span>
        ),
      }),
      columnHelper.accessor("colleges", {
        header: "Colleges",
      }),
    ];
  }, [columnHelper]);

  const { playerData } = props;
  const [sorting, setSorting] = useState<SortingState>([]);
  const [data, setData] = useState(() => [...(playerData as player[])]);
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
      <div className="max-h-[600px] overflow-y-auto">
        <table className="table table-zebra mt-4 w-full">
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
      <Pagination table={table} />
    </div>
  );
};

export default PlayerTable;
