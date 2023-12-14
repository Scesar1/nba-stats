"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function Navbar() {
  const linkStyle =
    "text-xl hover:border-b-2 hover:border-accent leading-[2.75rem]";

  const activeStyle = linkStyle + " text-dark";
  const nonActiveStyle = linkStyle + " text-info";
  const currentRoute = usePathname();
  return (
    <nav className="navbar bg-base-100 border-b-[1px] border-black-400 p-0 min-h-[3rem]">
      <section className="container container-navbar">
        <ul className="flex w-[100%] overflow-x-scroll">
          <li className="grow relative text-center px-[1rem]">
            <Link
              className={currentRoute === "/" ? activeStyle : nonActiveStyle}
              href="/"
            >
              HOME
            </Link>
          </li>
          <li className="grow relative text-center px-[1rem]">
            <Link
              className={
                currentRoute === "/players" ? activeStyle : nonActiveStyle
              }
              href="/players"
            >
              PLAYERS
            </Link>
          </li>
          <li className="grow relative text-center px-[1rem]">
            <Link
              className={
                currentRoute === "/teams" ? activeStyle : nonActiveStyle
              }
              href="/teams"
            >
              TEAMS
            </Link>
          </li>
          <li className="grow relative text-center px-[1rem]">
            <Link
              className={
                currentRoute === "/stats" ? activeStyle : nonActiveStyle
              }
              href="/stats"
            >
              STATS
            </Link>
          </li>
          <li className="grow relative text-center px-[1rem]">
            <Link
              className={
                currentRoute === "/about" ? activeStyle : nonActiveStyle
              }
              href="/about"
            >
              ABOUT
            </Link>
          </li>
        </ul>
      </section>
    </nav>
  );
}

export default Navbar;
