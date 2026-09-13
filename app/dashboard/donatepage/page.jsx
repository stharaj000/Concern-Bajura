"use client";

import { useEffect, useState } from "react";

export default function DonatePageCMS() {
    const [donatePage, setDonatePage] = useState({
        hero: {
            title: "",
            subtitle: "",
            image: "",
        },
        directBankTransfer: {
            title: "",
            subtitle: "",
            accounts: [],
            notice: "",
        },
        transferForm: {
            title: "",
            subtitle: "",
            fields: {
                fullName: { label: "", placeholder: "" },
                email: { label: "", placeholder: "" },
                donationAmount: { label: "", placeholder: "" },
                phoneNumber: { label: "", placeholder: "" },
                remarks: { label: "", placeholder: "" },
            },
        },
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    
    
    

    const fieldLimits = {
        
        heroTitle: 70,
        heroDescription: 200,

        
        sectionHeading: 50,
        sectionDescription: 300,
        bankOptionText: 20,
        bankName: 80,
        swiftCode: 20,
        accountHolderName: 80,
        accountNumber: 40,
        bankNotice: 300,

        
        formTitle: 60,
        formSubtitle: 200,
        fieldLabel: 40,
        fieldPlaceholder: 80,
    };

    const counterClass = (length, limit) =>
        `mt-1.5 text-xs ${length >= limit ? "text-red-500" : "text-gray-400"
        }`;

    
    
    

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

    const addButtonClass =
        "inline-flex items-center gap-1.5 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2";

    const removeButtonClass =
        "rounded-lg px-3 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50";

    
    
    

    const transferFormFieldKeys = [
        { key: "fullName", name: "Full Name Field" },
        { key: "email", name: "Email Field" },
        { key: "donationAmount", name: "Donation Amount Field" },
        { key: "phoneNumber", name: "Phone Number Field" },
        { key: "remarks", name: "Remarks Field" },
    ];

    
    
    

    useEffect(() => {
        const fetchDonatePage = async () => {
            try {
                const response = await fetch("/api/donatePage");

                if (!response.ok) {
                    throw new Error("Failed to fetch Donate page");
                }

                const data = await response.json();

                setDonatePage(data);
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDonatePage();
    }, []);

    
    
    

    const updateHero = (field, value) => {
        setDonatePage((prev) => ({
            ...prev,
            hero: {
                ...prev.hero,
                [field]: value,
            },
        }));
    };

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

    
    
    

    const updateBankTransfer = (field, value) => {
        setDonatePage((prev) => ({
            ...prev,
            directBankTransfer: {
                ...prev.directBankTransfer,
                [field]: value,
            },
        }));
    };

    const updateBankAccount = (index, field, value) => {
        setDonatePage((prev) => {
            const updatedAccounts = [
                ...prev.directBankTransfer.accounts,
            ];

            updatedAccounts[index] = {
                ...updatedAccounts[index],
                [field]: value,
            };

            return {
                ...prev,
                directBankTransfer: {
                    ...prev.directBankTransfer,
                    accounts: updatedAccounts,
                },
            };
        });
    };

    const addBankAccount = () => {
        const newAccount = {
            option: "",
            bank: "",
            swift: "",
            name: "",
            account: "",
        };

        setDonatePage((prev) => ({
            ...prev,
            directBankTransfer: {
                ...prev.directBankTransfer,
                accounts: [
                    ...prev.directBankTransfer.accounts,
                    newAccount,
                ],
            },
        }));
    };

    const removeBankAccount = (index) => {
        const confirmed = window.confirm(
            "Are you sure you want to remove this account?"
        );

        if (!confirmed) return;

        setDonatePage((prev) => ({
            ...prev,
            directBankTransfer: {
                ...prev.directBankTransfer,
                accounts:
                    prev.directBankTransfer.accounts.filter(
                        (_, i) => i !== index
                    ),
            },
        }));
    };

    
    
    

    const updateTransferForm = (field, value) => {
        setDonatePage((prev) => ({
            ...prev,
            transferForm: {
                ...prev.transferForm,
                [field]: value,
            },
        }));
    };

    const updateTransferFormField = (
        fieldKey,
        subField,
        value
    ) => {
        setDonatePage((prev) => ({
            ...prev,
            transferForm: {
                ...prev.transferForm,
                fields: {
                    ...prev.transferForm.fields,
                    [fieldKey]: {
                        ...prev.transferForm.fields[fieldKey],
                        [subField]: value,
                    },
                },
            },
        }));
    };

  

    
    
    

    const saveDonatePage = async () => {
        setSaving(true);

        try {
            console.log("Saving Donate page:", donatePage);

            const response = await fetch("/api/donatePage", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(donatePage),
            });

            const data = await response.json();

            console.log("Response status:", response.status);
            console.log("Save response:", data);

            if (!response.ok) {
                throw new Error(
                    data.error || "Failed to save Donate page"
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
            <div className="flex min-h-[400px] w-full items-center justify-center">
                <p className="text-sm text-gray-500">
                    Loading Donate page...
                </p>
            </div>
        );
    }

    
    
    

    return (
        <main className="min-h-screen w-full md:w-[80%]">
            <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6">

                {/* =====================================================
                    FIXED HEADER
                ====================================================== */}

                <div className="fixed z-10 w-full border-b border-gray-200 bg-white pr-8 md:w-[82%]">
                    <div className="mx-auto ml-18 flex max-w-[1600px] flex-col gap-4 px-4 py-5 sm:flex-row sm:px-6 md:ml-10 md:justify-between lg:ml-0 lg:items-center lg:px-8">

                        <div>
                            <h1 className="text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
                                Donate Page
                            </h1>

                            <p className="mt-1 text-sm text-gray-500">
                                Manage and update your Donate Page content.
                            </p>
                        </div>

                        <button
                            onClick={saveDonatePage}
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

                    {/* =================================================
                        HERO SECTION
                    ================================================== */}

                    <section className={cardClass}>

                        <div className={cardHeaderWrapClass}>
                            <div>
                                <h2 className={cardTitleClass}>
                                    Hero Section
                                </h2>

                                <p className={cardSubtitleClass}>
                                    Manage the main heading, subtitle and
                                    hero image.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-6">

                            {/* Hero Title */}

                            <div>
                                <label className={labelClass}>
                                    Hero Title
                                </label>

                                <input
                                    type="text"
                                    value={donatePage.hero.title}
                                    maxLength={
                                        fieldLimits.heroTitle
                                    }
                                    onChange={(e) =>
                                        updateHero(
                                            "title",
                                            e.target.value
                                        )
                                    }
                                    className={inputClass}
                                    placeholder="Enter hero title"
                                />

                                <p
                                    className={counterClass(
                                        donatePage.hero.title.length,
                                        fieldLimits.heroTitle
                                    )}
                                >
                                    {donatePage.hero.title.length}/
                                    {fieldLimits.heroTitle}
                                </p>
                            </div>

                            {/* Hero Subtitle */}

                            <div>
                                <label className={labelClass}>
                                    Hero Subtitle
                                </label>

                                <textarea
                                    value={donatePage.hero.subtitle}
                                    maxLength={
                                        fieldLimits.heroDescription
                                    }
                                    onChange={(e) =>
                                        updateHero(
                                            "subtitle",
                                            e.target.value
                                        )
                                    }
                                    className={`${textareaClass} min-h-[120px]`}
                                    placeholder="Enter hero subtitle"
                                />

                                <p
                                    className={counterClass(
                                        donatePage.hero.subtitle.length,
                                        fieldLimits.heroDescription
                                    )}
                                >
                                    {donatePage.hero.subtitle.length}/
                                    {fieldLimits.heroDescription}
                                </p>
                            </div>

                            {/* Hero Image */}

                            <div>
                                <label className={labelClass}>
                                    Hero Image
                                </label>

                                <div className={fileWrapClass}>

                                    <label
                                        className={
                                            fileButtonClass
                                        }
                                    >
                                        Choose Image

                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={
                                                uploadHeroImage
                                            }
                                            className="hidden"
                                        />
                                    </label>

                                    {donatePage.hero.image ? (
                                        <div
                                            className={
                                                filePreviewWrapClass
                                            }
                                        >
                                            <img
                                                src={
                                                    donatePage.hero
                                                        .image
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
                                                Image uploaded
                                            </span>
                                        </div>
                                    ) : (
                                        <div
                                            className={
                                                filePreviewWrapClass
                                            }
                                        >
                                            <span
                                                className={
                                                    filePreviewTextClass
                                                }
                                            >
                                                No image selected
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* =================================================
                        DIRECT BANK TRANSFER
                    ================================================== */}

                    <section className={cardClass}>

                        <div className={cardHeaderWrapClass}>
                            <div>
                                <h2 className={cardTitleClass}>
                                    Direct Bank Transfer
                                </h2>

                                <p className={cardSubtitleClass}>
                                    Manage bank transfer information
                                    displayed to donors.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={addBankAccount}
                                className={addButtonClass}
                            >
                                + Add Bank Account
                            </button>
                        </div>

                        <div className="space-y-6">

                            {/* Section Title */}

                            <div>
                                <label className={labelClass}>
                                    Section Title
                                </label>

                                <input
                                    type="text"
                                    value={
                                        donatePage
                                            .directBankTransfer
                                            .title
                                    }
                                    maxLength={
                                        fieldLimits.sectionHeading
                                    }
                                    onChange={(e) =>
                                        updateBankTransfer(
                                            "title",
                                            e.target.value
                                        )
                                    }
                                    className={inputClass}
                                    placeholder="Direct Bank Transfer"
                                />

                                <p
                                    className={counterClass(
                                        donatePage.directBankTransfer
                                            .title.length,
                                        fieldLimits.sectionHeading
                                    )}
                                >
                                    {
                                        donatePage
                                            .directBankTransfer
                                            .title.length
                                    }
                                    /
                                    {
                                        fieldLimits.sectionHeading
                                    }
                                </p>
                            </div>

                            {/* Section Subtitle */}

                            <div>
                                <label className={labelClass}>
                                    Section Subtitle
                                </label>

                                <textarea
                                    value={
                                        donatePage
                                            .directBankTransfer
                                            .subtitle
                                    }
                                    maxLength={
                                        fieldLimits.sectionDescription
                                    }
                                    onChange={(e) =>
                                        updateBankTransfer(
                                            "subtitle",
                                            e.target.value
                                        )
                                    }
                                    className={`${textareaClass} min-h-[100px]`}
                                    placeholder="Enter bank transfer description"
                                />

                                <p
                                    className={counterClass(
                                        donatePage.directBankTransfer
                                            .subtitle.length,
                                        fieldLimits.sectionDescription
                                    )}
                                >
                                    {
                                        donatePage
                                            .directBankTransfer
                                            .subtitle.length
                                    }
                                    /
                                    {
                                        fieldLimits.sectionDescription
                                    }
                                </p>
                            </div>

                            {/* Bank Accounts */}

                            <div className="space-y-5">

                                {donatePage.directBankTransfer.accounts
                                    .length === 0 ? (
                                    <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-5 py-8 text-center">
                                        <p className="text-sm text-gray-500">
                                            No bank accounts added
                                            yet.
                                        </p>
                                    </div>
                                ) : (
                                    donatePage.directBankTransfer.accounts.map(
                                        (account, index) => (
                                            <div
                                                key={
                                                    account.id ||
                                                    `account-${index}`
                                                }
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
                                                            Bank Account{" "}
                                                            {index + 1}
                                                        </h3>

                                                        <p
                                                            className={
                                                                subCardSubtitleClass
                                                            }
                                                        >
                                                            Bank account
                                                            information
                                                            shown to
                                                            donors.
                                                        </p>
                                                    </div>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            removeBankAccount(
                                                                index
                                                            )
                                                        }
                                                        className={
                                                            removeButtonClass
                                                        }
                                                    >
                                                        Remove
                                                    </button>
                                                </div>

                                                <div className="space-y-5">

                                                    {/* Option */}

                                                    <div>
                                                        <label
                                                            className={
                                                                labelClass
                                                            }
                                                        >
                                                            Option /
                                                            Label
                                                        </label>

                                                        <input
                                                            type="text"
                                                            value={
                                                                account.option
                                                            }
                                                            maxLength={
                                                                fieldLimits.bankOptionText
                                                            }
                                                            onChange={(
                                                                e
                                                            ) =>
                                                                updateBankAccount(
                                                                    index,
                                                                    "option",
                                                                    e
                                                                        .target
                                                                        .value
                                                                )
                                                            }
                                                            className={
                                                                inputClass
                                                            }
                                                            placeholder="e.g. Bank Transfer"
                                                        />

                                                        <p
                                                            className={counterClass(
                                                                account
                                                                    .option
                                                                    .length,
                                                                fieldLimits.bankOptionText
                                                            )}
                                                        >
                                                            {
                                                                account
                                                                    .option
                                                                    .length
                                                            }
                                                            /
                                                            {
                                                                fieldLimits.bankOptionText
                                                            }
                                                        </p>
                                                    </div>

                                                    {/* Bank + SWIFT */}

                                                    <div
                                                        className={
                                                            fieldRowClass
                                                        }
                                                    >

                                                        <div>
                                                            <label
                                                                className={
                                                                    labelClass
                                                                }
                                                            >
                                                                Bank Name
                                                            </label>

                                                            <input
                                                                type="text"
                                                                value={
                                                                    account.bank
                                                                }
                                                                maxLength={
                                                                    fieldLimits.bankName
                                                                }
                                                                onChange={(
                                                                    e
                                                                ) =>
                                                                    updateBankAccount(
                                                                        index,
                                                                        "bank",
                                                                        e
                                                                            .target
                                                                            .value
                                                                    )
                                                                }
                                                                className={
                                                                    inputClass
                                                                }
                                                                placeholder="Enter bank name"
                                                            />

                                                            <p
                                                                className={counterClass(
                                                                    account
                                                                        .bank
                                                                        .length,
                                                                    fieldLimits.bankName
                                                                )}
                                                            >
                                                                {
                                                                    account
                                                                        .bank
                                                                        .length
                                                                }
                                                                /
                                                                {
                                                                    fieldLimits.bankName
                                                                }
                                                            </p>
                                                        </div>

                                                        <div>
                                                            <label
                                                                className={
                                                                    labelClass
                                                                }
                                                            >
                                                                SWIFT Code
                                                            </label>

                                                            <input
                                                                type="text"
                                                                value={
                                                                    account.swift
                                                                }
                                                                maxLength={
                                                                    fieldLimits.swiftCode
                                                                }
                                                                onChange={(
                                                                    e
                                                                ) =>
                                                                    updateBankAccount(
                                                                        index,
                                                                        "swift",
                                                                        e
                                                                            .target
                                                                            .value
                                                                    )
                                                                }
                                                                className={
                                                                    inputClass
                                                                }
                                                                placeholder="Enter SWIFT code"
                                                            />

                                                            <p
                                                                className={counterClass(
                                                                    account
                                                                        .swift
                                                                        .length,
                                                                    fieldLimits.swiftCode
                                                                )}
                                                            >
                                                                {
                                                                    account
                                                                        .swift
                                                                        .length
                                                                }
                                                                /
                                                                {
                                                                    fieldLimits.swiftCode
                                                                }
                                                            </p>
                                                        </div>

                                                    </div>

                                                    {/* Name + Account */}

                                                    <div
                                                        className={
                                                            fieldRowClass
                                                        }
                                                    >

                                                        <div>
                                                            <label
                                                                className={
                                                                    labelClass
                                                                }
                                                            >
                                                                Account Holder
                                                                Name
                                                            </label>

                                                            <input
                                                                type="text"
                                                                value={
                                                                    account.name
                                                                }
                                                                maxLength={
                                                                    fieldLimits.accountHolderName
                                                                }
                                                                onChange={(
                                                                    e
                                                                ) =>
                                                                    updateBankAccount(
                                                                        index,
                                                                        "name",
                                                                        e
                                                                            .target
                                                                            .value
                                                                    )
                                                                }
                                                                className={
                                                                    inputClass
                                                                }
                                                                placeholder="Enter account holder name"
                                                            />

                                                            <p
                                                                className={counterClass(
                                                                    account
                                                                        .name
                                                                        .length,
                                                                    fieldLimits.accountHolderName
                                                                )}
                                                            >
                                                                {
                                                                    account
                                                                        .name
                                                                        .length
                                                                }
                                                                /
                                                                {
                                                                    fieldLimits.accountHolderName
                                                                }
                                                            </p>
                                                        </div>

                                                        <div>
                                                            <label
                                                                className={
                                                                    labelClass
                                                                }
                                                            >
                                                                Account Number
                                                            </label>

                                                            <input
                                                                type="text"
                                                                value={
                                                                    account.account
                                                                }
                                                                maxLength={
                                                                    fieldLimits.accountNumber
                                                                }
                                                                onChange={(
                                                                    e
                                                                ) =>
                                                                    updateBankAccount(
                                                                        index,
                                                                        "account",
                                                                        e
                                                                            .target
                                                                            .value
                                                                    )
                                                                }
                                                                className={
                                                                    inputClass
                                                                }
                                                                placeholder="Enter account number"
                                                            />

                                                            <p
                                                                className={counterClass(
                                                                    account
                                                                        .account
                                                                        .length,
                                                                    fieldLimits.accountNumber
                                                                )}
                                                            >
                                                                {
                                                                    account
                                                                        .account
                                                                        .length
                                                                }
                                                                /
                                                                {
                                                                    fieldLimits.accountNumber
                                                                }
                                                            </p>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    )
                                )}
                            </div>

                            {/* Notice */}

                            <div>
                                <label className={labelClass}>
                                    Bank Transfer Notice
                                </label>

                                <textarea
                                    value={
                                        donatePage
                                            .directBankTransfer
                                            .notice
                                    }
                                    maxLength={
                                        fieldLimits.bankNotice
                                    }
                                    onChange={(e) =>
                                        updateBankTransfer(
                                            "notice",
                                            e.target.value
                                        )
                                    }
                                    className={`${textareaClass} min-h-[120px]`}
                                    placeholder="Enter any important information for donors"
                                />

                                <p
                                    className={counterClass(
                                        donatePage.directBankTransfer
                                            .notice.length,
                                        fieldLimits.bankNotice
                                    )}
                                >
                                    {
                                        donatePage
                                            .directBankTransfer
                                            .notice.length
                                    }
                                    /
                                    {fieldLimits.bankNotice}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* =================================================
                        TRANSFER / DONATION FORM
                    ================================================== */}

                    <section className={cardClass}>

                        <div className={cardHeaderWrapClass}>
                            <div>
                                <h2 className={cardTitleClass}>
                                    Donation Form
                                </h2>

                                <p className={cardSubtitleClass}>
                                    Manage the donation form labels,
                                    placeholders.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-8">

                            {/* Form Title */}

                            <div>
                                <label className={labelClass}>
                                    Form Title
                                </label>

                                <input
                                    type="text"
                                    value={
                                        donatePage.transferForm.title
                                    }
                                    maxLength={
                                        fieldLimits.formTitle
                                    }
                                    onChange={(e) =>
                                        updateTransferForm(
                                            "title",
                                            e.target.value
                                        )
                                    }
                                    className={inputClass}
                                    placeholder="Enter donation form title"
                                />

                                <p
                                    className={counterClass(
                                        donatePage.transferForm.title
                                            .length,
                                        fieldLimits.formTitle
                                    )}
                                >
                                    {
                                        donatePage.transferForm.title
                                            .length
                                    }
                                    /
                                    {fieldLimits.formTitle}
                                </p>
                            </div>

                            {/* Form Subtitle */}

                            <div>
                                <label className={labelClass}>
                                    Form Subtitle
                                </label>

                                <textarea
                                    value={
                                        donatePage.transferForm
                                            .subtitle
                                    }
                                    maxLength={
                                        fieldLimits.formSubtitle
                                    }
                                    onChange={(e) =>
                                        updateTransferForm(
                                            "subtitle",
                                            e.target.value
                                        )
                                    }
                                    className={`${textareaClass} min-h-[100px]`}
                                    placeholder="Enter donation form subtitle"
                                />

                                <p
                                    className={counterClass(
                                        donatePage.transferForm.subtitle
                                            .length,
                                        fieldLimits.formSubtitle
                                    )}
                                >
                                    {
                                        donatePage.transferForm.subtitle
                                            .length
                                    }
                                    /
                                    {fieldLimits.formSubtitle}
                                </p>
                            </div>

                            {/* Form Fields */}

                            <div className="space-y-5">

                                <div>
                                    <h3 className="text-base font-semibold text-gray-900">
                                        Form Fields
                                    </h3>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Customize the label and
                                        placeholder of each donation
                                        field.
                                    </p>
                                </div>

                                {transferFormFieldKeys.map(
                                    ({ key, name }) => {

                                        const field =
                                            donatePage.transferForm
                                                .fields[key];

                                        return (
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
                                                            Customize
                                                            how this
                                                            field
                                                            appears on
                                                            the form.
                                                        </p>
                                                    </div>
                                                </div>

                                                <div
                                                    className={
                                                        fieldRowClass
                                                    }
                                                >

                                                    {/* Label */}

                                                    <div>
                                                        <label
                                                            className={
                                                                labelClass
                                                            }
                                                        >
                                                            Field Label
                                                        </label>

                                                        <input
                                                            type="text"
                                                            value={
                                                                field.label
                                                            }
                                                            maxLength={
                                                                fieldLimits.fieldLabel
                                                            }
                                                            onChange={(
                                                                e
                                                            ) =>
                                                                updateTransferFormField(
                                                                    key,
                                                                    "label",
                                                                    e
                                                                        .target
                                                                        .value
                                                                )
                                                            }
                                                            className={
                                                                inputClass
                                                            }
                                                            placeholder="Enter field label"
                                                        />

                                                        <p
                                                            className={counterClass(
                                                                field
                                                                    .label
                                                                    .length,
                                                                fieldLimits.fieldLabel
                                                            )}
                                                        >
                                                            {
                                                                field
                                                                    .label
                                                                    .length
                                                            }
                                                            /
                                                            {
                                                                fieldLimits.fieldLabel
                                                            }
                                                        </p>
                                                    </div>

                                                    {/* Placeholder */}

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
                                                                field.placeholder
                                                            }
                                                            maxLength={
                                                                fieldLimits.fieldPlaceholder
                                                            }
                                                            onChange={(
                                                                e
                                                            ) =>
                                                                updateTransferFormField(
                                                                    key,
                                                                    "placeholder",
                                                                    e
                                                                        .target
                                                                        .value
                                                                )
                                                            }
                                                            className={
                                                                inputClass
                                                            }
                                                            placeholder="Enter placeholder text"
                                                        />

                                                        <p
                                                            className={counterClass(
                                                                field
                                                                    .placeholder
                                                                    .length,
                                                                fieldLimits.fieldPlaceholder
                                                            )}
                                                        >
                                                            {
                                                                field
                                                                    .placeholder
                                                                    .length
                                                            }
                                                            /
                                                            {
                                                                fieldLimits.fieldPlaceholder
                                                            }
                                                        </p>
                                                    </div>

                                                </div>
                                            </div>
                                        );
                                    }
                                )}
                            </div>

                           
                        </div>
                    </section>

                    {/* =================================================
                        BOTTOM SAVE BUTTON
                    ================================================== */}

                    <div className="flex justify-end">

                        <button
                            type="button"
                            onClick={saveDonatePage}
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