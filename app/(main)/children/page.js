import ChildrenHero from "../components/children/ChildrenHero";
import MeetChildren from "../components/children/MeetChildren";
import ChildrenCTA from "../components/children/ChildrenCTA";

export const metadata = {
  title: "Our Children | Concern Bajura",
  description:
    "Meet the children Concern Bajura supports through shelter, education, and community care in Bajura, Nepal.",
};

export default function ChildrenPage() {
  return (
    <main className="blue-theme relative top-20">
      <ChildrenHero />

      <div className="bg-[var(--color-surface-alt)]">
        <MeetChildren />
      </div>
      <ChildrenCTA />
    </main>
  );
}
