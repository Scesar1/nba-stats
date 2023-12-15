import React from "react";
import ThemeChange from "./ThemeChange";
import Link from "next/link";

function Header() {
  return (
    <nav className="navbar bg-[#fb7185]">
      <section className="container container-navbar">
        <Link href="/" className="mt-6 ml-10 text-2xl text-white">
          NBA STATS
        </Link>
        <div className="absolute right-0 top-3 pr-1">
          <ThemeChange />
        </div>
      </section>
    </nav>
  );
}

export default Header;
