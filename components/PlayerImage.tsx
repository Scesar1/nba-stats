"use client";
import { useState } from "react";
import Image from "next/image";

export default function PlayerImage({
  name,
  src,
  fallbackSrc,
  width,
  height,
}: {
  name: string;
  src: string;
  fallbackSrc: string;
  width: number | `${number}` | undefined;
  height: number | `${number}` | undefined;
}) {
  const [hasError, setHasError] = useState(false);

  return (
    <Image
      alt={name}
      src={hasError ? fallbackSrc : src}
      onError={() => !hasError && setHasError(true)}
      width={width}
      height={height}
    />
  );
}
