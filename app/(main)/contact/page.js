import ContactHero from "../components/contact/ContactHero";
import GetInTouch from "../components/contact/GetInTouch";
import ContactForm from "../components/contact/ContactForm";

export const metadata = {
  title: "Contact Us | Concern Bajura",
  description:
    "Get in touch with Concern Bajura - questions, partnerships, and more.",
};

import clientPromise from "@/lib/mongodb";


export const dynamic = "force-dynamic";

export default async function ContactPage() {

  const client = await clientPromise;
  const db = await client.db("test");
  const contactPage = await db.collection("contactPage").findOne({});

  return (
    <main className="bg-surface relative top-20">
      <ContactHero data={contactPage.hero} />

      <section className="bg-surface">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-16 grid md:grid-cols-2 gap-10 items-start">
          <GetInTouch data={contactPage.contact} />
          <ContactForm data={contactPage.transferForm} />
        </div>
      </section>

    </main>
  );
}
