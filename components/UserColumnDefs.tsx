//./components/UserColumnDefs.tsx
import { createColumnHelper } from "@tanstack/react-table";
import { Player } from "@/app/types/Player";

// createColumnHelper helps us create columns with maximum type safety.
// we assign the type person so that it knows the structure for our data
const columnHelper = createColumnHelper<Player>();

export const userColumnDefs = [
  columnHelper.accessor((row) => row.name, {
    id: "name",
    cell: (info) => info.getValue(),
    header: (info) => <span>Name</span>,
  }),
  columnHelper.accessor((row) => row.from, {
    id: "from",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>From</span>,
  }),
  columnHelper.accessor((row) => row.to, {
    id: "to",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>To</span>,
  }),
  columnHelper.accessor((row) => row.pos, {
    id: "position",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Position</span>,
  }),
  columnHelper.accessor((row) => row.ht, {
    id: "height",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Height</span>,
  }),
  columnHelper.accessor((row) => row.wt, {
    id: "weight",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Weight</span>,
  }),
  columnHelper.accessor((row) => row.birth_date, {
    id: "birth_date",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Birth Date</span>,
  }),
  columnHelper.accessor((row) => row.colleges, {
    id: "colleges",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Colleges</span>,
  }),
];
