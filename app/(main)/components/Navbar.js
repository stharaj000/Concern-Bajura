"use client"


import Link from "next/link";
import Image from "next/image";
import { MdClose } from "react-icons/md";
import { useState } from "react";


export default function Navbar() {


  const [sidebar, setSidebar] = useState(false);
  const [aboutExtra, setAboutExtra] = useState(false);

  const handleCloseSideBar = () => {
    setSidebar(false);
    // console.log(sidebar)
  }

  const handleOpenSideBar = () => {
    setSidebar(true);
    // console.log(sidebar)

  }

  return (
    <>
      <nav className="w-full bg-surface/80 fixed top-0 z-30 shadow-2x backdrop-blur-md shadow-lg">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 h-16 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-1">

              <div className="flex min-[1100px]:hidden items-center gap-4 px-1 md:px-4 py-3">
                <button
                  className="text-text-white flex flex-col gap-[5px] cursor-pointer"
                  onClick={handleOpenSideBar}
                >
                  <span className="block w-6 h-[2px] bg-black transition-all"></span>
                  <span className="block w-6 h-[2px] bg-black transition-all"></span>
                  <span className="block w-6 h-[2px] bg-black transition-all"></span>
                </button>
              </div>

              <Image
                src="/img/concernBajuraLogo.png"
                alt="Concern Bajura Logo"
                className="w-16 h-15"
                width={1000}
                height={1000}
              />
              <span className="text-text font-bold text-sm md:text-lg">Concern Bajura</span>
            </div>
          </Link>

          <ul className="gap-6 hidden min-[1100px]:flex">
            <Link href="/aboutus">
              <li className="cursor-pointer nav-link relative"
                onMouseOver={() => setAboutExtra(true)}
                onMouseLeave={() => setAboutExtra(false)}
              >About us
                <hr />
                <div className={`w-56 absolute transition-all bg-surface-alt ${aboutExtra ? 'block' : 'hidden'}`}>
                  <ul>
                    <Link href={"/publications"}>
                      <li className="p-2 hover:bg-surface">Publication & Report</li>
                    </Link>
                  </ul>
                </div>
              </li>
            </Link>

            <Link href={"/children"}>
              <li className="cursor-pointer nav-link">Our Childern
                <hr />
              </li>
            </Link>

            <Link href={"/programs-&-projects"}>
              <li className="cursor-pointer nav-link">Programs & Projects
                <hr />
              </li>
            </Link>

            <Link href={"/ourTeam"}>
              <li className="cursor-pointer nav-link">Our Team
                <hr />
              </li>
            </Link>

            <Link href={"/donors"}>
              <li className="cursor-pointer nav-link">Doners
                <hr />
              </li>
            </Link>

            <Link href={"/news"}>
              <li className="cursor-pointer nav-link">News
                <hr />
              </li>
            </Link>

            <Link href={"/gallery"}>
              <li className="cursor-pointer nav-link">Gallery
                <hr />
              </li>
            </Link>

            <Link href={"/contact"}>
              <li className="cursor-pointer nav-link">Contact
                <hr />
              </li>
            </Link>

          </ul>



          <Link href={"/donate"}> <button className="bg-secondary mx-4 text-white text-sm md:text-md text-shadow-md shadow-lg font-medium px-2 md:px-6 py-3 rounded-full hover:bg-secondary-hover cursor-pointer transition-colors">
            Donate Now
          </button>
          </Link>

          <div className={`sidebarPhone absolute bg-white rounded-r-2xl transition-all backdrop-blur-2xl top-0 left-0 w-7/10  h-screen ${sidebar ? "block" : "hidden"} min-[1100px]:hidden shadow-2xl`}>
            <div className="w-full flex justify-end">
              <MdClose className="p-4 w-fit h-16 flex " onClick={handleCloseSideBar} size={100} />
            </div>
            <ul className=" flex  flex-col" onClick={handleCloseSideBar}>
              <Link href="/aboutus">
                <li className="cursor-pointer nav-link text-lg p-4">About us
                  <hr />
                </li>
              </Link>

              <Link href={"/publications"}>
                <li className="cursor-pointer nav-link text-lg p-4">Publicaiton & Report
                  <hr />
                </li>

              </Link>

              <Link href={"/children"}>
                <li className="cursor-pointer nav-link text-lg p-4">Our Childern
                  <hr />
                </li>
              </Link>

              <Link href={"/programs-&-projects"}>
                <li className="cursor-pointer nav-link text-lg p-4">Programs & Projects
                  <hr />
                </li>
              </Link>

              <Link href={"/ourTeam"}>
                <li className="cursor-pointer nav-link text-lg p-4">Our Team
                  <hr />
                </li>
              </Link>

              <Link href={"/donors"}>
                <li className="cursor-pointer nav-link text-lg p-4">Doners
                  <hr />
                </li>
              </Link>

              <Link href={"/news"}>
                <li className="cursor-pointer nav-link text-lg p-4">News
                  <hr />
                </li>
              </Link>

              <Link href={"/gallery"}>
                <li className="cursor-pointer nav-link text-lg p-4">Gallery
                  <hr />
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
