import ProgramsHero from "../components/programs-&-projects/ProgramsHero";
import OurPrograms from "../components/programs-&-projects/OurPrograms";
import CurrentProjects from "../components/programs-&-projects/CurrentProjects";

import clientPromise from "@/lib/mongodb";

export const metadata = {
  title: "Our Programs & Projects | Concern Bajura",
  description:
    "Explore Concern Bajura's education, healthcare, nutrition, and shelter programs supporting children in Bajura, Nepal.",
};

export const dynamic = "force-dynamic";

export default async function ProgramsPage() {

  const client = await clientPromise;
  const db = client.db("test");

  const programProjectpage = await db.collection("program&projectpage").findOne({});

  return (
    <main className="relative top-20 bg-surface">
      <ProgramsHero data={programProjectpage.hero} />

      <div className="">
        <OurPrograms data={programProjectpage.programs} />
      </div>

      <CurrentProjects data={programProjectpage.currentProjects} />
    </main>
  );
}
