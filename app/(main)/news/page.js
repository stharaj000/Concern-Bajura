import NewsHero from "../components/news/NewsHero";
import LatestNews from "../components/news/LatestNews";
import OurEvents from "../components/news/OurEvents";

import clientPromise from "@/lib/mongodb";

export const metadata = {
  title: "News & Events | Concern Bajura",
  description:
    "Stay updated with Concern Bajura's latest initiatives, community milestones, and upcoming events in Bajura, Nepal.",
};

export default async function NewsPage() {

  const client = await clientPromise;
  const db = client.db("test");

  const newspage = await db.collection("newspage").findOne({});

  return (
    <main className="bg-surface relative top-20">
      <NewsHero data={newspage.hero} />

      <div className="bg-surface">
        <LatestNews data={newspage.news} />
      </div>

      <OurEvents data={newspage.events} />
    </main>
  );
}
