export const albums = [
  {
    slug: "education-initiatives",
    title: "Education Initiatives",
    count: 24,
    cover: "https://placehold.co/500x420/78716c/78716c?text=+",
  },
  {
    slug: "community-life",
    title: "Community Life",
    count: 36,
    cover: "https://placehold.co/500x420/78716c/78716c?text=+",
  },
  {
    slug: "portraits-of-hope",
    title: "Portraits of Hope",
    count: 18,
    cover: "https://placehold.co/500x420/78716c/78716c?text=+",
  },
];

export function getAlbumBySlug(slug) {
  return albums.find((album) => album.slug === slug);
}
