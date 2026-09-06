import DonateHero from "../components/donate/DonateHero";
import BankTransfer from "../components/donate/BankTransfer";
import DonateForm from "../components/donate/DonateForm";

export const metadata = {
  title: "Donate | Concern Bajura",
  description:
    "Support the children of Bajura with a direct bank transfer or online payment.",
};

export default function DonatePage() {
  return (
    <main className="donate-page relative top-20">
      <DonateHero />

      <section className="bg-[var(--color-surface-alt)]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-16 grid md:grid-cols-2 gap-10 items-start">
          <BankTransfer />
          <DonateForm />
        </div>
      </section>

    </main>
  );
}
