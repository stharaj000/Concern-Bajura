import GalleryHero from "../components/gallery/GalleryHero";
import PhotoAlbums from "../components/gallery/PhotoAlbums";
import VideoStories from "../components/gallery/VideoStories";

import clientPromise from "@/lib/mongodb";

export const metadata = {
  title: "Gallery | Concern Bajura",
  description:
    "Photo albums and video stories from Concern Bajura's work supporting children in Bajura, Nepal.",
};



export const dynamic = "force-dynamic";

export default async function GalleryPage() {

  const client = await clientPromise;
  const db = client.db("test");

  const galleryPage = await db.collection("galleryPage").findOne({});

  return (
    <main className="bg-surface relative top-20">
      <GalleryHero data={galleryPage.hero} />

      <PhotoAlbums data={galleryPage.albums} />

      <VideoStories data={galleryPage.videos} />
    </main>
  );
}
