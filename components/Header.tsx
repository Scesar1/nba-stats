import React from "react";
import ThemeChange from "./ThemeChange";
import Link from "next/link";
import Image from "next/image";

function Header() {
  return (
    <nav className="navbar bg-gradient-to-r from-blue-500 via-purple-500 to-[#ff7c90]">
      <section className="container container-navbar">
        <Image src="/logo.png" alt="NBA Logo" width={70} height={70}/>
        <Link href="/" className="mt-6 ml-[-1rem] text-2xl text-white">
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
