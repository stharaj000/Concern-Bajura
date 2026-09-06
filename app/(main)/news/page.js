import NewsHero from "../components/news/NewsHero";
import LatestNews from "../components/news/LatestNews";
import OurEvents from "../components/news/OurEvents";

export const metadata = {
  title: "News & Events | Concern Bajura",
  description:
    "Stay updated with Concern Bajura's latest initiatives, community milestones, and upcoming events in Bajura, Nepal.",
};

export default function NewsPage() {
  return (
    <main className="blue-theme relative top-20">
      <NewsHero />

      <div className="bg-[var(--color-surface-alt)]">
        <LatestNews />
      </div>

      <OurEvents />
    </main>
  );
}
