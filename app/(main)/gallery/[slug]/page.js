import { notFound } from "next/navigation";
import AlbumHero from "../../components/gallery/AlbumHero";
import AlbumPhotoGrid from "../../components/gallery/AlbumPhotoGrid";
import { albums, getAlbumBySlug } from "@/lib/galleryData";

export function generateStaticParams() {
  return albums.map((album) => ({ slug: album.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const album = getAlbumBySlug(slug);
  if (!album) return {};
  return {
    title: `${album.title} | Gallery | Concern Bajura`,
    description: `Photos from Concern Bajura's ${album.title} album.`,
  };
}

export default async function AlbumPage({ params }) {
  const { slug } = await params;
  const album = getAlbumBySlug(slug);

  if (!album) {
    notFound();
  }

  return (
    <main className="blue-theme relative top-20">
      <AlbumHero title={album.title} />

      <div className="bg-[var(--color-surface-alt)]">
        <AlbumPhotoGrid count={album.count} />
      </div>
    </main>
  );
}
