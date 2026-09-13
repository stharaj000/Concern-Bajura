"use client";

import { useEffect, useState } from "react";

const inputClass =
    "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100";

const textareaClass = `${inputClass} resize-y`;

const labelClass =
    "mb-2 block text-sm font-medium text-gray-700";

const cardClass =
    "rounded-2xl border border-gray-200 bg-white p-6 shadow-sm";

const cardHeaderWrapClass =
    "mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between";

const cardTitleClass =
    "text-xl font-semibold text-gray-900";

const cardSubtitleClass =
    "mt-1 text-sm text-gray-500";

const subCardClass =
    "rounded-2xl border border-gray-200 bg-gray-50/60 p-5";

const subCardHeaderClass =
    "mb-6 flex items-center justify-between border-b border-gray-200 pb-4";

const subCardTitleClass =
    "font-semibold text-gray-900";

const subCardSubtitleClass =
    "mt-1 text-xs text-gray-500";

const fieldRowClass =
    "grid grid-cols-1 gap-5 sm:grid-cols-2";

const fileWrapClass =
    "flex items-stretch overflow-hidden rounded-xl border border-gray-200 bg-gray-50";

const fileButtonClass =
    "inline-flex h-14 shrink-0 cursor-pointer items-center justify-center bg-gray-800 px-5 text-sm font-medium text-white transition hover:bg-gray-700";

const filePreviewWrapClass =
    "flex min-w-0 items-center gap-3 px-4";

const filePreviewImgClass =
    "h-10 w-10 shrink-0 rounded-full object-cover";

const filePreviewTextClass =
    "truncate text-sm text-gray-500";

const helperTextClass =
    "mt-2 block text-xs italic text-sky-600";

const addButtonClass =
    "inline-flex items-center gap-1.5 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2";

const removeButtonClass =
    "rounded-lg px-3 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50";

const counterClass = (length, limit) =>
    `mt-1.5 text-xs ${length >= limit
        ? "text-red-500"
        : "text-gray-400"
    }`;

