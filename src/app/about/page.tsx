import { Metadata } from "next";
import { PageLayout } from "../components/PageLayout";

export const metadata: Metadata = {
  title: "About RiverRadar",
  description:
    `Learn about RiverRadar, your go-to source for real-time river conditions. ` +
    `Discover our mission to provide accurate, up-to-date information on river ` +
    `flows, weather, and conditions`,
};

export default function About() {
  return (
    <PageLayout>
      <h1 className="text-4xl py-6 text-center font-bold">About</h1>
      <p className="text-lg p-3">
        <span className="font-bold">RiverRadar</span> was born out of a love for
        flyfishing and a mission to solve a common problem. We often found
        ourselves headed out fishing, only to arrive at a river with conditions
        not what we expected.
      </p>
      <p className="text-lg p-3">
        We didn&apos;t want to have to look at outdated fishing reports and hard
        to navigate government websites. We brainstormed how we could make it
        easier to plan a trip out on the river and came up with{" "}
        <span className="font-bold">RiverRadar</span>, an easy to use site that
        will make checking river conditions{" "}
        <span className="font-bold">simple</span>,{" "}
        <span className="font-bold">centralized</span> and{" "}
        <span className="font-bold">to the point</span>.
      </p>
      <p className="text-lg p-3">
        Our aim is to equip you with information like real time river flows,
        weather, and more.
      </p>
      <p className="text-lg p-3">We hope you come along for the journey!</p>
      <div className="text-lg p-4">
        <p>Tight lines 🎣 🐟</p>
        <p className="mt-1 ms-2">- RiverRadar Team</p>
      </div>
    </PageLayout>
  );
}
