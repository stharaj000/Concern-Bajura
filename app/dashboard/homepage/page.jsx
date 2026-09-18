"use client"

import { useEffect, useState } from "react";


export default function HomepageCMS() {

    const [homepage, setHomepage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);


    const fieldLimits = {
        heroTitle: 70,
        heroDescription: 200,
        aboutDescription: 950,
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


    const saveHomePage = async () => {
        setSaving(true);

        try {
            console.log("Saving homepage:", homepage);

            const response = await fetch("/api/homepage", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(homepage),
            });

            if (!response.ok) {
                throw new Error("Failed to save homepage");
            }


            alert("Changes saved successfully!");

        } catch (error) {
            console.error(error);
            alert("Failed to save Changes.");
        } finally {
            setSaving(false);
        }
    };




    const updateChild = (groupIndex, childIndex, field, value) => {
        const updatedGroups = [...homepage.storiesOfOurChildren.groups];

        updatedGroups[groupIndex] = {
            ...updatedGroups[groupIndex],
            children: [...updatedGroups[groupIndex].children],
        };

        updatedGroups[groupIndex].children[childIndex] = {
            ...updatedGroups[groupIndex].children[childIndex],
            [field]: value,
        };

        setHomepage({
            ...homepage,
            storiesOfOurChildren: {
                ...homepage.storiesOfOurChildren,
                groups: updatedGroups,
            },
        });
    };


    const updateAbout = (field, value) => {
        setHomepage((prev) => ({
            ...prev,
            about: {
                ...prev.about,
                [field]: value,
            }
        }));
    };



    const updateOurchildren = (field, value) => {
        setHomepage((prev) => ({
            ...prev,
            ourChildren: {
                ...prev.ourChildren,
                [field]: value,
            }
        }));
    };


    const updateVolunteer = (field, value) => {
        setHomepage((prev) => ({
            ...prev,
            volunteer: {
                ...prev.volunteer,
                [field]: value,
            }
        }));
    };


    const updateHeroVideo = (field, value) => {
        setHomepage((prev) => ({
            ...prev,
            hero: {
                ...prev.hero,
                [field]: value,
            }
        }));
    };


    useEffect(() => {
        if (homepage) {
            console.log("Dashboard about image:", homepage.about.image);
        }
    }, [homepage]);




    const updateTeam = (index, field, value) => {
        const updatedMembers = [...homepage.ourTeam.members];

        updatedMembers[index] = {
            ...updatedMembers[index],
            [field]: value,
        };

        setHomepage({
            ...homepage,
            ourTeam: {
                ...homepage.ourTeam,
                members: updatedMembers,
            },
        });
    };



    const updateCard = (index, field, value) => {
        const updatedCards = [...homepage.latestUpdate.cards];

        updatedCards[index] = {
            ...updatedCards[index],
            [field]: value,
        };

        setHomepage({
            ...homepage,
            latestUpdate: {
                ...homepage.latestUpdate,
                cards: updatedCards,
            },
        });
    };



    const updateSocial = (index, field, value) => {
        const updatedSocials = [...homepage.footer.connectWithUs.socialMedia];

        updatedSocials[index] = {
            ...updatedSocials[index],
            [field]: value,
        };

        setHomepage({
            ...homepage,
            footer: {
                ...homepage.footer,
                connectWithUs: {
                    ...homepage.footer.connectWithUs,
                    socialMedia: updatedSocials,
                }
            },
        });
    };



    useEffect(() => {

        const getHomePage = async () => {
            try {
                const response = await fetch("/api/homepage");

                if (!response.ok) {
                    throw new Error("Failed to fetch homepage");
                }

                const data = await response.json();

                setHomepage(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }

        };

        getHomePage();

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
                                Homepage
                            </h1>

                            <p className="mt-1 text-sm text-gray-500">
                                Manage and update your landing page content.
                            </p>
                        </div>

                        <button
                            onClick={saveHomePage}
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
                                        Heading
                                    </label>

                                    <input
                                        className={inputClass}
                                        placeholder="Enter heading" value={homepage.hero.title}
                                        maxLength={fieldLimits.heroTitle}
                                        onChange={(e) => {
                                            setHomepage({
                                                ...homepage,
                                                hero: {
                                                    ...homepage.hero,
                                                    title: e.target.value
                                                }
                                            })
                                        }}
                                    />
                                    <p className={counterClass(homepage.hero.title.length, fieldLimits.heroTitle)}>{homepage.hero.title.length}/{fieldLimits.heroTitle} characters</p>

                                </div>

                                <div>

                                    <label className={labelClass}>
                                        Description
                                    </label>

                                    <textarea
                                        rows={4}
                                        className={textareaClass}
                                        placeholder="Enter description" value={homepage.hero.subtitle}
                                        maxLength={fieldLimits.heroDescription}
                                        onChange={(e) => {
                                            setHomepage({
                                                ...homepage,
                                                hero: {
                                                    ...homepage.hero,
                                                    subtitle: e.target.value
                                                }
                                            })
                                        }}
                                    />
                                    <p className={counterClass(homepage.hero.subtitle.length, fieldLimits.heroDescription)}>{homepage.hero.subtitle.length}/{fieldLimits.heroDescription} characters</p>

                                </div>

                                <div>

                                    <label className={labelClass}>
                                        First Button Text
                                    </label>

                                    <div className={fieldRowClass}>
                                        <div>
                                            <input
                                                className={inputClass}
                                                placeholder="Button Text" value={homepage.hero.button1Text}
                                                maxLength={fieldLimits.buttonText}

                                                onChange={(e) => {
                                                    setHomepage({
                                                        ...homepage,
                                                        hero: {
                                                            ...homepage.hero,
                                                            button1Text: e.target.value
                                                        }
                                                    })
                                                }}
                                            />

                                            <p className={counterClass(homepage.hero.button1Text.length, fieldLimits.buttonText)}>{homepage.hero.button1Text.length}/{fieldLimits.buttonText} characters</p>

                                        </div>

                                        <div>
                                            <div>
                                                <label className={labelClass}>
                                                    First Button Link
                                                </label>
                                                <input
                                                    className={inputClass}
                                                    placeholder="Button URL" value={homepage.hero.button1Link}

                                                    onChange={(e) => {
                                                        setHomepage({
                                                            ...homepage,
                                                            hero: {
                                                                ...homepage.hero,
                                                                button1Link: e.target.value
                                                            }
                                                        })
                                                    }}
                                                />
                                            </div>


                                        </div>
                                    </div>


                                    <br />

                                    <label className={labelClass}>
                                        Second Button Text
                                    </label>

                                    <div className={fieldRowClass}>
                                        <div>
                                            <input
                                                className={inputClass}
                                                placeholder="Button Text" value={homepage.hero.button2Text}
                                                maxLength={fieldLimits.buttonText}

                                                onChange={(e) => {
                                                    setHomepage({
                                                        ...homepage,
                                                        hero: {
                                                            ...homepage.hero,
                                                            button2Text: e.target.value
                                                        }
                                                    })
                                                }}
                                            />

                                            <p className={counterClass(homepage.hero.button2Text.length, fieldLimits.buttonText)}>{homepage.hero.button2Text.length}/{fieldLimits.buttonText} characters</p>

                                        </div>

                                        <div>
                                            <div>
                                                <label className={labelClass}>
                                                    Second Button Link
                                                </label>
                                                <input
                                                    className={inputClass}
                                                    placeholder="Button URL" value={homepage.hero.button2Link}

                                                    onChange={(e) => {
                                                        setHomepage({
                                                            ...homepage,
                                                            hero: {
                                                                ...homepage.hero,
                                                                button2Link: e.target.value
                                                            }
                                                        })
                                                    }}
                                                />
                                            </div>


                                        </div>
                                    </div>
                                    <br />



                                    <div className={fieldRowClass}>


                                        <div>

                                            <label className={labelClass}>
                                                Helper 1 Title
                                            </label>

                                            <input
                                                className={inputClass}
                                                placeholder="Enter Helper 1 Title" value={homepage.hero.helper1Title}
                                                maxLength={15}
                                                onChange={(e) => {
                                                    setHomepage({
                                                        ...homepage,
                                                        hero: {
                                                            ...homepage.hero,
                                                            helper1Title: e.target.value
                                                        }
                                                    })
                                                }}
                                            />
                                            <p className={counterClass(homepage.hero.helper1Title.length, 15)}>{homepage.hero.helper1Title.length}/15 characters</p>

                                        </div>

                                        <div>

                                            <label className={labelClass}>
                                                Helper 1 Value
                                            </label>

                                            <input
                                                className={inputClass}
                                                placeholder="Enter Helper 1 Title" value={homepage.hero.helper1Value}
                                                maxLength={15}
                                                onChange={(e) => {
                                                    setHomepage({
                                                        ...homepage,
                                                        hero: {
                                                            ...homepage.hero,
                                                            helper1Value: e.target.value
                                                        }
                                                    })
                                                }}
                                            />
                                            <p className={counterClass(homepage.hero.helper1Value.length, 15)}>{homepage.hero.helper1Value.length}/15 characters</p>

                                        </div>





                                        <div>

                                            <label className={labelClass}>
                                                Helper 2 Title
                                            </label>

                                            <input
                                                className={inputClass}
                                                placeholder="Enter Helper 1 Title" value={homepage.hero.helper2Title}
                                                maxLength={15}
                                                onChange={(e) => {
                                                    setHomepage({
                                                        ...homepage,
                                                        hero: {
                                                            ...homepage.hero,
                                                            helper2Title: e.target.value
                                                        }
                                                    })
                                                }}
                                            />
                                            <p className={counterClass(homepage.hero.helper2Title.length, 15)}>{homepage.hero.helper2Title.length}/15 characters</p>

                                        </div>

                                        <div>

                                            <label className={labelClass}>
                                                Helper 2 Value
                                            </label>

                                            <input
                                                className={inputClass}
                                                placeholder="Enter Helper 1 Title" value={homepage.hero.helper2Value}
                                                maxLength={15}
                                                onChange={(e) => {
                                                    setHomepage({
                                                        ...homepage,
                                                        hero: {
                                                            ...homepage.hero,
                                                            helper2Value: e.target.value
                                                        }
                                                    })
                                                }}
                                            />
                                            <p className={counterClass(homepage.hero.helper2Value.length, 15)}>{homepage.hero.helper2Value.length}/15 characters</p>

                                        </div>

                                    </div>

                                </div>




                                <div className="relative w-full">

                                    <label className={labelClass}>
                                        Background Video
                                    </label>

                                    <div className={fileWrapClass}>
                                        <label className={fileButtonClass}>
                                            Choose File

                                            <input
                                                type="file"
                                                accept="video/*"
                                                className="hidden"
                                                onChange={async (e) => {
                                                    const file = e.target.files?.[0];

                                                    // if (!file) return;  

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


                                                        updateHeroVideo("video", data.url);
                                                        console.log("UodatedVideo: ", data.url)

                                                    } catch (error) {
                                                        console.error("Upload failed:", error);
                                                        alert("Upload Failed!")
                                                    }
                                                }}
                                            />
                                        </label>
                                        <div className={filePreviewWrapClass}>

                                            {homepage.hero.video && (
                                                <video
                                                    src={homepage.hero.video}
                                                    alt={homepage.hero.title}
                                                    className={filePreviewImgClass}

                                                >
                                                </video>
                                            )}

                                            <span className={filePreviewTextClass}>
                                                {homepage.hero.video || "No video selected"}
                                            </span>

                                        </div>
                                    </div>

                                    <span className={helperTextClass}>
                                        File size cannot exceed 100 MB
                                    </span>
                                </div>

                            </div>

                        </div>

                        {/* About */}

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
                                        placeholder="Title"
                                        className={inputClass}
                                        value={homepage.about.title}
                                        maxLength={fieldLimits.sectionHeading}

                                        onChange={(e) => {
                                            setHomepage({
                                                ...homepage,
                                                about: {
                                                    ...homepage.about,
                                                    title: e.target.value
                                                }
                                            })
                                        }}
                                    />
                                    <p className={counterClass(homepage.about.title.length, fieldLimits.sectionHeading)}>{homepage.about.title.length}/{fieldLimits.sectionHeading} characters</p>
                                </div>

                                <div>
                                    <label className={labelClass}>
                                        Description
                                    </label>

                                    <textarea
                                        rows={10}
                                        placeholder="Description"
                                        className={textareaClass}
                                        value={homepage.about.description}
                                        maxLength={fieldLimits.aboutDescription}

                                        onChange={(e) => {
                                            setHomepage({
                                                ...homepage,
                                                about: {
                                                    ...homepage.about,
                                                    description: e.target.value
                                                }
                                            })
                                        }}
                                    />

                                    <p className={counterClass(homepage.about.description.length, fieldLimits.aboutDescription)}>{homepage.about.description.length}/{fieldLimits.aboutDescription} characters</p>

                                </div>

                                <div className="relative w-full">

                                    <label className={labelClass}>
                                        About Image
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

                                            {homepage.about.image && (
                                                <img
                                                    src={homepage.about.image}
                                                    alt={homepage.about.name}
                                                    className={filePreviewImgClass}
                                                />
                                            )}

                                            <span className={filePreviewTextClass}>
                                                {homepage.about.image || "No image selected"}
                                            </span>

                                        </div>
                                    </div>
                                </div>


                            </div>

                        </div>

                        {/* Our Children*/}

                        <div className={cardClass}>

                            <h2 className="mb-5 text-lg font-semibold text-gray-900">
                                Our Children Section
                            </h2>

                            <div className="flex flex-col gap-5">

                                <div>
                                    <label className={labelClass}>
                                        Title
                                    </label>

                                    <input
                                        className={inputClass}
                                        placeholder="children" value={homepage.ourChildren.title}
                                        maxLength={fieldLimits.sectionHeading}

                                        onChange={(e) => {
                                            setHomepage({
                                                ...homepage,
                                                ourChildren: {
                                                    ...homepage.ourChildren,
                                                    title: e.target.value
                                                }
                                            })
                                        }}
                                    />
                                    <p className={counterClass(homepage.ourChildren.title.length, fieldLimits.sectionHeading)}>{homepage.ourChildren.title.length}/{fieldLimits.sectionHeading} characters</p>
                                </div>

                                <div className="relative w-full">

                                    <label className={labelClass}>
                                        Our Children Image
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


                                                        updateOurchildren("image", data.url);

                                                    } catch (error) {
                                                        console.error("Upload failed:", error);
                                                    }
                                                }}
                                            />
                                        </label>
                                        <div className={filePreviewWrapClass}>

                                            {homepage.ourChildren.image && (
                                                <img
                                                    src={homepage.ourChildren.image}
                                                    alt={homepage.ourChildren.title}
                                                    className={filePreviewImgClass}
                                                />
                                            )}

                                            <span className={filePreviewTextClass}>
                                                {homepage.ourChildren.image || "No image selected"}
                                            </span>

                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>

                        {/* Strories of our children */}


                        <div className={cardClass}>
                            {/* Section Header */}
                            <div className={cardHeaderWrapClass}>
                                <div>
                                    <h2 className={cardTitleClass}>
                                        Stories of Our Children
                                    </h2>
                                    <p className={cardSubtitleClass}>
                                        Manage the children stories displayed on your homepage.
                                    </p>
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
                                    value={homepage.storiesOfOurChildren.title}
                                    maxLength={fieldLimits.sectionHeading}

                                    onChange={(e) => {
                                        setHomepage({
                                            ...homepage,
                                            storiesOfOurChildren: {
                                                ...homepage.storiesOfOurChildren,
                                                title: e.target.value
                                            }
                                        })
                                    }}

                                />

                                <p className={counterClass(homepage.storiesOfOurChildren.title.length, fieldLimits.sectionHeading)}>{homepage.storiesOfOurChildren.title.length}/{fieldLimits.sectionHeading} characters</p>
                            </div>

                            {/* Children */}
                            <div className="space-y-8">

                                {homepage.storiesOfOurChildren.groups.map(
                                    (group, groupIndex) => (

                                        <div
                                            key={groupIndex}
                                            className="space-y-6"
                                        >

                                            <div>
                                                <h2 className="text-lg font-semibold text-gray-900">
                                                    Child Group {groupIndex + 1}
                                                </h2>

                                                <p className="text-sm text-gray-500">
                                                    Manage children in this story carousel.
                                                </p>
                                            </div>


                                            {group.children.map((child, childIndex) => (

                                                <div
                                                    key={child.id ?? childIndex}
                                                    className={subCardClass}
                                                >

                                                    {/* Child Header */}

                                                    <div className={subCardHeaderClass}>

                                                        <div>
                                                            <h3 className={subCardTitleClass}>
                                                                Child {childIndex + 1}
                                                            </h3>

                                                            <p className={subCardSubtitleClass}>
                                                                Add information and story details.
                                                            </p>
                                                        </div>



                                                    </div>


                                                    <div className={fieldRowClass}>

                                                        {/* Name */}

                                                        <div>

                                                            <label className={labelClass}>
                                                                Name
                                                            </label>

                                                            <input
                                                                className={inputClass}

                                                                placeholder="Enter child's name"

                                                                value={child.name}
                                                                maxLength={fieldLimits.childEmblaTitle}

                                                                onChange={(e) =>
                                                                    updateChild(
                                                                        groupIndex,
                                                                        childIndex,
                                                                        "name",
                                                                        e.target.value
                                                                    )
                                                                }
                                                            />

                                                            <p className={counterClass(child.name.length, fieldLimits.childEmblaTitle)}>{child.name.length}/{fieldLimits.childEmblaTitle} characters</p>

                                                        </div>


                                                        {/* Date */}

                                                        <div>

                                                            <label className={labelClass}>
                                                                Date
                                                            </label>

                                                            <input
                                                                type="date"

                                                                className={inputClass}

                                                                value={child.date}

                                                                onChange={(e) =>
                                                                    updateChild(
                                                                        groupIndex,
                                                                        childIndex,
                                                                        "date",
                                                                        e.target.value
                                                                    )
                                                                }
                                                            />

                                                        </div>


                                                        {/* Description */}

                                                        <div className="sm:col-span-2">

                                                            <label className={labelClass}>
                                                                Description
                                                            </label>

                                                            <textarea
                                                                rows={6}

                                                                className={textareaClass}

                                                                placeholder="Write the child's story..."

                                                                value={child.description}
                                                                maxLength={fieldLimits.childEmblaDescription}

                                                                onChange={(e) =>
                                                                    updateChild(
                                                                        groupIndex,
                                                                        childIndex,
                                                                        "description",
                                                                        e.target.value
                                                                    )
                                                                }
                                                            />
                                                            <p className={counterClass(child.description.length, fieldLimits.childEmblaDescription)}>{child.description.length}/{fieldLimits.childEmblaDescription} characters</p>

                                                        </div>


                                                        {/* Image */}

                                                        <div className="sm:col-span-2">

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

                                                                                // Put Cloudinary URL into our React state
                                                                                updateChild(
                                                                                    groupIndex,
                                                                                    childIndex,
                                                                                    "image",
                                                                                    data.url
                                                                                );

                                                                            } catch (error) {
                                                                                console.error("Upload failed:", error);
                                                                            }
                                                                        }}
                                                                    />

                                                                </label>


                                                                <div className={filePreviewWrapClass}>

                                                                    {child.image && (
                                                                        <img
                                                                            src={child.image}
                                                                            alt={child.name}
                                                                            className={filePreviewImgClass}
                                                                        />
                                                                    )}

                                                                    <span className={filePreviewTextClass}>
                                                                        {child.image || "No image selected"}
                                                                    </span>

                                                                </div>

                                                            </div>

                                                        </div>

                                                    </div>

                                                </div>

                                            ))}

                                        </div>

                                    )
                                )}

                            </div>


                            {/* Button Text */}
                            <div className={`${fieldRowClass} mt-8 border-t border-gray-200 pt-8`}>
                                <div>
                                    <label className={labelClass}>
                                        Button Text
                                    </label>

                                    <input
                                        className={inputClass}
                                        placeholder="e.g. Read More Stories"
                                        value={homepage.storiesOfOurChildren.buttonText}
                                        maxLength={fieldLimits.buttonText}

                                        onChange={(e) => {
                                            setHomepage({
                                                ...homepage,
                                                storiesOfOurChildren: {
                                                    ...homepage.storiesOfOurChildren,
                                                    buttonText: e.target.value
                                                }
                                            })
                                        }}

                                    />
                                    <p className={counterClass(homepage.storiesOfOurChildren.buttonText.length, fieldLimits.buttonText)}>{homepage.storiesOfOurChildren.buttonText.length}/{fieldLimits.buttonText} characters</p>
                                </div>

                                <div>
                                    <label className={labelClass}>
                                        Button Link
                                    </label>

                                    <input
                                        className={inputClass}
                                        placeholder="Button Link"
                                        value={homepage.storiesOfOurChildren.buttonLink}

                                        onChange={(e) => {
                                            setHomepage({
                                                ...homepage,
                                                storiesOfOurChildren: {
                                                    ...homepage.storiesOfOurChildren,
                                                    buttonLink: e.target.value
                                                }
                                            })
                                        }}

                                    />
                                </div>
                            </div>
                        </div>



                        {/* Our Team Section*/}


                        <div className={cardClass}>
                            {/* Section Header */}
                            <div className={cardHeaderWrapClass}>
                                <div>
                                    <h2 className={cardTitleClass}>
                                        Our Team Section
                                    </h2>

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
                                    value={homepage.ourTeam.title}
                                    maxLength={fieldLimits.sectionHeading}

                                    onChange={(e) => {
                                        setHomepage({
                                            ...homepage,
                                            ourTeam: {
                                                ...homepage.ourTeam,
                                                title: e.target.value
                                            }
                                        })
                                    }}
                                />
                                <p className={counterClass(homepage.ourTeam.title.length, fieldLimits.sectionHeading)}>{homepage.ourTeam.title.length}/{fieldLimits.sectionHeading} characters</p>
                            </div>

                            {/* Members */}
                            <div className="space-y-6">
                                {homepage.ourTeam.members.map((member, index) => (
                                    <div
                                        key={index}
                                        className={subCardClass}
                                    >
                                        {/* Member Header */}
                                        <div className={subCardHeaderClass}>
                                            <div>
                                                <h3 className={subCardTitleClass}>
                                                    Member {index + 1}
                                                </h3>
                                                <p className={subCardSubtitleClass}>
                                                    Add information and story details.
                                                </p>
                                            </div>

                                            <button
                                                type="button"
                                                className={removeButtonClass}
                                                onClick={() => {
                                                    setHomepage({
                                                        ...homepage,
                                                        ourTeam: {
                                                            ...homepage.ourTeam,
                                                            members: homepage.ourTeam.members.filter(
                                                                (_, memberIndex) => memberIndex != index
                                                            )
                                                        }
                                                    })
                                                }
                                                }
                                            >
                                                Remove
                                            </button>
                                        </div>

                                        <div className={fieldRowClass}>
                                            {/* Name */}
                                            <div>
                                                <label className={labelClass}>
                                                    Name
                                                </label>

                                                <input
                                                    className={inputClass}
                                                    placeholder="Enter child's name"
                                                    value={member.name}
                                                    maxLength={fieldLimits.childEmblaTitle}


                                                    onChange={(e) => updateTeam(index, "name", e.target.value)}
                                                />

                                                <p className={counterClass(member.name.length, fieldLimits.childEmblaTitle)}>{member.name.length}/{fieldLimits.childEmblaTitle} characters</p>
                                            </div>


                                            {/* Role */}
                                            <div className="sm:col-span-2">
                                                <label className={labelClass}>
                                                    Role
                                                </label>

                                                <textarea
                                                    rows={1}
                                                    className={textareaClass}
                                                    placeholder="Write the child's story..."
                                                    value={member.role}
                                                    maxLength={fieldLimits.childEmblaTitle}

                                                    onChange={(e) => updateTeam(index, "role", e.target.value)}
                                                />

                                                <p className={counterClass(member.role.length, fieldLimits.childEmblaTitle)}>{member.role.length}/{fieldLimits.childEmblaTitle} characters</p>
                                            </div>

                                            {/* Image */}
                                            <div className="sm:col-span-2">

                                                <label className={labelClass}>
                                                    Member Image
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
                                                                    const response = await fetch("/api/upload", {
                                                                        method: "POST",
                                                                        body: formData,
                                                                    });

                                                                    const data = await response.json();

                                                                    if (!response.ok) {
                                                                        throw new Error(data.error);
                                                                    }

                                                                    // Put Cloudinary URL into our React state
                                                                    updateTeam(
                                                                        index,
                                                                        "image",
                                                                        data.url
                                                                    );

                                                                } catch (error) {
                                                                    console.error("Upload failed:", error);
                                                                }
                                                            }}
                                                        />

                                                    </label>


                                                    <div className={filePreviewWrapClass}>

                                                        {member.image && (
                                                            <img
                                                                src={member.image}
                                                                alt={member.name}
                                                                className={filePreviewImgClass}
                                                            />
                                                        )}

                                                        <span className={filePreviewTextClass}>
                                                            {member.image || "No image selected"}
                                                        </span>

                                                    </div>


                                                </div>

                                            </div>
                                        </div>
                                        
                                    </div>
                                    


                                ))}
                                  <button
                                    type="button"
                                    className={addButtonClass}
                                    onClick={() => {
                                        setHomepage({
                                            ...homepage,
                                            ourTeam: {
                                                ...homepage.ourTeam,
                                                members: [
                                                    ...homepage.ourTeam.members,
                                                    {
                                                        image: "",
                                                        name: "",
                                                        role: "",
                                                    }
                                                ]
                                            }
                                        });
                                    }}
                                >
                                    <span className="text-lg leading-none">+</span>
                                    Add Team Member
                                </button>
                            </div>


                        </div>


                        {/* Latest Update Section */}

                        <div className={cardClass}>
                            {/* Section Header */}
                            <div className={cardHeaderWrapClass}>
                                <div>
                                    <h2 className={cardTitleClass}>
                                        Latest Update Section
                                    </h2>

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
                                    value={homepage.latestUpdate.title}
                                    maxLength={fieldLimits.sectionHeading}

                                    onChange={(e) => {
                                        setHomepage({
                                            ...homepage,
                                            latestUpdate: {
                                                ...homepage.latestUpdate,
                                                title: e.target.value
                                            }
                                        })
                                    }}
                                />
                                <p className={counterClass(homepage.latestUpdate.title.length, fieldLimits.sectionHeading)}>{homepage.latestUpdate.title.length}/{fieldLimits.sectionHeading} characters</p>
                            </div>

                            {/* card */}
                            <div className="space-y-6">
                                {homepage.latestUpdate.cards.map((card, index) => (
                                    <div
                                        key={index}
                                        className={subCardClass}
                                    >
                                        {/* Card Header */}
                                        <div className={subCardHeaderClass}>
                                            <div>
                                                <h3 className={subCardTitleClass}>
                                                    Card {index + 1}
                                                </h3>
                                                <p className={subCardSubtitleClass}>
                                                    Add information and card details.
                                                </p>
                                            </div>


                                        </div>

                                        <div className={fieldRowClass}>

                                            {/* Chip info */}
                                            <div>
                                                <label className={labelClass}>
                                                    Chip Text
                                                </label>

                                                <input
                                                    className={inputClass}
                                                    placeholder="Enter chip text"
                                                    value={card.tag}
                                                    maxLength={fieldLimits.chipText}

                                                    onChange={(e) => updateCard(index, "tag", e.target.value)}
                                                />
                                                <p className={counterClass(card.tag.length, fieldLimits.chipText)}>{card.tag.length}/{fieldLimits.chipText} characters</p>
                                            </div>

                                            {/* Name */}
                                            <div>
                                                <label className={labelClass}>
                                                    Title
                                                </label>

                                                <input
                                                    className={inputClass}
                                                    placeholder="Enter card title"
                                                    value={card.title}
                                                    maxLength={fieldLimits.newsUpdateTitle}

                                                    onChange={(e) => updateCard(index, "title", e.target.value)}
                                                />

                                                <p className={counterClass(card.title.length, fieldLimits.newsUpdateTitle)}>{card.title.length}/{fieldLimits.newsUpdateTitle} characters</p>
                                            </div>


                                            {/* Description */}
                                            <div className="sm:col-span-2">
                                                <label className={labelClass}>
                                                    Description
                                                </label>

                                                <textarea
                                                    rows={4}
                                                    className={textareaClass}
                                                    placeholder="Write the update's story..."
                                                    value={card.description}
                                                    maxLength={fieldLimits.newsUpdateDescription}

                                                    onChange={(e) => updateCard(index, "description", e.target.value)}
                                                />

                                                <p className={counterClass(card.description.length, fieldLimits.newsUpdateDescription)}>{card.description.length}/{fieldLimits.newsUpdateDescription} characters</p>

                                            </div>


                                            {/* Date */}
                                            <div>
                                                <label className={labelClass}>
                                                    Date
                                                </label>

                                                <input
                                                    className={inputClass}
                                                    placeholder="Select a date"
                                                    type="date"
                                                    value={card.date}

                                                    onChange={(e) => updateCard(index, "date", e.target.value)}
                                                />
                                            </div>



                                            {/* Image */}
                                            <div className="sm:col-span-2">
                                                <label className={labelClass}>
                                                    Card Image
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
                                                                    const response = await fetch("/api/upload", {
                                                                        method: "POST",
                                                                        body: formData,
                                                                    });

                                                                    const data = await response.json();

                                                                    if (!response.ok) {
                                                                        throw new Error(data.error);
                                                                    }

                                                                    // Put Cloudinary URL into our React state
                                                                    updateCard(index, "image", data.url)

                                                                } catch (error) {
                                                                    console.error("Upload failed:", error);
                                                                }
                                                            }}
                                                        />
                                                    </label>

                                                    <div className={filePreviewWrapClass}>

                                                        {card.image && (
                                                            <img
                                                                src={card.image}
                                                                alt={card.name}
                                                                className={filePreviewImgClass}
                                                            />
                                                        )}

                                                        <span className={filePreviewTextClass}>
                                                            {card.image || "No image selected"}
                                                        </span>

                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}


                                {/* Button Text */}

                                <div className={`${fieldRowClass} mt-8 border-t border-gray-200 pt-8`}>
                                    <div>
                                        <label className={labelClass}>
                                            Button Text
                                        </label>

                                        <input
                                            className={inputClass}
                                            placeholder="e.g. Read More Stories"
                                            value={homepage.latestUpdate.buttonText}
                                            maxLength={fieldLimits.buttonText}

                                            onChange={(e) => {
                                                setHomepage({
                                                    ...homepage,
                                                    latestUpdate: {
                                                        ...homepage.latestUpdate,
                                                        buttonText: e.target.value
                                                    }
                                                })
                                            }}
                                        />
                                        <p className={counterClass(homepage.latestUpdate.buttonText.length, fieldLimits.buttonText)}>{homepage.latestUpdate.buttonText.length}/{fieldLimits.buttonText} characters</p>
                                    </div>

                                    <div>
                                        <label className={labelClass}>
                                            Button URL
                                        </label>

                                        <input
                                            className={inputClass}
                                            placeholder="e.g. /news"
                                            value={homepage.latestUpdate.buttonLink}


                                            onChange={(e) => {
                                                setHomepage({
                                                    ...homepage,
                                                    latestUpdate: {
                                                        ...homepage.latestUpdate,
                                                        buttonLink: e.target.value
                                                    }
                                                })
                                            }}
                                        />

                                    </div>
                                </div>
                            </div>


                        </div>




                        {/* Volunteer Section */}

                        <div className={cardClass}>
                            {/* Section Header */}
                            <div className={cardHeaderWrapClass}>
                                <div>
                                    <h2 className={cardTitleClass}>
                                        Volunteer Section
                                    </h2>

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
                                    value={homepage.volunteer.title}
                                    maxLength={fieldLimits.sectionHeading}

                                    onChange={(e) => {
                                        setHomepage({
                                            ...homepage,
                                            volunteer: {
                                                ...homepage.volunteer,
                                                title: e.target.value
                                            }
                                        })
                                    }}
                                />
                                <p className={counterClass(homepage.volunteer.title.length, fieldLimits.sectionHeading)}>{homepage.volunteer.title.length}/{fieldLimits.sectionHeading} characters</p>
                            </div>

                            <div className="mb-8">
                                <label className={labelClass}>
                                    Description
                                </label>

                                <input
                                    className={inputClass}
                                    placeholder="Enter description"
                                    value={homepage.volunteer.description}
                                    maxLength={fieldLimits.heroDescription}

                                    onChange={(e) => {
                                        setHomepage({
                                            ...homepage,
                                            volunteer: {
                                                ...homepage.volunteer,
                                                description: e.target.value
                                            }
                                        })
                                    }}
                                />

                                <p className={counterClass(homepage.volunteer.description.length, fieldLimits.heroDescription)}>{homepage.volunteer.description.length}/{fieldLimits.heroDescription} characters</p>
                            </div>


                            <div className={`${fieldRowClass} mb-8`}>
                                <div>
                                    <label className={labelClass}>
                                        Button Text
                                    </label>

                                    <input
                                        className={inputClass}
                                        placeholder="Enter button text"
                                        value={homepage.volunteer.buttonText}
                                        maxLength={fieldLimits.buttonText}

                                        onChange={(e) => {
                                            setHomepage({
                                                ...homepage,
                                                volunteer: {
                                                    ...homepage.volunteer,
                                                    buttonText: e.target.value
                                                }
                                            })
                                        }}
                                    />
                                    <p className={counterClass(homepage.volunteer.buttonText.length, fieldLimits.buttonText)}>{homepage.volunteer.buttonText.length}/{fieldLimits.buttonText} characters</p>
                                </div>


                                <div>
                                    <label className={labelClass}>
                                        Button URL
                                    </label>

                                    <input
                                        className={inputClass}
                                        placeholder="Button URL"
                                        value={homepage.volunteer.buttonLink}

                                        onChange={(e) => {
                                            setHomepage({
                                                ...homepage,
                                                volunteer: {
                                                    ...homepage.volunteer,
                                                    buttonLink: e.target.value
                                                }
                                            })
                                        }}
                                    />
                                </div>

                            </div>


                            {/* Image */}
                            <div className="relative w-full overflow-hidden">

                                <label className={labelClass}>
                                    Volunteer Image
                                </label>

                                <div className={`${fileWrapClass} w-fit`}>
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


                                                    updateVolunteer("image", data.url);

                                                } catch (error) {
                                                    console.error("Upload failed:", error);
                                                }
                                            }}
                                        />
                                    </label>
                                    <div className={filePreviewWrapClass}>

                                        {homepage.volunteer.image && (
                                            <img
                                                src={homepage.volunteer.image}
                                                alt={homepage.volunteer.title}
                                                className={filePreviewImgClass}
                                            />
                                        )}

                                        <span className={filePreviewTextClass}>
                                            {homepage.volunteer.image || "No image selected"}
                                        </span>

                                    </div>
                                </div>
                            </div>

                        </div>


                        {/* Donate Section */}

                        <div className={cardClass}>
                            {/* Section Header */}
                            <div className={cardHeaderWrapClass}>
                                <div>
                                    <h2 className={cardTitleClass}>
                                        Donate Section
                                    </h2>

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
                                    value={homepage.donateNow.title}
                                    maxLength={fieldLimits.sectionHeading}

                                    onChange={(e) => {
                                        setHomepage({
                                            ...homepage,
                                            donateNow: {
                                                ...homepage.donateNow,
                                                title: e.target.value
                                            }
                                        })
                                    }}
                                />

                                <p className={counterClass(homepage.donateNow.title.length, fieldLimits.sectionHeading)}>{homepage.donateNow.title.length}/{fieldLimits.sectionHeading} characters</p>
                            </div>

                            <div className="mb-8">
                                <label className={labelClass}>
                                    Description
                                </label>

                                <input
                                    className={inputClass}
                                    placeholder="Enter description"
                                    value={homepage.donateNow.description}
                                    maxLength={fieldLimits.volunteerDescription}

                                    onChange={(e) => {
                                        setHomepage({
                                            ...homepage,
                                            donateNow: {
                                                ...homepage.donateNow,
                                                description: e.target.value
                                            }
                                        })
                                    }}
                                />


                                <p className={counterClass(homepage.donateNow.description.length, fieldLimits.volunteerDescription)}>{homepage.donateNow.description.length}/{fieldLimits.volunteerDescription} characters</p>
                            </div>

                            <div className={fieldRowClass}>
                                <div>
                                    <label className={labelClass}>
                                        Button Text
                                    </label>

                                    <input
                                        className={inputClass}
                                        placeholder="Enter button text"
                                        value={homepage.donateNow.buttonText}
                                        maxLength={fieldLimits.buttonText}

                                        onChange={(e) => {
                                            setHomepage({
                                                ...homepage,
                                                donateNow: {
                                                    ...homepage.donateNow,
                                                    buttonText: e.target.value
                                                }
                                            })
                                        }}
                                    />


                                    <p className={counterClass(homepage.donateNow.buttonText.length, fieldLimits.buttonText)}>{homepage.donateNow.buttonText.length}/{fieldLimits.buttonText} characters</p>
                                </div>
                                <div>
                                    <label className={labelClass}>
                                        Button URL
                                    </label>

                                    <input
                                        className={inputClass}
                                        placeholder="Button URL"
                                        value={homepage.donateNow.buttonLink}

                                        onChange={(e) => {
                                            setHomepage({
                                                ...homepage,
                                                donateNow: {
                                                    ...homepage.donateNow,
                                                    buttonLink: e.target.value
                                                }
                                            })
                                        }}
                                    />
                                </div>
                            </div>

                        </div>



                        {/* Footer Section */}

                        <div className={`${cardClass} flex flex-col gap-6`}>

                            <h2 className={cardTitleClass}>
                                Footer
                            </h2>

                            {/* About */}
                            <div className="rounded-xl bg-gray-50 p-5">
                                <h3 className="mb-6 text-sm font-semibold uppercase tracking-wide text-gray-500">
                                    About
                                </h3>

                                <div className="flex flex-col gap-5">

                                    <div>
                                        <label className={labelClass}>About Title</label>

                                        <input
                                            className={inputClass}
                                            placeholder="Enter section title"
                                            value={homepage.footer.aboutus.title}
                                            maxLength={fieldLimits.sectionHeading}

                                            onChange={(e) => {
                                                setHomepage({
                                                    ...homepage,
                                                    footer: {
                                                        ...homepage.footer,
                                                        aboutus: {
                                                            ...homepage.footer.aboutus,
                                                            title: e.target.value
                                                        }
                                                    }
                                                })
                                            }}
                                        />

                                        <p className={counterClass(homepage.footer.aboutus.title.length, fieldLimits.sectionHeading)}>{homepage.footer.aboutus.title.length}/{fieldLimits.sectionHeading} characters</p>
                                    </div>

                                    <div>
                                        <label className={labelClass}>About Description</label>

                                        <textarea
                                            rows={5}
                                            className={textareaClass}
                                            placeholder="Enter description"
                                            value={homepage.footer.aboutus.description}
                                            maxLength={fieldLimits.aboutDescription}

                                            onChange={(e) => {
                                                setHomepage({
                                                    ...homepage,
                                                    footer: {
                                                        ...homepage.footer,
                                                        aboutus: {
                                                            ...homepage.footer.aboutus,
                                                            description: e.target.value
                                                        }
                                                    }
                                                })
                                            }}
                                        />

                                        <p className={counterClass(homepage.footer.aboutus.description.length, fieldLimits.aboutDescription)}>{homepage.footer.aboutus.description.length}/{fieldLimits.aboutDescription} characters</p>
                                    </div>

                                    <div className={fieldRowClass}>
                                        <div>
                                            <label className={labelClass}>
                                                Contact
                                            </label>

                                            <input
                                                className={inputClass}
                                                placeholder="Enter contact number"
                                                value={homepage.footer.aboutus.contact}
                                                maxLength={14}

                                                onChange={(e) => {
                                                    setHomepage({
                                                        ...homepage,
                                                        footer: {
                                                            ...homepage.footer,
                                                            aboutus: {
                                                                ...homepage.footer.aboutus,
                                                                contact: e.target.value
                                                            }
                                                        }
                                                    })
                                                }}
                                            />
                                        </div>

                                        <div>
                                            <label className={labelClass}>
                                                Email
                                            </label>

                                            <input
                                                className={inputClass}
                                                placeholder="Enter email"
                                                value={homepage.footer.aboutus.email}
                                                maxLength={50}

                                                onChange={(e) => {
                                                    setHomepage({
                                                        ...homepage,
                                                        footer: {
                                                            ...homepage.footer,
                                                            aboutus: {
                                                                ...homepage.footer.aboutus,
                                                                email: e.target.value
                                                            }
                                                        }
                                                    })
                                                }}
                                            />
                                        </div>
                                    </div>

                                </div>

                            </div>

                            {/* Explore */}
                            <div className="rounded-xl bg-gray-50 p-5">
                                <h3 className="mb-6 text-sm font-semibold uppercase tracking-wide text-gray-500">
                                    Explore
                                </h3>

                                <div className="flex flex-col gap-5">

                                    <div>
                                        <label className={labelClass}>First Link</label>

                                        <input
                                            className={inputClass}
                                            placeholder="Enter link label"
                                            value={homepage.footer.explore.firstList}
                                            maxLength={30}

                                            onChange={(e) => {
                                                setHomepage({
                                                    ...homepage,
                                                    footer: {
                                                        ...homepage.footer,
                                                        explore: {
                                                            ...homepage.footer.explore,
                                                            firstList: e.target.value
                                                        }
                                                    }
                                                })
                                            }}
                                        />

                                        <p className={counterClass(homepage.footer.explore.firstList.length, 30)}>{homepage.footer.explore.firstList.length}/30 characters</p>
                                    </div>

                                    <div>
                                        <label className={labelClass}>Second Link</label>

                                        <input
                                            className={inputClass}
                                            placeholder="Enter link label"
                                            value={homepage.footer.explore.secondList}
                                            maxLength={30}

                                            onChange={(e) => {
                                                setHomepage({
                                                    ...homepage,
                                                    footer: {
                                                        ...homepage.footer,
                                                        explore: {
                                                            ...homepage.footer.explore,
                                                            secondList: e.target.value
                                                        }
                                                    }
                                                })
                                            }}
                                        />
                                        <p className={counterClass(homepage.footer.explore.secondList.length, 30)}>{homepage.footer.explore.secondList.length}/30 characters</p>
                                    </div>


                                    <div>
                                        <label className={labelClass}>Third Link</label>

                                        <input
                                            className={inputClass}
                                            placeholder="Enter link label"
                                            value={homepage.footer.explore.thirdList}
                                            maxLength={30}

                                            onChange={(e) => {
                                                setHomepage({
                                                    ...homepage,
                                                    footer: {
                                                        ...homepage.footer,
                                                        explore: {
                                                            ...homepage.footer.explore,
                                                            thirdList: e.target.value
                                                        }
                                                    }
                                                })
                                            }}
                                        />
                                        <p className={counterClass(homepage.footer.explore.thirdList.length, 30)}>{homepage.footer.explore.thirdList.length}/30 characters</p>
                                    </div>

                                    <div>
                                        <label className={labelClass}>Fourth Link</label>

                                        <input
                                            className={inputClass}
                                            placeholder="Enter link label"
                                            value={homepage.footer.explore.fourthList}
                                            maxLength={30}

                                            onChange={(e) => {
                                                setHomepage({
                                                    ...homepage,
                                                    footer: {
                                                        ...homepage.footer,
                                                        explore: {
                                                            ...homepage.footer.explore,
                                                            fourthList: e.target.value
                                                        }
                                                    }
                                                })
                                            }}
                                        />
                                        <p className={counterClass(homepage.footer.explore.fourthList.length, 30)}>{homepage.footer.explore.fourthList.length}/30 characters</p>
                                    </div>


                                    <div>
                                        <label className={labelClass}>Fifth Link</label>

                                        <input
                                            className={inputClass}
                                            placeholder="Enter link label"
                                            value={homepage.footer.explore.fifthList}
                                            maxLength={30}

                                            onChange={(e) => {
                                                setHomepage({
                                                    ...homepage,
                                                    footer: {
                                                        ...homepage.footer,
                                                        explore: {
                                                            ...homepage.footer.explore,
                                                            fifthList: e.target.value
                                                        }
                                                    }
                                                })
                                            }}
                                        />
                                        <p className={counterClass(homepage.footer.explore.fifthList.length, 30)}>{homepage.footer.explore.fifthList.length}/30 characters</p>
                                    </div>
                                </div>
                            </div>

                            {/* Socials */}
                            <div className="rounded-xl bg-gray-50 p-5">
                                <h3 className="mb-6 text-sm font-semibold uppercase tracking-wide text-gray-500">
                                    Socials
                                </h3>

                                <div className="flex flex-col gap-4">
                                    {homepage.footer.connectWithUs.socialMedia.map((social, index) => (
                                        <div key={index} className={fieldRowClass}>
                                            <input
                                                className={inputClass}
                                                placeholder="Platform name"
                                                value={social.name}
                                                maxLength={30}

                                                onChange={(e) => updateSocial(index, "name", e.target.value)}
                                            />

                                            <input
                                                className={inputClass}
                                                placeholder="Profile URL"
                                                value={social.url}

                                                onChange={(e) => updateSocial(index, "url", e.target.value)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Digital Partner */}
                            <div className="rounded-xl bg-gray-50 p-5">
                                <h3 className="mb-6 text-sm font-semibold uppercase tracking-wide text-gray-500">
                                    Digital Partner
                                </h3>

                                <div>
                                    <input
                                        className={inputClass}
                                        placeholder="Enter digital partner"
                                        value={homepage.footer.digitalPartner}
                                        maxLength={50}

                                        onChange={(e) => {
                                            setHomepage({
                                                ...homepage,
                                                footer: {
                                                    ...homepage.footer,
                                                    digitalPartner: e.target.value
                                                }
                                            })
                                        }}
                                    />
                                    <p className={counterClass(homepage.footer.digitalPartner.length, 50)}>{homepage.footer.digitalPartner.length}/50 characters</p>
                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Right */}
                    {/* Preview */}

                    {/* <div className="w-full shrink-0 space-y-6 lg:sticky lg:top-6 lg:w-[320px] hidden sm:block">



                        <div className="rounded-2xl border border-gray-200 bg-white p-6">

                            <h2 className="mb-5 text-lg font-semibold">
                                Homepage Preview
                            </h2>

                            <div className="flex h-96 items-center justify-center rounded-xl bg-gray-100 text-gray-400">
                                Live Preview
                            </div>

                        </div>

                        <button
                            onClick={saveHomePage}
                            disabled={saving}
                            className="rounded-xl w-full bg-sky-500 px-5 py-3 text-white">
                            {saving ? "Saving..." : "Save Changes"}
                        </button>

                    </div> */}

                </div>

            </div >

        </div >
    );
}