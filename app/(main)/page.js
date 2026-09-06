import Image from "next/image";
// import Navbar from "@/app/(main)/components/Navbar";
import Hero from "@/app/(main)/components/Hero";
import About from "@/app/(main)/components/About";
import Stories from "@/app/(main)/components/Stories";
import BoardMembers from "@/app/(main)/components/BoardMembers";
import LatestUpdates from "@/app/(main)/components/LatestUpdates";
import CTA from "@/app/(main)/components/CTA";


import clientPromise from "@/lib/mongodb";


export default async function Home() {

  const client = await clientPromise;
  const db = client.db("test");

  const homepage = await db.collection("homepage").findOne({});


  return (
    <div className="relative top-20">
      <Hero data={homepage.hero} />
      <About data={homepage.about} />
      <Stories 
      ourChildren={homepage.ourChildren}
      storiesOfOurChildren={homepage.storiesOfOurChildren}
      
      />
      <BoardMembers data={homepage.ourTeam} />
      <LatestUpdates data={homepage.latestUpdate} />
      <CTA
        volunteer={homepage.volunteer}
        donateNow={homepage.donateNow}
      />


    </div>
  );
}
