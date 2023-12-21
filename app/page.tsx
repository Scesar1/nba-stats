import Image from "next/image";

export default async function Home() {
  return (
    <main>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-5xl font-extrabold mt-20">Welcome to NBA Stats!</h1>
        <h3 className="text-md text-center w-1/3 mt-5">
          We spent an insane amount of time scraping the data from the internet
          for this site.{" "}
        </h3>
        <div className="border mt-10">
          <Image
            src={"/dwade.jpg"}
            alt={"Dwade to Lebron"}
            width={700}
            height={500}
          />
        </div>
      </div>
    </main>
  );
}
