import Biography from "@/components/Home/Biography";
import Courses from "@/components/Home/Courses";
import Hero from "@/components/Home/Hero";
import International from "@/components/Home/International";
import Organization from "@/components/Home/Organzation";
import Stats from "@/components/Home/Stats";
import VideoWorld from "@/components/Home/VideoWorld";
import WhatYouFind from "@/components/Home/WhatYouFind";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "موسسه من حقیقی",
  description: "موسسه من حقیقی",
};

export default function HomePage() {
  return (
    <main className="container mx-auto px-2 sm:px-8">
      <Hero />
      <Courses />
      <Biography />
      <Stats />
      {/* <International /> */}
      <WhatYouFind />
      {/* <VideoWorld /> */}
      <Organization />
    </main>
  );
}
