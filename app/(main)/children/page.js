import ChildrenHero from "../components/children/ChildrenHero";
import MeetChildren from "../components/children/MeetChildren";
import ChildrenCTA from "../components/children/ChildrenCTA";

import clientPromise from "@/lib/mongodb";


export const metadata = {
  title: "Our Children | Concern Bajura",
  description:
    "Meet the children Concern Bajura supports through shelter, education, and community care in Bajura, Nepal.",
};


export const dynamic = "force-dynamic";

export default async function ChildrenPage() {

  const client = await clientPromise;
  const db = client.db("test");

  const ourChildrenPage = await db.collection("ourChildrenPage").findOne({});

  return (
    <main className="bg-surface relative top-20">
      <ChildrenHero data={ourChildrenPage.hero} />

      <div>
        <MeetChildren data={ourChildrenPage.children} />
      </div>
        
      <ChildrenCTA data={ourChildrenPage.cta} />
    </main>
  );
}
