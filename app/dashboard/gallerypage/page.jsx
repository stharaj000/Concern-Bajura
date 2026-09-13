"use client";

import { useEffect, useState } from "react";

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100";
const textareaClass = `${inputClass} resize-y`;
const labelClass = "mb-2 block text-sm font-medium text-gray-700";
const cardClass = "rounded-2xl border border-gray-200 bg-white p-6 shadow-sm";
const cardHeaderWrapClass = "mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between";
const cardTitleClass = "text-xl font-semibold text-gray-900";
const cardSubtitleClass = "mt-1 text-sm text-gray-500";
const subCardClass = "rounded-2xl border border-gray-200 bg-gray-50/60 p-5";
const subCardHeaderClass = "mb-6 flex items-center justify-between border-b border-gray-200 pb-4";
const subCardTitleClass = "font-semibold text-gray-900";
const subCardSubtitleClass = "mt-1 text-xs text-gray-500";
const fieldRowClass = "grid grid-cols-1 gap-5 sm:grid-cols-2";
const fileWrapClass = "flex items-stretch overflow-hidden rounded-xl border border-gray-200 bg-gray-50";
const fileButtonClass = "inline-flex h-14 shrink-0 cursor-pointer items-center justify-center bg-gray-800 px-5 text-sm font-medium text-white transition hover:bg-gray-700";
const filePreviewWrapClass = "flex min-w-0 items-center gap-3 px-4";
const filePreviewImgClass = "h-9 w-9 shrink-0 rounded-lg object-cover";
const filePreviewTextClass = "truncate text-sm text-gray-500";
const helperTextClass = "mt-2 block text-xs italic text-sky-600";
const addButtonClass = "inline-flex items-center gap-1.5 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2";
const removeButtonClass = "rounded-lg px-3 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50";

const counterClass = (length, limit) =>
  `mt-1.5 text-xs ${length >= limit ? "text-red-500" : "text-gray-400"}`;

const fieldLimits = {
  heroTitle: 70,
  heroDescription: 200,
  aboutDescription: 8000,
  sectionHeading: 50,
  sectionDescription: 300,
  childEmblaTitle: 50,
  childEmblaDescription: 400,
  buttonText: 25,
  newsUpdateTitle: 80,
  newsUpdateDescription: 300,
  volunteerTitle: 60,
  volunteerDescription: 200,
  donateTitle: 60,
  donateDescription: 200,
  chipText: 20,

  // Gallery page specific
  albumTitle: 50,
  photoAlt: 100,
  videoTitle: 60,
  videoDescription: 250,
};

