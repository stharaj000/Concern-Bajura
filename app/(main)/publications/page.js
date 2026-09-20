import PublicationsHero from "../components/publications/PublicationsHero";
import DocumentsList from "../components/publications/DocumentsList";

export const metadata = {
  title: "Publications & Reports | Concern Bajura",
  description:
    "Download Concern Bajura's financial audits, strategic plan, and annual reports.",
};

import clientPromise from "@/lib/mongodb";


export const dynamic = "force-dynamic";

export default async function PublicationsPage() {

  const client = await clientPromise;
  const db = client.db("test");

  const publicationReportpage = await db.collection("publication&reportpage").findOne({});


  return (
    <main className="relative top-20">
      <PublicationsHero data={publicationReportpage.hero} />

      <div className="bg-surface">
        <DocumentsList data={publicationReportpage.documents} />
      </div>
    </main>
  );
}
