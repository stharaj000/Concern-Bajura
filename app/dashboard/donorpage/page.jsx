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

  // Donors page specific — not covered by the shared keys above
  donorName: 60,
  donorContribution: 40,
  donorDirectedTowards: 60,
  donorMethod: 40,
};

export default function DonorsPageCMS() {
  const [donorspage, setDonorspage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // =========================
  // FETCH DATA
  // =========================

  useEffect(() => {
    fetchDonorsPage();
  }, []);

  const fetchDonorsPage = async () => {
    try {
      const response = await fetch("/api/donorspage");

      if (!response.ok) {
        throw new Error("Failed to fetch donors page");
      }

      const data = await response.json();

      setDonorspage(data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // UPDATE HERO
  // =========================

  const updateHero = (field, value) => {
    setDonorspage((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        [field]: value,
      },
    }));
  };

  // =========================
  // UPDATE DONORS SECTION
  // =========================

  const updateDonors = (field, value) => {
    setDonorspage((prev) => ({
      ...prev,
      donors: {
        ...prev.donors,
        [field]: value,
      },
    }));
  };

  // =========================
  // UPDATE INDIVIDUAL DONOR
  // =========================

  const updateDonor = (index, field, value) => {
    setDonorspage((prev) => {
      const updatedItems = [...prev.donors.items];

      updatedItems[index] = {
        ...updatedItems[index],
        [field]: value,
      };

      return {
        ...prev,
        donors: {
          ...prev.donors,
          items: updatedItems,
        },
      };
    });
  };

  // =========================
  // ADD DONOR
  // =========================

  const addDonor = () => {
    const newDonor = {
      id: `donor-${Date.now()}`,
      name: "",
      contribution: "",
      directedTowards: "",
      method: "",
      image: "",
    };

    setDonorspage((prev) => ({
      ...prev,
      donors: {
        ...prev.donors,
        items: [...prev.donors.items, newDonor],
      },
    }));
  };

  // =========================
  // REMOVE DONOR
  // =========================

  const removeDonor = (index) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this donor?"
    );

    if (!confirmed) return;

    setDonorspage((prev) => ({
      ...prev,
      donors: {
        ...prev.donors,
        items: prev.donors.items.filter((_, i) => i !== index),
      },
    }));
  };

  // =========================
  // UPLOAD IMAGE
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
        throw new Error(data.error || "Image upload failed");
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

  const saveDonorsPage = async () => {
    setSaving(true);

    try {
      console.log("Saving donorspage:", donorspage);

      const response = await fetch("/api/donorspage", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(donorspage),
      });

      const data = await response.json();

      console.log("Response status:", response.status);
      console.log("Save response:", data);

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to save donors page"
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

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center w-full">
        <p className="text-sm text-gray-500">
          Loading donors page...
        </p>
      </div>
    );
  }

  if (!donorspage) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-red-500">
          Failed to load donors page.
        </p>
      </div>
    );
  }

  // =========================
  // UI
  // =========================

  return (
    <main className="min-h-screen w-full md:w-[80%]">


      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6">

        {/* Header */}

        <div className="fixed z-10 w-full border-b border-gray-200 bg-white md:w-[82%] pr-8">
          <div className="mx-auto ml-18 flex max-w-[1600px] flex-col gap-4 px-4 py-5 sm:flex-row sm:px-6 md:ml-10 md:justify-between lg:ml-0 lg:items-center lg:px-8">

            <div>
              <h1 className="text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
                Donors Page
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Manage and update your Donors page content.
              </p>
            </div>

            <button
              onClick={saveDonorsPage}
              disabled={saving}
              className="w-full rounded-xl bg-sky-500 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

          </div>
        </div>


        <div className="relative top-40 flex flex-col gap-6 p-4 sm:p-8 min-[700px]:top-22">
          {/* =========================
          HERO SECTION
      ========================= */}

          <section className={cardClass}>
            <div className={cardHeaderWrapClass}>
              <div>
                <h2 className={cardTitleClass}>
                  Hero Section
                </h2>

                <p className={cardSubtitleClass}>
                  Manage the main banner content of the donors page.
                </p>
              </div>
            </div>

            <div className="space-y-6">

              {/* TITLE */}

              <div>
                <label className={labelClass}>
                  Hero Title
                </label>

                <input
                  type="text"
                  value={donorspage.hero.title}
                  onChange={(e) =>
                    updateHero("title", e.target.value)
                  }
                  maxLength={fieldLimits.heroTitle}
                  className={inputClass}
                  placeholder="Our Donors & Partners"
                />

                <p className={counterClass(donorspage.hero.title?.length || 0, fieldLimits.heroTitle)}>
                  {donorspage.hero.title?.length || 0}/{fieldLimits.heroTitle} characters
                </p>
              </div>

              {/* SUBTITLE */}

              <div>
                <label className={labelClass}>
                  Hero Subtitle
                </label>

                <textarea
                  rows={3}
                  value={donorspage.hero.subtitle}
                  onChange={(e) =>
                    updateHero("subtitle", e.target.value)
                  }
                  maxLength={fieldLimits.heroDescription}
                  className={textareaClass}
                  placeholder="Enter hero subtitle..."
                />

                <p className={counterClass(donorspage.hero.subtitle?.length || 0, fieldLimits.heroDescription)}>
                  {donorspage.hero.subtitle?.length || 0}/{fieldLimits.heroDescription} characters
                </p>
              </div>

              {/* IMAGE */}

              <div>
                <label className={labelClass}>
                  Hero Image
                </label>

                <div className={fileWrapClass}>
                  <label className={fileButtonClass}>
                    Change Image

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
                    {donorspage.hero.image ? (
                      <img
                        src={donorspage.hero.image}
                        alt="Hero preview"
                        className={filePreviewImgClass}
                      />
                    ) : null}

                    <span className={filePreviewTextClass}>
                      {donorspage.hero.image || "No image selected"}
                    </span>
                  </div>
                </div>

                <span className={helperTextClass}>
                  Recommended: wide landscape image for the hero banner.
                </span>
              </div>

            </div>
          </section>

          {/* =========================
          DONORS SECTION
      ========================= */}

          <section className={`${cardClass} mt-6`}>

            <div className={cardHeaderWrapClass}>
              <div>
                <h2 className={cardTitleClass}>
                  Donors Section
                </h2>

                <p className={cardSubtitleClass}>
                  Manage the donor heading and donor cards.
                </p>
              </div>
            </div>

            <div className="space-y-8">

              {/* SECTION TITLE */}

              <div>
                <label className={labelClass}>
                  Section Title
                </label>

                <input
                  type="text"
                  value={donorspage.donors.title}
                  onChange={(e) =>
                    updateDonors("title", e.target.value)
                  }
                  maxLength={fieldLimits.sectionHeading}
                  className={inputClass}
                  placeholder="Individual & Corporate Donors"
                />

                <p className={counterClass(donorspage.donors.title?.length || 0, fieldLimits.sectionHeading)}>
                  {donorspage.donors.title?.length || 0}/{fieldLimits.sectionHeading} characters
                </p>
              </div>

              {/* SECTION SUBTITLE */}

              <div>
                <label className={labelClass}>
                  Section Subtitle
                </label>

                <textarea
                  rows={3}
                  value={donorspage.donors.subtitle}
                  onChange={(e) =>
                    updateDonors("subtitle", e.target.value)
                  }
                  maxLength={fieldLimits.sectionDescription}
                  className={textareaClass}
                  placeholder="Recognizing recent contributions..."
                />

                <p className={counterClass(donorspage.donors.subtitle?.length || 0, fieldLimits.sectionDescription)}>
                  {donorspage.donors.subtitle?.length || 0}/{fieldLimits.sectionDescription} characters
                </p>
              </div>

              {/* DONORS */}

              <div className="space-y-6">

                {donorspage.donors.items.map((donor, index) => (
                  <div
                    key={donor.id}
                    className={subCardClass}
                  >

                    {/* DONOR HEADER */}

                    <div className={subCardHeaderClass}>
                      <div>
                        <h3 className={subCardTitleClass}>
                          Donor {index + 1}
                        </h3>

                        <p className={subCardSubtitleClass}>
                          Add information about this donor or partner.
                        </p>
                      </div>

                      <button
                        type="button"
                        className={removeButtonClass}
                        onClick={() => removeDonor(index)}
                      >
                        Remove
                      </button>
                    </div>

                    {/* DONOR FIELDS */}

                    <div className="space-y-5">

                      {/* NAME + CONTRIBUTION */}

                      <div className={fieldRowClass}>

                        <div>
                          <label className={labelClass}>
                            Donor Name
                          </label>

                          <input
                            type="text"
                            value={donor.name}
                            onChange={(e) =>
                              updateDonor(
                                index,
                                "name",
                                e.target.value
                              )
                            }
                            maxLength={fieldLimits.donorName}
                            className={inputClass}
                            placeholder="Sarah Jenkins"
                          />

                          <p className={counterClass(donor.name?.length || 0, fieldLimits.donorName)}>
                            {donor.name?.length || 0}/{fieldLimits.donorName} characters
                          </p>
                        </div>

                        <div>
                          <label className={labelClass}>
                            Contribution
                          </label>

                          <input
                            type="text"
                            value={donor.contribution}
                            onChange={(e) =>
                              updateDonor(
                                index,
                                "contribution",
                                e.target.value
                              )
                            }
                            maxLength={fieldLimits.donorContribution}
                            className={inputClass}
                            placeholder="Rs.500 or 100 Laptops"
                          />

                          <p className={counterClass(donor.contribution?.length || 0, fieldLimits.donorContribution)}>
                            {donor.contribution?.length || 0}/{fieldLimits.donorContribution} characters
                          </p>
                        </div>

                      </div>

                      {/* DIRECTED TOWARDS + METHOD */}

                      <div className={fieldRowClass}>

                        <div>
                          <label className={labelClass}>
                            Directed Towards
                          </label>

                          <input
                            type="text"
                            value={donor.directedTowards}
                            onChange={(e) =>
                              updateDonor(
                                index,
                                "directedTowards",
                                e.target.value
                              )
                            }
                            maxLength={fieldLimits.donorDirectedTowards}
                            className={inputClass}
                            placeholder="Education Fund"
                          />

                          <p className={counterClass(donor.directedTowards?.length || 0, fieldLimits.donorDirectedTowards)}>
                            {donor.directedTowards?.length || 0}/{fieldLimits.donorDirectedTowards} characters
                          </p>
                        </div>

                        <div>
                          <label className={labelClass}>
                            Donation Method
                          </label>

                          <input
                            type="text"
                            value={donor.method}
                            onChange={(e) =>
                              updateDonor(
                                index,
                                "method",
                                e.target.value
                              )
                            }
                            maxLength={fieldLimits.donorMethod}
                            className={inputClass}
                            placeholder="Online Donation"
                          />

                          <p className={counterClass(donor.method?.length || 0, fieldLimits.donorMethod)}>
                            {donor.method?.length || 0}/{fieldLimits.donorMethod} characters
                          </p>
                        </div>

                      </div>

                      {/* IMAGE */}

                      <div>
                        <label className={labelClass}>
                          Donor Image
                        </label>

                        <div className={fileWrapClass}>

                          <label className={fileButtonClass}>
                            Change Image

                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file =
                                  e.target.files?.[0];

                                uploadImage(file, (url) =>
                                  updateDonor(
                                    index,
                                    "image",
                                    url
                                  )
                                );
                              }}
                            />
                          </label>

                          <div className={filePreviewWrapClass}>

                            {donor.image ? (
                              <img
                                src={donor.image}
                                alt={donor.name || "Donor"}
                                className={filePreviewImgClass}
                              />
                            ) : null}

                            <span className={filePreviewTextClass}>
                              {donor.image ||
                                "No image selected"}
                            </span>

                          </div>

                        </div>

                        <span className={helperTextClass}>
                          Use a clear photo or organization image.
                        </span>
                      </div>

                    </div>

                  </div>
                ))}

              </div>

              {/* ADD DONOR */}

              <div className="border-t border-gray-200 pt-6">

                <button
                  type="button"
                  className={addButtonClass}
                  onClick={addDonor}
                >
                  + Add Donor
                </button>

              </div>

            </div>
          </section>

          {/* BOTTOM SAVE */}

          <div className="mt-8 flex justify-end">

            <button
              type="button"
              onClick={saveDonorsPage}
              disabled={saving}
              className="inline-flex items-center justify-center rounded-xl bg-sky-500 px-8 py-3 text-sm font-semibold text-white transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

          </div>
        </div>

      </div>
    </main>
  );
}