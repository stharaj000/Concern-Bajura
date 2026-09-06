"use client"

import { useEffect, useState } from "react";


export default function AboutpageCMS() {

    const [aboutpage, setAboutpage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);


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

    }

    // ---- Shared design tokens (keeps every field/section visually consistent) ----
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
    const fileButtonClass =
        "inline-flex h-14 shrink-0 cursor-pointer items-center justify-center bg-gray-800 px-5 text-sm font-medium text-white transition hover:bg-gray-700";
    const filePreviewWrapClass = "flex min-w-0 items-center gap-3 px-4";
    const filePreviewImgClass = "h-9 w-9 shrink-0 rounded-lg object-cover";
    const filePreviewTextClass = "truncate text-sm text-gray-500";
    const helperTextClass = "mt-2 block text-xs italic text-sky-600";
    const addButtonClass =
        "inline-flex items-center gap-1.5 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2";
    const removeButtonClass = "rounded-lg px-3 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50";

    const counterClass = (length, limit) =>
        `mt-1.5 text-xs ${length >= limit ? "text-red-500" : "text-gray-400"}`;


    const saveAboutPage = async () => {
        setSaving(true);

        try {
            console.log("Saving aboutpage:", aboutpage);

            const response = await fetch("/api/aboutpage", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(aboutpage),
            });

            const data = await response.json();

            console.log("Response status:", response.status);
            console.log("Save response:", data);

            if (!response.ok) {
                throw new Error(data.error || "Failed to save aboutpage");
            }

            alert("Changes saved successfully!");

        } catch (error) {
            console.error("Save error: ", error);
            alert(error.message);
        } finally {
            setSaving(false);
        }
    };



    const updateAbout = (field, value) => {
        setAboutpage((prev) => ({
            ...prev,
            hero: {
                ...prev.hero,
                [field]: value,
            }
        }));
    };



    const objectiveCard = (index, field, value) => {
        const updatedCards = [...aboutpage.objectives.cards];

        updatedCards[index] = {
            ...updatedCards[index],
            [field]: value,
        };

        setAboutpage({
            ...aboutpage,
            latestUpdate: {
                ...aboutpage.objectives,
                cards: updatedCards,
            },
        });
    };




    const addObjective = () => {
        const newObjective = {
            id: `objective-${Date.now()}`,
            icon: "graduation-cap",
            title: "",
            description: "",
        };

        setAboutpage({
            ...aboutpage,
            objectives: {
                ...aboutpage.objectives,
                items: [
                    ...aboutpage.objectives.items,
                    newObjective,
                ],
            },
        });
    };

    const removeObjective = (index) => {
        const updatedItems = aboutpage.objectives.items.filter(
            (_, i) => i !== index
        );

        setAboutpage({
            ...aboutpage,
            objectives: {
                ...aboutpage.objectives,
                items: updatedItems,
            },
        });
    };


    const addTimeline = () => {
        const newTimeline = {
            id: `history-${Date.now()}`,
            year: "",
            events: [""],
        };

        setAboutpage({
            ...aboutpage,
            history: {
                ...aboutpage.history,
                timeline: [
                    ...aboutpage.history.timeline,
                    newTimeline,
                ],
            },
        });
    };



    useEffect(() => {
        if (aboutpage) {
            console.log("Use Effect Trigger");
        }
    }, [aboutpage]);





    useEffect(() => {

        const getAboutPage = async () => {
            try {
                const response = await fetch("/api/aboutpage");

                if (!response.ok) {
                    throw new Error("Failed to fetch aboutpage");
                }

                const data = await response.json();

                setAboutpage(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }

        };

        getAboutPage();

    }, [])

    if (loading) {
        return (
            <div className="flex min-h-screen w-full items-center justify-center text-sm text-gray-500">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full md:w-[80%]">

            {/* Main */}

            <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6">

                {/* Header */}

                <div className="fixed z-10 w-full border-b border-gray-200 bg-white md:w-[82%] pr-8">
                    <div className="mx-auto ml-18 flex max-w-[1600px] flex-col gap-4 px-4 py-5 sm:flex-row sm:px-6 md:ml-10 md:justify-between lg:ml-0 lg:items-center lg:px-8">

                        <div>
                            <h1 className="text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
                                About Page
                            </h1>

                            <p className="mt-1 text-sm text-gray-500">
                                Manage and update your about page content.
                            </p>
                        </div>

                        <button
                            onClick={saveAboutPage}
                            disabled={saving}
                            className="w-full rounded-xl bg-sky-500 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                        >
                            {saving ? "Saving..." : "Save Changes"}
                        </button>

                    </div>
                </div>

                {/* Content */}

                <div className="relative top-38 flex gap-6 p-4 sm:p-8 min-[700px]:top-20">

                    {/* Left */}

                    <div className="flex w-[74%] flex-1 flex-col gap-6">

                        {/* Hero */}

                        <div className={cardClass}>

                            <h2 className="mb-5 text-lg font-semibold text-gray-900">
                                Hero Section
                            </h2>

                            <div className="flex flex-col gap-5">

                                <div>

                                    <label className={labelClass}>
                                        Title
                                    </label>

                                    <input
                                        className={inputClass}
                                        placeholder="Enter heading" value={aboutpage.hero.title}
                                        maxLength={fieldLimits.heroTitle}
                                        onChange={(e) => {
                                            setAboutpage({
                                                ...aboutpage,
                                                hero: {
                                                    ...aboutpage.hero,
                                                    title: e.target.value
                                                }
                                            })
                                        }}
                                    />
                                    <p className={counterClass(aboutpage.hero.title.length, fieldLimits.heroTitle)}>{aboutpage.hero.title.length}/{fieldLimits.heroTitle} characters</p>

                                </div>

                                <div>

                                    <label className={labelClass}>
                                        Subtitle
                                    </label>

                                    <textarea
                                        rows={4}
                                        className={textareaClass}
                                        placeholder="Enter description" value={aboutpage.hero.subtitle}
                                        maxLength={fieldLimits.heroDescription}
                                        onChange={(e) => {
                                            setAboutpage({
                                                ...aboutpage,
                                                hero: {
                                                    ...aboutpage.hero,
                                                    subtitle: e.target.value
                                                }
                                            })
                                        }}
                                    />
                                    <p className={counterClass(aboutpage.hero.subtitle.length, fieldLimits.heroDescription)}>{aboutpage.hero.subtitle.length}/{fieldLimits.heroDescription} characters</p>

                                </div>

                                <div className="relative w-full">

                                    <label className={labelClass}>
                                        Hero Image
                                    </label>

                                    <div className={fileWrapClass}>
                                        <label className={fileButtonClass}>
                                            Choose File

                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={async (e) => {
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
                                                            throw new Error(data.error);
                                                        }


                                                        updateAbout("image", data.url);

                                                    } catch (error) {
                                                        console.error("Upload failed:", error);
                                                    }
                                                }}
                                            />
                                        </label>
                                        <div className={filePreviewWrapClass}>

                                            {aboutpage.hero.image && (
                                                <img
                                                    src={aboutpage.hero.image}
                                                    alt={aboutpage.hero.name}
                                                    className={filePreviewImgClass}
                                                />
                                            )}

                                            <span className={filePreviewTextClass}>
                                                {aboutpage.hero.image || "No image selected"}
                                            </span>

                                        </div>
                                    </div>
                                </div>


                            </div>

                        </div>






                        {/* about intro */}

                        <div className={cardClass}>

                            <h2 className="mb-5 text-lg font-semibold text-gray-900">
                                About Section
                            </h2>

                            <div className="flex flex-col gap-5">

                                <div>

                                    <label className={labelClass}>
                                        Title
                                    </label>

                                    <input
                                        className={inputClass}
                                        placeholder="Enter heading" value={aboutpage.about.title}
                                        maxLength={fieldLimits.heroTitle}
                                        onChange={(e) => {
                                            setAboutpage({
                                                ...aboutpage,
                                                about: {
                                                    ...aboutpage.about,
                                                    title: e.target.value
                                                }
                                            })
                                        }}
                                    />
                                    <p className={counterClass(aboutpage.about.title.length, fieldLimits.heroTitle)}>{aboutpage.about.title.length}/{fieldLimits.heroTitle} characters</p>

                                </div>

                                <div>

                                    <label className={labelClass}>
                                        Description
                                    </label>

                                    <textarea
                                        rows={4}
                                        className={textareaClass}
                                        placeholder="Enter description" value={aboutpage.about.description}
                                        maxLength={fieldLimits.aboutDescription}
                                        onChange={(e) => {
                                            setAboutpage({
                                                ...aboutpage,
                                                about: {
                                                    ...aboutpage.about,
                                                    description: e.target.value
                                                }
                                            })
                                        }}
                                    />
                                    <p className={counterClass(aboutpage.about.description.length, fieldLimits.aboutDescription)}>{aboutpage.about.description.length}/{fieldLimits.aboutDescription} characters</p>

                                </div>


                            </div>

                        </div>



                        {/* ========================================================= */}
                        {/* OBJECTIVES SECTION */}
                        {/* ========================================================= */}

                        <div className={cardClass}>
                            <div className={cardHeaderWrapClass}>
                                <div>
                                    <h2 className={cardTitleClass}>
                                        Objectives Section
                                    </h2>

                                    <p className={cardSubtitleClass}>
                                        Manage the objectives displayed on the About page.
                                    </p>
                                </div>
                                <div className="border-t border-gray-200 pt-6">
                                    <button
                                        type="button"
                                        className={addButtonClass}
                                        onClick={addObjective}
                                    >
                                        + Add Objective
                                    </button>
                                </div>
                            </div>

                            {/* Section Title */}
                            <div className="mb-8">
                                <label className={labelClass}>
                                    Section Title
                                </label>

                                <input
                                    className={inputClass}
                                    placeholder="Enter section title"
                                    value={aboutpage.objectives.title}
                                    maxLength={fieldLimits.sectionHeading}
                                    onChange={(e) => {
                                        setAboutpage({
                                            ...aboutpage,
                                            objectives: {
                                                ...aboutpage.objectives,
                                                title: e.target.value,
                                            },
                                        });
                                    }}
                                />

                                <p
                                    className={counterClass(
                                        aboutpage.objectives.title.length,
                                        fieldLimits.sectionHeading
                                    )}
                                >
                                    {aboutpage.objectives.title.length}/
                                    {fieldLimits.sectionHeading} characters
                                </p>

                            </div>

                            {/* Objective Cards */}
                            <div className="space-y-6">
                                {aboutpage.objectives.items.map((item, index) => (
                                    <div
                                        key={item.id || index}
                                        className={subCardClass}
                                    >
                                        <div className={subCardHeaderClass}>
                                            <div>
                                                <h3 className={subCardTitleClass}>
                                                    Objective {index + 1}
                                                </h3>

                                                <p className={subCardSubtitleClass}>
                                                    Add information about this objective.
                                                </p>
                                            </div>

                                            <button
                                                type="button"
                                                className={removeButtonClass}
                                                onClick={() => removeObjective(index)}
                                            >
                                                Remove
                                            </button>
                                        </div>

                                        <div className={fieldRowClass}>

                                            {/* Icon */}
                                            <div>
                                                <label className={labelClass}>
                                                    Icon
                                                </label>

                                                <select
                                                    className={inputClass}
                                                    value={item.icon}
                                                    onChange={(e) => {
                                                        const updatedItems =
                                                            [...aboutpage.objectives.items];

                                                        updatedItems[index] = {
                                                            ...updatedItems[index],
                                                            icon: e.target.value,
                                                        };

                                                        setAboutpage({
                                                            ...aboutpage,
                                                            objectives: {
                                                                ...aboutpage.objectives,
                                                                items: updatedItems,
                                                            },
                                                        });
                                                    }}
                                                >
                                                    <option value="graduation-cap">
                                                        Graduation Cap
                                                    </option>

                                                    <option value="cross">
                                                        Cross
                                                    </option>

                                                    <option value="utensils">
                                                        Utensils
                                                    </option>

                                                    <option value="home">
                                                        Home
                                                    </option>
                                                </select>
                                            </div>

                                            {/* Title */}
                                            <div>
                                                <label className={labelClass}>
                                                    Title
                                                </label>

                                                <input
                                                    className={inputClass}
                                                    placeholder="Enter objective title"
                                                    value={item.title}
                                                    maxLength={fieldLimits.sectionHeading}
                                                    onChange={(e) => {
                                                        const updatedItems =
                                                            [...aboutpage.objectives.items];

                                                        updatedItems[index] = {
                                                            ...updatedItems[index],
                                                            title: e.target.value,
                                                        };

                                                        setAboutpage({
                                                            ...aboutpage,
                                                            objectives: {
                                                                ...aboutpage.objectives,
                                                                items: updatedItems,
                                                            },
                                                        });
                                                    }}
                                                />

                                                <p
                                                    className={counterClass(
                                                        item.title.length,
                                                        fieldLimits.sectionHeading
                                                    )}
                                                >
                                                    {item.title.length}/
                                                    {fieldLimits.sectionHeading} characters
                                                </p>
                                            </div>

                                            {/* Description */}
                                            <div className="sm:col-span-2">
                                                <label className={labelClass}>
                                                    Description
                                                </label>

                                                <textarea
                                                    rows={4}
                                                    className={textareaClass}
                                                    placeholder="Write objective description..."
                                                    value={item.description}
                                                    maxLength={fieldLimits.sectionDescription}
                                                    onChange={(e) => {
                                                        const updatedItems =
                                                            [...aboutpage.objectives.items];

                                                        updatedItems[index] = {
                                                            ...updatedItems[index],
                                                            description: e.target.value,
                                                        };

                                                        setAboutpage({
                                                            ...aboutpage,
                                                            objectives: {
                                                                ...aboutpage.objectives,
                                                                items: updatedItems,
                                                            },
                                                        });
                                                    }}
                                                />

                                                <p
                                                    className={counterClass(
                                                        item.description.length,
                                                        fieldLimits.sectionDescription
                                                    )}
                                                >
                                                    {item.description.length}/
                                                    {fieldLimits.sectionDescription} characters
                                                </p>
                                            </div>

                                        </div>
                                    </div>

                                ))}
                                <div className="border-t border-gray-200 pt-6">
                                    <button
                                        type="button"
                                        className={addButtonClass}
                                        onClick={addObjective}
                                    >
                                        + Add Objective
                                    </button>
                                </div>
                            </div>
                        </div>


                        {/* ========================================================= */}
                        {/* OUR HISTORY SECTION */}
                        {/* ========================================================= */}

                        <div className={cardClass}>

                            <div className={cardHeaderWrapClass}>
                                <div>
                                    <h2 className={cardTitleClass}>
                                        Our History Section
                                    </h2>

                                    <p className={cardSubtitleClass}>
                                        Manage the timeline and history of Concern Bajura.
                                    </p>
                                </div>
                            </div>


                            {/* Section Title */}
                            <div className="mb-5">
                                <label className={labelClass}>
                                    Section Title
                                </label>

                                <input
                                    className={inputClass}
                                    placeholder="Enter section title"
                                    value={aboutpage.history.title}
                                    maxLength={fieldLimits.sectionHeading}
                                    onChange={(e) => {
                                        setAboutpage({
                                            ...aboutpage,
                                            history: {
                                                ...aboutpage.history,
                                                title: e.target.value,
                                            },
                                        });
                                    }}
                                />

                                <p
                                    className={counterClass(
                                        aboutpage.history.title.length,
                                        fieldLimits.sectionHeading
                                    )}
                                >
                                    {aboutpage.history.title.length}/
                                    {fieldLimits.sectionHeading} characters
                                </p>
                            </div>


                            {/* Section Subtitle */}
                            <div className="mb-8">
                                <label className={labelClass}>
                                    Subtitle
                                </label>

                                <textarea
                                    rows={3}
                                    className={textareaClass}
                                    placeholder="Enter history subtitle"
                                    value={aboutpage.history.subtitle}
                                    maxLength={fieldLimits.sectionDescription}
                                    onChange={(e) => {
                                        setAboutpage({
                                            ...aboutpage,
                                            history: {
                                                ...aboutpage.history,
                                                subtitle: e.target.value,
                                            },
                                        });
                                    }}
                                />

                                <p
                                    className={counterClass(
                                        aboutpage.history.subtitle.length,
                                        fieldLimits.sectionDescription
                                    )}
                                >
                                    {aboutpage.history.subtitle.length}/
                                    {fieldLimits.sectionDescription} characters
                                </p>
                            </div>


                            {/* Timeline */}
                            <div className="space-y-6">

                                {aboutpage.history.timeline.map((timeline, index) => (

                                    <div
                                        key={timeline.id || timeline.year || index}
                                        className={subCardClass}
                                    >

                                        {/* Timeline Header */}
                                        <div className={subCardHeaderClass}>
                                            <div>
                                                <h3 className={subCardTitleClass}>
                                                    Timeline {index + 1}
                                                </h3>

                                                <p className={subCardSubtitleClass}>
                                                    Add events for this year.
                                                </p>
                                            </div>

                                            {/* Remove Timeline */}
                                            <button
                                                type="button"
                                                className={`${removeButtonClass} bg-red-100`}
                                                onClick={() => {
                                                    const updatedTimeline =
                                                        aboutpage.history.timeline.filter(
                                                            (_, i) => i !== index
                                                        );

                                                    setAboutpage({
                                                        ...aboutpage,
                                                        history: {
                                                            ...aboutpage.history,
                                                            timeline: updatedTimeline,
                                                        },
                                                    });
                                                }}
                                            >
                                                Remove
                                            </button>
                                        </div>


                                        {/* Year */}
                                        <div className="mb-6">
                                            <label className={labelClass}>
                                                Year
                                            </label>

                                            <input
                                                className={inputClass}
                                                placeholder="e.g. 2015"
                                                value={timeline.year}
                                                maxLength={10}
                                                onChange={(e) => {

                                                    const updatedTimeline =
                                                        [...aboutpage.history.timeline];

                                                    updatedTimeline[index] = {
                                                        ...updatedTimeline[index],
                                                        year: e.target.value,
                                                    };

                                                    setAboutpage({
                                                        ...aboutpage,
                                                        history: {
                                                            ...aboutpage.history,
                                                            timeline: updatedTimeline,
                                                        },
                                                    });
                                                }}
                                            />
                                        </div>


                                        {/* Events */}
                                        <div>
                                            <label className={labelClass}>
                                                Events
                                            </label>

                                            <div className="space-y-3">

                                                {timeline.events.map((event, eventIndex) => (

                                                    <div
                                                        key={eventIndex}
                                                        className="flex gap-3"
                                                    >

                                                        <textarea
                                                            rows={3}
                                                            className={textareaClass}
                                                            placeholder="Describe this event..."
                                                            value={event}
                                                            maxLength={
                                                                fieldLimits.sectionDescription
                                                            }
                                                            onChange={(e) => {

                                                                const updatedTimeline =
                                                                    [...aboutpage.history.timeline];

                                                                const updatedEvents =
                                                                    [
                                                                        ...updatedTimeline[index].events,
                                                                    ];

                                                                updatedEvents[eventIndex] =
                                                                    e.target.value;

                                                                updatedTimeline[index] = {
                                                                    ...updatedTimeline[index],
                                                                    events: updatedEvents,
                                                                };

                                                                setAboutpage({
                                                                    ...aboutpage,
                                                                    history: {
                                                                        ...aboutpage.history,
                                                                        timeline: updatedTimeline,
                                                                    },
                                                                });
                                                            }}
                                                        />

                                                        <button
                                                            type="button"
                                                            className={`${removeButtonClass} shrink-0 self-start`}
                                                            onClick={() => {

                                                                const updatedTimeline =
                                                                    [...aboutpage.history.timeline];

                                                                const updatedEvents =
                                                                    updatedTimeline[index]
                                                                        .events
                                                                        .filter(
                                                                            (_, i) =>
                                                                                i !== eventIndex
                                                                        );

                                                                updatedTimeline[index] = {
                                                                    ...updatedTimeline[index],
                                                                    events: updatedEvents,
                                                                };

                                                                setAboutpage({
                                                                    ...aboutpage,
                                                                    history: {
                                                                        ...aboutpage.history,
                                                                        timeline: updatedTimeline,
                                                                    },
                                                                });
                                                            }}
                                                        >
                                                            Remove
                                                        </button>

                                                    </div>
                                                ))}

                                            </div>


                                            {/* Add Event */}
                                            <button
                                                type="button"
                                                className={`${addButtonClass} mt-4`}
                                                onClick={() => {

                                                    const updatedTimeline =
                                                        [...aboutpage.history.timeline];

                                                    updatedTimeline[index] = {
                                                        ...updatedTimeline[index],
                                                        events: [
                                                            ...updatedTimeline[index].events,
                                                            "",
                                                        ],
                                                    };

                                                    setAboutpage({
                                                        ...aboutpage,
                                                        history: {
                                                            ...aboutpage.history,
                                                            timeline: updatedTimeline,
                                                        },
                                                    });
                                                }}
                                            >
                                                + Add Event
                                            </button>

                                        </div>

                                    </div>
                                ))}


                                {/* ================================================= */}
                                {/* ADD TIMELINE */}
                                {/* ================================================= */}

                                <div className="border-t border-gray-200 pt-6">

                                    <button
                                        type="button"
                                        className={addButtonClass}
                                        onClick={addTimeline}
                                    >
                                        + Add Timeline
                                    </button>

                                </div>

                            </div>

                        </div>


                        {/* ========================================================= */}
                        {/* WHY CONCERN BAJURA SECTION */}
                        {/* ========================================================= */}

                        <div className={cardClass}>

                            <div className={cardHeaderWrapClass}>
                                <div>
                                    <h2 className={cardTitleClass}>
                                        Why Concern Bajura Section
                                    </h2>

                                    <p className={cardSubtitleClass}>
                                        Manage the content explaining why people should support
                                        Concern Bajura.
                                    </p>
                                </div>
                            </div>


                            {/* Title */}
                            <div className="mb-5">
                                <label className={labelClass}>
                                    Section Title
                                </label>

                                <input
                                    className={inputClass}
                                    placeholder="Enter section title"
                                    value={aboutpage.whyConcernBajura.title}
                                    maxLength={fieldLimits.sectionHeading}
                                    onChange={(e) => {
                                        setAboutpage({
                                            ...aboutpage,
                                            whyConcernBajura: {
                                                ...aboutpage.whyConcernBajura,
                                                title: e.target.value,
                                            },
                                        });
                                    }}
                                />

                                <p
                                    className={counterClass(
                                        aboutpage.whyConcernBajura.title.length,
                                        fieldLimits.sectionHeading
                                    )}
                                >
                                    {aboutpage.whyConcernBajura.title.length}/
                                    {fieldLimits.sectionHeading} characters
                                </p>
                            </div>


                            {/* Image */}
                            <div className="mb-8">

                                <label className={labelClass}>
                                    Section Image
                                </label>

                                <div className={fileWrapClass}>

                                    <label className={fileButtonClass}>
                                        Choose Image

                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={async (e) => {

                                                const file = e.target.files?.[0];

                                                if (!file) return;

                                                const formData = new FormData();

                                                formData.append("file", file);

                                                try {

                                                    const response = await fetch(
                                                        "/api/upload",
                                                        {
                                                            method: "POST",
                                                            body: formData,
                                                        }
                                                    );

                                                    const data =
                                                        await response.json();

                                                    if (!response.ok) {
                                                        throw new Error(
                                                            data.error ||
                                                            "Upload failed"
                                                        );
                                                    }

                                                    setAboutpage({
                                                        ...aboutpage,
                                                        whyConcernBajura: {
                                                            ...aboutpage.whyConcernBajura,
                                                            image: data.url,
                                                        },
                                                    });

                                                } catch (error) {

                                                    console.error(
                                                        "Upload failed:",
                                                        error
                                                    );

                                                }

                                            }}
                                        />

                                    </label>


                                    <div className={filePreviewWrapClass}>

                                        {aboutpage.whyConcernBajura.image && (
                                            <img
                                                src={aboutpage.whyConcernBajura.image}
                                                alt={
                                                    aboutpage.whyConcernBajura.imageAlt ||
                                                    "Why Concern Bajura"
                                                }
                                                className={filePreviewImgClass}
                                            />
                                        )}

                                        <span className={filePreviewTextClass}>
                                            {aboutpage.whyConcernBajura.image ||
                                                "No image selected"}
                                        </span>

                                    </div>

                                </div>

                            </div>


                            {/* Image Alt */}
                            <div className="mb-8">

                                <label className={labelClass}>
                                    Image Alt Text
                                </label>

                                <input
                                    className={inputClass}
                                    placeholder="Describe the image"
                                    value={
                                        aboutpage.whyConcernBajura.imageAlt || ""
                                    }
                                    maxLength={150}
                                    onChange={(e) => {
                                        setAboutpage({
                                            ...aboutpage,
                                            whyConcernBajura: {
                                                ...aboutpage.whyConcernBajura,
                                                imageAlt: e.target.value,
                                            },
                                        });
                                    }}
                                />

                            </div>


                            {/* Paragraphs */}
                            <div className="mb-8">

                                <label className={labelClass}>
                                    Paragraphs
                                </label>

                                <div className="space-y-4">

                                    {aboutpage.whyConcernBajura.paragraphs.map(
                                        (paragraph, index) => (

                                            <div
                                                key={index}
                                                className="flex gap-3"
                                            >

                                                <textarea
                                                    rows={4}
                                                    className={textareaClass}
                                                    placeholder="Write paragraph..."
                                                    value={paragraph}
                                                    maxLength={fieldLimits.aboutDescription}
                                                    onChange={(e) => {

                                                        const updatedParagraphs =
                                                            [
                                                                ...aboutpage
                                                                    .whyConcernBajura
                                                                    .paragraphs,
                                                            ];

                                                        updatedParagraphs[index] =
                                                            e.target.value;

                                                        setAboutpage({
                                                            ...aboutpage,
                                                            whyConcernBajura: {
                                                                ...aboutpage
                                                                    .whyConcernBajura,
                                                                paragraphs:
                                                                    updatedParagraphs,
                                                            },
                                                        });

                                                    }}
                                                />

                                                <button
                                                    type="button"
                                                    className={`${removeButtonClass} shrink-0 self-start`}
                                                    onClick={() => {

                                                        const updatedParagraphs =
                                                            aboutpage
                                                                .whyConcernBajura
                                                                .paragraphs
                                                                .filter(
                                                                    (_, i) =>
                                                                        i !== index
                                                                );

                                                        setAboutpage({
                                                            ...aboutpage,
                                                            whyConcernBajura: {
                                                                ...aboutpage
                                                                    .whyConcernBajura,
                                                                paragraphs:
                                                                    updatedParagraphs,
                                                            },
                                                        });

                                                    }}
                                                >
                                                    Remove
                                                </button>

                                            </div>

                                        )
                                    )}

                                </div>


                                <button
                                    type="button"
                                    className={`${addButtonClass} mt-4`}
                                    onClick={() => {

                                        setAboutpage({
                                            ...aboutpage,
                                            whyConcernBajura: {
                                                ...aboutpage.whyConcernBajura,
                                                paragraphs: [
                                                    ...aboutpage
                                                        .whyConcernBajura
                                                        .paragraphs,
                                                    "",
                                                ],
                                            },
                                        });

                                    }}
                                >
                                    + Add Paragraph
                                </button>

                            </div>


                            {/* Points */}
                            <div>

                                <label className={labelClass}>
                                    Key Points
                                </label>

                                <div className="space-y-3">

                                    {aboutpage.whyConcernBajura.points.map(
                                        (point, index) => (

                                            <div
                                                key={index}
                                                className="flex gap-3"
                                            >

                                                <input
                                                    className={inputClass}
                                                    placeholder="Enter key point"
                                                    value={point}
                                                    maxLength={fieldLimits.sectionDescription}
                                                    onChange={(e) => {

                                                        const updatedPoints =
                                                            [
                                                                ...aboutpage
                                                                    .whyConcernBajura
                                                                    .points,
                                                            ];

                                                        updatedPoints[index] =
                                                            e.target.value;

                                                        setAboutpage({
                                                            ...aboutpage,
                                                            whyConcernBajura: {
                                                                ...aboutpage
                                                                    .whyConcernBajura,
                                                                points:
                                                                    updatedPoints,
                                                            },
                                                        });

                                                    }}
                                                />

                                                <button
                                                    type="button"
                                                    className={`${removeButtonClass} shrink-0`}
                                                    onClick={() => {

                                                        const updatedPoints =
                                                            aboutpage
                                                                .whyConcernBajura
                                                                .points
                                                                .filter(
                                                                    (_, i) =>
                                                                        i !== index
                                                                );

                                                        setAboutpage({
                                                            ...aboutpage,
                                                            whyConcernBajura: {
                                                                ...aboutpage
                                                                    .whyConcernBajura,
                                                                points:
                                                                    updatedPoints,
                                                            },
                                                        });

                                                    }}
                                                >
                                                    Remove
                                                </button>

                                            </div>

                                        )
                                    )}

                                </div>


                                <button
                                    type="button"
                                    className={`${addButtonClass} mt-4`}
                                    onClick={() => {

                                        setAboutpage({
                                            ...aboutpage,
                                            whyConcernBajura: {
                                                ...aboutpage.whyConcernBajura,
                                                points: [
                                                    ...aboutpage
                                                        .whyConcernBajura
                                                        .points,
                                                    "",
                                                ],
                                            },
                                        });

                                    }}
                                >
                                    + Add Point
                                </button>

                            </div>

                        </div>


                        {/* ========================================================= */}
                        {/* MISSION / VISION / STRATEGIC GOAL */}
                        {/* ========================================================= */}

                        <div className={cardClass}>

                            <div className={cardHeaderWrapClass}>
                                <div>
                                    <h2 className={cardTitleClass}>
                                        Mission, Vision & Goal
                                    </h2>

                                    <p className={cardSubtitleClass}>
                                        Manage the mission, vision and strategic goal
                                        displayed on the About page.
                                    </p>
                                </div>
                            </div>


                            <div className="space-y-6">

                                {aboutpage.missionVisionGoal.items.map(
                                    (item, index) => (

                                        <div
                                            key={item.id || index}
                                            className={subCardClass}
                                        >

                                            <div className={subCardHeaderClass}>

                                                <div>
                                                    <h3 className={subCardTitleClass}>
                                                        {item.title ||
                                                            `Card ${index + 1}`}
                                                    </h3>

                                                    <p className={subCardSubtitleClass}>
                                                        Manage this content card.
                                                    </p>
                                                </div>

                                            </div>


                                            <div className={fieldRowClass}>

                                                {/* Icon */}
                                                <div>

                                                    <label className={labelClass}>
                                                        Icon
                                                    </label>

                                                    <select
                                                        className={inputClass}
                                                        value={item.icon}
                                                        onChange={(e) => {

                                                            const updatedItems =
                                                                [
                                                                    ...aboutpage
                                                                        .missionVisionGoal
                                                                        .items,
                                                                ];

                                                            updatedItems[index] = {
                                                                ...updatedItems[index],
                                                                icon: e.target.value,
                                                            };

                                                            setAboutpage({
                                                                ...aboutpage,
                                                                missionVisionGoal: {
                                                                    ...aboutpage
                                                                        .missionVisionGoal,
                                                                    items:
                                                                        updatedItems,
                                                                },
                                                            });

                                                        }}
                                                    >

                                                        <option value="compass">
                                                            Compass
                                                        </option>

                                                        <option value="eye">
                                                            Eye
                                                        </option>

                                                        <option value="flag">
                                                            Flag
                                                        </option>

                                                    </select>

                                                </div>


                                                {/* Title */}
                                                <div>

                                                    <label className={labelClass}>
                                                        Title
                                                    </label>

                                                    <input
                                                        className={inputClass}
                                                        placeholder="Enter title"
                                                        value={item.title}
                                                        maxLength={
                                                            fieldLimits.sectionHeading
                                                        }
                                                        onChange={(e) => {

                                                            const updatedItems =
                                                                [
                                                                    ...aboutpage
                                                                        .missionVisionGoal
                                                                        .items,
                                                                ];

                                                            updatedItems[index] = {
                                                                ...updatedItems[index],
                                                                title: e.target.value,
                                                            };

                                                            setAboutpage({
                                                                ...aboutpage,
                                                                missionVisionGoal: {
                                                                    ...aboutpage
                                                                        .missionVisionGoal,
                                                                    items:
                                                                        updatedItems,
                                                                },
                                                            });

                                                        }}
                                                    />

                                                    <p
                                                        className={counterClass(
                                                            item.title.length,
                                                            fieldLimits.sectionHeading
                                                        )}
                                                    >
                                                        {item.title.length}/
                                                        {fieldLimits.sectionHeading} characters
                                                    </p>

                                                </div>


                                                {/* Description */}
                                                <div className="sm:col-span-2">

                                                    <label className={labelClass}>
                                                        Description
                                                    </label>

                                                    <textarea
                                                        rows={5}
                                                        className={textareaClass}
                                                        placeholder="Write description..."
                                                        value={item.description}
                                                        maxLength={
                                                            fieldLimits.aboutDescription
                                                        }
                                                        onChange={(e) => {

                                                            const updatedItems =
                                                                [
                                                                    ...aboutpage
                                                                        .missionVisionGoal
                                                                        .items,
                                                                ];

                                                            updatedItems[index] = {
                                                                ...updatedItems[index],
                                                                description:
                                                                    e.target.value,
                                                            };

                                                            setAboutpage({
                                                                ...aboutpage,
                                                                missionVisionGoal: {
                                                                    ...aboutpage
                                                                        .missionVisionGoal,
                                                                    items:
                                                                        updatedItems,
                                                                },
                                                            });

                                                        }}
                                                    />

                                                    <p
                                                        className={counterClass(
                                                            item.description.length,
                                                            fieldLimits.aboutDescription
                                                        )}
                                                    >
                                                        {item.description.length}/
                                                        {fieldLimits.aboutDescription} characters
                                                    </p>

                                                </div>

                                            </div>

                                        </div>

                                    )
                                )}

                            </div>

                        </div>


                    </div>

                </div>

            </div >

        </div >
    );
}