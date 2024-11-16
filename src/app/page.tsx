import Image from "next/image";
import Link from "next/link";
import { ContentSection } from "./components/ContentSection";
import { SearchBar } from "./components/SearchBar";
import { TypeWriter } from "./components/TypeWriter";
import flowChart from "./assets/flow-chart.png";
import windingRiver from "./assets/winding_river.jpg";
import heroImage from "./assets/home_hero_bg.jpg";
import { getRivers } from "./api";

export default async function Home() {
  const rivers: River[] = await getRivers();

  const ctaBearCreak = rivers.find((r) => r.name.includes("Bear"));
  const ctaIdaho = rivers.find((r) => r.name.includes("Snake"));
  const ctaMontana = rivers.find((r) => r.name.includes("Gallatin"));
  const ctaOregon = rivers.find((r) => r.name.includes("Deschutes"));
  const callToActionRivers = [
    ctaBearCreak,
    ctaIdaho,
    ctaMontana,
    ctaOregon,
  ].filter((r) => r) as River[];

  return (
    <>
      <div
        className="hero min-h-screen bg-white"
        style={{
          backgroundImage: `url(${heroImage.src})`,
        }}
      >
        <div className="hero-overlay bg-opacity-30" />
        <div className="hero-content h-auto flex-col justify-between lg:flex-row-reverse">
          <Image
            src={flowChart}
            className="max-w-sm shadow-xl rounded-md shadow-2xl w-full"
            alt="Gallatin River - Big Sky Discharge Flow Chart"
            width={384}
            height={254}
            priority
          />
          <div className="me-8">
            <h1 className="text-white text-6xl font-bold h-56 md:h-32">
              Plan Your Perfect <br />
              <TypeWriter
                strings={[
                  "Fishing Trip",
                  "Raft Trip",
                  "Kayak Trip",
                  "Float Trip",
                ]}
                loop
              />
            </h1>
            <p className="text-white text-2xl py-6 font-medium">
              Free access to accurate and real time river flows, weather, and
              more.
            </p>
            <Link href="#getStarted">
              <button className="btn btn-primary">Search a River</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        <ContentSection
          id="getStarted"
          vertical
          className="w-full justify-center pt-32 pb-20 px-6"
        >
          <h2 className="text-4xl font-bold p-4">Get started</h2>
          <h3 className="text-2xl font-bold text-neutral p-4 pt-0">
            <span className="me-2.5">🔎</span>Search a{" "}
            <span className="italic text-indigo-900">state</span>,{" "}
            <span className="italic text-indigo-900">river</span>, or{" "}
            <span className="italic text-indigo-900">stream</span>
          </h3>
          <SearchBar rivers={rivers} />
          <div className="flex flex-wrap items-center mt-8">
            <div className="font-bold me-4 text-lg">Give it a try: </div>
            <div className="flex flex-wrap items-center gap-2">
              {callToActionRivers.map((r) => (
                <Link
                  key={r.uuid}
                  href={`/states/${r.stateAbbr}/rivers/${r.uuid}`}
                >
                  <div className="badge badge-outline p-4 hover:bg-slate-100">
                    {r.name} - {r.location}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </ContentSection>
        <ContentSection className="flex-wrap justify-between py-8 px-6 gap-x-4">
          <div>
            <h2 className="text-4xl font-bold">
              Accurate and real time river flows and conditions
            </h2>
            <div className="pt-4 text-2xl">
              Get real time conditions for rivers all across the United States
            </div>
          </div>
          <Image
            className="shadow-xl rounded-md"
            src={windingRiver}
            width={550}
            height={250}
            alt="Animas river"
          />
        </ContentSection>
      </div>
    </>
  );
}