export default function OurTeamCMS() {
    const [ourTeamPage, setOurTeamPage] = useState(null);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);

    // ============================================================
    // FETCH DATA
    // ============================================================

    useEffect(() => {
        fetchOurTeamPage();
    }, []);

    const fetchOurTeamPage = async () => {
        try {
            const response = await fetch(
                "/api/ourTeamPage"
            );

            if (!response.ok) {
                throw new Error(
                    "Failed to fetch Our Team page"
                );
            }

            const data = await response.json();

            setOurTeamPage(data);
        } catch (error) {
            console.error(
                "Fetch Our Team error:",
                error
            );

            alert(
                "Failed to load Our Team page."
            );
        } finally {
            setLoading(false);
        }
    };

    // ============================================================
    // HERO
    // ============================================================

    const updateHero = (field, value) => {
        setOurTeamPage((prev) => ({
            ...prev,

            hero: {
                ...prev.hero,
                [field]: value,
            },
        }));
    };

    // ============================================================
    // SECTION UPDATE FUNCTIONS
    // ============================================================

    const updateBoardOfDirectors = (
        field,
        value
    ) => {
        setOurTeamPage((prev) => ({
            ...prev,

            boardOfDirectors: {
                ...prev.boardOfDirectors,
                [field]: value,
            },
        }));
    };

    const updateAdvisoryCouncil = (
        field,
        value
    ) => {
        setOurTeamPage((prev) => ({
            ...prev,

            advisoryCouncil: {
                ...prev.advisoryCouncil,
                [field]: value,
            },
        }));
    };

    const updateStaffMembers = (
        field,
        value
    ) => {
        setOurTeamPage((prev) => ({
            ...prev,

            staffMembers: {
                ...prev.staffMembers,
                [field]: value,
            },
        }));
    };

    // ============================================================
    // BOARD MEMBERS
    // ============================================================

    const updateBoardMember = (
        index,
        field,
        value
    ) => {
        setOurTeamPage((prev) => {
            const updatedItems = [
                ...prev.boardOfDirectors.items,
            ];

            updatedItems[index] = {
                ...updatedItems[index],
                [field]: value,
            };

            return {
                ...prev,

                boardOfDirectors: {
                    ...prev.boardOfDirectors,
                    items: updatedItems,
                },
            };
        });
    };

    const addBoardMember = () => {
        const newMember = {
            id: `bd-${Date.now()}`,
            name: "",
            role: "",
            image: "",
        };

        setOurTeamPage((prev) => ({
            ...prev,

            boardOfDirectors: {
                ...prev.boardOfDirectors,

                items: [
                    ...prev.boardOfDirectors.items,
                    newMember,
                ],
            },
        }));
    };

    const removeBoardMember = (index) => {
        if (
            ourTeamPage.boardOfDirectors.items.length <=
            1
        ) {
            alert(
                "You must have at least one board member."
            );

            return;
        }

        setOurTeamPage((prev) => ({
            ...prev,

            boardOfDirectors: {
                ...prev.boardOfDirectors,

                items:
                    prev.boardOfDirectors.items.filter(
                        (_, i) => i !== index
                    ),
            },
        }));
    };

    // ============================================================
    // ADVISORY COUNCIL
    // ============================================================

    const updateAdvisor = (
        index,
        field,
        value
    ) => {
        setOurTeamPage((prev) => {
            const updatedItems = [
                ...prev.advisoryCouncil.items,
            ];

            updatedItems[index] = {
                ...updatedItems[index],
                [field]: value,
            };

            return {
                ...prev,

                advisoryCouncil: {
                    ...prev.advisoryCouncil,
                    items: updatedItems,
                },
            };
        });
    };

    const addAdvisor = () => {
        const newAdvisor = {
            id: `ac-${Date.now()}`,
            name: "",
            role: "",
            image: "",
        };

        setOurTeamPage((prev) => ({
            ...prev,

            advisoryCouncil: {
                ...prev.advisoryCouncil,

                items: [
                    ...prev.advisoryCouncil.items,
                    newAdvisor,
                ],
            },
        }));
    };

    const removeAdvisor = (index) => {
        if (
            ourTeamPage.advisoryCouncil.items.length <=
            1
        ) {
            alert(
                "You must have at least one advisory council member."
            );

            return;
        }

        setOurTeamPage((prev) => ({
            ...prev,

            advisoryCouncil: {
                ...prev.advisoryCouncil,

                items:
                    prev.advisoryCouncil.items.filter(
                        (_, i) => i !== index
                    ),
            },
        }));
    };

    // ============================================================
    // STAFF MEMBERS
    // ============================================================

    const updateStaffMember = (
        index,
        field,
        value
    ) => {
        setOurTeamPage((prev) => {
            const updatedItems = [
                ...prev.staffMembers.items,
            ];

            updatedItems[index] = {
                ...updatedItems[index],
                [field]: value,
            };

            return {
                ...prev,

                staffMembers: {
                    ...prev.staffMembers,
                    items: updatedItems,
                },
            };
        });
    };

    const addStaffMember = () => {
        const newMember = {
            id: `sm-${Date.now()}`,
            name: "",
            role: "",
            image: "",
        };

        setOurTeamPage((prev) => ({
            ...prev,

            staffMembers: {
                ...prev.staffMembers,

                items: [
                    ...prev.staffMembers.items,
                    newMember,
                ],
            },
        }));
    };

    const removeStaffMember = (index) => {
        if (
            ourTeamPage.staffMembers.items.length <=
            1
        ) {
            alert(
                "You must have at least one staff member."
            );

            return;
        }

        setOurTeamPage((prev) => ({
            ...prev,

            staffMembers: {
                ...prev.staffMembers,

                items:
                    prev.staffMembers.items.filter(
                        (_, i) => i !== index
                    ),
            },
        }));
    };

    // ============================================================
    // IMAGE UPLOAD
    // ============================================================

    const uploadImage = async (file) => {
        if (!file) return null;

        try {
            setUploading(true);

            const formData = new FormData();

            formData.append("file", file);

            const response = await fetch(
                "/api/upload",
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error ||
                    "Image upload failed"
                );
            }

            return data.url;
        } catch (error) {
            console.error(
                "Image upload error:",
                error
            );

            alert(
                error.message ||
                "Failed to upload image."
            );

            return null;
        } finally {
            setUploading(false);
        }
    };

    // ============================================================
    // HERO IMAGE UPLOAD
    // ============================================================

    const handleHeroImageUpload = async (
        e
    ) => {
        const file =
            e.target.files?.[0];

        if (!file) return;

        const url =
            await uploadImage(file);

        if (url) {
            updateHero(
                "image",
                url
            );
        }

        e.target.value = "";
    };

    // ============================================================
    // BOARD IMAGE UPLOAD
    // ============================================================

    const handleBoardImageUpload = async (
        index,
        e
    ) => {
        const file =
            e.target.files?.[0];

        if (!file) return;

        const url =
            await uploadImage(file);

        if (url) {
            updateBoardMember(
                index,
                "image",
                url
            );
        }

        e.target.value = "";
    };

    // ============================================================
    // ADVISOR IMAGE UPLOAD
    // ============================================================

    const handleAdvisorImageUpload = async (
        index,
        e
    ) => {
        const file =
            e.target.files?.[0];

        if (!file) return;

        const url =
            await uploadImage(file);

        if (url) {
            updateAdvisor(
                index,
                "image",
                url
            );
        }

        e.target.value = "";
    };

    // ============================================================
    // STAFF IMAGE UPLOAD
    // ============================================================

    const handleStaffImageUpload = async (
        index,
        e
    ) => {
        const file =
            e.target.files?.[0];

        if (!file) return;

        const url =
            await uploadImage(file);

        if (url) {
            updateStaffMember(
                index,
                "image",
                url
            );
        }

        e.target.value = "";
    };

    // ============================================================
    // SAVE
    // ============================================================

    const saveOurTeamPage = async () => {
        if (!ourTeamPage) return;

        setSaving(true);

        try {
            // Never update MongoDB _id
            const {
                _id,
                ...updateData
            } = ourTeamPage;

            console.log(
                "Saving Our Team:",
                updateData
            );

            const response = await fetch(
                "/api/ourTeamPage",
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json",
                    },

                    body: JSON.stringify(
                        updateData
                    ),
                }
            );

            const data =
                await response.json();

            console.log(
                "Response status:",
                response.status
            );

            console.log(
                "Save response:",
                data
            );

            if (!response.ok) {
                throw new Error(
                    data.error ||
                    "Failed to save Our Team page"
                );
            }

            alert(
                "Changes saved successfully!"
            );
        } catch (error) {
            console.error(
                "Save error:",
                error
            );

            alert(error.message);
        } finally {
            setSaving(false);
        }
    };

    // ============================================================
    // LOADING
    // ============================================================

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center w-full">
                <p className="text-sm text-gray-500">
                    Loading Our Team...
                </p>
            </div>
        );
    }

    if (!ourTeamPage) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <p className="text-sm text-red-500">
                    Failed to load Our Team page.
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
                                Our Team Page
                            </h1>

                            <p className="mt-1 text-sm text-gray-500">
                                Manage and update your Our Team Page content.
                            </p>
                        </div>

                        <button
                            onClick={saveOurTeamPage}
                            disabled={saving}
                            className="w-full rounded-xl bg-sky-500 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                        >
                            {saving ? "Saving..." : "Save Changes"}
                        </button>

                    </div>
                </div>

                <div className="relative top-44 flex flex-col gap-6 p-4 sm:p-8 min-[700px]:top-22">

                    {/* ====================================================
              HERO SECTION
          ==================================================== */}

                    <section className={cardClass}>
                        <div
                            className={
                                cardHeaderWrapClass
                            }
                        >
                            <div>
                                <h2
                                    className={cardTitleClass}
                                >
                                    Hero Section
                                </h2>

                                <p
                                    className={
                                        cardSubtitleClass
                                    }
                                >
                                    Manage the main heading,
                                    subtitle, and hero image.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-5">

                            {/* TITLE */}

                            <div>
                                <label
                                    className={labelClass}
                                >
                                    Title
                                </label>

                                <input
                                    type="text"
                                    value={
                                        ourTeamPage.hero.title
                                    }
                                    onChange={(e) =>
                                        updateHero(
                                            "title",
                                            e.target.value
                                        )
                                    }
                                    maxLength={60}
                                    className={inputClass}
                                    placeholder="Our Team"
                                />

                                <p
                                    className={counterClass(
                                        ourTeamPage.hero.title
                                            ?.length || 0,
                                        60
                                    )}
                                >
                                    {ourTeamPage.hero.title
                                        ?.length || 0}
                                    /60 characters
                                </p>
                            </div>

                            {/* SUBTITLE */}

                            <div>
                                <label
                                    className={labelClass}
                                >
                                    Subtitle
                                </label>

                                <textarea
                                    value={
                                        ourTeamPage.hero
                                            .subtitle
                                    }
                                    onChange={(e) =>
                                        updateHero(
                                            "subtitle",
                                            e.target.value
                                        )
                                    }
                                    maxLength={150}
                                    rows={3}
                                    className={
                                        textareaClass
                                    }
                                    placeholder="Dedicated individuals working together..."
                                />

                                <p
                                    className={counterClass(
                                        ourTeamPage.hero
                                            .subtitle
                                            ?.length || 0,
                                        150
                                    )}
                                >
                                    {ourTeamPage.hero
                                        .subtitle
                                        ?.length || 0}
                                    /150 characters
                                </p>
                            </div>

                            {/* IMAGE */}

                            <div>
                                <label
                                    className={labelClass}
                                >
                                    Hero Image
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
                                            onChange={
                                                handleHeroImageUpload
                                            }
                                            disabled={uploading}
                                        />
                                    </label>

                                    <div
                                        className={
                                            filePreviewWrapClass
                                        }
                                    >
                                        {ourTeamPage.hero
                                            .image && (
                                                <img
                                                    src={
                                                        ourTeamPage.hero
                                                            .image
                                                    }
                                                    alt="Hero preview"
                                                    className={
                                                        filePreviewImgClass
                                                    }
                                                />
                                            )}

                                        <span
                                            className={
                                                filePreviewTextClass
                                            }
                                        >
                                            {ourTeamPage.hero
                                                .image ||
                                                "No image selected"}
                                        </span>
                                    </div>
                                </div>

                                <span
                                    className={
                                        helperTextClass
                                    }
                                >
                                    Recommended: wide
                                    landscape image.
                                </span>
                            </div>
                        </div>
                    </section>

                    {/* ====================================================
              BOARD OF DIRECTORS
          ==================================================== */}

                    <section className={cardClass}>
                        <div
                            className={
                                cardHeaderWrapClass
                            }
                        >
                            <div>
                                <h2
                                    className={cardTitleClass}
                                >
                                    Board of Directors
                                </h2>

                                <p
                                    className={
                                        cardSubtitleClass
                                    }
                                >
                                    Manage the members guiding
                                    the organization.
                                </p>
                            </div>
                        </div>

                        {/* SECTION TITLE */}

                        <div className="mb-5">
                            <label
                                className={labelClass}
                            >
                                Section Title
                            </label>

                            <input
                                type="text"
                                value={
                                    ourTeamPage
                                        .boardOfDirectors
                                        .title
                                }
                                onChange={(e) =>
                                    updateBoardOfDirectors(
                                        "title",
                                        e.target.value
                                    )
                                }
                                maxLength={60}
                                className={inputClass}
                            />

                            <p
                                className={counterClass(
                                    ourTeamPage
                                        .boardOfDirectors
                                        .title
                                        ?.length || 0,
                                    60
                                )}
                            >
                                {ourTeamPage
                                    .boardOfDirectors
                                    .title
                                    ?.length || 0}
                                /60 characters
                            </p>
                        </div>

                        {/* SECTION SUBTITLE */}

                        <div className="mb-8">
                            <label
                                className={labelClass}
                            >
                                Section Subtitle
                            </label>

                            <textarea
                                value={
                                    ourTeamPage
                                        .boardOfDirectors
                                        .subtitle
                                }
                                onChange={(e) =>
                                    updateBoardOfDirectors(
                                        "subtitle",
                                        e.target.value
                                    )
                                }
                                maxLength={150}
                                rows={3}
                                className={
                                    textareaClass
                                }
                            />

                            <p
                                className={counterClass(
                                    ourTeamPage
                                        .boardOfDirectors
                                        .subtitle
                                        ?.length || 0,
                                    150
                                )}
                            >
                                {ourTeamPage
                                    .boardOfDirectors
                                    .subtitle
                                    ?.length || 0}
                                /150 characters
                            </p>
                        </div>

                        {/* MEMBERS */}

                        <div className="space-y-5">
                            {ourTeamPage.boardOfDirectors.items.map(
                                (member, index) => (
                                    <div
                                        key={member.id}
                                        className={
                                            subCardClass
                                        }
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
                                                    Board Member{" "}
                                                    {index + 1}
                                                </h3>

                                                <p
                                                    className={
                                                        subCardSubtitleClass
                                                    }
                                                >
                                                    Add the member's
                                                    name, role, and
                                                    profile image.
                                                </p>
                                            </div>

                                            <button
                                                type="button"
                                                className={
                                                    removeButtonClass
                                                }
                                                onClick={() =>
                                                    removeBoardMember(
                                                        index
                                                    )
                                                }
                                            >
                                                Remove
                                            </button>
                                        </div>

                                        <div className="space-y-5">

                                            <div
                                                className={
                                                    fieldRowClass
                                                }
                                            >
                                                {/* NAME */}

                                                <div>
                                                    <label
                                                        className={
                                                            labelClass
                                                        }
                                                    >
                                                        Name
                                                    </label>

                                                    <input
                                                        type="text"
                                                        value={
                                                            member.name
                                                        }
                                                        onChange={(e) =>
                                                            updateBoardMember(
                                                                index,
                                                                "name",
                                                                e.target
                                                                    .value
                                                            )
                                                        }
                                                        maxLength={60}
                                                        className={
                                                            inputClass
                                                        }
                                                        placeholder="Dr. Aisha Thapa"
                                                    />

                                                    <p
                                                        className={counterClass(
                                                            member.name
                                                                ?.length ||
                                                            0,
                                                            60
                                                        )}
                                                    >
                                                        {member.name
                                                            ?.length ||
                                                            0}
                                                        /60 characters
                                                    </p>
                                                </div>

                                                {/* ROLE */}

                                                <div>
                                                    <label
                                                        className={
                                                            labelClass
                                                        }
                                                    >
                                                        Role
                                                    </label>

                                                    <input
                                                        type="text"
                                                        value={
                                                            member.role
                                                        }
                                                        onChange={(e) =>
                                                            updateBoardMember(
                                                                index,
                                                                "role",
                                                                e.target
                                                                    .value
                                                            )
                                                        }
                                                        maxLength={50}
                                                        className={
                                                            inputClass
                                                        }
                                                        placeholder="Chairperson"
                                                    />

                                                    <p
                                                        className={counterClass(
                                                            member.role
                                                                ?.length ||
                                                            0,
                                                            50
                                                        )}
                                                    >
                                                        {member.role
                                                            ?.length ||
                                                            0}
                                                        /50 characters
                                                    </p>
                                                </div>
                                            </div>

                                            {/* IMAGE */}

                                            <div>
                                                <label
                                                    className={
                                                        labelClass
                                                    }
                                                >
                                                    Profile Image
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
                                                                handleBoardImageUpload(
                                                                    index,
                                                                    e
                                                                )
                                                            }
                                                            disabled={
                                                                uploading
                                                            }
                                                        />
                                                    </label>

                                                    <div
                                                        className={
                                                            filePreviewWrapClass
                                                        }
                                                    >
                                                        {member.image && (
                                                            <img
                                                                src={
                                                                    member.image
                                                                }
                                                                alt={
                                                                    member.name ||
                                                                    "Member preview"
                                                                }
                                                                className={
                                                                    filePreviewImgClass
                                                                }
                                                            />
                                                        )}

                                                        <span
                                                            className={
                                                                filePreviewTextClass
                                                            }
                                                        >
                                                            {member.image ||
                                                                "No image selected"}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>

                        <div className="mt-6 border-t border-gray-200 pt-6">
                            <button
                                type="button"
                                className={
                                    addButtonClass
                                }
                                onClick={
                                    addBoardMember
                                }
                            >
                                + Add Board Member
                            </button>
                        </div>
                    </section>

                    {/* ====================================================
              ADVISORY COUNCIL
          ==================================================== */}

                    <section className={cardClass}>
                        <div
                            className={
                                cardHeaderWrapClass
                            }
                        >
                            <div>
                                <h2
                                    className={cardTitleClass}
                                >
                                    Advisory Council
                                </h2>

                                <p
                                    className={
                                        cardSubtitleClass
                                    }
                                >
                                    Manage experts providing
                                    strategic guidance.
                                </p>
                            </div>
                        </div>

                        {/* TITLE */}

                        <div className="mb-5">
                            <label
                                className={labelClass}
                            >
                                Section Title
                            </label>

                            <input
                                type="text"
                                value={
                                    ourTeamPage
                                        .advisoryCouncil
                                        .title
                                }
                                onChange={(e) =>
                                    updateAdvisoryCouncil(
                                        "title",
                                        e.target.value
                                    )
                                }
                                maxLength={60}
                                className={inputClass}
                            />

                            <p
                                className={counterClass(
                                    ourTeamPage
                                        .advisoryCouncil
                                        .title
                                        ?.length || 0,
                                    60
                                )}
                            >
                                {ourTeamPage
                                    .advisoryCouncil
                                    .title
                                    ?.length || 0}
                                /60 characters
                            </p>
                        </div>

                        {/* SUBTITLE */}

                        <div className="mb-8">
                            <label
                                className={labelClass}
                            >
                                Section Subtitle
                            </label>

                            <textarea
                                value={
                                    ourTeamPage
                                        .advisoryCouncil
                                        .subtitle
                                }
                                onChange={(e) =>
                                    updateAdvisoryCouncil(
                                        "subtitle",
                                        e.target.value
                                    )
                                }
                                maxLength={150}
                                rows={3}
                                className={
                                    textareaClass
                                }
                            />

                            <p
                                className={counterClass(
                                    ourTeamPage
                                        .advisoryCouncil
                                        .subtitle
                                        ?.length || 0,
                                    150
                                )}
                            >
                                {ourTeamPage
                                    .advisoryCouncil
                                    .subtitle
                                    ?.length || 0}
                                /150 characters
                            </p>
                        </div>

                        {/* ADVISORS */}

                        <div className="space-y-5">
                            {ourTeamPage.advisoryCouncil.items.map(
                                (advisor, index) => (
                                    <div
                                        key={advisor.id}
                                        className={
                                            subCardClass
                                        }
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
                                                    Advisor{" "}
                                                    {index + 1}
                                                </h3>

                                                <p
                                                    className={
                                                        subCardSubtitleClass
                                                    }
                                                >
                                                    Add the advisor's
                                                    name, role, and
                                                    profile image.
                                                </p>
                                            </div>

                                            <button
                                                type="button"
                                                className={
                                                    removeButtonClass
                                                }
                                                onClick={() =>
                                                    removeAdvisor(
                                                        index
                                                    )
                                                }
                                            >
                                                Remove
                                            </button>
                                        </div>

                                        <div className="space-y-5">

                                            <div
                                                className={
                                                    fieldRowClass
                                                }
                                            >
                                                {/* NAME */}

                                                <div>
                                                    <label
                                                        className={
                                                            labelClass
                                                        }
                                                    >
                                                        Name
                                                    </label>

                                                    <input
                                                        type="text"
                                                        value={
                                                            advisor.name
                                                        }
                                                        onChange={(e) =>
                                                            updateAdvisor(
                                                                index,
                                                                "name",
                                                                e.target
                                                                    .value
                                                            )
                                                        }
                                                        maxLength={60}
                                                        className={
                                                            inputClass
                                                        }
                                                        placeholder="Dr. Aisha Thapa"
                                                    />

                                                    <p
                                                        className={counterClass(
                                                            advisor.name
                                                                ?.length ||
                                                            0,
                                                            60
                                                        )}
                                                    >
                                                        {advisor.name
                                                            ?.length ||
                                                            0}
                                                        /60 characters
                                                    </p>
                                                </div>

                                                {/* ROLE */}

                                                <div>
                                                    <label
                                                        className={
                                                            labelClass
                                                        }
                                                    >
                                                        Role
                                                    </label>

                                                    <input
                                                        type="text"
                                                        value={
                                                            advisor.role
                                                        }
                                                        onChange={(e) =>
                                                            updateAdvisor(
                                                                index,
                                                                "role",
                                                                e.target
                                                                    .value
                                                            )
                                                        }
                                                        maxLength={50}
                                                        className={
                                                            inputClass
                                                        }
                                                        placeholder="Strategic Advisor"
                                                    />

                                                    <p
                                                        className={counterClass(
                                                            advisor.role
                                                                ?.length ||
                                                            0,
                                                            50
                                                        )}
                                                    >
                                                        {advisor.role
                                                            ?.length ||
                                                            0}
                                                        /50 characters
                                                    </p>
                                                </div>
                                            </div>

                                            {/* IMAGE */}

                                            <div>
                                                <label
                                                    className={
                                                        labelClass
                                                    }
                                                >
                                                    Profile Image
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
                                                                handleAdvisorImageUpload(
                                                                    index,
                                                                    e
                                                                )
                                                            }
                                                            disabled={
                                                                uploading
                                                            }
                                                        />
                                                    </label>

                                                    <div
                                                        className={
                                                            filePreviewWrapClass
                                                        }
                                                    >
                                                        {advisor.image && (
                                                            <img
                                                                src={
                                                                    advisor.image
                                                                }
                                                                alt={
                                                                    advisor.name ||
                                                                    "Advisor preview"
                                                                }
                                                                className={
                                                                    filePreviewImgClass
                                                                }
                                                            />
                                                        )}

                                                        <span
                                                            className={
                                                                filePreviewTextClass
                                                            }
                                                        >
                                                            {advisor.image ||
                                                                "No image selected"}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>

                        <div className="mt-6 border-t border-gray-200 pt-6">
                            <button
                                type="button"
                                className={
                                    addButtonClass
                                }
                                onClick={addAdvisor}
                            >
                                + Add Advisor
                            </button>
                        </div>
                    </section>

                    {/* ====================================================
              STAFF MEMBERS
          ==================================================== */}

                    <section className={cardClass}>
                        <div
                            className={
                                cardHeaderWrapClass
                            }
                        >
                            <div>
                                <h2
                                    className={cardTitleClass}
                                >
                                    Staff Members
                                </h2>

                                <p
                                    className={
                                        cardSubtitleClass
                                    }
                                >
                                    Manage the team members
                                    working on the ground.
                                </p>
                            </div>
                        </div>

                        {/* TITLE */}

                        <div className="mb-5">
                            <label
                                className={labelClass}
                            >
                                Section Title
                            </label>

                            <input
                                type="text"
                                value={
                                    ourTeamPage
                                        .staffMembers
                                        .title
                                }
                                onChange={(e) =>
                                    updateStaffMembers(
                                        "title",
                                        e.target.value
                                    )
                                }
                                maxLength={60}
                                className={inputClass}
                            />

                            <p
                                className={counterClass(
                                    ourTeamPage
                                        .staffMembers
                                        .title
                                        ?.length || 0,
                                    60
                                )}
                            >
                                {ourTeamPage
                                    .staffMembers
                                    .title
                                    ?.length || 0}
                                /60 characters
                            </p>
                        </div>

                        {/* SUBTITLE */}

                        <div className="mb-8">
                            <label
                                className={labelClass}
                            >
                                Section Subtitle
                            </label>

                            <textarea
                                value={
                                    ourTeamPage
                                        .staffMembers
                                        .subtitle
                                }
                                onChange={(e) =>
                                    updateStaffMembers(
                                        "subtitle",
                                        e.target.value
                                    )
                                }
                                maxLength={150}
                                rows={3}
                                className={
                                    textareaClass
                                }
                            />

                            <p
                                className={counterClass(
                                    ourTeamPage
                                        .staffMembers
                                        .subtitle
                                        ?.length || 0,
                                    150
                                )}
                            >
                                {ourTeamPage
                                    .staffMembers
                                    .subtitle
                                    ?.length || 0}
                                /150 characters
                            </p>
                        </div>

                        {/* STAFF */}

                        <div className="space-y-5">
                            {ourTeamPage.staffMembers.items.map(
                                (member, index) => (
                                    <div
                                        key={member.id}
                                        className={
                                            subCardClass
                                        }
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
                                                    Staff Member{" "}
                                                    {index + 1}
                                                </h3>

                                                <p
                                                    className={
                                                        subCardSubtitleClass
                                                    }
                                                >
                                                    Add the staff
                                                    member's name,
                                                    role, and image.
                                                </p>
                                            </div>

                                            <button
                                                type="button"
                                                className={
                                                    removeButtonClass
                                                }
                                                onClick={() =>
                                                    removeStaffMember(
                                                        index
                                                    )
                                                }
                                            >
                                                Remove
                                            </button>
                                        </div>

                                        <div className="space-y-5">

                                            <div
                                                className={
                                                    fieldRowClass
                                                }
                                            >
                                                {/* NAME */}

                                                <div>
                                                    <label
                                                        className={
                                                            labelClass
                                                        }
                                                    >
                                                        Name
                                                    </label>

                                                    <input
                                                        type="text"
                                                        value={
                                                            member.name
                                                        }
                                                        onChange={(e) =>
                                                            updateStaffMember(
                                                                index,
                                                                "name",
                                                                e.target
                                                                    .value
                                                            )
                                                        }
                                                        maxLength={60}
                                                        className={
                                                            inputClass
                                                        }
                                                        placeholder="Raj Shrestha"
                                                    />

                                                    <p
                                                        className={counterClass(
                                                            member.name
                                                                ?.length ||
                                                            0,
                                                            60
                                                        )}
                                                    >
                                                        {member.name
                                                            ?.length ||
                                                            0}
                                                        /60 characters
                                                    </p>
                                                </div>

                                                {/* ROLE */}

                                                <div>
                                                    <label
                                                        className={
                                                            labelClass
                                                        }
                                                    >
                                                        Role
                                                    </label>

                                                    <input
                                                        type="text"
                                                        value={
                                                            member.role
                                                        }
                                                        onChange={(e) =>
                                                            updateStaffMember(
                                                                index,
                                                                "role",
                                                                e.target
                                                                    .value
                                                            )
                                                        }
                                                        maxLength={50}
                                                        className={
                                                            inputClass
                                                        }
                                                        placeholder="Program Coordinator"
                                                    />

                                                    <p
                                                        className={counterClass(
                                                            member.role
                                                                ?.length ||
                                                            0,
                                                            50
                                                        )}
                                                    >
                                                        {member.role
                                                            ?.length ||
                                                            0}
                                                        /50 characters
                                                    </p>
                                                </div>
                                            </div>

                                            {/* IMAGE */}

                                            <div>
                                                <label
                                                    className={
                                                        labelClass
                                                    }
                                                >
                                                    Profile Image
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
                                                                handleStaffImageUpload(
                                                                    index,
                                                                    e
                                                                )
                                                            }
                                                            disabled={
                                                                uploading
                                                            }
                                                        />
                                                    </label>

                                                    <div
                                                        className={
                                                            filePreviewWrapClass
                                                        }
                                                    >
                                                        {member.image && (
                                                            <img
                                                                src={
                                                                    member.image
                                                                }
                                                                alt={
                                                                    member.name ||
                                                                    "Staff preview"
                                                                }
                                                                className={
                                                                    filePreviewImgClass
                                                                }
                                                            />
                                                        )}

                                                        <span
                                                            className={
                                                                filePreviewTextClass
                                                            }
                                                        >
                                                            {member.image ||
                                                                "No image selected"}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>

                        <div className="mt-6 border-t border-gray-200 pt-6">
                            <button
                                type="button"
                                className={
                                    addButtonClass
                                }
                                onClick={
                                    addStaffMember
                                }
                            >
                                + Add Staff Member
                            </button>
                        </div>
                    </section>



                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={
                                saveOurTeamPage
                            }
                            disabled={
                                saving || uploading
                            }
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