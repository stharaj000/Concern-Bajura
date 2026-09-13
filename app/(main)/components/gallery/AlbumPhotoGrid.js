// cycle through a few heights so the grid isn't a flat, boring grid -
// mimics the varied portrait/landscape mix in the design
const heightCycle = [560, 320, 560, 320, 560, 700, 700, 700, 460, 460, 460];

export default function AlbumPhotoGrid({ photos }) {

  return (
    <section className="max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-14">
      <div className="columns-1 sm:columns-2 md:columns-3 gap-4 md:gap-6">
        {photos.map((photo, i) => (
          <img
            key={photo.id}
            src={photo.image}
            alt={photo.alt || "Concern Bajura gallery photo"}
            style={{
              height: `${heightCycle[i % heightCycle.length]}px`,
            }}
            className="w-full object-cover rounded-lg mb-4 md:mb-6 break-inside-avoid"
          />
        ))}
      </div>
    </section>
  );
}
