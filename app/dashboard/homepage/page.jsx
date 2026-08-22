"use client"

import { useEffect, useState } from "react";


export default function HomepageCMS() {

    const [homepage, setHomepage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);


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

            const data = await response.json();

            console.log("Save response:", data);

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
        return <p>Loading...</p>
    }

    return (
        <div className="min-h-screen w-full sm:w-[82%]">

            {/* Main */}

            <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6">

                {/* Header */}

                <div className="border-b border-gray-200 bg-white fixed w-full md:w-[82%] z-10">
                    <div className="mx-auto flex max-w-[1600px] flex-col gap-4 px-4 py-5 sm:px-6 sm:flex-row lg:items-center md:justify-between lg:px-8">

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
                            className="w-full rounded-xl bg-sky-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                        >
                            {saving ? "Saving..." : "Save Changes"}
                        </button>

                    </div>
                </div>

                {/* Content */}

                <div className="flex gap-6 p-4 sm:p-8 relative top-38 min-[700px]:top-20">

                    {/* Left */}

                    <div className="flex flex-1 w-[74%] flex-col gap-6">

                        {/* Hero */}

                        <div className="rounded-2xl border border-gray-200 bg-white p-6">

                            <h2 className="mb-5 text-lg font-semibold">
                                Hero Section
                            </h2>

                            <div className="flex flex-col gap-5">

                                <div>

                                    <label className="mb-2 block text-sm text-gray-600">
                                        Heading
                                    </label>

                                    <input
                                        className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none"
                                        placeholder="Enter heading" value={homepage.hero.title}
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

                                </div>

                                <div>

                                    <label className="mb-2 block text-sm text-gray-600">
                                        Description
                                    </label>

                                    <textarea
                                        rows={4}
                                        className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none"
                                        placeholder="Enter description" value={homepage.hero.subtitle}

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

                                </div>

                                <div>

                                    <label className="mb-2 block text-sm text-gray-600">
                                        First Button Text
                                    </label>

                                    <div className="flex gap-6">
                                        <input
                                            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none"
                                            placeholder="Button Text" value={homepage.hero.button1Text}

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

                                        <input
                                            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none"
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


                                    <label className="mb-2 block text-sm text-gray-600 mt-4">
                                        Second Button Text
                                    </label>

                                    <div className="flex gap-6">
                                        <input
                                            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none"
                                            placeholder="Button Text" value={homepage.hero.button2Text}

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


                                        <input
                                            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none"
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




                                <div className="relative w-full">

                                    <label className="mb-2 block text-sm text-gray-600">
                                        Background Video
                                    </label>

                                    <div className="flex h-16 items-center rounded-xl border border-gray-200 overflow-hidden">
                                        <label className="inline-flex cursor-pointer items-center justify-center bg-gray-500 w-34 px-4 py-7 text-sm font-medium text-white transition hover:bg-gray-800">
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
                                        <div className="flex items-center gap-4 px-4 py-3">

                                            {homepage.hero.video && (
                                                <video
                                                    src={homepage.hero.video}
                                                    alt={homepage.hero.title}
                                                    className="h-12 w-12 rounded-lg object-cover"

                                                >
                                                </video>
                                            )}

                                            <span className="truncate text-sm text-gray-500">
                                                {homepage.hero.video || "No image selected"}
                                            </span>

                                        </div>
                                    </div>

                                    <label className="mb-2 block text-xs p-2 text-blue-500 italic">
                                        File size cannot exceed 100 MB
                                    </label>
                                </div>

                            </div>

                        </div>

                        {/* About */}

                        <div className="rounded-2xl border border-gray-200 bg-white p-6">

                            <h2 className="mb-5 text-lg font-semibold">
                                About Section
                            </h2>

                            <div className="flex flex-col gap-5">

                                <input
                                    placeholder="Title"
                                    className="rounded-xl border border-gray-200 px-4 py-3"
                                    value={homepage.about.title}

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

                                <textarea
                                    rows={10}
                                    placeholder="Description"
                                    className="rounded-xl border border-gray-200 px-4 py-3"
                                    value={homepage.about.description}

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

                                <div className="relative w-full">

                                    <label className="mb-2 block text-sm text-gray-600">
                                        About Image
                                    </label>

                                    <div className="flex h-16 items-center rounded-xl border border-gray-200 overflow-hidden">
                                        <label className="inline-flex cursor-pointer items-center justify-center bg-gray-500 w-34 px-4 py-7 text-sm font-medium text-white transition hover:bg-gray-800">
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
                                        <div className="flex items-center gap-4 px-4 py-3">

                                            {homepage.about.image && (
                                                <img
                                                    src={homepage.about.image}
                                                    alt={homepage.about.name}
                                                    className="h-12 w-12 rounded-lg object-cover"
                                                />
                                            )}

                                            <span className="truncate text-sm text-gray-500">
                                                {homepage.about.image || "No image selected"}
                                            </span>

                                        </div>
                                    </div>
                                </div>


                            </div>

                        </div>

                        {/* Our Children*/}

                        <div className="rounded-2xl border border-gray-200 bg-white p-6">

                            <h2 className="mb-5 text-lg font-semibold">
                                Our Children Section
                            </h2>

                            <div className="flex flex-col gap-4">

                                <input
                                    className="flex-1 rounded-xl border border-gray-200 px-4 py-3"
                                    placeholder="children" value={homepage.ourChildren.title}

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

                                <div className="relative w-full">

                                    <label className="mb-2 block text-sm text-gray-600">
                                        Our Children Image
                                    </label>

                                    <div className="flex h-16 items-center rounded-xl border border-gray-200 overflow-hidden">
                                        <label className="inline-flex cursor-pointer items-center justify-center bg-gray-500 w-34 px-4 py-7 text-sm font-medium text-white transition hover:bg-gray-800">
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
                                        <div className="flex items-center gap-4 px-4 py-3">

                                            {homepage.ourChildren.image && (
                                                <img
                                                    src={homepage.ourChildren.image}
                                                    alt={homepage.ourChildren.title}
                                                    className="h-12 w-12 rounded-lg object-cover"
                                                />
                                            )}

                                            <span className="truncate text-sm text-gray-500">
                                                {homepage.ourChildren.image || "No image selected"}
                                            </span>

                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>

                        {/* Strories of our children */}


                        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                            {/* Section Header */}
                            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900">
                                        Stories of Our Children
                                    </h2>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Manage the children stories displayed on your homepage.
                                    </p>
                                </div>


                            </div>

                            {/* Section Title */}
                            <div className="mb-8">
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Section Title
                                </label>

                                <input
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-100"
                                    placeholder="Enter section title"
                                    value={homepage.storiesOfOurChildren.title}

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
                                                    className="rounded-2xl border border-gray-200 bg-gray-50/60 p-5"
                                                >

                                                    {/* Child Header */}

                                                    <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4">

                                                        <div>
                                                            <h3 className="font-semibold text-gray-900">
                                                                Child {childIndex + 1}
                                                            </h3>

                                                            <p className="mt-1 text-xs text-gray-500">
                                                                Add information and story details.
                                                            </p>
                                                        </div>



                                                    </div>


                                                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                                                        {/* Name */}

                                                        <div>

                                                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                                                Name
                                                            </label>

                                                            <input
                                                                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-100"

                                                                placeholder="Enter child's name"

                                                                value={child.name}

                                                                onChange={(e) =>
                                                                    updateChild(
                                                                        groupIndex,
                                                                        childIndex,
                                                                        "name",
                                                                        e.target.value
                                                                    )
                                                                }
                                                            />

                                                        </div>


                                                        {/* Date */}

                                                        <div>

                                                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                                                Date
                                                            </label>

                                                            <input
                                                                type="date"

                                                                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"

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

                                                        <div className="md:col-span-2">

                                                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                                                Description
                                                            </label>

                                                            <textarea
                                                                rows={6}

                                                                className="w-full resize-y rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-100"

                                                                placeholder="Write the child's story..."

                                                                value={child.description}

                                                                onChange={(e) =>
                                                                    updateChild(
                                                                        groupIndex,
                                                                        childIndex,
                                                                        "description",
                                                                        e.target.value
                                                                    )
                                                                }
                                                            />

                                                        </div>


                                                        {/* Image */}

                                                        <div className="md:col-span-2">

                                                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                                                Child Image
                                                            </label>

                                                            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">

                                                                <div className="flex flex-col sm:flex-row sm:items-center">

                                                                    <label className="inline-flex cursor-pointer items-center justify-center bg-gray-500 w-34 px-4 py-7 text-sm font-medium text-white transition hover:bg-gray-800">

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


                                                                    <div className="flex items-center gap-4 px-4 py-3">

                                                                        {child.image && (
                                                                            <img
                                                                                src={child.image}
                                                                                alt={child.name}
                                                                                className="h-12 w-12 rounded-lg object-cover"
                                                                            />
                                                                        )}

                                                                        <span className="truncate text-sm text-gray-500">
                                                                            {child.image || "No image selected"}
                                                                        </span>

                                                                    </div>


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
                            <div className="flex gap-6">
                                <div className="mt-8 border-t border-gray-200 pt-8">
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Button Text
                                    </label>

                                    <input
                                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-100"
                                        placeholder="e.g. Read More Stories"
                                        value={homepage.storiesOfOurChildren.buttonText}

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
                                </div>

                                <div className="mt-8 border-t border-gray-200 pt-8">
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Button Link
                                    </label>

                                    <input
                                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-100"
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


                        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                            {/* Section Header */}
                            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900">
                                        Our Team Section
                                    </h2>

                                </div>

                                <button
                                    type="button"
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                                >
                                    <span className="text-lg leading-none">+</span>
                                    Add Team Member
                                </button>
                            </div>

                            {/* Section Title */}
                            <div className="mb-8">
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Section Title
                                </label>

                                <input
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-100"
                                    placeholder="Enter section title"
                                    value={homepage.ourTeam.title}

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
                            </div>

                            {/* Members */}
                            <div className="space-y-6">
                                {homepage.ourTeam.members.map((member, index) => (
                                    <div
                                        key={index}
                                        className="rounded-2xl border border-gray-200 bg-gray-50/60 p-5"
                                    >
                                        {/* Child Header */}
                                        <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4">
                                            <div>
                                                <h3 className="font-semibold text-gray-900">
                                                    Member {index + 1}
                                                </h3>
                                                <p className="mt-1 text-xs text-gray-500">
                                                    Add information and story details.
                                                </p>
                                            </div>

                                            <button
                                                type="button"
                                                className="rounded-lg px-3 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50"
                                            >
                                                Remove
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                            {/* Name */}
                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                                    Name
                                                </label>

                                                <input
                                                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                                                    placeholder="Enter child's name"
                                                    value={member.name}


                                                    onChange={(e) => updateTeam(index, "name", e.target.value)}
                                                />
                                            </div>


                                            {/* Role */}
                                            <div className="md:col-span-2">
                                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                                    Role
                                                </label>

                                                <textarea
                                                    rows={1}
                                                    className="w-full resize-y rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                                                    placeholder="Write the child's story..."
                                                    value={member.role}

                                                    onChange={(e) => updateTeam(index, "role", e.target.value)}
                                                />
                                            </div>

                                            {/* Image */}
                                            <div className="md:col-span-2">

                                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                                    Members
                                                </label>

                                                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">

                                                    <div className="flex flex-col sm:flex-row sm:items-center">

                                                        <label className="inline-flex cursor-pointer items-center justify-center bg-gray-500 w-34 px-4 py-7 text-sm font-medium text-white transition hover:bg-gray-800">

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


                                                        <div className="flex items-center gap-4 px-4 py-3">

                                                            {member.image && (
                                                                <img
                                                                    src={member.image}
                                                                    alt={member.name}
                                                                    className="h-12 w-12 rounded-lg object-cover"
                                                                />
                                                            )}

                                                            <span className="truncate text-sm text-gray-500">
                                                                {member.image || "No image selected"}
                                                            </span>

                                                        </div>


                                                    </div>

                                                </div>

                                            </div>
                                        </div>
                                    </div>


                                ))}
                            </div>


                        </div>


                        {/* Latest Update Section */}

                        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                            {/* Section Header */}
                            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900">
                                        Latest update Section
                                    </h2>

                                </div>


                            </div>

                            {/* Section Title */}
                            <div className="mb-8">
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Section Title
                                </label>

                                <input
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-100"
                                    placeholder="Enter section title"
                                    value={homepage.latestUpdate.title}

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
                            </div>

                            {/* card */}
                            <div className="space-y-6">
                                {homepage.latestUpdate.cards.map((card, index) => (
                                    <div
                                        key={index + 1}
                                        className="rounded-2xl border border-gray-200 bg-gray-50/60 p-5"
                                    >
                                        {/* Card Header */}
                                        <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4">
                                            <div>
                                                <h3 className="font-semibold text-gray-900">
                                                    Card {index + 1}
                                                </h3>
                                                <p className="mt-1 text-xs text-gray-500">
                                                    Add information and Card details.
                                                </p>
                                            </div>


                                        </div>

                                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                                            {/* Chip info */}
                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                                    Chip Text
                                                </label>

                                                <input
                                                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                                                    placeholder="Enter child's name"
                                                    value={card.tag}

                                                    onChange={(e) => updateCard(index, "tag", e.target.value)}
                                                />
                                            </div>

                                            <br />

                                            {/* Name */}
                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                                    Title
                                                </label>

                                                <input
                                                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                                                    placeholder="Enter child's name"
                                                    value={card.title}

                                                    onChange={(e) => updateCard(index, "title", e.target.value)}
                                                />
                                            </div>


                                            {/* Description */}
                                            <div className="md:col-span-2">
                                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                                    Description
                                                </label>

                                                <textarea
                                                    rows={4}
                                                    className="w-full resize-y rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                                                    placeholder="Write the child's story..."
                                                    value={card.description}

                                                    onChange={(e) => updateCard(index, "description", e.target.value)}
                                                />
                                            </div>


                                            {/* Date */}
                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                                    Date
                                                </label>

                                                <input
                                                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                                                    placeholder="Enter child's name"
                                                    type="date"
                                                    value={card.date}

                                                    onChange={(e) => updateCard(index, "date", e.target.value)}
                                                />
                                            </div>



                                            {/* Image */}
                                            <div className="md:col-span-2">
                                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                                    Card Image
                                                </label>

                                                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                                                    <div className="flex flex-col sm:flex-row sm:items-center">
                                                        <label className="inline-flex cursor-pointer items-center justify-center bg-gray-500 w-34 px-4 py-7 text-sm font-medium text-white transition hover:bg-gray-800">
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

                                                        <div className="flex items-center gap-4 px-4 py-3">

                                                            {card.image && (
                                                                <img
                                                                    src={card.image}
                                                                    alt={card.name}
                                                                    className="h-12 w-12 rounded-lg object-cover"
                                                                />
                                                            )}

                                                            <span className="truncate text-sm text-gray-500">
                                                                {card.image || "No image selected"}
                                                            </span>

                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}


                                {/* Button Text */}

                                <div className="flex gap-6">
                                    <div className="mt-8 border-t border-gray-200 pt-8">
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Button Text
                                        </label>

                                        <input
                                            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-100"
                                            placeholder="e.g. Read More Stories"
                                            value={homepage.latestUpdate.buttonText}

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
                                    </div>

                                    <div className="mt-8 border-t border-gray-200 pt-8">
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Button URL
                                        </label>

                                        <input
                                            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-100"
                                            placeholder="e.g. Read More Stories"
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

                        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                            {/* Section Header */}
                            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900">
                                        Volunteer Section
                                    </h2>

                                </div>


                            </div>

                            {/* Section Title */}
                            <div className="mb-8">
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Section Title
                                </label>

                                <input
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-100"
                                    placeholder="Enter section title"
                                    value={homepage.volunteer.title}

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
                            </div>

                            <div className="mb-8">
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Description
                                </label>

                                <input
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-100"
                                    placeholder="Enter section title"
                                    value={homepage.volunteer.description}

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
                            </div>


                            <div className="flex gap-6">
                                <div className="mb-8">
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Button Text
                                    </label>

                                    <input
                                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-100"
                                        placeholder="Enter section title"
                                        value={homepage.volunteer.buttonText}

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
                                </div>


                                <div className="mb-8">
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Button URL
                                    </label>

                                    <input
                                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-100"
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

                                <label className="mb-2 block text-sm text-gray-600">
                                    Volunteer Image
                                </label>

                                <div className="flex h-16 items-center rounded-xl border border-gray-200 overflow-hidden w-fit">
                                    <label className="inline-flex cursor-pointer items-center justify-center bg-gray-500 w-34 px-4 py-7 text-sm font-medium text-white transition hover:bg-gray-800">
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
                                    <div className="flex items-center gap-4 px-4 py-3">

                                        {homepage.volunteer.image && (
                                            <img
                                                src={homepage.volunteer.image}
                                                alt={homepage.volunteer.title}
                                                className="h-12 w-12 rounded-lg object-cover"
                                            />
                                        )}

                                        <span className="truncate text-sm text-gray-500">
                                            {homepage.volunteer.image || "No image selected"}
                                        </span>

                                    </div>
                                </div>
                            </div>





                        </div>







                        {/* Donate Section */}

                        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                            {/* Section Header */}
                            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900">
                                        Donate Section
                                    </h2>

                                </div>


                            </div>

                            {/* Section Title */}
                            <div className="mb-8">
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Section Title
                                </label>

                                <input
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-100"
                                    placeholder="Enter section title"
                                    value={homepage.donateNow.title}

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
                            </div>

                            <div className="mb-8">
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Description
                                </label>

                                <input
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-100"
                                    placeholder="Enter section title"
                                    value={homepage.donateNow.description}

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
                            </div>

                            <div className="flex gap-6">
                                <div className="mb-8">
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Button Text
                                    </label>

                                    <input
                                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-100"
                                        placeholder="Enter section title"
                                        value={homepage.donateNow.buttonText}

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
                                </div>
                                <div className="mb-8">
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Button URL
                                    </label>

                                    <input
                                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-100"
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

                        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col gap-12">
                            {/* Section Header */}
                            <div className="aboutus bg-gray-100 rounded-md p-5">
                                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-900">
                                            Footer
                                        </h2>

                                    </div>


                                </div>

                                {/* Section Title */}
                                <div className="mb-8">

                                    <label className="mb-2 block text-sm font-medium text-gray-700">About Title</label>

                                    <input
                                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-100"
                                        placeholder="Enter section title"
                                        value={homepage.footer.aboutus.title}

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

                                    <br />
                                    <br />

                                    <label className="mb-2 block text-sm font-medium text-gray-700">About Description </label>

                                    <textarea
                                        rows={5}
                                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-100"
                                        placeholder="Enter section title"
                                        value={homepage.footer.aboutus.description}

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


                                </div>

                                <div className="mb-8">
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Contact
                                    </label>

                                    <input
                                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-100"
                                        placeholder="Enter section title"
                                        value={homepage.footer.aboutus.contact}

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


                                <div className="mb-8">
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Email
                                    </label>

                                    <input
                                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-100"
                                        placeholder="Enter section title"
                                        value={homepage.footer.aboutus.email}

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

                            <div className="explore bg-gray-100 rounded-md p-5">
                                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-900">
                                            Explore
                                        </h2>

                                    </div>


                                </div>

                                {/* Section Title */}
                                <div className="mb-8">


                                    <label className="mb-2 block text-sm font-medium text-gray-700">First Link</label>

                                    <input
                                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-100"
                                        placeholder="Enter section title"
                                        value={homepage.footer.explore.firstList}

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

                                    <br />
                                    <br />

                                    <label className="mb-2 block text-sm font-medium text-gray-700">Second Link</label>

                                    <input
                                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-100"
                                        placeholder="Enter section title"
                                        value={homepage.footer.explore.secondList}

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

                                    <br />
                                    <br />


                                    <label className="mb-2 block text-sm font-medium text-gray-700">Third Link</label>

                                    <input
                                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-100"
                                        placeholder="Enter section title"
                                        value={homepage.footer.explore.thirdList}

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


                                    <br />
                                    <br />



                                    <label className="mb-2 block text-sm font-medium text-gray-700">Fourth Link</label>

                                    <input
                                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-100"
                                        placeholder="Enter section title"
                                        value={homepage.footer.explore.fourthList}

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

                                    <br />
                                    <br />


                                    <label className="mb-2 block text-sm font-medium text-gray-700">Fifth Link</label>

                                    <input
                                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-100"
                                        placeholder="Enter section title"
                                        value={homepage.footer.explore.fifthList}

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
                                </div>
                            </div>




                            {/* Socials */}
                            <div className="explore bg-gray-100 rounded-md p-5">
                                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-900">
                                            Socials
                                        </h2>

                                    </div>


                                </div>


                                {/* <div className="space-y-6"> */}
                                {homepage.footer.connectWithUs.socialMedia.map((socail, index) => (


                                    <div className="flex flex-col md:flex-row gap-4">
                                        <input className="w-full p-4 border border-gray-50 bg-gray-50 rounded-2xl sm:mb-12" value={socail.name}

                                            onChange={(e) => updateSocial(index, "name", e.target.value)}

                                        />

                                        <input className=" w-full p-4 border border-gray-50 bg-gray-50 rounded-2xl mb-12" value={socail.url}

                                            onChange={(e) => updateSocial(index, "url", e.target.value)}

                                        />
                                    </div>




                                ))}


                            </div>


                            {/* Socials */}
                            <div className="explore bg-gray-100 rounded-md p-5">
                                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-900">
                                            Digital Partner
                                        </h2>

                                    </div>


                                </div>



                                <div className="flex gap-6">
                                    <input className="p-4  w-full border border-gray-50 bg-gray-50 rounded-2xl mb-6" value={homepage.footer.digitalPartner}

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

