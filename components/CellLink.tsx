import Link from "next/link";
import React from "react";

function CellLink({ getValue, row }: any) {
  const link_value = getValue.toString().replace(/\s/g, "-").toLowerCase();

  return <Link href={`${link_value}`}>{getValue}</Link>;
}

export default CellLink;
