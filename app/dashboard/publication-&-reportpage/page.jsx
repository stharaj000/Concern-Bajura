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
    `mt-1.5 text-xs ${length >= limit
        ? "text-red-500"
        : "text-gray-400"
    }`;

export default function PublicationsReportsCMS() {
    const [publicationReportPage, setPublicationReportPage] =
        useState(null);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // ============================================================
    // FETCH DATA
    // ============================================================

    useEffect(() => {
        fetchPublicationReportPage();
    }, []);

    const fetchPublicationReportPage = async () => {
        try {
            const response = await fetch(
                "/api/publicationReportpage"
            );

            if (!response.ok) {
                throw new Error(
                    "Failed to fetch Publications & Reports page"
                );
            }

            const data = await response.json();

            setPublicationReportPage(data);
        } catch (error) {
            console.error("Fetch error:", error);

            alert(
                "Failed to load Publications & Reports page."
            );
        } finally {
            setLoading(false);
        }
    };

    // ============================================================
    // HERO
    // ============================================================

    const updateHero = (field, value) => {
        setPublicationReportPage((prev) => ({
            ...prev,

            hero: {
                ...prev.hero,
                [field]: value,
            },
        }));
    };

    // ============================================================
    // DOCUMENTS SECTION
    // ============================================================

    const updateDocuments = (field, value) => {
        setPublicationReportPage((prev) => ({
            ...prev,

            documents: {
                ...prev.documents,
                [field]: value,
            },
        }));
    };

    // ============================================================
    // UPDATE DOCUMENT
    // ============================================================

    const updateDocument = (
        index,
        field,
        value
    ) => {
        setPublicationReportPage((prev) => {
            const updatedDocuments = [
                ...prev.documents.items,
            ];

            updatedDocuments[index] = {
                ...updatedDocuments[index],
                [field]: value,
            };

            return {
                ...prev,

                documents: {
                    ...prev.documents,
                    items: updatedDocuments,
                },
            };
        });
    };

    // ============================================================
    // ADD DOCUMENT
    // ============================================================

    const addDocument = () => {
        const newDocument = {
            id: `document-${Date.now()}`,
            title: "",
            description: "",
            linkText: "Download Document",
            link: "",
        };

        setPublicationReportPage((prev) => ({
            ...prev,

            documents: {
                ...prev.documents,

                items: [
                    ...prev.documents.items,
                    newDocument,
                ],
            },
        }));
    };

    // ============================================================
    // REMOVE DOCUMENT
    // ============================================================

    const removeDocument = (index) => {
        if (
            publicationReportPage.documents.items.length <=
            1
        ) {
            alert(
                "You must have at least one document."
            );

            return;
        }

        setPublicationReportPage((prev) => ({
            ...prev,

            documents: {
                ...prev.documents,

                items: prev.documents.items.filter(
                    (_, i) => i !== index
                ),
            },
        }));
    };

    // ============================================================
    // SAVE
    // ============================================================

    const savePublicationReportPage = async () => {
        if (!publicationReportPage) return;

        setSaving(true);

        try {
            // MongoDB _id must not be updated
            const {
                _id,
                ...updateData
            } = publicationReportPage;

            console.log(
                "Saving Publications & Reports:",
                updateData
            );

            const response = await fetch(
                "/api/publicationReportpage",
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

            console.log(
                "Save response:",
                data
            );

            if (!response.ok) {
                throw new Error(
                    data.error ||
                    "Failed to save Publications & Reports page"
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
            <div className="flex min-h-[60vh] items-center justify-center">
                <p className="text-sm text-gray-500">
                    Loading Publications & Reports...
                </p>
            </div>
        );
    }

    if (!publicationReportPage) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <p className="text-sm text-red-500">
                    Failed to load page data.
                </p>
            </div>
        );
    }

    // ============================================================
    // UI
    // ============================================================

    return (
        <main className="min-h-screen w-full md:w-[80%]">
            

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
                            onClick={savePublicationReportPage}
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
                        <div className={cardHeaderWrapClass}>
                            <div>
                                <h2 className={cardTitleClass}>
                                    Hero Section
                                </h2>

                                <p className={cardSubtitleClass}>
                                    Manage the main heading, subtitle,
                                    and hero image.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-5">

                            {/* TITLE */}

                            <div>
                                <label className={labelClass}>
                                    Title
                                </label>

                                <input
                                    type="text"
                                    value={
                                        publicationReportPage.hero.title
                                    }
                                    onChange={(e) =>
                                        updateHero(
                                            "title",
                                            e.target.value
                                        )
                                    }
                                    maxLength={60}
                                    className={inputClass}
                                    placeholder="Publications & Reports"
                                />

                                <p
                                    className={counterClass(
                                        publicationReportPage.hero.title
                                            ?.length || 0,
                                        60
                                    )}
                                >
                                    {publicationReportPage.hero.title
                                        ?.length || 0}
                                    /60 characters
                                </p>
                            </div>

                            {/* SUBTITLE */}

                            <div>
                                <label className={labelClass}>
                                    Subtitle
                                </label>

                                <textarea
                                    value={
                                        publicationReportPage.hero
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
                                    className={textareaClass}
                                    placeholder="Supporting children. Creating opportunities..."
                                />

                                <p
                                    className={counterClass(
                                        publicationReportPage.hero
                                            .subtitle?.length || 0,
                                        150
                                    )}
                                >
                                    {publicationReportPage.hero
                                        .subtitle?.length || 0}
                                    /150 characters
                                </p>
                            </div>

                            {/* HERO IMAGE */}

                            <div>
                                <label className={labelClass}>
                                    Hero Image
                                </label>

                                <div className={fileWrapClass}>
                                    <label
                                        className={fileButtonClass}
                                    >
                                        Choose Image

                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={async (e) => {
                                                const file =
                                                    e.target.files?.[0];

                                                if (!file) return;

                                                try {
                                                    const formData =
                                                        new FormData();

                                                    formData.append(
                                                        "file",
                                                        file
                                                    );

                                                    const response =
                                                        await fetch(
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

                                                    updateHero(
                                                        "image",
                                                        data.url
                                                    );
                                                } catch (error) {
                                                    console.error(
                                                        "Upload error:",
                                                        error
                                                    );

                                                    alert(
                                                        error.message ||
                                                        "Failed to upload image."
                                                    );
                                                }

                                                e.target.value = "";
                                            }}
                                        />
                                    </label>

                                    <div
                                        className={
                                            filePreviewWrapClass
                                        }
                                    >
                                        {publicationReportPage.hero
                                            .image && (
                                                <img
                                                    src={
                                                        publicationReportPage.hero
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
                                            {publicationReportPage.hero
                                                .image ||
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

                    {/* ====================================================
              DOCUMENTS SECTION
          ==================================================== */}

                    <section className={cardClass}>
                        <div className={cardHeaderWrapClass}>
                            <div>
                                <h2 className={cardTitleClass}>
                                    Documents
                                </h2>

                                <p className={cardSubtitleClass}>
                                    Manage the downloadable publications,
                                    reports, audits, and other documents.
                                </p>
                            </div>
                        </div>

                        {/* DOCUMENT SECTION TITLE */}

                        <div className="mb-8">
                            <label className={labelClass}>
                                Section Title
                            </label>

                            <input
                                type="text"
                                value={
                                    publicationReportPage.documents
                                        .title
                                }
                                onChange={(e) =>
                                    updateDocuments(
                                        "title",
                                        e.target.value
                                    )
                                }
                                maxLength={60}
                                className={inputClass}
                                placeholder="Documents"
                            />

                            <p
                                className={counterClass(
                                    publicationReportPage.documents
                                        .title?.length || 0,
                                    60
                                )}
                            >
                                {publicationReportPage.documents
                                    .title?.length || 0}
                                /60 characters
                            </p>
                        </div>

                        {/* DOCUMENT ITEMS */}

                        <div className="space-y-5">
                            {publicationReportPage.documents.items.map(
                                (doc, index) => (
                                    <div
                                        key={doc.id}
                                        className={subCardClass}
                                    >

                                        {/* HEADER */}

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
                                                    Document {index + 1}
                                                </h3>

                                                <p
                                                    className={
                                                        subCardSubtitleClass
                                                    }
                                                >
                                                    Add information and
                                                    download link for this
                                                    document.
                                                </p>
                                            </div>

                                            <button
                                                type="button"
                                                className={
                                                    removeButtonClass
                                                }
                                                onClick={() =>
                                                    removeDocument(index)
                                                }
                                            >
                                                Remove
                                            </button>
                                        </div>

                                        <div className="space-y-5">

                                            {/* TITLE */}

                                            <div>
                                                <label
                                                    className={labelClass}
                                                >
                                                    Document Title
                                                </label>

                                                <input
                                                    type="text"
                                                    value={
                                                        doc.title
                                                    }
                                                    onChange={(e) =>
                                                        updateDocument(
                                                            index,
                                                            "title",
                                                            e.target.value
                                                        )
                                                    }
                                                    maxLength={100}
                                                    className={inputClass}
                                                    placeholder="Annual Report 2025"
                                                />

                                                <p
                                                    className={counterClass(
                                                        doc.title
                                                            ?.length || 0,
                                                        100
                                                    )}
                                                >
                                                    {doc.title
                                                        ?.length || 0}
                                                    /100 characters
                                                </p>
                                            </div>

                                            {/* DESCRIPTION */}

                                            <div>
                                                <label
                                                    className={labelClass}
                                                >
                                                    Description
                                                </label>

                                                <textarea
                                                    value={
                                                        doc.description
                                                    }
                                                    onChange={(e) =>
                                                        updateDocument(
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
                                                    placeholder="Briefly describe this document..."
                                                />

                                                <p
                                                    className={counterClass(
                                                        doc.description
                                                            ?.length || 0,
                                                        250
                                                    )}
                                                >
                                                    {doc.description
                                                        ?.length || 0}
                                                    /250 characters
                                                </p>
                                            </div>

                                            {/* LINK TEXT + LINK */}

                                            <div
                                                className={
                                                    fieldRowClass
                                                }
                                            >

                                                {/* LINK TEXT */}

                                                <div>
                                                    <label
                                                        className={labelClass}
                                                    >
                                                        Link Text
                                                    </label>

                                                    <input
                                                        type="text"
                                                        value={
                                                            doc.linkText
                                                        }
                                                        onChange={(e) =>
                                                            updateDocument(
                                                                index,
                                                                "linkText",
                                                                e.target.value
                                                            )
                                                        }
                                                        maxLength={40}
                                                        className={inputClass}
                                                        placeholder="Download Document"
                                                    />

                                                    <p
                                                        className={counterClass(
                                                            doc.linkText
                                                                ?.length || 0,
                                                            40
                                                        )}
                                                    >
                                                        {doc.linkText
                                                            ?.length || 0}
                                                        /40 characters
                                                    </p>
                                                </div>

                                                {/* LINK */}

                                                <div>
                                                    <label
                                                        className={labelClass}
                                                    >
                                                        Document URL
                                                    </label>

                                                    <input
                                                        type="url"
                                                        value={
                                                            doc.link
                                                        }
                                                        onChange={(e) =>
                                                            updateDocument(
                                                                index,
                                                                "link",
                                                                e.target.value
                                                            )
                                                        }
                                                        className={inputClass}
                                                        placeholder="https://example.com/report.pdf"
                                                    />

                                                    <span
                                                        className={
                                                            helperTextClass
                                                        }
                                                    >
                                                        Add the public URL of
                                                        the PDF or document.
                                                    </span>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                )
                            )}
                        </div>

                        {/* ADD DOCUMENT */}

                        <div className="mt-6 border-t border-gray-200 pt-6">
                            <button
                                type="button"
                                className={addButtonClass}
                                onClick={addDocument}
                            >
                                + Add Document
                            </button>
                        </div>
                    </section>

                    {/* ====================================================
              SAVE
          ==================================================== */}

                    <div className="flex justify-end pb-10">
                        <button
                            type="button"
                            onClick={
                                savePublicationReportPage
                            }
                            disabled={saving}
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