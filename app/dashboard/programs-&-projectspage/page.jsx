"use client";

import { Maiden_Orange } from "next/font/google";
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

const fieldRowClass =
    "grid grid-cols-1 gap-5 sm:grid-cols-2";

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

export default function ProgramsProjectsCMS() {
    const [programProjectPage, setProgramProjectPage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);

    // --------------------------------------------------
    // Fetch page data
    // --------------------------------------------------

    useEffect(() => {
        fetchProgramProjectPage();
    }, []);

    const fetchProgramProjectPage = async () => {
        try {
            const response = await fetch("/api/programProjectpage");

            if (!response.ok) {
                throw new Error("Failed to fetch Programs & Projects page");
            }

            const data = await response.json();

            setProgramProjectPage(data);
        } catch (error) {
            console.error("Fetch error:", error);
            alert("Failed to load Programs & Projects page.");
        } finally {
            setLoading(false);
        }
    };

    // --------------------------------------------------
    // Generic nested updater
    // --------------------------------------------------

    const updateHero = (field, value) => {
        setProgramProjectPage((prev) => ({
            ...prev,
            hero: {
                ...prev.hero,
                [field]: value,
            },
        }));
    };

    const updatePrograms = (field, value) => {
        setProgramProjectPage((prev) => ({
            ...prev,
            programs: {
                ...prev.programs,
                [field]: value,
            },
        }));
    };

    const updateCurrentProjects = (field, value) => {
        setProgramProjectPage((prev) => ({
            ...prev,
            currentProjects: {
                ...prev.currentProjects,
                [field]: value,
            },
        }));
    };

    // --------------------------------------------------
    // Program functions
    // --------------------------------------------------

    const updateProgram = (index, field, value) => {
        setProgramProjectPage((prev) => {
            const updatedPrograms = [...prev.programs.items];

            updatedPrograms[index] = {
                ...updatedPrograms[index],
                [field]: value,
            };

            return {
                ...prev,
                programs: {
                    ...prev.programs,
                    items: updatedPrograms,
                },
            };
        });
    };

    const addProgram = () => {
        const newProgram = {
            id: `program-${Date.now()}`,
            category: "",
            title: "",
            description: "",
            image: "",
            linkText: "Learn More",
            link: "",
        };

        setProgramProjectPage((prev) => ({
            ...prev,
            programs: {
                ...prev.programs,
                items: [
                    ...prev.programs.items,
                    newProgram,
                ],
            },
        }));
    };

    const removeProgram = (index) => {
        if (programProjectPage.programs.items.length <= 1) {
            alert("You must have at least one program.");
            return;
        }

        setProgramProjectPage((prev) => ({
            ...prev,
            programs: {
                ...prev.programs,
                items: prev.programs.items.filter(
                    (_, i) => i !== index
                ),
            },
        }));
    };

    // --------------------------------------------------
    // Project functions
    // --------------------------------------------------

    const updateProject = (index, field, value) => {
        setProgramProjectPage((prev) => {
            const updatedProjects = [
                ...prev.currentProjects.items,
            ];

            updatedProjects[index] = {
                ...updatedProjects[index],
                [field]: value,
            };

            return {
                ...prev,
                currentProjects: {
                    ...prev.currentProjects,
                    items: updatedProjects,
                },
            };
        });
    };

    const addProject = () => {
        const newProject = {
            id: `project-${Date.now()}`,
            category: "",
            title: "",
            description: "",
            image: "",
            linkText: "Learn More",
            link: "",
        };

        setProgramProjectPage((prev) => ({
            ...prev,
            currentProjects: {
                ...prev.currentProjects,
                items: [
                    ...prev.currentProjects.items,
                    newProject,
                ],
            },
        }));
    };

    const removeProject = (index) => {
        if (programProjectPage.currentProjects.items.length <= 1) {
            alert("You must have at least one project.");
            return;
        }

        setProgramProjectPage((prev) => ({
            ...prev,
            currentProjects: {
                ...prev.currentProjects,
                items: prev.currentProjects.items.filter(
                    (_, i) => i !== index
                ),
            },
        }));
    };

    // --------------------------------------------------
    // Image upload
    // --------------------------------------------------

    const uploadImage = async (file) => {
        if (!file) return null;

        try {
            setUploading(true);

            const formData = new FormData();
            formData.append("file", file);

            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error || "Image upload failed"
                );
            }

            return data.url;
        } catch (error) {
            console.error("Upload error:", error);
            alert(error.message || "Failed to upload image.");
            return null;
        } finally {
            setUploading(false);
        }
    };

    // --------------------------------------------------
    // Hero image
    // --------------------------------------------------

    const handleHeroImageUpload = async (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        const url = await uploadImage(file);

        if (url) {
            updateHero("image", url);
        }

        e.target.value = "";
    };

    // --------------------------------------------------
    // Program image
    // --------------------------------------------------

    const handleProgramImageUpload = async (index, e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        const url = await uploadImage(file);

        if (url) {
            updateProgram(index, "image", url);
        }

        e.target.value = "";
    };

    // --------------------------------------------------
    // Project image
    // --------------------------------------------------

    const handleProjectImageUpload = async (index, e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        const url = await uploadImage(file);

        if (url) {
            updateProject(index, "image", url);
        }

        e.target.value = "";
    };

    // --------------------------------------------------
    // Save
    // --------------------------------------------------

    const saveProgramProjectPage = async () => {
        if (!programProjectPage) return;

        setSaving(true);

        try {
            // Don't send MongoDB _id back
            
            const { _id, ...updateData } = programProjectPage;

            console.log(
                "Saving Programs & Projects:",
                updateData
            );
            const response = await fetch(
                "/api/programProjectpage",
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updateData),
                }
            );

            const data = await response.json();

            console.log(
                "Response status:",
                response.status
            );

            console.log("Save response:", data);

            if (!response.ok) {
                throw new Error(
                    data.error ||
                    "Failed to save Programs & Projects page"
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
    // Loading
    // --------------------------------------------------

    if (loading) {
        return (
            <div className="min-h-screen w-full md:w-[80%] flex justify-center items-center">
                <p className="text-sm text-gray-500">
                    Loading Programs & Projects...
                </p>
            </div>
        );
    }

    if (!programProjectPage) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <p className="text-sm text-red-500">
                    Failed to load page data.
                </p>
            </div>
        );
    }

    return (
        <main className="min-h-screen w-full md:w-[80%]">

            {/* Main */}

            <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6">

                {/* Header */}

                <div className="fixed z-10 w-full border-b border-gray-200 bg-white md:w-[82%] pr-8">
                    <div className="mx-auto ml-18 flex max-w-[1600px] flex-col gap-4 px-4 py-5 sm:flex-row sm:px-6 md:ml-10 md:justify-between lg:ml-0 lg:items-center lg:px-8">

                        <div>
                            <h1 className="text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
                                Programs & Projects Page
                            </h1>

                            <p className="mt-1 text-sm text-gray-500">
                                Manage and update your Programs & Projects page content.
                            </p>
                        </div>

                        <button
                            onClick={saveProgramProjectPage}
                            disabled={saving}
                            className="w-full rounded-xl bg-sky-500 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                        >
                            {saving ? "Saving..." : "Save Changes"}
                        </button>

                    </div>
                </div>

                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Programs & Projects
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Manage the content displayed on the
                        Programs & Projects page.
                    </p>
                </div>

                <div className="relative top-20 flex flex-col gap-6 p-4 sm:p-8 min-[700px]:top-0">

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
                                    Manage the main heading, subtitle, and
                                    hero image.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-5">

                            {/* Hero Title */}
                            <div>
                                <label className={labelClass}>
                                    Title
                                </label>

                                <input
                                    type="text"
                                    value={programProjectPage.hero.title}
                                    onChange={(e) =>
                                        updateHero(
                                            "title",
                                            e.target.value
                                        )
                                    }
                                    maxLength={60}
                                    className={inputClass}
                                    placeholder="Our Programs & Projects"
                                />

                                <p
                                    className={counterClass(
                                        programProjectPage.hero.title
                                            ?.length || 0,
                                        60
                                    )}
                                >
                                    {programProjectPage.hero.title
                                        ?.length || 0}
                                    /60 characters
                                </p>
                            </div>

                            {/* Hero Subtitle */}
                            <div>
                                <label className={labelClass}>
                                    Subtitle
                                </label>

                                <textarea
                                    value={
                                        programProjectPage.hero.subtitle
                                    }
                                    onChange={(e) =>
                                        updateHero(
                                            "subtitle",
                                            e.target.value
                                        )
                                    }
                                    maxLength={150}
                                    rows={3}
                                    className={textareaClass}
                                    placeholder="Supporting children..."
                                />

                                <p
                                    className={counterClass(
                                        programProjectPage.hero.subtitle
                                            ?.length || 0,
                                        150
                                    )}
                                >
                                    {programProjectPage.hero.subtitle
                                        ?.length || 0}
                                    /150 characters
                                </p>
                            </div>

                            {/* Hero Image */}
                            <div>
                                <label className={labelClass}>
                                    Hero Image
                                </label>

                                <div className={fileWrapClass}>
                                    <label className={fileButtonClass}>
                                        {uploading
                                            ? "Uploading..."
                                            : "Choose Image"}

                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={
                                                handleHeroImageUpload
                                            }
                                            disabled={uploading}
                                        />
                                    </label>

                                    <div className={filePreviewWrapClass}>
                                        {programProjectPage.hero.image ? (
                                            <img
                                                src={
                                                    programProjectPage.hero.image
                                                }
                                                alt="Hero preview"
                                                className={
                                                    filePreviewImgClass
                                                }
                                            />
                                        ) : null}

                                        <span
                                            className={
                                                filePreviewTextClass
                                            }
                                        >
                                            {programProjectPage.hero.image ||
                                                "No image selected"}
                                        </span>
                                    </div>
                                </div>

                                <span className={helperTextClass}>
                                    Recommended: wide landscape image.
                                </span>
                            </div>
                        </div>
                    </section>

                    {/* ==================================================
              OUR PROGRAMS
          ================================================== */}

                    <section className={cardClass}>
                        <div className={cardHeaderWrapClass}>
                            <div>
                                <h2 className={cardTitleClass}>
                                    Our Programs
                                </h2>

                                <p className={cardSubtitleClass}>
                                    Manage the programs displayed in the
                                    three-column program section.
                                </p>
                            </div>
                        </div>

                        {/* Section Title */}

                        <div className="mb-8">
                            <label className={labelClass}>
                                Section Title
                            </label>

                            <input
                                type="text"
                                value={
                                    programProjectPage.programs.title
                                }
                                onChange={(e) =>
                                    updatePrograms(
                                        "title",
                                        e.target.value
                                    )
                                }
                                maxLength={50}
                                className={inputClass}
                                placeholder="Our Programs"
                            />

                            <p
                                className={counterClass(
                                    programProjectPage.programs.title
                                        ?.length || 0,
                                    50
                                )}
                            >
                                {programProjectPage.programs.title
                                    ?.length || 0}
                                /50 characters
                            </p>
                        </div>

                        {/* Programs */}

                        <div className="space-y-5">
                            {programProjectPage.programs.items.map(
                                (program, index) => (
                                    <div
                                        key={program.id}
                                        className={subCardClass}
                                    >
                                        <div
                                            className={
                                                subCardHeaderClass
                                            }
                                        >
                                            <div>
                                                <h3
                                                    className={
                                                        subCardTitleClass
                                                    }
                                                >
                                                    Program {index + 1}
                                                </h3>

                                                <p
                                                    className={
                                                        subCardSubtitleClass
                                                    }
                                                >
                                                    Add information about this
                                                    program.
                                                </p>
                                            </div>

                                            <button
                                                type="button"
                                                className={
                                                    removeButtonClass
                                                }
                                                onClick={() =>
                                                    removeProgram(index)
                                                }
                                            >
                                                Remove
                                            </button>
                                        </div>

                                        <div className="space-y-5">

                                            {/* Category + Title */}

                                            <div
                                                className={fieldRowClass}
                                            >
                                                <div>
                                                    <label
                                                        className={labelClass}
                                                    >
                                                        Category
                                                    </label>

                                                    <input
                                                        type="text"
                                                        value={
                                                            program.category
                                                        }
                                                        onChange={(e) =>
                                                            updateProgram(
                                                                index,
                                                                "category",
                                                                e.target.value
                                                            )
                                                        }
                                                        maxLength={30}
                                                        className={inputClass}
                                                        placeholder="Education"
                                                    />

                                                    <p
                                                        className={counterClass(
                                                            program.category
                                                                ?.length || 0,
                                                            30
                                                        )}
                                                    >
                                                        {program.category
                                                            ?.length || 0}
                                                        /30 characters
                                                    </p>
                                                </div>

                                                <div>
                                                    <label
                                                        className={labelClass}
                                                    >
                                                        Title
                                                    </label>

                                                    <input
                                                        type="text"
                                                        value={
                                                            program.title
                                                        }
                                                        onChange={(e) =>
                                                            updateProgram(
                                                                index,
                                                                "title",
                                                                e.target.value
                                                            )
                                                        }
                                                        maxLength={60}
                                                        className={inputClass}
                                                        placeholder="Empowering Minds"
                                                    />

                                                    <p
                                                        className={counterClass(
                                                            program.title
                                                                ?.length || 0,
                                                            60
                                                        )}
                                                    >
                                                        {program.title
                                                            ?.length || 0}
                                                        /60 characters
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Description */}

                                            <div>
                                                <label
                                                    className={labelClass}
                                                >
                                                    Description
                                                </label>

                                                <textarea
                                                    value={
                                                        program.description
                                                    }
                                                    onChange={(e) =>
                                                        updateProgram(
                                                            index,
                                                            "description",
                                                            e.target.value
                                                        )
                                                    }
                                                    maxLength={250}
                                                    rows={4}
                                                    className={
                                                        textareaClass
                                                    }
                                                    placeholder="Describe this program..."
                                                />

                                                <p
                                                    className={counterClass(
                                                        program.description
                                                            ?.length || 0,
                                                        250
                                                    )}
                                                >
                                                    {program.description
                                                        ?.length || 0}
                                                    /250 characters
                                                </p>
                                            </div>

                                            {/* Image */}

                                            <div>
                                                <label
                                                    className={labelClass}
                                                >
                                                    Program Image
                                                </label>

                                                <div
                                                    className={
                                                        fileWrapClass
                                                    }
                                                >
                                                    <label
                                                        className={
                                                            fileButtonClass
                                                        }
                                                    >
                                                        {uploading
                                                            ? "Uploading..."
                                                            : "Choose Image"}

                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            className="hidden"
                                                            onChange={(e) =>
                                                                handleProgramImageUpload(
                                                                    index,
                                                                    e
                                                                )
                                                            }
                                                            disabled={uploading}
                                                        />
                                                    </label>

                                                    <div
                                                        className={
                                                            filePreviewWrapClass
                                                        }
                                                    >
                                                        {program.image ? (
                                                            <img
                                                                src={
                                                                    program.image
                                                                }
                                                                alt={
                                                                    program.title ||
                                                                    "Program preview"
                                                                }
                                                                className={
                                                                    filePreviewImgClass
                                                                }
                                                            />
                                                        ) : null}

                                                        <span
                                                            className={
                                                                filePreviewTextClass
                                                            }
                                                        >
                                                            {program.image ||
                                                                "No image selected"}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Link */}

                                            <div
                                                className={fieldRowClass}
                                            >
                                                <div>
                                                    <label
                                                        className={labelClass}
                                                    >
                                                        Link Text
                                                    </label>

                                                    <input
                                                        type="text"
                                                        value={
                                                            program.linkText
                                                        }
                                                        onChange={(e) =>
                                                            updateProgram(
                                                                index,
                                                                "linkText",
                                                                e.target.value
                                                            )
                                                        }
                                                        maxLength={30}
                                                        className={inputClass}
                                                        placeholder="Learn More"
                                                    />
                                                </div>

                                                <div>
                                                    <label
                                                        className={labelClass}
                                                    >
                                                        Link
                                                    </label>

                                                    <input
                                                        type="text"
                                                        value={
                                                            program.link
                                                        }
                                                        onChange={(e) =>
                                                            updateProgram(
                                                                index,
                                                                "link",
                                                                e.target.value
                                                            )
                                                        }
                                                        maxLength={200}
                                                        className={inputClass}
                                                        placeholder="/programs/education"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>

                        {/* Add Program */}

                        <div className="mt-6 border-t border-gray-200 pt-6">
                            <button
                                type="button"
                                className={addButtonClass}
                                onClick={addProgram}
                            >
                                + Add Program
                            </button>
                        </div>
                    </section>

                    {/* ==================================================
              CURRENT PROJECTS
          ================================================== */}

                    <section className={cardClass}>
                        <div className={cardHeaderWrapClass}>
                            <div>
                                <h2 className={cardTitleClass}>
                                    Current Projects
                                </h2>

                                <p className={cardSubtitleClass}>
                                    Manage the active projects displayed
                                    on the page.
                                </p>
                            </div>
                        </div>

                        {/* Section Title */}

                        <div className="mb-5">
                            <label className={labelClass}>
                                Section Title
                            </label>

                            <input
                                type="text"
                                value={
                                    programProjectPage
                                        .currentProjects.title
                                }
                                onChange={(e) =>
                                    updateCurrentProjects(
                                        "title",
                                        e.target.value
                                    )
                                }
                                maxLength={50}
                                className={inputClass}
                                placeholder="Current Projects"
                            />

                            <p
                                className={counterClass(
                                    programProjectPage.currentProjects
                                        .title?.length || 0,
                                    50
                                )}
                            >
                                {programProjectPage.currentProjects
                                    .title?.length || 0}
                                /50 characters
                            </p>
                        </div>

                        {/* Section Description */}

                        <div className="mb-8">
                            <label className={labelClass}>
                                Section Description
                            </label>

                            <textarea
                                value={
                                    programProjectPage.currentProjects
                                        .description
                                }
                                onChange={(e) =>
                                    updateCurrentProjects(
                                        "description",
                                        e.target.value
                                    )
                                }
                                maxLength={250}
                                rows={4}
                                className={textareaClass}
                                placeholder="Describe the current projects section..."
                            />

                            <p
                                className={counterClass(
                                    programProjectPage.currentProjects
                                        .description?.length || 0,
                                    250
                                )}
                            >
                                {programProjectPage.currentProjects
                                    .description?.length || 0}
                                /250 characters
                            </p>
                        </div>

                        {/* Projects */}

                        <div className="space-y-5">
                            {programProjectPage.currentProjects.items.map(
                                (project, index) => (
                                    <div
                                        key={project.id}
                                        className={subCardClass}
                                    >
                                        <div
                                            className={
                                                subCardHeaderClass
                                            }
                                        >
                                            <div>
                                                <h3
                                                    className={
                                                        subCardTitleClass
                                                    }
                                                >
                                                    Project {index + 1}
                                                </h3>

                                                <p
                                                    className={
                                                        subCardSubtitleClass
                                                    }
                                                >
                                                    Add information about this
                                                    current project.
                                                </p>
                                            </div>

                                            <button
                                                type="button"
                                                className={
                                                    removeButtonClass
                                                }
                                                onClick={() =>
                                                    removeProject(index)
                                                }
                                            >
                                                Remove
                                            </button>
                                        </div>

                                        <div className="space-y-5">

                                            {/* Category + Title */}

                                            <div
                                                className={fieldRowClass}
                                            >
                                                <div>
                                                    <label
                                                        className={labelClass}
                                                    >
                                                        Category
                                                    </label>

                                                    <input
                                                        type="text"
                                                        value={
                                                            project.category
                                                        }
                                                        onChange={(e) =>
                                                            updateProject(
                                                                index,
                                                                "category",
                                                                e.target.value
                                                            )
                                                        }
                                                        maxLength={30}
                                                        className={inputClass}
                                                        placeholder="Nutrition"
                                                    />

                                                    <p
                                                        className={counterClass(
                                                            project.category
                                                                ?.length || 0,
                                                            30
                                                        )}
                                                    >
                                                        {project.category
                                                            ?.length || 0}
                                                        /30 characters
                                                    </p>
                                                </div>

                                                <div>
                                                    <label
                                                        className={labelClass}
                                                    >
                                                        Title
                                                    </label>

                                                    <input
                                                        type="text"
                                                        value={
                                                            project.title
                                                        }
                                                        onChange={(e) =>
                                                            updateProject(
                                                                index,
                                                                "title",
                                                                e.target.value
                                                            )
                                                        }
                                                        maxLength={60}
                                                        className={inputClass}
                                                        placeholder="Balanced Meals"
                                                    />

                                                    <p
                                                        className={counterClass(
                                                            project.title
                                                                ?.length || 0,
                                                            60
                                                        )}
                                                    >
                                                        {project.title
                                                            ?.length || 0}
                                                        /60 characters
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Description */}

                                            <div>
                                                <label
                                                    className={labelClass}
                                                >
                                                    Description
                                                </label>

                                                <textarea
                                                    value={
                                                        project.description
                                                    }
                                                    onChange={(e) =>
                                                        updateProject(
                                                            index,
                                                            "description",
                                                            e.target.value
                                                        )
                                                    }
                                                    maxLength={250}
                                                    rows={4}
                                                    className={
                                                        textareaClass
                                                    }
                                                    placeholder="Describe this project..."
                                                />

                                                <p
                                                    className={counterClass(
                                                        project.description
                                                            ?.length || 0,
                                                        250
                                                    )}
                                                >
                                                    {project.description
                                                        ?.length || 0}
                                                    /250 characters
                                                </p>
                                            </div>

                                            {/* Image */}

                                            <div>
                                                <label
                                                    className={labelClass}
                                                >
                                                    Project Image
                                                </label>

                                                <div
                                                    className={
                                                        fileWrapClass
                                                    }
                                                >
                                                    <label
                                                        className={
                                                            fileButtonClass
                                                        }
                                                    >
                                                        {uploading
                                                            ? "Uploading..."
                                                            : "Choose Image"}

                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            className="hidden"
                                                            onChange={(e) =>
                                                                handleProjectImageUpload(
                                                                    index,
                                                                    e
                                                                )
                                                            }
                                                            disabled={uploading}
                                                        />
                                                    </label>

                                                    <div
                                                        className={
                                                            filePreviewWrapClass
                                                        }
                                                    >
                                                        {project.image ? (
                                                            <img
                                                                src={
                                                                    project.image
                                                                }
                                                                alt={
                                                                    project.title ||
                                                                    "Project preview"
                                                                }
                                                                className={
                                                                    filePreviewImgClass
                                                                }
                                                            />
                                                        ) : null}

                                                        <span
                                                            className={
                                                                filePreviewTextClass
                                                            }
                                                        >
                                                            {project.image ||
                                                                "No image selected"}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Link */}

                                            <div
                                                className={fieldRowClass}
                                            >
                                                <div>
                                                    <label
                                                        className={labelClass}
                                                    >
                                                        Link Text
                                                    </label>

                                                    <input
                                                        type="text"
                                                        value={
                                                            project.linkText
                                                        }
                                                        onChange={(e) =>
                                                            updateProject(
                                                                index,
                                                                "linkText",
                                                                e.target.value
                                                            )
                                                        }
                                                        maxLength={30}
                                                        className={inputClass}
                                                        placeholder="Learn More"
                                                    />
                                                </div>

                                                <div>
                                                    <label
                                                        className={labelClass}
                                                    >
                                                        Link
                                                    </label>

                                                    <input
                                                        type="text"
                                                        value={
                                                            project.link
                                                        }
                                                        onChange={(e) =>
                                                            updateProject(
                                                                index,
                                                                "link",
                                                                e.target.value
                                                            )
                                                        }
                                                        maxLength={200}
                                                        className={inputClass}
                                                        placeholder="/projects/balanced-meals"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>

                        {/* Add Project */}

                        <div className="mt-6 border-t border-gray-200 pt-6">
                            <button
                                type="button"
                                className={addButtonClass}
                                onClick={addProject}
                            >
                                + Add Current Project
                            </button>
                        </div>
                    </section>

                    {/* ==================================================
              SAVE BUTTON
          ================================================== */}

                    <div className="flex justify-end pb-10">
                        <button
                            type="button"
                            onClick={saveProgramProjectPage}
                            disabled={saving || uploading}
                            className="inline-flex items-center justify-center rounded-xl bg-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {saving
                                ? "Saving..."
                                : "Save Changes"}
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}