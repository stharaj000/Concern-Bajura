import VideoCard from "./VideoCard";

export default function VideoStories({data}) {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[var(--color-primary-active)] [font-family:var(--font-heading)]">
          {data.title}
        </h2>

        <div className="mt-10 grid md:grid-cols-2 gap-8">
          {data.items.map((video) => (
            <VideoCard
              key={video.id}
              title={video.title}
              description={video.description}
              videoLink={video.video}
              image={video.thumbnail}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
