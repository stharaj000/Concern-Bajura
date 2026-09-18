"use client";

import { useEffect, useState } from "react";

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100";

const textareaClass = `${inputClass} resize-y`;

const labelClass = "mb-2 block text-sm font-medium text-gray-700";

const cardClass =
  "rounded-2xl border border-gray-200 bg-white p-6 shadow-sm";

const cardHeaderWrapClass =
  "mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between";

const cardTitleClass = "text-xl font-semibold text-gray-900";

const cardSubtitleClass = "mt-1 text-sm text-gray-500";

const subCardClass =
  "rounded-2xl border border-gray-200 bg-gray-50/60 p-5";

const subCardHeaderClass =
  "mb-6 flex items-center justify-between border-b border-gray-200 pb-4";

const subCardTitleClass = "font-semibold text-gray-900";

const subCardSubtitleClass = "mt-1 text-xs text-gray-500";

const fieldRowClass = "grid grid-cols-1 gap-5 sm:grid-cols-2";

const fileWrapClass =
  "flex items-stretch overflow-hidden rounded-xl border border-gray-200 bg-gray-50";

const fileButtonClass =
  "inline-flex h-14 shrink-0 cursor-pointer items-center justify-center bg-gray-800 px-5 text-sm font-medium text-white transition hover:bg-gray-700";

const filePreviewWrapClass =
  "flex min-w-0 items-center gap-3 px-4";

const filePreviewImgClass =
  "h-9 w-9 shrink-0 rounded-lg object-cover";

const filePreviewTextClass =
  "truncate text-sm text-gray-500";

const helperTextClass =
  "mt-2 block text-xs italic text-sky-600";

const addButtonClass =
  "inline-flex items-center gap-1.5 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2";

const removeButtonClass =
  "rounded-lg px-3 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50";

const counterClass = (length, limit) =>
  `mt-1.5 text-xs ${length >= limit ? "text-red-500" : "text-gray-400"
  }`;


