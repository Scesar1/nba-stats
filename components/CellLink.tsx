import Link from "next/link";
import React from "react";

function CellLink({ getValue, row }: any) {
  return <Link href={`overview/${row.original.player_id}`}>{getValue}</Link>;
}

export default CellLink;
