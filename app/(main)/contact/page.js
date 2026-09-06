import ContactHero from "../components/contact/ContactHero";
import GetInTouch from "../components/contact/GetInTouch";
import ContactForm from "../components/contact/ContactForm";

export const metadata = {
  title: "Contact Us | Concern Bajura",
  description:
    "Get in touch with Concern Bajura - questions, partnerships, and more.",
};

export default function ContactPage() {
  return (
    <main className="blue-theme relative top-20">
      <ContactHero />

      <section className="bg-[var(--color-surface-alt)]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-16 grid md:grid-cols-2 gap-10 items-start">
          <GetInTouch />
          <ContactForm />
        </div>
      </section>

    </main>
  );
}
