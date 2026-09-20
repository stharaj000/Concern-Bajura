
import AboutHero from "../components/aboutus/AboutHero";
import AboutIntro from "../components/aboutus/AboutIntro";
import Objectives from "../components/aboutus/Objectives";
import OurHistory from "../components/aboutus/OurHistory";
import WhyConcernBajura from "../components/aboutus/WhyConcernBajura";
import MissionVisionGoal from "../components/aboutus/MissionVisionGoal";


import clientPromise from "@/lib/mongodb";

export const metadata = {
  title: "About Us | Concern Bajura",
  description:
    "Learn about Concern Bajura's mission, history, and impact supporting orphaned and vulnerable children in Bajura, Nepal.",
};

export const dynamic = "force-dynamic";

export default async function AboutPage() {

  const client = await clientPromise;
  const db = client.db("test");

  const aboutpage = await db.collection("aboutpage").findOne({});

  if (!aboutpage) {
    return <div>About page content not found.</div>;
  }


  return (
    <main className="bg-surface relative top-20">
      <AboutHero data={aboutpage.hero} />

      <div className="flex flex-col gap-8">
        <AboutIntro data={aboutpage.about} />
        <Objectives data={aboutpage.objectives} />
        <OurHistory data={aboutpage.history} />

      <WhyConcernBajura data={aboutpage.whyConcernBajura} />
      <MissionVisionGoal data={aboutpage.missionVisionGoal} />

      </div>
    </main>
  );
}
