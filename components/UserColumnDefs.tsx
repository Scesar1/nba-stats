//./components/UserColumnDefs.tsx
import { createColumnHelper } from "@tanstack/react-table";
import { Player } from "@/app/types/Player";
import Link from "next/link";
import CellLink from "./CellLink";
import moment from "moment";

// createColumnHelper helps us create columns with maximum type safety.
// we assign the type person so that it knows the structure for our data

const columnHelper = createColumnHelper<Player>();
export const userColumnDefs = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: (props) => <CellLink getValue={props.getValue()} row={props.row} />,
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
    header: "Height",
  }),
  columnHelper.accessor("wt", {
    header: "Weight",
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
