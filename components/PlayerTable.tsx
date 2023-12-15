"use client";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  SortingState,
  getSortedRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import React, { useState } from "react";
import { userColumnDefs } from "./UserColumnDefs";
import { Player } from "@/app/types/Player";
import Pagination from "./Pagination";

type propTypes = {
  playerData: Record<string, any>[];
};

const PlayerTable = (props: propTypes) => {
  const { playerData } = props;
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    columns: userColumnDefs,
    data: (playerData as Player[]) ?? [],
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
    <div className="max-h-[850px] overflow-y-auto">
      <table className="table table-zebra my-4 w-full">
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
                  {cell.getValue() instanceof Date
                    ? (cell.getValue() as Date).toLocaleDateString()
                    : (cell.getValue() as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination table={table} />
    </div>
  );
};

export default PlayerTable;
