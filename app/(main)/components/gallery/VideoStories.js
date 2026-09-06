import VideoCard from "./VideoCard";

const videos = [
  {
    id: 1,
    title: "Building Budhiganga",
    description:
      "A short documentary on the community effort to build a new school.",
    image: "https://placehold.co/700x450/78716c/78716c?text=+",
  },
  {
    id: 2,
    title: "Sita's Journey",
    description:
      "Follow Sita's journey through our education initiative program.",
    image: "https://placehold.co/700x450/78716c/78716c?text=+",
  },
];

export default function VideoStories() {
  return (
    <section className="bg-[var(--color-primary-light)]">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[var(--color-primary-active)] [font-family:var(--font-heading)]">
          Video Stories
        </h2>

        <div className="mt-10 grid md:grid-cols-2 gap-8">
          {videos.map((video) => (
            <VideoCard
              key={video.id}
              title={video.title}
              description={video.description}
              image={video.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
