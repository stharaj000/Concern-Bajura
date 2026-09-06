import { notFound } from "next/navigation";
import BackLink from "../../components/childProfile/BackLink";
import ChildDetailsCard from "../../components/childProfile/ChildDetailsCard";
import StoryCard from "../../components/childProfile/StoryCard";
import SupportCTA from "../../components/childProfile/SupportCTA";
import { children, getChildBySlug } from "../../../../lib/childrenData";

export function generateStaticParams() {
  return children.map((child) => ({ slug: child.slug }));
}

export async function generateMetadata({ params }) {
  const {slug} = await params;
  const child = getChildBySlug(slug);
  if (!child) return {};
  return {
    title: `${child.name} | Concern Bajura`,
    description: `Read ${child.name}'s story and how Concern Bajura is supporting them.`,
  };
}

export default async function ChildProfilePage({ params }) {
  const {slug} = await params;
  const child =  getChildBySlug(slug);

  if (!child) {
    notFound();
  }

  return (
    <main className="blue-theme relative top-20">
      <div className="bg-[var(--color-surface-alt)]">
        <div className="max-w-5xl mx-auto px-4 md:px-6 pt-6">
          <BackLink />
        </div>

        <div className="max-w-5xl mx-auto px-4 md:px-6 pt-6 pb-10">
          <ChildDetailsCard child={child} />
        </div>

        <div className="max-w-5xl mx-auto px-4 md:px-6 pb-16">
          <StoryCard child={child} />
        </div>
      </div>

      <SupportCTA />
    </main>
  );
}
