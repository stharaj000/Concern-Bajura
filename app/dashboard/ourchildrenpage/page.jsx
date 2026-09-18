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

  // Our Children page specific — not covered by the shared keys above
  childDob: 40,
  childBirthPlace: 60,
  childParentName: 60,
};

export default function OurChildrenPageCMS() {
  const [ourChildrenPage, setOurChildrenPage] = useState({
    hero: {
      title: "",
      subtitle: "",
      image: "",
    },
    children: {
      title: "",
      subtitle: "",
      items: [],
    },
    cta: {
      title: "",
      description: "",
      buttonText: "",
      buttonLink: "",
    },
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // --------------------------------------------------
  // GET DATA
  // --------------------------------------------------

  useEffect(() => {
    const fetchOurChildrenPage = async () => {
      try {
        const response = await fetch("/api/ourChildrenPage");

        if (!response.ok) {
          throw new Error("Failed to fetch Our Children page");
        }

        const data = await response.json();

        setOurChildrenPage(data);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOurChildrenPage();
  }, []);

  // --------------------------------------------------
  // UPDATE HERO
  // --------------------------------------------------

  const updateHero = (field, value) => {
    setOurChildrenPage((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        [field]: value,
      },
    }));
  };

  // --------------------------------------------------
  // HERO IMAGE UPLOAD
  // --------------------------------------------------

  const uploadHeroImage = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }

      updateHero("image", data.url);
    } catch (error) {
      console.error("Hero image upload failed:", error);
      alert("Failed to upload image.");
    }
  };

  // --------------------------------------------------
  // UPDATE CHILDREN SECTION
  // --------------------------------------------------

  const updateChildrenSection = (field, value) => {
    setOurChildrenPage((prev) => ({
      ...prev,
      children: {
        ...prev.children,
        [field]: value,
      },
    }));
  };

  // --------------------------------------------------
  // UPDATE CHILD
  // --------------------------------------------------

  const updateChild = (index, field, value) => {
    setOurChildrenPage((prev) => {
      const updatedItems = [...prev.children.items];

      updatedItems[index] = {
        ...updatedItems[index],
        [field]: value,
      };

      return {
        ...prev,
        children: {
          ...prev.children,
          items: updatedItems,
        },
      };
    });
  };


  const updateChildDetails = (index, field, value) => {
    setOurChildrenPage((prev) => {
      const updatedItems = [...prev.children.items];

      updatedItems[index] = {
        ...updatedItems[index],
        details: {
          ...updatedItems[index].details,
          [field]: value,
        }
      };

      return {
        ...prev,
        children: {
          ...prev.children,
          items: updatedItems,
        },
      };
    });
  };

  // --------------------------------------------------
  // ADD CHILD
  // --------------------------------------------------

  const addChild = () => {
    const newChild = {
      id: `child-${Date.now()}`,
      slug: "",
      name: "",
      age: "",
      dateOfBirth: "",
      birthPlace: "",
      fatherName: "",
      motherName: "",
      image: "",
      story: [""],
    };

    setOurChildrenPage((prev) => ({
      ...prev,
      children: {
        ...prev.children,
        items: [...prev.children.items, newChild],
      },
    }));
  };

  // --------------------------------------------------
  // REMOVE CHILD
  // --------------------------------------------------

  const removeChild = (index) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this child?"
    );

    if (!confirmed) return;

    setOurChildrenPage((prev) => ({
      ...prev,
      children: {
        ...prev.children,
        items: prev.children.items.filter((_, i) => i !== index),
      },
    }));
  };

  // --------------------------------------------------
  // UPLOAD CHILD IMAGE
  // --------------------------------------------------

  const uploadChildImage = async (e, index) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }

      updateChild(index, "image", data.url);
    } catch (error) {
      console.error("Child image upload failed:", error);
      alert("Failed to upload child image.");
    }
  };

  // --------------------------------------------------
  // UPDATE STORY
  // --------------------------------------------------

  const updateStory = (childIndex, storyIndex, value) => {
    setOurChildrenPage((prev) => {
      const updatedItems = [...prev.children.items];

      const child = updatedItems[childIndex];

      const updatedParagraphs = [
        ...(child.story?.paragraphs || []),
      ];

      updatedParagraphs[storyIndex] = value;

      updatedItems[childIndex] = {
        ...child,
        story: {
          ...child.story,
          paragraphs: updatedParagraphs,
        },
      };

      return {
        ...prev,
        children: {
          ...prev.children,
          items: updatedItems,
        },
      };
    });
  };


  // --------------------------------------------------
  // ADD STORY PARAGRAPH
  // --------------------------------------------------
  const addStoryParagraph = (childIndex) => {
    setOurChildrenPage((prev) => {
      const updatedItems = [...prev.children.items];
      const child = updatedItems[childIndex];

      updatedItems[childIndex] = {
        ...child,
        story: {
          ...child.story,
          paragraphs: [
            ...(child.story?.paragraphs || []),
            "",
          ],
        },
      };

      return {
        ...prev,
        children: {
          ...prev.children,
          items: updatedItems,
        },
      };
    });
  };



  // --------------------------------------------------
  // REMOVE STORY PARAGRAPH
  // --------------------------------------------------

  const removeStoryParagraph = (childIndex, storyIndex) => {
    setOurChildrenPage((prev) => {
      const updatedItems = [...prev.children.items];

      const child = updatedItems[childIndex];

      const updatedParagraphs = (child.story?.paragraphs || []).filter(
        (_, i) => i !== storyIndex
      );

      updatedItems[childIndex] = {
        ...child,
        story: {
          ...child.story,
          paragraphs: updatedParagraphs,
        },
      };

      return {
        ...prev,
        children: {
          ...prev.children,
          items: updatedItems,
        },
      };
    });
  };


  // --------------------------------------------------
  // UPDATE CTA
  // --------------------------------------------------

  const updateCTA = (field, value) => {
    setOurChildrenPage((prev) => ({
      ...prev,
      cta: {
        ...prev.cta,
        [field]: value,
      },
    }));
  };

  // --------------------------------------------------
  // SAVE
  // --------------------------------------------------

  const saveOurChildrenPage = async () => {
    setSaving(true);

    try {
      console.log("Saving Our Children page:", ourChildrenPage);

      const response = await fetch("/api/ourChildrenPage", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ourChildrenPage),
      });

      const data = await response.json();

      console.log("Response status:", response.status);
      console.log("Save response:", data);

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to save Our Children page"
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

  // --------------------------------------------------
  // LOADING
  // --------------------------------------------------

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center w-full">
        <p className="text-sm text-gray-500">
          Loading Our Children page...
        </p>
      </div>
    );
  }

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <main className="min-h-screen w-full md:w-[80%]">


      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6">

        {/* Header */}

        <div className="fixed z-10 w-full border-b border-gray-200 bg-white md:w-[82%] pr-8">
          <div className="mx-auto ml-18 flex max-w-[1600px] flex-col gap-4 px-4 py-5 sm:flex-row sm:px-6 md:ml-10 md:justify-between lg:ml-0 lg:items-center lg:px-8">

            <div>
              <h1 className="text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
                Our Children Page
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Manage and update your Our Children Page content.
              </p>
            </div>

            <button
              onClick={saveOurChildrenPage}
              disabled={saving}
              className="w-full rounded-xl bg-sky-500 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

          </div>
        </div>

        <div className="relative top-44 flex flex-col gap-6 p-4 sm:p-8 min-[700px]:top-22">
          {/* ==================================================
          HERO SECTION
      ================================================== */}

          <section className={cardClass}>
            <div className={cardHeaderWrapClass}>
              <div>
                <h2 className={cardTitleClass}>
                  Hero Section
                </h2>

                <p className={cardSubtitleClass}>
                  Manage the main banner displayed at the top of the page.
                </p>
              </div>
            </div>

            <div className="space-y-5">

              <div>
                <label className={labelClass}>
                  Hero Title
                </label>

                <input
                  type="text"
                  value={ourChildrenPage.hero.title}
                  onChange={(e) =>
                    updateHero("title", e.target.value)
                  }
                  maxLength={fieldLimits.heroTitle}
                  placeholder="Our Children"
                  className={inputClass}
                />

                <p className={counterClass(ourChildrenPage.hero.title?.length || 0, fieldLimits.heroTitle)}>
                  {ourChildrenPage.hero.title?.length || 0}/{fieldLimits.heroTitle} characters
                </p>
              </div>

              <div>
                <label className={labelClass}>
                  Hero Subtitle
                </label>

                <textarea
                  rows={3}
                  value={ourChildrenPage.hero.subtitle}
                  onChange={(e) =>
                    updateHero("subtitle", e.target.value)
                  }
                  maxLength={fieldLimits.heroDescription}
                  placeholder="Supporting children. Creating opportunities. Building better futures."
                  className={textareaClass}
                />

                <p className={counterClass(ourChildrenPage.hero.subtitle?.length || 0, fieldLimits.heroDescription)}>
                  {ourChildrenPage.hero.subtitle?.length || 0}/{fieldLimits.heroDescription} characters
                </p>
              </div>

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
                      onChange={uploadHeroImage}
                    />
                  </label>

                  <div className={filePreviewWrapClass}>
                    {ourChildrenPage.hero.image ? (
                      <>
                        <img
                          src={ourChildrenPage.hero.image}
                          alt="Hero preview"
                          className={filePreviewImgClass}
                        />

                        <span className={filePreviewTextClass}>
                          {ourChildrenPage.hero.image}
                        </span>
                      </>
                    ) : (
                      <span className="text-sm text-gray-400">
                        No image selected
                      </span>
                    )}
                  </div>
                </div>

                <span className={helperTextClass}>
                  Recommended: wide landscape image.
                </span>
              </div>

            </div>
          </section>

          {/* ==================================================
          CHILDREN SECTION
      ================================================== */}

          <section className={cardClass}>

            <div className={cardHeaderWrapClass}>
              <div>
                <h2 className={cardTitleClass}>
                  Meet Our Children
                </h2>

                <p className={cardSubtitleClass}>
                  Manage the heading and child profiles displayed on the page.
                </p>
              </div>
            </div>

            {/* SECTION TITLE */}

            <div className="mb-8 space-y-5">

              <div>
                <label className={labelClass}>
                  Section Title
                </label>

                <input
                  type="text"
                  value={ourChildrenPage.children.title}
                  onChange={(e) =>
                    updateChildrenSection("title", e.target.value)
                  }
                  maxLength={fieldLimits.sectionHeading}
                  placeholder="Meet Our Children"
                  className={inputClass}
                />

                <p className={counterClass(ourChildrenPage.children.title?.length || 0, fieldLimits.sectionHeading)}>
                  {ourChildrenPage.children.title?.length || 0}/{fieldLimits.sectionHeading} characters
                </p>
              </div>

              <div>
                <label className={labelClass}>
                  Section Subtitle
                </label>

                <textarea
                  rows={2}
                  value={ourChildrenPage.children.subtitle}
                  onChange={(e) =>
                    updateChildrenSection("subtitle", e.target.value)
                  }
                  maxLength={fieldLimits.sectionDescription}
                  placeholder="The incredible young minds we support."
                  className={textareaClass}
                />

                <p className={counterClass(ourChildrenPage.children.subtitle?.length || 0, fieldLimits.sectionDescription)}>
                  {ourChildrenPage.children.subtitle?.length || 0}/{fieldLimits.sectionDescription} characters
                </p>
              </div>

            </div>

            {/* CHILDREN */}

            <div className="space-y-6">

              {ourChildrenPage.children.items.map((child, index) => (

                <div
                  key={child.id || index}
                  className={subCardClass}
                >

                  <div className={subCardHeaderClass}>

                    <div>
                      <h3 className={subCardTitleClass}>
                        Child {index + 1}
                      </h3>

                      <p className={subCardSubtitleClass}>
                        Manage this child's profile information.
                      </p>
                    </div>

                    <button
                      type="button"
                      className={removeButtonClass}
                      onClick={() => removeChild(index)}
                    >
                      Remove
                    </button>

                  </div>

                  <div className="space-y-6">

                    {/* NAME + AGE */}

                    <div className={fieldRowClass}>

                      <div>
                        <label className={labelClass}>
                          Name
                        </label>

                        <input
                          type="text"
                          value={child.name}
                          onChange={(e) =>
                            updateChild(
                              index,
                              "name",
                              e.target.value
                            )
                          }
                          maxLength={fieldLimits.childEmblaTitle}
                          placeholder="Yubraj Mijar"
                          className={inputClass}
                        />

                        <p className={counterClass(child.name?.length || 0, fieldLimits.childEmblaTitle)}>
                          {child.name?.length || 0}/{fieldLimits.childEmblaTitle} characters
                        </p>
                      </div>

                      <div>
                        <label className={labelClass}>
                          Age
                        </label>

                        <input
                          type="number"
                          value={child.age}
                          onChange={(e) =>
                            updateChild(
                              index,
                              "age",
                              e.target.value
                            )
                          }
                          placeholder="8"
                          className={inputClass}
                        />
                      </div>

                    </div>

                    {/* SLUG */}

                    <div>
                      <label className={labelClass}>
                        Slug
                      </label>

                      <input
                        type="text"
                        value={child.slug}
                        onChange={(e) =>
                          updateChild(
                            index,
                            "slug",
                            e.target.value
                              .toLowerCase()
                              .replace(/\s+/g, "-")
                          )
                        }
                        placeholder="yubraj-mijar"
                        className={inputClass}
                      />

                      <p className="mt-2 text-xs italic text-sky-600">
                        Profile URL: /children/{child.slug || "child-slug"}
                      </p>
                    </div>

                    {/* DOB + BIRTH PLACE */}

                    <div className={fieldRowClass}>

                      <div>
                        <label className={labelClass}>
                          Date of Birth
                        </label>

                        <input
                          type="text"
                          value={child.dateOfBirth}
                          onChange={(e) =>
                            updateChildDetails(
                              index,
                              "dateOfBirth",
                              e.target.value
                            )
                          }
                          maxLength={fieldLimits.childDob}
                          placeholder="March 4, 2016"
                          className={inputClass}
                        />

                        <p className={counterClass(child.dateOfBirth?.length || 0, fieldLimits.childDob)}>
                          {child.dateOfBirth?.length || 0}/{fieldLimits.childDob} characters
                        </p>
                      </div>

                      <div>
                        <label className={labelClass}>
                          Birth Place
                        </label>

                        <input
                          type="text"
                          value={child.birthPlace}
                          onChange={(e) =>
                            updateChildDetails(
                              index,
                              "birthPlace",
                              e.target.value
                            )
                          }
                          maxLength={fieldLimits.childBirthPlace}
                          placeholder="Triveni, Bajura"
                          className={inputClass}
                        />

                        <p className={counterClass(child.birthPlace?.length || 0, fieldLimits.childBirthPlace)}>
                          {child.birthPlace?.length || 0}/{fieldLimits.childBirthPlace} characters
                        </p>
                      </div>

                    </div>

                    {/* PARENTS */}

                    <div className={fieldRowClass}>

                      <div>
                        <label className={labelClass}>
                          Father's Name
                        </label>

                        <input
                          type="text"
                          value={child.fatherName}
                          onChange={(e) =>
                            updateChildDetails(
                              index,
                              "fatherName",
                              e.target.value
                            )
                          }
                          maxLength={fieldLimits.childParentName}
                          placeholder="Father's name"
                          className={inputClass}
                        />

                        <p className={counterClass(child.fatherName?.length || 0, fieldLimits.childParentName)}>
                          {child.fatherName?.length || 0}/{fieldLimits.childParentName} characters
                        </p>
                      </div>

                      <div>
                        <label className={labelClass}>
                          Mother's Name
                        </label>

                        <input
                          type="text"
                          value={child.motherName}
                          onChange={(e) =>
                            updateChildDetails(
                              index,
                              "motherName",
                              e.target.value
                            )
                          }
                          maxLength={fieldLimits.childParentName}
                          placeholder="Mother's name"
                          className={inputClass}
                        />

                        <p className={counterClass(child.motherName?.length || 0, fieldLimits.childParentName)}>
                          {child.motherName?.length || 0}/{fieldLimits.childParentName} characters
                        </p>
                      </div>

                    </div>

                    {/* IMAGE */}

                    <div>
                      <label className={labelClass}>
                        Child Image
                      </label>

                      <div className={fileWrapClass}>

                        <label className={fileButtonClass}>
                          Choose Image

                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                              uploadChildImage(e, index)
                            }
                          />
                        </label>

                        <div className={filePreviewWrapClass}>

                          {child.image ? (
                            <>
                              <img
                                src={child.image}
                                alt={child.name}
                                className={filePreviewImgClass}
                              />

                              <span className={filePreviewTextClass}>
                                {child.image}
                              </span>
                            </>
                          ) : (
                            <span className="text-sm text-gray-400">
                              No image selected
                            </span>
                          )}

                        </div>

                      </div>

                      <span className={helperTextClass}>
                        Recommended: square or portrait photo.
                      </span>
                    </div>

                    {/* STORY */}

                    <div>

                      <div className="mb-4 flex items-center justify-between">

                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Child's Story
                          </label>

                          <p className="mt-1 text-xs text-gray-500">
                            Add the child's story paragraph by paragraph.
                          </p>
                        </div>



                      </div>

                      <div className="space-y-4">

                        {child.story.paragraphs.map(
                          (paragraph, storyIndex) => (

                            <div
                              key={storyIndex}
                              className="rounded-xl border border-gray-200 bg-white p-4"
                            >

                              <div className="mb-3 flex items-center justify-between">

                                <span className="text-xs font-medium text-gray-500">
                                  Paragraph {storyIndex + 1}
                                </span>


                                <button
                                  type="button"
                                  className={removeButtonClass}
                                  onClick={() =>
                                    removeStoryParagraph(
                                      index,
                                      storyIndex
                                    )
                                  }
                                >
                                  Remove
                                </button>

                              </div>

                              <textarea
                                rows={5}
                                value={paragraph}
                                onChange={(e) =>
                                  updateStory(
                                    index,
                                    storyIndex,
                                    e.target.value
                                  )
                                }
                                maxLength={fieldLimits.childEmblaDescription}
                                placeholder="Write the child's story..."
                                className={textareaClass}
                              />

                              <p className={counterClass(paragraph?.length || 0, fieldLimits.childEmblaDescription)}>
                                {paragraph?.length || 0}/{fieldLimits.childEmblaDescription} characters
                              </p>


                            </div>


                          )
                        )}
                        <button
                          type="button"
                          className={addButtonClass}
                          onClick={() =>
                            addStoryParagraph(index)
                          }
                        >
                          + Add Paragraph
                        </button> 
                      </div>

                    </div>

                  </div>

                </div>

              ))}

            </div>

            {/* ADD CHILD */}

            <div className="mt-6 border-t border-gray-200 pt-6">

              <button
                type="button"
                className={addButtonClass}
                onClick={addChild}
              >
                + Add Child
              </button>

            </div>

          </section>

          {/* ==================================================
          CTA SECTION
      ================================================== */}

          <section className={cardClass}>

            <div className={cardHeaderWrapClass}>

              <div>
                <h2 className={cardTitleClass}>
                  CTA Section
                </h2>

                <p className={cardSubtitleClass}>
                  Manage the call-to-action displayed at the bottom of the page.
                </p>
              </div>

            </div>

            <div className="space-y-5">

              <div>
                <label className={labelClass}>
                  CTA Title
                </label>

                <input
                  type="text"
                  value={ourChildrenPage.cta.title}
                  onChange={(e) =>
                    updateCTA("title", e.target.value)
                  }
                  maxLength={fieldLimits.donateTitle}
                  placeholder="Help Us Give Every Child a Better Future"
                  className={inputClass}
                />

                <p className={counterClass(ourChildrenPage.cta.title?.length || 0, fieldLimits.donateTitle)}>
                  {ourChildrenPage.cta.title?.length || 0}/{fieldLimits.donateTitle} characters
                </p>
              </div>


              <div className={fieldRowClass}>

                <div>
                  <label className={labelClass}>
                    Button 1 Text
                  </label>

                  <input
                    type="text"
                    value={ourChildrenPage.cta.button1Text}
                    onChange={(e) =>
                      updateCTA("button1Text", e.target.value)
                    }
                    maxLength={fieldLimits.buttonText}
                    placeholder="Support Our Children"  
                    className={inputClass}
                  />

                  <p className={counterClass(ourChildrenPage.cta.button1Text?.length || 0, fieldLimits.buttonText)}>
                    {ourChildrenPage.cta.button1Text?.length || 0}/{fieldLimits.buttonText} characters
                  </p>
                </div>

                <div>
                  <label className={labelClass}>
                    Button 1 Link
                  </label>

                  <input
                    type="text"
                    value={ourChildrenPage.cta.button1Link}
                    onChange={(e) =>
                      updateCTA("button1Link", e.target.value)
                    }
                    placeholder="/donate"
                    className={inputClass}
                  />
                </div>

              </div>

              <div className={fieldRowClass}>

                <div>
                  <label className={labelClass}>
                    Button 2 Text
                  </label>

                  <input
                    type="text"
                    value={ourChildrenPage.cta.button2Text}
                    onChange={(e) =>
                      updateCTA("button2Text", e.target.value)
                    }
                    maxLength={fieldLimits.buttonText}
                    placeholder="Support Our Children"  
                    className={inputClass}
                  />

                  <p className={counterClass(ourChildrenPage.cta.button2Text?.length || 0, fieldLimits.buttonText)}>
                    {ourChildrenPage.cta.button2Text?.length || 0}/{fieldLimits.buttonText} characters
                  </p>
                </div>

                <div>
                  <label className={labelClass}>
                    Button 2 Link
                  </label>

                  <input
                    type="text"
                    value={ourChildrenPage.cta.button2Link}
                    onChange={(e) =>
                      updateCTA("button2Link", e.target.value)
                    }
                    placeholder="/donate"
                    className={inputClass}
                  />
                </div>

              </div>

            </div>

          </section>

          {/* ==================================================
          SAVE BUTTON
      ================================================== */}
          <div className="flex justify-end">

            <button
              type="button"
              onClick={saveOurChildrenPage}
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