"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

const SideBarClient = () => {

    const pathName = usePathname();

    return (

        <aside className="w-[18%] border-r border-gray-200 bg-white fixed z-20 h-full hidden sm:block">

            <div className="border-b border-gray-200 p-6">
                <h1 className="text-xl font-semibold">
                    Concern Bajura
                </h1>
            </div>

            <nav className="flex flex-col gap-2 p-4">

                {[
                    { name: "Dashboard", url: "/dashboard" },
                    { name: "Homepage", url: "/dashboard/homepage" },
                    { name: "Projects", url: "/dashboard/projects" },
                    { name: "Programs", url: "/dashboard/programs" },
                    { name: "Gallery", url: "/dashboard/gallery" },
                    { name: "Donations", url: "/dashboard/donations" },
                    { name: "Settings", url: "/dashboard/settings" },
                ].map((item) => {

                    const isActive = pathName === item.url;

                    return < Link
                        key={item.name}
                        href={item.url}
                        className={`rounded-xl px-4 py-3 text-left transition ${isActive ? "bg-sky-50 text-sky-600"
                            : "hover:bg-gray-100"
                            }`
                        }
                    >
                        {item.name}
                    </Link>
                })}

            </nav>

        </aside >
    )
}

export default SideBarClient
