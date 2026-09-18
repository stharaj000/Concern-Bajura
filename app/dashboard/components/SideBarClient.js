"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MdClose } from "react-icons/md";

const SideBarClient = () => {

    const [sidebar, setSidebar] = useState(false);

    const handleCloseSideBar = () => {
        setSidebar(false);
    }

    const handleOpenSideBar = () => {
        setSidebar(true);
    }

    const pathName = usePathname();

    return (
        <>

            <div
                className={`flex min-[700px]:hidden fixed z-30 transition-all rounded-full gap-4 top-2  px-4 md:p-4 py-4 hover:cursor-pointer ${!sidebar ? 'block' : 'hidden'}`}
            >
                <button
                    className="text-text-white bg-background p-4 rounded-full flex flex-col gap-[5px] cursor-pointer"
                    onClick={handleOpenSideBar}
                >
                    <span className="block w-6 h-[2px] bg-black transition-all"></span>
                    <span className="block w-6 h-[2px] bg-black transition-all"></span>
                    <span className="block w-6 h-[2px] bg-black transition-all"></span>
                </button>
            </div>

            <aside className={`w-7/10 md:w-[22%] lg:w-[20%] transition-all border-r border-gray-200 bg-white fixed z-20 h-full md:block ${sidebar ? 'block' : 'hidden'} overflow-auto scrollbar-none`}>

                <div className="border-b border-border p-4 flex items-center">
                    <h1 className="text-xl flex w-full text-text font-semibold">
                        Concern Bajura
                    </h1>
                <div className={`w-full justify-end flex md:hidden `}>
                    <MdClose className="p-4 w-fit h-16 flex" onClick={handleCloseSideBar} size={100} />
                </div>
                </div>


                <nav className="flex flex-col gap-2 p-4">


                    {[
                        { name: "Dashboard", url: "/dashboard" },
                        { name: "Contact Messages", url: "/dashboard/contactmessages" },
                        { name: "Homepage", url: "/dashboard/homepage" },
                        { name: "About page", url: "/dashboard/aboutpage" },
                        { name: "Publication & Report page", url: "/dashboard/publication-&-reportpage" },
                        { name: "Our Children page", url: "/dashboard/ourchildrenpage" },
                        { name: "Programs & Projects page", url: "/dashboard/programs-&-projectspage" },
                        { name: "Our Team page", url: "/dashboard/ourteampage" },
                        { name: "Donors page", url: "/dashboard/donorpage" },
                        { name: "News & Event page", url: "/dashboard/newspage" },
                        { name: "Gallery page", url: "/dashboard/gallerypage" },
                        { name: "Contact page", url: "/dashboard/contactpage" },
                        { name: "Donate page", url: "/dashboard/donatepage" },
                       
                    ].map((item) => {

                        const isActive = pathName === item.url;

                        return < Link
                            key={item.name}
                            href={item.url}
                            className={`rounded-xl px-4 py-3 text-left transition ${isActive ? "bg-background text-sky-600"
                                : "hover:bg-buttonhover"
                                }`
                            }
                        >
                            {item.name}
                        </Link>
                    })}

                </nav>

            </aside >
        </>

    )
}

export default SideBarClient
