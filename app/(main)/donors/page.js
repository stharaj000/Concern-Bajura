import DonorsHero from "../components/donors/DonorsHero";
import DonorsGrid from "../components/donors/DonorsGrid";

export const metadata = {
  title: "Donors & Partners | Concern Bajura",
  description:
    "Meet the individuals and organizations powering Concern Bajura's mission in Bajura, Nepal.",
};

export default function DonorsPage() {
  return (
    <main className="blue-theme relative top-20">
      <DonorsHero />

      <div className="bg-[var(--color-surface-alt)]">
        <DonorsGrid />
      </div>

    </main>
  );
}
