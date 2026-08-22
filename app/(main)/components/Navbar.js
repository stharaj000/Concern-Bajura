"use client"


import Link from "next/link";
import Image from "next/image";
import { MdClose } from "react-icons/md";
import { useState } from "react";


export default function Navbar() {


  const [sidebar, setSidebar] = useState(false);

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
      <nav className="w-screen bg-surface/80 fixed z-30 shadow-2x backdrop-blur-md shadow-lg">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 h-16 flex items-center justify-between relative">
          <Link href="/">
            <div className="flex items-center gap-2">

              <div className="flex min-[1100px]:hidden items-center gap-4 px-1 md:px-4 py-3">
                <button
                  className="text-white flex flex-col gap-[5px] cursor-pointer"
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
            <Link href="/about">
              <li className="cursor-pointer nav-link">About us
                <hr />
              </li>
            </Link>

            <li className="cursor-pointer nav-link">Our Childerns
              <hr />
            </li>
            <li className="cursor-pointer nav-link">Programs
              <hr />
            </li>
            <li className="cursor-pointer nav-link">News
              <hr />
            </li>
            <li className="cursor-pointer nav-link">Doners & Partners
              <hr />
            </li>
            <li className="cursor-pointer nav-link">Gallery
              <hr />
            </li>
          </ul>



          <button className="bg-secondary mx-4 text-white text-sm md:text-md text-shadow-md shadow-lg font-medium px-3 md:px-5 py-2.5 rounded-lg hover:bg-secondary-hover cursor-pointer transition-colors">
            Donate Now
          </button>


          <div className={`sidebarPhone absolute bg-white rounded-r-2xl transition-all backdrop-blur-2xl top-0 left-0 w-1/2  h-fit ${sidebar ? "block" : "hidden"} min-[1100px]:hidden shadow-2xl`}>
            <div className="w-full flex justify-end">
              <MdClose className="p-4 w-fit h-16 flex " onClick={handleCloseSideBar} size={100} />
            </div>
            <ul className=" flex  flex-col" onClick={handleCloseSideBar}>
              <Link href="/about"><li className="cursor-pointer nav-link text-lg p-6">About us
                <hr />
              </li>
              </Link>

              <li className="cursor-pointer nav-link text-lg p-6">Our Childerns
                <hr />
              </li>
              <li className="cursor-pointer nav-link text-lg p-6">Programs
                <hr />
              </li>
              <li className="cursor-pointer nav-link text-lg p-6">News
                <hr />
              </li>
              <li className="cursor-pointer nav-link text-lg p-6">Doners & Partners
                <hr />
              </li>
              <li className="cursor-pointer nav-link text-lg p-6">Gallery
                <hr />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
