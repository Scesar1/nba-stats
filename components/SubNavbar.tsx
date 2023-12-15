"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function SubNavbar() {
  const linkStyle =
    "text-md hover:border-b-2 hover:border-accent leading-[2.75rem]";

  const activeStyle = linkStyle + " text-primary";
  const nonActiveStyle = linkStyle + " text-dark";
  const currentRoute = usePathname();
  return (
    <nav className="navbar bg-base-100 border-b-[1px] rounded border-stone-500 p-0 min-h-[1rem] w-[65rem] shadow-md">
        <ul className="flex w-[100%] overflow-x-scroll">
          <li className="grow relative text-center">
            <Link
              className={currentRoute === "/teams/overview" ? activeStyle : nonActiveStyle}
              href="/teams/overview"
            >
              OVERVIEW
            </Link>
          </li>
          <li className="grow relative text-center">
            <Link
              className={
                currentRoute === "/players" ? activeStyle : nonActiveStyle
              }
              href="/players"
            >
              TEAM STATS
            </Link>
          </li>
          <li className="grow relative text-center">
            <Link
              className={
                currentRoute === "/teams" ? activeStyle : nonActiveStyle
              }
              href="/teams"
            >
              ROSTER
            </Link>
          </li>
          <li className="grow relative text-center">
            <Link
              className={
                currentRoute === "/stats" ? activeStyle : nonActiveStyle
              }
              href="/stats"
            >
              H2H
            </Link>
          </li>
        </ul>
    </nav>
  );
}

export default SubNavbar;