export default function GalleryPageCMS() {
  const [galleryPage, setGalleryPage] = useState({
    hero: { title: "", subtitle: "", image: "" },
    albums: { title: "", items: [] },
    videos: { title: "", items: [] },
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchGalleryPage = async () => {
      try {
        const response = await fetch("/api/galleryPage");
        if (!response.ok) throw new Error("Failed to fetch Gallery page");
        setGalleryPage(await response.json());
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGalleryPage();
  }, []);

  const updateHero = (field, value) => {
    setGalleryPage((prev) => ({ ...prev, hero: { ...prev.hero, [field]: value } }));
  };

  const uploadHeroImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Upload failed");
      updateHero("image", data.url);
    } catch (error) {
      console.error("Hero image upload failed:", error);
      alert("Failed to upload image.");
    }
  };

  const updateAlbumsSection = (field, value) => {
    setGalleryPage((prev) => ({ ...prev, albums: { ...prev.albums, [field]: value } }));
  };

  const updateAlbum = (index, field, value) => {
    setGalleryPage((prev) => {
      const updatedItems = [...prev.albums.items];
      updatedItems[index] = { ...updatedItems[index], [field]: value };
      return { ...prev, albums: { ...prev.albums, items: updatedItems } };
    });
  };

  const addAlbum = () => {
    const newAlbum = { id: `album-${Date.now()}`, slug: "", title: "", coverImage: "", photos: [] };
    setGalleryPage((prev) => ({ ...prev, albums: { ...prev.albums, items: [...prev.albums.items, newAlbum] } }));
  };

  const removeAlbum = (index) => {
    if (!window.confirm("Are you sure you want to remove this album?")) return;
    setGalleryPage((prev) => ({
      ...prev,
      albums: { ...prev.albums, items: prev.albums.items.filter((_, i) => i !== index) },
    }));
  };

  const uploadAlbumCoverImage = async (e, albumIndex) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Upload failed");
      updateAlbum(albumIndex, "coverImage", data.url);
    } catch (error) {
      console.error("Album cover image upload failed:", error);
      alert("Failed to upload album cover image.");
    }
  };

  const updatePhoto = (albumIndex, photoIndex, field, value) => {
    setGalleryPage((prev) => {
      const updatedItems = [...prev.albums.items];
      const updatedPhotos = [...updatedItems[albumIndex].photos];
      updatedPhotos[photoIndex] = { ...updatedPhotos[photoIndex], [field]: value };
      updatedItems[albumIndex] = { ...updatedItems[albumIndex], photos: updatedPhotos };
      return { ...prev, albums: { ...prev.albums, items: updatedItems } };
    });
  };

  const addPhoto = (albumIndex) => {
    setGalleryPage((prev) => {
      const updatedItems = [...prev.albums.items];
      const newPhoto = { id: `photo-${Date.now()}`, image: "", alt: "" };
      updatedItems[albumIndex] = { ...updatedItems[albumIndex], photos: [...updatedItems[albumIndex].photos, newPhoto] };
      return { ...prev, albums: { ...prev.albums, items: updatedItems } };
    });
  };

  const removePhoto = (albumIndex, photoIndex) => {
    setGalleryPage((prev) => {
      const updatedItems = [...prev.albums.items];
      updatedItems[albumIndex] = {
        ...updatedItems[albumIndex],
        photos: updatedItems[albumIndex].photos.filter((_, i) => i !== photoIndex),
      };
      return { ...prev, albums: { ...prev.albums, items: updatedItems } };
    });
  };

  const uploadPhotoImage = async (e, albumIndex, photoIndex) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Upload failed");
      updatePhoto(albumIndex, photoIndex, "image", data.url);
    } catch (error) {
      console.error("Photo upload failed:", error);
      alert("Failed to upload photo.");
    }
  };

  const updateVideosSection = (field, value) => {
    setGalleryPage((prev) => ({ ...prev, videos: { ...prev.videos, [field]: value } }));
  };

  const updateVideo = (index, field, value) => {
    setGalleryPage((prev) => {
      const updatedItems = [...prev.videos.items];
      updatedItems[index] = { ...updatedItems[index], [field]: value };
      return { ...prev, videos: { ...prev.videos, items: updatedItems } };
    });
  };

  const addVideo = () => {
    const newVideo = { id: `video-${Date.now()}`, title: "", description: "", video: "", thumbnail: "" };
    setGalleryPage((prev) => ({ ...prev, videos: { ...prev.videos, items: [...prev.videos.items, newVideo] } }));
  };

  const removeVideo = (index) => {
    if (!window.confirm("Are you sure you want to remove this video?")) return;
    setGalleryPage((prev) => ({
      ...prev,
      videos: { ...prev.videos, items: prev.videos.items.filter((_, i) => i !== index) },
    }));
  };

  const uploadVideoThumbnail = async (e, index) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Upload failed");
      updateVideo(index, "thumbnail", data.url);
    } catch (error) {
      console.error("Video thumbnail upload failed:", error);
      alert("Failed to upload video thumbnail.");
    }
  };

  const saveGalleryPage = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/galleryPage", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(galleryPage),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to save Gallery page");
      alert("Changes saved successfully!");
    } catch (error) {
      console.error("Save error:", error);
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center w-full">
        <p className="text-sm text-gray-500">Loading Gallery page...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen w-full md:w-[80%]">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6">

        <div className="fixed z-10 w-full border-b border-gray-200 bg-white md:w-[82%] pr-8">
          <div className="mx-auto ml-18 flex max-w-[1600px] flex-col gap-4 px-4 py-5 sm:flex-row sm:px-6 md:ml-10 md:justify-between lg:ml-0 lg:items-center lg:px-8">
            <div>
              <h1 className="text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl">Gallery Page</h1>
              <p className="mt-1 text-sm text-gray-500">Manage and update your Gallery Page content.</p>
            </div>
            <button
              onClick={saveGalleryPage}
              disabled={saving}
              className="w-full rounded-xl bg-sky-500 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        <div className="relative top-44 flex flex-col gap-6 p-4 sm:p-8 min-[700px]:top-22">

          {/* HERO */}
          <section className={cardClass}>
            <div className={cardHeaderWrapClass}>
              <div>
                <h2 className={cardTitleClass}>Hero Section</h2>
                <p className={cardSubtitleClass}>Manage the main banner displayed at the top of the page.</p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className={labelClass}>Hero Title</label>
                <input
                  type="text"
                  value={galleryPage.hero.title}
                  onChange={(e) => updateHero("title", e.target.value)}
                  maxLength={fieldLimits.heroTitle}
                  placeholder="Gallery"
                  className={inputClass}
                />
                <p className={counterClass(galleryPage.hero.title?.length || 0, fieldLimits.heroTitle)}>
                  {galleryPage.hero.title?.length || 0}/{fieldLimits.heroTitle} characters
                </p>
              </div>

              <div>
                <label className={labelClass}>Hero Subtitle</label>
                <textarea
                  rows={3}
                  value={galleryPage.hero.subtitle}
                  onChange={(e) => updateHero("subtitle", e.target.value)}
                  maxLength={fieldLimits.heroDescription}
                  placeholder="Moments of impact, community, and hope from our work in Bajura."
                  className={textareaClass}
                />
                <p className={counterClass(galleryPage.hero.subtitle?.length || 0, fieldLimits.heroDescription)}>
                  {galleryPage.hero.subtitle?.length || 0}/{fieldLimits.heroDescription} characters
                </p>
              </div>

              <div>
                <label className={labelClass}>Hero Image</label>
                <div className={fileWrapClass}>
                  <label className={fileButtonClass}>
                    Choose Image
                    <input type="file" accept="image/*" className="hidden" onChange={uploadHeroImage} />
                  </label>
                  <div className={filePreviewWrapClass}>
                    {galleryPage.hero.image ? (
                      <>
                        <img src={galleryPage.hero.image} alt="Hero preview" className={filePreviewImgClass} />
                        <span className={filePreviewTextClass}>{galleryPage.hero.image}</span>
                      </>
                    ) : (
                      <span className="text-sm text-gray-400">No image selected</span>
                    )}
                  </div>
                </div>
                <span className={helperTextClass}>Recommended: wide landscape image.</span>
              </div>
            </div>
          </section>

          {/* PHOTO ALBUMS */}
          <section className={cardClass}>
            <div className={cardHeaderWrapClass}>
              <div>
                <h2 className={cardTitleClass}>Photo Albums</h2>
                <p className={cardSubtitleClass}>Manage the heading and photo albums displayed on the page.</p>
              </div>
            </div>

            <div className="mb-8 space-y-5">
              <div>
                <label className={labelClass}>Section Title</label>
                <input
                  type="text"
                  value={galleryPage.albums.title}
                  onChange={(e) => updateAlbumsSection("title", e.target.value)}
                  maxLength={fieldLimits.sectionHeading}
                  placeholder="Photo Albums"
                  className={inputClass}
                />
                <p className={counterClass(galleryPage.albums.title?.length || 0, fieldLimits.sectionHeading)}>
                  {galleryPage.albums.title?.length || 0}/{fieldLimits.sectionHeading} characters
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {galleryPage.albums.items.map((album, albumIndex) => (
                <div key={album.id || albumIndex} className={subCardClass}>
                  <div className={subCardHeaderClass}>
                    <div>
                      <h3 className={subCardTitleClass}>Album {albumIndex + 1}</h3>
                      <p className={subCardSubtitleClass}>Manage this album's details and photos.</p>
                    </div>
                    <button type="button" className={removeButtonClass} onClick={() => removeAlbum(albumIndex)}>
                      Remove
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className={labelClass}>Album Title</label>
                      <input
                        type="text"
                        value={album.title}
                        onChange={(e) => updateAlbum(albumIndex, "title", e.target.value)}
                        maxLength={fieldLimits.albumTitle}
                        placeholder="Education Initiatives"
                        className={inputClass}
                      />
                      <p className={counterClass(album.title?.length || 0, fieldLimits.albumTitle)}>
                        {album.title?.length || 0}/{fieldLimits.albumTitle} characters
                      </p>
                    </div>

                    <div>
                      <label className={labelClass}>Slug</label>
                      <input
                        type="text"
                        value={album.slug}
                        onChange={(e) =>
                          updateAlbum(albumIndex, "slug", e.target.value.toLowerCase().replace(/\s+/g, "-"))
                        }
                        placeholder="education-initiatives"
                        className={inputClass}
                      />
                      <p className="mt-2 text-xs italic text-sky-600">
                        Album URL: /gallery/{album.slug || "album-slug"}
                      </p>
                    </div>

                    <div>
                      <label className={labelClass}>Cover Image</label>
                      <div className={fileWrapClass}>
                        <label className={fileButtonClass}>
                          Choose Image
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => uploadAlbumCoverImage(e, albumIndex)}
                          />
                        </label>
                        <div className={filePreviewWrapClass}>
                          {album.coverImage ? (
                            <>
                              <img src={album.coverImage} alt={album.title} className={filePreviewImgClass} />
                              <span className={filePreviewTextClass}>{album.coverImage}</span>
                            </>
                          ) : (
                            <span className="text-sm text-gray-400">No image selected</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="mb-4 flex items-center justify-between">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Photos</label>
                          <p className="mt-1 text-xs text-gray-500">Add the photos that belong to this album.</p>
                        </div>
                        <button type="button" className={addButtonClass} onClick={() => addPhoto(albumIndex)}>
                          + Add Photo
                        </button>
                      </div>

                      <div className="space-y-4">
                        {album.photos.map((photo, photoIndex) => (
                          <div key={photo.id || photoIndex} className="rounded-xl border border-gray-200 bg-white p-4">
                            <div className="mb-3 flex items-center justify-between">
                              <span className="text-xs font-medium text-gray-500">Photo {photoIndex + 1}</span>
                              <button
                                type="button"
                                className={removeButtonClass}
                                onClick={() => removePhoto(albumIndex, photoIndex)}
                              >
                                Remove
                              </button>
                            </div>

                            <div className="space-y-4">
                              <div>
                                <label className={labelClass}>Photo Image</label>
                                <div className={fileWrapClass}>
                                  <label className={fileButtonClass}>
                                    Choose Image
                                    <input
                                      type="file"
                                      accept="image/*"
                                      className="hidden"
                                      onChange={(e) => uploadPhotoImage(e, albumIndex, photoIndex)}
                                    />
                                  </label>
                                  <div className={filePreviewWrapClass}>
                                    {photo.image ? (
                                      <>
                                        <img src={photo.image} alt={photo.alt} className={filePreviewImgClass} />
                                        <span className={filePreviewTextClass}>{photo.image}</span>
                                      </>
                                    ) : (
                                      <span className="text-sm text-gray-400">No image selected</span>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div>
                                <label className={labelClass}>Alt Text</label>
                                <input
                                  type="text"
                                  value={photo.alt}
                                  onChange={(e) => updatePhoto(albumIndex, photoIndex, "alt", e.target.value)}
                                  maxLength={fieldLimits.photoAlt}
                                  placeholder="Describe this photo for accessibility"
                                  className={inputClass}
                                />
                                <p className={counterClass(photo.alt?.length || 0, fieldLimits.photoAlt)}>
                                  {photo.alt?.length || 0}/{fieldLimits.photoAlt} characters
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-gray-200 pt-6">
              <button type="button" className={addButtonClass} onClick={addAlbum}>
                + Add Album
              </button>
            </div>
          </section>

          {/* VIDEO STORIES */}
          <section className={cardClass}>
            <div className={cardHeaderWrapClass}>
              <div>
                <h2 className={cardTitleClass}>Video Stories</h2>
                <p className={cardSubtitleClass}>Manage the heading and video stories displayed on the page.</p>
              </div>
            </div>

            <div className="mb-8 space-y-5">
              <div>
                <label className={labelClass}>Section Title</label>
                <input
                  type="text"
                  value={galleryPage.videos.title}
                  onChange={(e) => updateVideosSection("title", e.target.value)}
                  maxLength={fieldLimits.sectionHeading}
                  placeholder="Video Stories"
                  className={inputClass}
                />
                <p className={counterClass(galleryPage.videos.title?.length || 0, fieldLimits.sectionHeading)}>
                  {galleryPage.videos.title?.length || 0}/{fieldLimits.sectionHeading} characters
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {galleryPage.videos.items.map((video, videoIndex) => (
                <div key={video.id || videoIndex} className={subCardClass}>
                  <div className={subCardHeaderClass}>
                    <div>
                      <h3 className={subCardTitleClass}>Video {videoIndex + 1}</h3>
                      <p className={subCardSubtitleClass}>Manage this video's details.</p>
                    </div>
                    <button type="button" className={removeButtonClass} onClick={() => removeVideo(videoIndex)}>
                      Remove
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className={labelClass}>Video Title</label>
                      <input
                        type="text"
                        value={video.title}
                        onChange={(e) => updateVideo(videoIndex, "title", e.target.value)}
                        maxLength={fieldLimits.videoTitle}
                        placeholder="Building Budhiganga"
                        className={inputClass}
                      />
                      <p className={counterClass(video.title?.length || 0, fieldLimits.videoTitle)}>
                        {video.title?.length || 0}/{fieldLimits.videoTitle} characters
                      </p>
                    </div>

                    <div>
                      <label className={labelClass}>Description</label>
                      <textarea
                        rows={3}
                        value={video.description}
                        onChange={(e) => updateVideo(videoIndex, "description", e.target.value)}
                        maxLength={fieldLimits.videoDescription}
                        placeholder="A short documentary on the community effort to build a new school."
                        className={textareaClass}
                      />
                      <p className={counterClass(video.description?.length || 0, fieldLimits.videoDescription)}>
                        {video.description?.length || 0}/{fieldLimits.videoDescription} characters
                      </p>
                    </div>

                    <div>
                      <label className={labelClass}>Video Link</label>
                      <input
                        type="text"
                        value={video.video}
                        onChange={(e) => updateVideo(videoIndex, "video", e.target.value)}
                        placeholder="https://... or /videos/file.mp4"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Thumbnail</label>
                      <div className={fileWrapClass}>
                        <label className={fileButtonClass}>
                          Choose Image
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => uploadVideoThumbnail(e, videoIndex)}
                          />
                        </label>
                        <div className={filePreviewWrapClass}>
                          {video.thumbnail ? (
                            <>
                              <img src={video.thumbnail} alt={video.title} className={filePreviewImgClass} />
                              <span className={filePreviewTextClass}>{video.thumbnail}</span>
                            </>
                          ) : (
                            <span className="text-sm text-gray-400">No image selected</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-gray-200 pt-6">
              <button type="button" className={addButtonClass} onClick={addVideo}>
                + Add Video
              </button>
            </div>
          </section>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={saveGalleryPage}
              disabled={saving}
              className="rounded-xl bg-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}