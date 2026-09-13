import DonorsHero from "../components/donors/DonorsHero";
import DonorsGrid from "../components/donors/DonorsGrid";

import clientPromise from "@/lib/mongodb";

export const metadata = {
  title: "Donors & Partners | Concern Bajura",
  description:
    "Meet the individuals and organizations powering Concern Bajura's mission in Bajura, Nepal.",
};

export default async function DonorsPage() {

  const client = await clientPromise;
  const db = client.db("test");

  const donorspage = await db.collection("donorspage").findOne({});

  return (
    <main className="blue-theme relative top-20">
      <DonorsHero data={donorspage.hero} />

      <div className="bg-[var(--color-surface-alt)]">
        <DonorsGrid data={donorspage.donors} />
      </div>

    </main>
  );
}
