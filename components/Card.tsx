"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

type propTypes = {
  logo: string;
  name: string;
};

function Card(props: propTypes) {
  const { logo, name } = props;
  const formattedName = name.replaceAll(" ", "-");
  return (
    <Link href={`/teams/overview/${formattedName}`}>
      <div className="card bg-neutral w-48 h-48 shadow-xl">
        <div className="card-body flex justify-center content-center">
          <figure>
            <Image src={logo} alt={name} width={200} height={200} />
          </figure>
        </div>
      </div>
    </Link>
  );
}

export default Card;
