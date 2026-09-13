import { notFound } from "next/navigation";
import AlbumHero from "../../components/gallery/AlbumHero";
import AlbumPhotoGrid from "../../components/gallery/AlbumPhotoGrid";
// import { albums, getAlbumBySlug } from "@/lib/galleryData";

import clientPromise from "@/lib/mongodb";


export async function generateMetadata({ params }) {
  const { slug } = await params;

  const client = await clientPromise;
  const db = await client.db("test");

  const galleryPage = await db.collection("galleryPage").findOne({});

  const album = galleryPage?.albums?.items?.find(
    (item) => item.slug === slug
  );

  if (!album) return {};
  return {
    title: `${album.title} | Gallery | Concern Bajura`,
    description: `Photos from Concern Bajura's ${album.title} album.`,
  };
}

export default async function AlbumPage({ params }) {
  const { slug } = await params;

  const client = await clientPromise;
  const db = await client.db("test");

  const galleryPage = await db.collection("galleryPage").findOne({});


  const album = galleryPage?.albums?.items?.find(
    (item) => item.slug === slug
  );

  if (!album) {
    notFound();
  }

  return (
    <main className="blue-theme relative top-20">
      <AlbumHero title={album.title} />

      <div className="bg-[var(--color-surface-alt)]">
        <AlbumPhotoGrid photos={album.photos} />
      </div>
    </main>
  );
}
