import DonateHero from "../components/donate/DonateHero";
import BankTransfer from "../components/donate/BankTransfer";
import DonateForm from "../components/donate/DonateForm";

import clientPromise from "@/lib/mongodb";


export const metadata = {
  title: "Donate | Concern Bajura",
  description:
    "Support the children of Bajura with a direct bank transfer or online payment.",
};


export const dynamic = "force-dynamic";

export default async function DonatePage() {

  const client = await clientPromise;
  const db = await client.db("test");
  const donatePage = await db.collection("donatePage").findOne({});

  return (
    <main className="relative top-20">
      <DonateHero data={donatePage.hero} />

      <section className="bg-surface">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-16 grid md:grid-cols-2 gap-10 items-start">
          <BankTransfer data={donatePage.directBankTransfer} />
          <DonateForm data={donatePage.transferForm} />
        </div>
      </section>

    </main>
  );
}
