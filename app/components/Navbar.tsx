import Link from "next/link";
import React from "react";
import ThemeChange from "./ThemeChange";

function Navbar() {
  return (
    <nav className="navbar bg-base-100 border border-b-1 border-black-500 p-0 min-h-[3rem]">
      <section className="container container-navbar">
        <ul className="flex w-[100%] overflow-x-scroll">
          <li className="grow relative text-center px-[1rem]">
            <Link
              className="text-xl text-primary hover:border-b-2 hover:border-accent leading-[2.75rem]"
              href="/"
            >
              HOME
            </Link>
          </li>
          <li className="grow relative text-center px-[1rem]">
            <Link
              className="text-xl text-primary hover:border-b-2 hover:border-accent leading-[2.75rem]"
              href="/"
            >
              HOME
            </Link>
          </li>
          <li className="grow relative text-center px-[1rem]">
            <Link
              className="text-xl text-primary hover:border-b-2 hover:border-accent leading-[2.75rem]"
              href="/"
            >
              HOME
            </Link>
          </li>
          <li className="grow relative text-center px-[1rem]">
            <Link
              className="text-xl text-primary hover:border-b-2 hover:border-accent leading-[2.75rem]"
              href="/"
            >
              HOME
            </Link>
          </li>
          <li className="grow relative text-center px-[1rem]">
            <Link
              className=" text-xl text-primary hover:border-b-2 hover:border-accent leading-[2.75rem]"
              href="/"
            >
              HOME
            </Link>
          </li>
          <li className="grow relative text-center px-[1rem]">
            <Link
              className="text-xl text-primary hover:border-b-2 hover:border-accent leading-[2.75rem]"
              href="/"
            >
              HOME
            </Link>
          </li>
        </ul>
      </section>
    </nav>
  );
}

export default Navbar;