export default function NewsCMS() {
  const [newspage, setNewspage] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNewsPage();
  }, []);

  const fetchNewsPage = async () => {
    try {
      const response = await fetch("/api/newspage");

      if (!response.ok) {
        throw new Error("Failed to fetch newspage");
      }

      const data = await response.json();

      setNewspage(data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };


  // =========================
  // HERO
  // =========================

  const updateHero = (field, value) => {
    setNewspage((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        [field]: value,
      },
    }));
  };


  // =========================
  // NEWS SECTION
  // =========================

  const updateNews = (field, value) => {
    setNewspage((prev) => ({
      ...prev,
      news: {
        ...prev.news,
        [field]: value,
      },
    }));
  };


  const updateNewsItem = (index, field, value) => {
    setNewspage((prev) => ({
      ...prev,
      news: {
        ...prev.news,
        items: prev.news.items.map((item, i) =>
          i === index
            ? {
              ...item,
              [field]: value,
            }
            : item
        ),
      },
    }));
  };


  const addNews = () => {
    const newItem = {
      id: `news-${Date.now()}`,
      tag: "",
      date: "",
      title: "",
      description: "",
      image: "",
      linkText: "Learn More",
      link: "",
    };

    setNewspage((prev) => ({
      ...prev,
      news: {
        ...prev.news,
        items: [...prev.news.items, newItem],
      },
    }));
  };


  const removeNews = (index) => {
    setNewspage((prev) => ({
      ...prev,
      news: {
        ...prev.news,
        items: prev.news.items.filter((_, i) => i !== index),
      },
    }));
  };


  // =========================
  // EVENTS SECTION
  // =========================

  const updateEvents = (field, value) => {
    setNewspage((prev) => ({
      ...prev,
      events: {
        ...prev.events,
        [field]: value,
      },
    }));
  };


  const updateEventItem = (index, field, value) => {
    setNewspage((prev) => ({
      ...prev,
      events: {
        ...prev.events,
        items: prev.events.items.map((item, i) =>
          i === index
            ? {
              ...item,
              [field]: value,
            }
            : item
        ),
      },
    }));
  };


  const addEvent = () => {
    const newItem = {
      id: `event-${Date.now()}`,
      tag: "",
      date: "",
      title: "",
      description: "",
      image: "",
      linkText: "Learn More",
      link: "",
    };

    setNewspage((prev) => ({
      ...prev,
      events: {
        ...prev.events,
        items: [...prev.events.items, newItem],
      },
    }));
  };


  const removeEvent = (index) => {
    setNewspage((prev) => ({
      ...prev,
      events: {
        ...prev.events,
        items: prev.events.items.filter((_, i) => i !== index),
      },
    }));
  };


  // =========================
  // IMAGE UPLOAD
  // =========================

  const uploadImage = async (file, callback) => {
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }

      callback(data.url);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Image upload failed.");
    }
  };


  // =========================
  // SAVE
  // =========================

  const saveNewsPage = async () => {
    setSaving(true);

    try {
      const response = await fetch("/api/newspage", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newspage),
      });

      const data = await response.json();

      console.log("Response status:", response.status);
      console.log("Save response:", data);

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to save newspage"
        );
      }

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
      <div className="flex min-h-[60vh] items-center justify-center w-full">
        Loading News & Events CMS...
      </div>
    );
  }


  if (!newspage) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-red-500">
          Failed to load News & Events data.
        </p>
      </div>
    );
  }


  return (
    <main className="min-h-screen w-full md:w-[80%]">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6">

        {/* Header */}

        <div className="fixed z-10 w-full border-b border-gray-200 bg-white md:w-[82%] pr-8">
          <div className="mx-auto ml-18 flex max-w-[1600px] flex-col gap-4 px-4 py-5 sm:flex-row sm:px-6 md:ml-10 md:justify-between lg:ml-0 lg:items-center lg:px-8">

            <div>
              <h1 className="text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
                News & Event Page
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Manage and update your News & Event page content.
              </p>
            </div>

            <button
              onClick={saveNewsPage}
              disabled={saving}
              className="w-full rounded-xl bg-sky-500 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

          </div>
        </div>


        {/* ========================================= */}
        {/* HERO SECTION */}
        {/* ========================================= */}

        <div className="relative top-40 flex flex-col gap-6 p-4 sm:p-8 min-[700px]:top-22">
          <section className={cardClass}>

            <div className={cardHeaderWrapClass}>
              <div>
                <h2 className={cardTitleClass}>
                  Hero Section
                </h2>

                <p className={cardSubtitleClass}>
                  Edit the main banner content of the News & Events page.
                </p>
              </div>
            </div>


            <div className="space-y-5">

              {/* Title + Subtitle */}

              <div>

                <div>
                  <label className={labelClass}>
                    Title
                  </label>

                  <input
                    type="text"
                    value={newspage.hero.title}
                    maxLength={80}
                    onChange={(e) =>
                      updateHero("title", e.target.value)
                    }
                    className={inputClass}
                    placeholder="News & Events"
                  />

                  <p className={counterClass(
                    newspage.hero.title.length,
                    80
                  )}>
                    {newspage.hero.title.length}/80
                  </p>
                </div>


                <div>
                  <label className={labelClass}>
                    Subtitle
                  </label>

                  <input
                    type="text"
                    value={newspage.hero.subtitle}
                    maxLength={160}
                    onChange={(e) =>
                      updateHero("subtitle", e.target.value)
                    }
                    className={inputClass}
                    placeholder="Enter hero subtitle"
                  />

                  <p className={counterClass(
                    newspage.hero.subtitle.length,
                    160
                  )}>
                    {newspage.hero.subtitle.length}/160
                  </p>
                </div>

              </div>


              {/* Hero Image */}

              <div>
                <label className={labelClass}>
                  Hero Image
                </label>

                <div className={fileWrapClass}>

                  <label className={fileButtonClass}>
                    Choose Image

                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];

                        uploadImage(file, (url) =>
                          updateHero("image", url)
                        );
                      }}
                    />
                  </label>


                  <div className={filePreviewWrapClass}>

                    {newspage.hero.image && (
                      <img
                        src={newspage.hero.image}
                        alt="Hero preview"
                        className={filePreviewImgClass}
                      />
                    )}

                    <span className={filePreviewTextClass}>
                      {newspage.hero.image || "No image selected"}
                    </span>

                  </div>

                </div>

                <span className={helperTextClass}>
                  Recommended: wide landscape image suitable for a hero banner.
                </span>
              </div>

            </div>
          </section>



          {/* ========================================= */}
          {/* LATEST NEWS */}
          {/* ========================================= */}

          <section className={cardClass}>

            <div className={cardHeaderWrapClass}>

              <div>
                <h2 className={cardTitleClass}>
                  Latest News
                </h2>

                <p className={cardSubtitleClass}>
                  Manage news articles displayed on the page.
                </p>
              </div>

            </div>


            {/* Section title */}

            <div className="mb-8">

              <label className={labelClass}>
                Section Title
              </label>

              <input
                type="text"
                value={newspage.news.title}
                maxLength={80}
                onChange={(e) =>
                  updateNews("title", e.target.value)
                }
                className={inputClass}
              />

              <p className={counterClass(
                newspage.news.title.length,
                80
              )}>
                {newspage.news.title.length}/80
              </p>

            </div>


            {/* News Items */}

            <div className="space-y-6">

              {newspage.news.items.map((item, index) => (

                <div
                  key={item.id}
                  className={subCardClass}
                >

                  <div className={subCardHeaderClass}>

                    <div>
                      <h3 className={subCardTitleClass}>
                        News {index + 1}
                      </h3>

                      <p className={subCardSubtitleClass}>
                        Add information about this news article.
                      </p>
                    </div>


                    <button
                      type="button"
                      className={removeButtonClass}
                      onClick={() => removeNews(index)}
                    >
                      Remove
                    </button>

                  </div>


                  <div className="space-y-5">

                    {/* Tag + Date */}

                    <div className={fieldRowClass}>

                      <div>
                        <label className={labelClass}>
                          Tag
                        </label>

                        <input
                          type="text"
                          value={item.tag}
                          maxLength={40}
                          onChange={(e) =>
                            updateNewsItem(
                              index,
                              "tag",
                              e.target.value
                            )
                          }
                          className={inputClass}
                          placeholder="Milestone"
                        />

                        <p className={counterClass(
                          item.tag.length,
                          40
                        )}>
                          {item.tag.length}/40
                        </p>
                      </div>


                      <div>
                        <label className={labelClass}>
                          Date
                        </label>

                        <input
                          type="text"
                          value={item.date}
                          maxLength={40}
                          onChange={(e) =>
                            updateNewsItem(
                              index,
                              "date",
                              e.target.value
                            )
                          }
                          className={inputClass}
                          placeholder="October 12, 2024"
                        />

                        <p className={counterClass(
                          item.date.length,
                          40
                        )}>
                          {item.date.length}/40
                        </p>
                      </div>

                    </div>


                    {/* Title */}

                    <div>

                      <label className={labelClass}>
                        Title
                      </label>

                      <input
                        type="text"
                        value={item.title}
                        maxLength={120}
                        onChange={(e) =>
                          updateNewsItem(
                            index,
                            "title",
                            e.target.value
                          )
                        }
                        className={inputClass}
                        placeholder="Enter news title"
                      />

                      <p className={counterClass(
                        item.title.length,
                        120
                      )}>
                        {item.title.length}/120
                      </p>

                    </div>


                    {/* Description */}

                    <div>

                      <label className={labelClass}>
                        Description
                      </label>

                      <textarea
                        rows={4}
                        value={item.description}
                        maxLength={300}
                        onChange={(e) =>
                          updateNewsItem(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        className={textareaClass}
                        placeholder="Enter news description"
                      />

                      <p className={counterClass(
                        item.description.length,
                        300
                      )}>
                        {item.description.length}/300
                      </p>

                    </div>


                    {/* Image */}

                    <div>

                      <label className={labelClass}>
                        Image
                      </label>

                      <div className={fileWrapClass}>

                        <label className={fileButtonClass}>
                          Choose Image

                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file =
                                e.target.files?.[0];

                              uploadImage(file, (url) =>
                                updateNewsItem(
                                  index,
                                  "image",
                                  url
                                )
                              );
                            }}
                          />
                        </label>


                        <div className={filePreviewWrapClass}>

                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.title || "News"}
                              className={filePreviewImgClass}
                            />
                          )}

                          <span className={filePreviewTextClass}>
                            {item.image || "No image selected"}
                          </span>

                        </div>

                      </div>

                    </div>


                    {/* Link Text + Link */}

                    <div className={fieldRowClass}>

                      <div>

                        <label className={labelClass}>
                          Link Text
                        </label>

                        <input
                          type="text"
                          value={item.linkText}
                          maxLength={40}
                          onChange={(e) =>
                            updateNewsItem(
                              index,
                              "linkText",
                              e.target.value
                            )
                          }
                          className={inputClass}
                          placeholder="Learn More"
                        />

                        <p className={counterClass(
                          item.linkText.length,
                          40
                        )}>
                          {item.linkText.length}/40
                        </p>

                      </div>


                      <div>

                        <label className={labelClass}>
                          Link
                        </label>

                        <input
                          type="text"
                          value={item.link}
                          maxLength={300}
                          onChange={(e) =>
                            updateNewsItem(
                              index,
                              "link",
                              e.target.value
                            )
                          }
                          className={inputClass}
                          placeholder="/news"
                        />

                        <p className={counterClass(
                          item.link.length,
                          300
                        )}>
                          {item.link.length}/300
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

              ))}

            </div>


            {/* Add News */}

            <div className="mt-6 border-t border-gray-200 pt-6">

              <button
                type="button"
                className={addButtonClass}
                onClick={addNews}
              >
                + Add News
              </button>

            </div>

          </section>


          {/* ========================================= */}
          {/* EVENTS */}
          {/* ========================================= */}

          <section className={cardClass}>

            <div className={cardHeaderWrapClass}>

              <div>
                <h2 className={cardTitleClass}>
                  Events
                </h2>

                <p className={cardSubtitleClass}>
                  Manage events displayed on the page.
                </p>
              </div>

            </div>


            {/* Section title */}

            <div className="mb-8">

              <label className={labelClass}>
                Section Title
              </label>

              <input
                type="text"
                value={newspage.events.title}
                maxLength={80}
                onChange={(e) =>
                  updateEvents("title", e.target.value)
                }
                className={inputClass}
              />

              <p className={counterClass(
                newspage.events.title.length,
                80
              )}>
                {newspage.events.title.length}/80
              </p>

            </div>


            {/* Event Items */}

            <div className="space-y-6">

              {newspage.events.items.map((item, index) => (

                <div
                  key={item.id}
                  className={subCardClass}
                >

                  <div className={subCardHeaderClass}>

                    <div>
                      <h3 className={subCardTitleClass}>
                        Event {index + 1}
                      </h3>

                      <p className={subCardSubtitleClass}>
                        Add information about this event.
                      </p>
                    </div>


                    <button
                      type="button"
                      className={removeButtonClass}
                      onClick={() => removeEvent(index)}
                    >
                      Remove
                    </button>

                  </div>


                  <div className="space-y-5">

                    {/* Tag + Date */}

                    <div className={fieldRowClass}>

                      <div>

                        <label className={labelClass}>
                          Tag
                        </label>

                        <input
                          type="text"
                          value={item.tag}
                          maxLength={40}
                          onChange={(e) =>
                            updateEventItem(
                              index,
                              "tag",
                              e.target.value
                            )
                          }
                          className={inputClass}
                          placeholder="Milestone"
                        />

                        <p className={counterClass(
                          item.tag.length,
                          40
                        )}>
                          {item.tag.length}/40
                        </p>

                      </div>


                      <div>

                        <label className={labelClass}>
                          Date
                        </label>

                        <input
                          type="text"
                          value={item.date}
                          maxLength={40}
                          onChange={(e) =>
                            updateEventItem(
                              index,
                              "date",
                              e.target.value
                            )
                          }
                          className={inputClass}
                          placeholder="October 12, 2024"
                        />

                        <p className={counterClass(
                          item.date.length,
                          40
                        )}>
                          {item.date.length}/40
                        </p>

                      </div>

                    </div>


                    {/* Title */}

                    <div>

                      <label className={labelClass}>
                        Title
                      </label>

                      <input
                        type="text"
                        value={item.title}
                        maxLength={120}
                        onChange={(e) =>
                          updateEventItem(
                            index,
                            "title",
                            e.target.value
                          )
                        }
                        className={inputClass}
                        placeholder="Enter event title"
                      />

                      <p className={counterClass(
                        item.title.length,
                        120
                      )}>
                        {item.title.length}/120
                      </p>

                    </div>


                    {/* Description */}

                    <div>

                      <label className={labelClass}>
                        Description
                      </label>

                      <textarea
                        rows={4}
                        value={item.description}
                        maxLength={300}
                        onChange={(e) =>
                          updateEventItem(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        className={textareaClass}
                        placeholder="Enter event description"
                      />

                      <p className={counterClass(
                        item.description.length,
                        300
                      )}>
                        {item.description.length}/300
                      </p>

                    </div>


                    {/* Image */}

                    <div>

                      <label className={labelClass}>
                        Image
                      </label>

                      <div className={fileWrapClass}>

                        <label className={fileButtonClass}>
                          Choose Image

                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file =
                                e.target.files?.[0];

                              uploadImage(file, (url) =>
                                updateEventItem(
                                  index,
                                  "image",
                                  url
                                )
                              );
                            }}
                          />
                        </label>


                        <div className={filePreviewWrapClass}>

                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.title || "Event"}
                              className={filePreviewImgClass}
                            />
                          )}

                          <span className={filePreviewTextClass}>
                            {item.image || "No image selected"}
                          </span>

                        </div>

                      </div>

                    </div>


                    {/* Link Text + Link */}

                    <div className={fieldRowClass}>

                      <div>

                        <label className={labelClass}>
                          Link Text
                        </label>

                        <input
                          type="text"
                          value={item.linkText}
                          maxLength={40}
                          onChange={(e) =>
                            updateEventItem(
                              index,
                              "linkText",
                              e.target.value
                            )
                          }
                          className={inputClass}
                          placeholder="Learn More"
                        />

                        <p className={counterClass(
                          item.linkText.length,
                          40
                        )}>
                          {item.linkText.length}/40
                        </p>

                      </div>


                      <div>

                        <label className={labelClass}>
                          Link
                        </label>

                        <input
                          type="text"
                          value={item.link}
                          maxLength={300}
                          onChange={(e) =>
                            updateEventItem(
                              index,
                              "link",
                              e.target.value
                            )
                          }
                          className={inputClass}
                          placeholder="/news"
                        />

                        <p className={counterClass(
                          item.link.length,
                          300
                        )}>
                          {item.link.length}/300
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

              ))}

            </div>


            {/* Add Event */}

            <div className="mt-6 border-t border-gray-200 pt-6">

              <button
                type="button"
                className={addButtonClass}
                onClick={addEvent}
              >
                + Add Event
              </button>

            </div>

          </section>
          <div className="flex justify-end">

            <button
              type="button"
              onClick={saveNewsPage}
              disabled={saving}
              className="rounded-xl bg-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

          </div>

        </div>

      </div>
    </main>
  );
}