import GalleryHero from "../components/gallery/GalleryHero";
import PhotoAlbums from "../components/gallery/PhotoAlbums";
import VideoStories from "../components/gallery/VideoStories";

export const metadata = {
  title: "Gallery | Concern Bajura",
  description:
    "Photo albums and video stories from Concern Bajura's work supporting children in Bajura, Nepal.",
};

export default function GalleryPage() {
  return (
    <main className="blue-theme relative top-20">
      <GalleryHero />

      <div className="bg-[var(--color-surface-alt)]">
        <PhotoAlbums />
      </div>

      <VideoStories />
    </main>
  );
}
