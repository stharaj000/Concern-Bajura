import AlbumCard from "./AlbumCard";

export default function PhotoAlbums({ data }) {
  return (
    <section className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-20">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-[var(--color-primary-active)] [font-family:var(--font-heading)]">
        Photo Albums
      </h2>

      <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data.items.map((album) => (
          <AlbumCard
            key={album.slug}
            slug={album.slug}
            title={album.title}
            count={album.photos.length}
            image={album.coverImage}
          />
        ))}
      </div>
    </section>
  );
}
