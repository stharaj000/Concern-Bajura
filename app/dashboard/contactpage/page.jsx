"use client";

import { useEffect, useState } from "react";

export default function ContactPageCMS() {
    const [contactPage, setContactPage] = useState({
        hero: {
            title: "",
            subtitle: "",
            image: "",
        },
        contact: {
            title: "",
            description: "",
            office: {
                label: "",
                name: "",
                address: [],
            },
            email: {
                label: "",
                value: "",
            },
            phone: {
                label: "",
                value: "",
            },
        },
        transferForm: {
            title: "",
            subtitle: "",
            fields: {
                fullName: { label: "", placeholder: "" },
                email: { label: "", placeholder: "" },
                phoneNumber: { label: "", placeholder: "" },
                message: { label: "", placeholder: "" },
            },
            buttonText: "",
        },
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // ============================================================
    // STYLES
    // ============================================================

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
        "h-9 w-9 shrink-0 rounded-lg object-cover";

    const filePreviewTextClass =
        "truncate text-sm text-gray-500";

    const addButtonClass =
        "inline-flex items-center gap-1.5 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2";

    const removeButtonClass =
        "rounded-lg px-3 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50";

    // ============================================================
    // FIELD LIMITS
    // ============================================================

    const fieldLimits = {
        heroTitle: 70,
        heroSubtitle: 200,

        contactTitle: 60,
        contactDescription: 300,

        officeLabel: 30,
        officeName: 80,
        addressLine: 100,

        emailLabel: 30,
        emailValue: 100,

        phoneLabel: 30,
        phoneValue: 30,

        transferTitle: 60,
        transferSubtitle: 250,
        buttonText: 25,

        formFieldLabel: 40,
        formFieldPlaceholder: 100,
    };

    // ============================================================
    // CHARACTER COUNTER
    // ============================================================

    const counterClass = (length, limit) =>
        `mt-1.5 text-xs ${
            length >= limit
                ? "text-red-500"
                : "text-gray-400"
        }`;

    // ============================================================
    // TRANSFER FORM FIELD KEYS
    // ============================================================

    const transferFormFieldKeys = [
        {
            key: "fullName",
            name: "Full Name Field",
        },
        {
            key: "email",
            name: "Email Field",
        },
        {
            key: "phoneNumber",
            name: "Phone Number Field",
        },
        {
            key: "message",
            name: "Message Field",
        },
    ];

    // ============================================================
    // GET DATA
    // ============================================================

    useEffect(() => {
        const fetchContactPage = async () => {
            try {
                const response = await fetch(
                    "/api/contactPage"
                );

                if (!response.ok) {
                    throw new Error(
                        "Failed to fetch Contact page"
                    );
                }

                const data = await response.json();

                setContactPage(data);
            } catch (error) {
                console.error("Fetch error:", error);

                alert(
                    "Failed to load Contact page."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchContactPage();
    }, []);

    // ============================================================
    // UPDATE HERO
    // ============================================================

    const updateHero = (field, value) => {
        setContactPage((prev) => ({
            ...prev,
            hero: {
                ...prev.hero,
                [field]: value,
            },
        }));
    };

    // ============================================================
    // HERO IMAGE UPLOAD
    // ============================================================

    const uploadHeroImage = async (e) => {
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

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error || "Upload failed"
                );
            }

            updateHero(
                "image",
                data.url
            );
        } catch (error) {
            console.error(
                "Hero image upload failed:",
                error
            );

            alert(
                error.message ||
                "Failed to upload image."
            );
        }

        e.target.value = "";
    };

    // ============================================================
    // UPDATE CONTACT
    // ============================================================

    const updateContact = (field, value) => {
        setContactPage((prev) => ({
            ...prev,
            contact: {
                ...prev.contact,
                [field]: value,
            },
        }));
    };

    // ============================================================
    // UPDATE OFFICE
    // ============================================================

    const updateOffice = (field, value) => {
        setContactPage((prev) => ({
            ...prev,
            contact: {
                ...prev.contact,
                office: {
                    ...prev.contact.office,
                    [field]: value,
                },
            },
        }));
    };

    // ============================================================
    // UPDATE OFFICE ADDRESS LINE
    // ============================================================

    const updateOfficeAddressLine = (
        lineIndex,
        value
    ) => {
        setContactPage((prev) => {
            const updatedAddress = [
                ...prev.contact.office.address,
            ];

            updatedAddress[lineIndex] = value;

            return {
                ...prev,
                contact: {
                    ...prev.contact,
                    office: {
                        ...prev.contact.office,
                        address: updatedAddress,
                    },
                },
            };
        });
    };

    // ============================================================
    // ADD OFFICE ADDRESS LINE
    // ============================================================

    const addOfficeAddressLine = () => {
        setContactPage((prev) => ({
            ...prev,
            contact: {
                ...prev.contact,
                office: {
                    ...prev.contact.office,
                    address: [
                        ...prev.contact.office.address,
                        "",
                    ],
                },
            },
        }));
    };

    // ============================================================
    // REMOVE OFFICE ADDRESS LINE
    // ============================================================

    const removeOfficeAddressLine = (
        lineIndex
    ) => {
        setContactPage((prev) => ({
            ...prev,
            contact: {
                ...prev.contact,
                office: {
                    ...prev.contact.office,
                    address:
                        prev.contact.office.address.filter(
                            (_, i) =>
                                i !== lineIndex
                        ),
                },
            },
        }));
    };

    // ============================================================
    // UPDATE EMAIL
    // ============================================================

    const updateEmail = (
        field,
        value
    ) => {
        setContactPage((prev) => ({
            ...prev,
            contact: {
                ...prev.contact,
                email: {
                    ...prev.contact.email,
                    [field]: value,
                },
            },
        }));
    };

    // ============================================================
    // UPDATE PHONE
    // ============================================================

    const updatePhone = (
        field,
        value
    ) => {
        setContactPage((prev) => ({
            ...prev,
            contact: {
                ...prev.contact,
                phone: {
                    ...prev.contact.phone,
                    [field]: value,
                },
            },
        }));
    };

    // ============================================================
    // UPDATE TRANSFER FORM
    // ============================================================

    const updateTransferForm = (
        field,
        value
    ) => {
        setContactPage((prev) => ({
            ...prev,
            transferForm: {
                ...prev.transferForm,
                [field]: value,
            },
        }));
    };

    // ============================================================
    // UPDATE TRANSFER FORM FIELD
    // ============================================================

    const updateTransferFormField = (
        fieldKey,
        subField,
        value
    ) => {
        setContactPage((prev) => ({
            ...prev,
            transferForm: {
                ...prev.transferForm,
                fields: {
                    ...prev.transferForm.fields,
                    [fieldKey]: {
                        ...prev.transferForm
                            .fields[fieldKey],
                        [subField]: value,
                    },
                },
            },
        }));
    };

    // ============================================================
    // SAVE
    // ============================================================

    const saveContactPage = async () => {
        if (!contactPage) return;

        setSaving(true);

        try {
            // MongoDB _id is immutable and must not be updated
            const {
                _id,
                ...updateData
            } = contactPage;

            console.log(
                "Saving Contact page:",
                updateData
            );

            const response = await fetch(
                "/api/contactPage",
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
                    "Failed to save Contact page"
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

            alert(
                error.message ||
                "Failed to save Contact page."
            );
        } finally {
            setSaving(false);
        }
    };

    // ============================================================
    // LOADING
    // ============================================================

    if (loading) {
        return (
            <div className="flex min-h-[400px] w-full items-center justify-center">
                <p className="text-sm text-gray-500">
                    Loading Contact page...
                </p>
            </div>
        );
    }

    // ============================================================
    // FAILED TO LOAD
    // ============================================================

    if (!contactPage) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
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

                {/* ==================================================
                    HEADER
                ================================================== */}

                <div className="fixed z-10 w-full border-b border-gray-200 bg-white pr-8 md:w-[82%]">

                    <div className="mx-auto ml-18 flex max-w-[1600px] flex-col gap-4 px-4 py-5 sm:flex-row sm:px-6 md:ml-10 md:justify-between lg:ml-0 lg:items-center lg:px-8">

                        <div>

                            <h1 className="text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
                                Contact Page
                            </h1>

                            <p className="mt-1 text-sm text-gray-500">
                                Manage and update your Contact Page content.
                            </p>

                        </div>

                        <button
                            onClick={
                                saveContactPage
                            }
                            disabled={saving}
                            className="w-full rounded-xl bg-sky-500 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                        >
                            {saving
                                ? "Saving..."
                                : "Save Changes"}
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

                            {/* HERO TITLE */}

                            <div>

                                <label className={labelClass}>
                                    Hero Title
                                </label>

                                <input
                                    type="text"
                                    value={
                                        contactPage.hero.title
                                    }
                                    onChange={(e) =>
                                        updateHero(
                                            "title",
                                            e.target.value
                                        )
                                    }
                                    maxLength={
                                        fieldLimits.heroTitle
                                    }
                                    placeholder="Contact Us"
                                    className={inputClass}
                                />

                                <p
                                    className={counterClass(
                                        contactPage.hero.title?.length || 0,
                                        fieldLimits.heroTitle
                                    )}
                                >
                                    {contactPage.hero.title?.length || 0}/
                                    {fieldLimits.heroTitle} characters
                                </p>

                            </div>

                            {/* HERO SUBTITLE */}

                            <div>

                                <label className={labelClass}>
                                    Hero Subtitle
                                </label>

                                <textarea
                                    rows={3}
                                    value={
                                        contactPage.hero.subtitle
                                    }
                                    onChange={(e) =>
                                        updateHero(
                                            "subtitle",
                                            e.target.value
                                        )
                                    }
                                    maxLength={
                                        fieldLimits.heroSubtitle
                                    }
                                    placeholder="We'd love to hear from you. Get in touch with Concern Bajura."
                                    className={textareaClass}
                                />

                                <p
                                    className={counterClass(
                                        contactPage.hero.subtitle?.length || 0,
                                        fieldLimits.heroSubtitle
                                    )}
                                >
                                    {contactPage.hero.subtitle?.length || 0}/
                                    {fieldLimits.heroSubtitle} characters
                                </p>

                            </div>

                            {/* HERO IMAGE */}

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
                                            onChange={
                                                uploadHeroImage
                                            }
                                        />

                                    </label>

                                    <div className={filePreviewWrapClass}>

                                        {contactPage.hero.image ? (
                                            <>
                                                <img
                                                    src={
                                                        contactPage.hero.image
                                                    }
                                                    alt="Hero preview"
                                                    className={
                                                        filePreviewImgClass
                                                    }
                                                />

                                                <span
                                                    className={
                                                        filePreviewTextClass
                                                    }
                                                >
                                                    {
                                                        contactPage.hero.image
                                                    }
                                                </span>
                                            </>
                                        ) : (
                                            <span className="text-sm text-gray-400">
                                                No image selected
                                            </span>
                                        )}

                                    </div>

                                </div>

                            </div>

                        </div>

                    </section>

                    {/* ==================================================
                        GET IN TOUCH SECTION
                    ================================================== */}

                    <section className={cardClass}>

                        <div className={cardHeaderWrapClass}>

                            <div>

                                <h2 className={cardTitleClass}>
                                    Get in Touch
                                </h2>

                                <p className={cardSubtitleClass}>
                                    Manage the contact details shown on the page.
                                </p>

                            </div>

                        </div>

                        <div className="space-y-6">

                            {/* TITLE + DESCRIPTION */}

                            <div className="space-y-5">

                                {/* CONTACT TITLE */}

                                <div>

                                    <label className={labelClass}>
                                        Title
                                    </label>

                                    <input
                                        type="text"
                                        value={
                                            contactPage.contact.title
                                        }
                                        onChange={(e) =>
                                            updateContact(
                                                "title",
                                                e.target.value
                                            )
                                        }
                                        maxLength={
                                            fieldLimits.contactTitle
                                        }
                                        placeholder="Get in Touch"
                                        className={inputClass}
                                    />

                                    <p
                                        className={counterClass(
                                            contactPage.contact.title?.length || 0,
                                            fieldLimits.contactTitle
                                        )}
                                    >
                                        {contactPage.contact.title?.length || 0}/
                                        {fieldLimits.contactTitle} characters
                                    </p>

                                </div>

                                {/* CONTACT DESCRIPTION */}

                                <div>

                                    <label className={labelClass}>
                                        Description
                                    </label>

                                    <textarea
                                        rows={3}
                                        value={
                                            contactPage.contact.description
                                        }
                                        onChange={(e) =>
                                            updateContact(
                                                "description",
                                                e.target.value
                                            )
                                        }
                                        maxLength={
                                            fieldLimits.contactDescription
                                        }
                                        placeholder="Whether you have a question about our programs, want to partner with us..."
                                        className={textareaClass}
                                    />

                                    <p
                                        className={counterClass(
                                            contactPage.contact.description?.length || 0,
                                            fieldLimits.contactDescription
                                        )}
                                    >
                                        {contactPage.contact.description?.length || 0}/
                                        {fieldLimits.contactDescription} characters
                                    </p>

                                </div>

                            </div>

                            {/* ==================================================
                                OFFICE
                            ================================================== */}

                            <div className={subCardClass}>

                                <div className={subCardHeaderClass}>

                                    <div>

                                        <h3 className={subCardTitleClass}>
                                            Office Location
                                        </h3>

                                        <p className={subCardSubtitleClass}>
                                            Manage the office details shown to visitors.
                                        </p>

                                    </div>

                                </div>

                                <div className="space-y-6">

                                    {/* OFFICE LABEL + NAME */}

                                    <div className={fieldRowClass}>

                                        <div>

                                            <label className={labelClass}>
                                                Label
                                            </label>

                                            <input
                                                type="text"
                                                value={
                                                    contactPage.contact.office.label
                                                }
                                                onChange={(e) =>
                                                    updateOffice(
                                                        "label",
                                                        e.target.value
                                                    )
                                                }
                                                maxLength={
                                                    fieldLimits.officeLabel
                                                }
                                                placeholder="Office Location"
                                                className={inputClass}
                                            />

                                            <p
                                                className={counterClass(
                                                    contactPage.contact.office.label?.length || 0,
                                                    fieldLimits.officeLabel
                                                )}
                                            >
                                                {contactPage.contact.office.label?.length || 0}/
                                                {fieldLimits.officeLabel} characters
                                            </p>

                                        </div>

                                        <div>

                                            <label className={labelClass}>
                                                Office Name
                                            </label>

                                            <input
                                                type="text"
                                                value={
                                                    contactPage.contact.office.name
                                                }
                                                onChange={(e) =>
                                                    updateOffice(
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                                maxLength={
                                                    fieldLimits.officeName
                                                }
                                                placeholder="Concern Bajura Head Office"
                                                className={inputClass}
                                            />

                                            <p
                                                className={counterClass(
                                                    contactPage.contact.office.name?.length || 0,
                                                    fieldLimits.officeName
                                                )}
                                            >
                                                {contactPage.contact.office.name?.length || 0}/
                                                {fieldLimits.officeName} characters
                                            </p>

                                        </div>

                                    </div>

                                    {/* ADDRESS */}

                                    <div>

                                        <div className="mb-4 flex items-center justify-between">

                                            <div>

                                                <label className="block text-sm font-medium text-gray-700">
                                                    Address
                                                </label>

                                                <p className="mt-1 text-xs text-gray-500">
                                                    Add the address line by line, in the order they should appear.
                                                </p>

                                            </div>

                                            <button
                                                type="button"
                                                className={addButtonClass}
                                                onClick={
                                                    addOfficeAddressLine
                                                }
                                            >
                                                + Add Line
                                            </button>

                                        </div>

                                        <div className="space-y-3">

                                            {contactPage.contact.office.address.map(
                                                (
                                                    line,
                                                    lineIndex
                                                ) => (

                                                    <div
                                                        key={
                                                            lineIndex
                                                        }
                                                        className="flex items-start gap-3"
                                                    >

                                                        <div className="flex-1">

                                                            <input
                                                                type="text"
                                                                value={
                                                                    line
                                                                }
                                                                onChange={(e) =>
                                                                    updateOfficeAddressLine(
                                                                        lineIndex,
                                                                        e.target.value
                                                                    )
                                                                }
                                                                maxLength={
                                                                    fieldLimits.addressLine
                                                                }
                                                                placeholder="Budhiganga Municipality, Bajura"
                                                                className={
                                                                    inputClass
                                                                }
                                                            />

                                                            <p
                                                                className={counterClass(
                                                                    line?.length || 0,
                                                                    fieldLimits.addressLine
                                                                )}
                                                            >
                                                                {line?.length || 0}/
                                                                {fieldLimits.addressLine} characters
                                                            </p>

                                                        </div>

                                                        <button
                                                            type="button"
                                                            className={
                                                                removeButtonClass
                                                            }
                                                            onClick={() =>
                                                                removeOfficeAddressLine(
                                                                    lineIndex
                                                                )
                                                            }
                                                        >
                                                            Remove
                                                        </button>

                                                    </div>

                                                )
                                            )}

                                        </div>

                                    </div>

                                </div>

                            </div>

                            {/* ==================================================
                                EMAIL
                            ================================================== */}

                            <div className={subCardClass}>

                                <div className={subCardHeaderClass}>

                                    <div>

                                        <h3 className={subCardTitleClass}>
                                            Email
                                        </h3>

                                        <p className={subCardSubtitleClass}>
                                            Manage the email address shown to visitors.
                                        </p>

                                    </div>

                                </div>

                                <div className={fieldRowClass}>

                                    {/* EMAIL LABEL */}

                                    <div>

                                        <label className={labelClass}>
                                            Label
                                        </label>

                                        <input
                                            type="text"
                                            value={
                                                contactPage.contact.email.label
                                            }
                                            onChange={(e) =>
                                                updateEmail(
                                                    "label",
                                                    e.target.value
                                                )
                                            }
                                            maxLength={
                                                fieldLimits.emailLabel
                                            }
                                            placeholder="Email Address"
                                            className={inputClass}
                                        />

                                        <p
                                            className={counterClass(
                                                contactPage.contact.email.label?.length || 0,
                                                fieldLimits.emailLabel
                                            )}
                                        >
                                            {contactPage.contact.email.label?.length || 0}/
                                            {fieldLimits.emailLabel} characters
                                        </p>

                                    </div>

                                    {/* EMAIL VALUE */}

                                    <div>

                                        <label className={labelClass}>
                                            Email Address
                                        </label>

                                        <input
                                            type="email"
                                            value={
                                                contactPage.contact.email.value
                                            }
                                            onChange={(e) =>
                                                updateEmail(
                                                    "value",
                                                    e.target.value
                                                )
                                            }
                                            maxLength={
                                                fieldLimits.emailValue
                                            }
                                            placeholder="info@concernbajura.org.np"
                                            className={inputClass}
                                        />

                                        <p
                                            className={counterClass(
                                                contactPage.contact.email.value?.length || 0,
                                                fieldLimits.emailValue
                                            )}
                                        >
                                            {contactPage.contact.email.value?.length || 0}/
                                            {fieldLimits.emailValue} characters
                                        </p>

                                    </div>

                                </div>

                            </div>

                            {/* ==================================================
                                PHONE
                            ================================================== */}

                            <div className={subCardClass}>

                                <div className={subCardHeaderClass}>

                                    <div>

                                        <h3 className={subCardTitleClass}>
                                            Phone
                                        </h3>

                                        <p className={subCardSubtitleClass}>
                                            Manage the phone number shown to visitors.
                                        </p>

                                    </div>

                                </div>

                                <div className={fieldRowClass}>

                                    {/* PHONE LABEL */}

                                    <div>

                                        <label className={labelClass}>
                                            Label
                                        </label>

                                        <input
                                            type="text"
                                            value={
                                                contactPage.contact.phone.label
                                            }
                                            onChange={(e) =>
                                                updatePhone(
                                                    "label",
                                                    e.target.value
                                                )
                                            }
                                            maxLength={
                                                fieldLimits.phoneLabel
                                            }
                                            placeholder="Phone Number"
                                            className={inputClass}
                                        />

                                        <p
                                            className={counterClass(
                                                contactPage.contact.phone.label?.length || 0,
                                                fieldLimits.phoneLabel
                                            )}
                                        >
                                            {contactPage.contact.phone.label?.length || 0}/
                                            {fieldLimits.phoneLabel} characters
                                        </p>

                                    </div>

                                    {/* PHONE VALUE */}

                                    <div>

                                        <label className={labelClass}>
                                            Phone Number
                                        </label>

                                        <input
                                            type="text"
                                            value={
                                                contactPage.contact.phone.value
                                            }
                                            onChange={(e) =>
                                                updatePhone(
                                                    "value",
                                                    e.target.value
                                                )
                                            }
                                            maxLength={
                                                fieldLimits.phoneValue
                                            }
                                            placeholder="+977-98-XXXXXXX"
                                            className={inputClass}
                                        />

                                        <p
                                            className={counterClass(
                                                contactPage.contact.phone.value?.length || 0,
                                                fieldLimits.phoneValue
                                            )}
                                        >
                                            {contactPage.contact.phone.value?.length || 0}/
                                            {fieldLimits.phoneValue} characters
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </section>

                    {/* ==================================================
                        TRANSFER NOTIFICATION FORM
                    ================================================== */}

                    <section className={cardClass}>

                        <div className={cardHeaderWrapClass}>

                            <div>

                                <h2 className={cardTitleClass}>
                                    Transfer Notification Form
                                </h2>

                                <p className={cardSubtitleClass}>
                                    Manage the labels, placeholders, and button text for the donation transfer form.
                                </p>

                            </div>

                        </div>

                        <div className="space-y-6">

                            {/* TITLE + SUBTITLE + BUTTON */}

                            <div className="space-y-5">

                                {/* FORM TITLE */}

                                <div>

                                    <label className={labelClass}>
                                        Form Title
                                    </label>

                                    <input
                                        type="text"
                                        value={
                                            contactPage.transferForm.title
                                        }
                                        onChange={(e) =>
                                            updateTransferForm(
                                                "title",
                                                e.target.value
                                            )
                                        }
                                        maxLength={
                                            fieldLimits.transferTitle
                                        }
                                        placeholder="Notify Us of Your Transfer"
                                        className={inputClass}
                                    />

                                    <p
                                        className={counterClass(
                                            contactPage.transferForm.title?.length || 0,
                                            fieldLimits.transferTitle
                                        )}
                                    >
                                        {contactPage.transferForm.title?.length || 0}/
                                        {fieldLimits.transferTitle} characters
                                    </p>

                                </div>

                                {/* FORM SUBTITLE */}

                                <div>

                                    <label className={labelClass}>
                                        Form Subtitle
                                    </label>

                                    <textarea
                                        rows={3}
                                        value={
                                            contactPage.transferForm.subtitle
                                        }
                                        onChange={(e) =>
                                            updateTransferForm(
                                                "subtitle",
                                                e.target.value
                                            )
                                        }
                                        maxLength={
                                            fieldLimits.transferSubtitle
                                        }
                                        placeholder="Please provide your details so we can acknowledge your contribution..."
                                        className={textareaClass}
                                    />

                                    <p
                                        className={counterClass(
                                            contactPage.transferForm.subtitle?.length || 0,
                                            fieldLimits.transferSubtitle
                                        )}
                                    >
                                        {contactPage.transferForm.subtitle?.length || 0}/
                                        {fieldLimits.transferSubtitle} characters
                                    </p>

                                </div>

                                {/* BUTTON TEXT */}

                                <div>

                                    <label className={labelClass}>
                                        Button Text
                                    </label>

                                    <input
                                        type="text"
                                        value={
                                            contactPage.transferForm.buttonText
                                        }
                                        onChange={(e) =>
                                            updateTransferForm(
                                                "buttonText",
                                                e.target.value
                                            )
                                        }
                                        maxLength={
                                            fieldLimits.buttonText
                                        }
                                        placeholder="Send Message"
                                        className={inputClass}
                                    />

                                    <p
                                        className={counterClass(
                                            contactPage.transferForm.buttonText?.length || 0,
                                            fieldLimits.buttonText
                                        )}
                                    >
                                        {contactPage.transferForm.buttonText?.length || 0}/
                                        {fieldLimits.buttonText} characters
                                    </p>

                                </div>

                            </div>

                            {/* ==================================================
                                FORM FIELDS
                            ================================================== */}

                            <div className="space-y-4">

                                {transferFormFieldKeys.map(
                                    ({
                                        key,
                                        name,
                                    }) => (

                                        <div
                                            key={key}
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
                                                        {name}
                                                    </h3>

                                                    <p
                                                        className={
                                                            subCardSubtitleClass
                                                        }
                                                    >
                                                        Manage the label and placeholder text for this field.
                                                    </p>

                                                </div>

                                            </div>

                                            <div className={fieldRowClass}>

                                                {/* LABEL */}

                                                <div>

                                                    <label
                                                        className={
                                                            labelClass
                                                        }
                                                    >
                                                        Label
                                                    </label>

                                                    <input
                                                        type="text"
                                                        value={
                                                            contactPage
                                                                .transferForm
                                                                .fields[
                                                                    key
                                                                ]
                                                                .label
                                                        }
                                                        onChange={(e) =>
                                                            updateTransferFormField(
                                                                key,
                                                                "label",
                                                                e.target.value
                                                            )
                                                        }
                                                        maxLength={
                                                            fieldLimits.formFieldLabel
                                                        }
                                                        placeholder="Field label"
                                                        className={
                                                            inputClass
                                                        }
                                                    />

                                                    <p
                                                        className={counterClass(
                                                            contactPage.transferForm.fields[
                                                                key
                                                            ].label?.length ||
                                                                0,
                                                            fieldLimits.formFieldLabel
                                                        )}
                                                    >
                                                        {contactPage.transferForm.fields[
                                                            key
                                                        ].label?.length ||
                                                            0}
                                                        /
                                                        {
                                                            fieldLimits.formFieldLabel
                                                        }{" "}
                                                        characters
                                                    </p>

                                                </div>

                                                {/* PLACEHOLDER */}

                                                <div>

                                                    <label
                                                        className={
                                                            labelClass
                                                        }
                                                    >
                                                        Placeholder
                                                    </label>

                                                    <input
                                                        type="text"
                                                        value={
                                                            contactPage
                                                                .transferForm
                                                                .fields[
                                                                    key
                                                                ]
                                                                .placeholder
                                                        }
                                                        onChange={(e) =>
                                                            updateTransferFormField(
                                                                key,
                                                                "placeholder",
                                                                e.target.value
                                                            )
                                                        }
                                                        maxLength={
                                                            fieldLimits.formFieldPlaceholder
                                                        }
                                                        placeholder="Field placeholder"
                                                        className={
                                                            inputClass
                                                        }
                                                    />

                                                    <p
                                                        className={counterClass(
                                                            contactPage.transferForm.fields[
                                                                key
                                                            ].placeholder?.length ||
                                                                0,
                                                            fieldLimits.formFieldPlaceholder
                                                        )}
                                                    >
                                                        {contactPage.transferForm.fields[
                                                            key
                                                        ].placeholder?.length ||
                                                            0}
                                                        /
                                                        {
                                                            fieldLimits.formFieldPlaceholder
                                                        }{" "}
                                                        characters
                                                    </p>

                                                </div>

                                            </div>

                                        </div>

                                    )
                                )}

                            </div>

                        </div>

                    </section>

                    {/* ==================================================
                        SAVE BUTTON
                    ================================================== */}

                    <div className="flex justify-end">

                        <button
                            type="button"
                            onClick={
                                saveContactPage
                            }
                            disabled={saving}
                            className="rounded-xl bg-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-60"
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