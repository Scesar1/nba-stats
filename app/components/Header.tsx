import React from "react";
import ThemeChange from "./ThemeChange";
import Link from "next/link";

function Header() {
  return (
    <nav className="navbar bg-accent">
      <section className="container container-navbar">
        <Link href="/" className="inline text-2xl text-base-100">
          NBA STATS
        </Link>
        <div className="absolute right-0 pr-1">
          <ThemeChange />
        </div>
      </section>
    </nav>
  );
}

export default Header;
