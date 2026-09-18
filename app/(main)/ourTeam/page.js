import TeamHero from "../components/ourTeam/TeamHero";
import BoardOfDirectors from "../components/ourTeam/BoardOfDirectors";
import AdvisoryCouncil from "../components/ourTeam/AdvisoryCouncil";
import StaffMembers from "../components/ourTeam/StaffMembers";

import clientPromise from "@/lib/mongodb";

export const metadata = {
  title: "Our Team | Concern Bajura",
  description:
    "Meet the board, advisory council, and staff behind Concern Bajura's work in Bajura, Nepal.",
};

export default async function TeamPage() {
  const client = await clientPromise;
  const db = client.db("test");

  const programProjectpage = await db.collection("ourTeamPage").findOne({});

  return (
    <main className="relative top-20">
      <TeamHero data={programProjectpage.hero} />

      <div className="bg-surface">
        <BoardOfDirectors data={programProjectpage.boardOfDirectors} />
        <AdvisoryCouncil data={programProjectpage.advisoryCouncil} />
        <StaffMembers data={programProjectpage.staffMembers} />
      </div>
    </main>
  );
}