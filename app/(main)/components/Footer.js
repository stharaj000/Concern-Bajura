import { LuFacebook } from "react-icons/lu";
import { LuTwitter } from "react-icons/lu";
import { LuInstagram } from "react-icons/lu";
import Link from "next/link";



export default function Footer({ data }) {
  return (
    <footer className=" border-t relative top-20  border-outline border-border flex justify-center flex-col">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-14 flex gap-16 md:gap-8 justify-center flex-col md:flex-row">
        <div className="w-full md:w-1/2 ">
          <h3 className="font-semibold text-text-muted text-lg">{data.aboutus.title}</h3>
          <p className="mt-3 text-sm text-text leading-relaxed text-justify">
            {data.aboutus.description}
          </p>
          <p className="mt-3 text-sm text-text"><b>Contact:</b> {data.aboutus.contact}</p>
          <p className="text-sm text-text">
            <b>Email:</b> {data.aboutus.email}

          </p>
        </div>

        <div className="w-full md:w-1/3 md:px-14">
          <h4 className="font-bold text-sm uppercase tracking-[0.05em] text-text-muted pb-2">
            {data.explore.title}
          </h4>
          <ul className="mt-3 space-y-2 text-sm text-text flex flex-col gap-4">
            <Link href="/aboutus">
              <li className="w-fit h-fit hover:cursor-pointer transition-all nav-link">{data.explore.firstList}
                <hr />
              </li>
            </Link>

            <Link href="/gallery">
              <li className="w-fit h-fit hover:cursor-pointer transition-all nav-link">{data.explore.secondList} <hr />
              </li>
            </Link>

            <Link href="/contact">
              <li className="w-fit h-fit hover:cursor-pointer transition-all nav-link">{data.explore.thirdList} <hr />
              </li>
            </Link>

            <Link href="/news">
              <li className="w-fit h-fit hover:cursor-pointer transition-all nav-link">{data.explore.fourthList} <hr />
              </li>
            </Link>

            <Link href="/donors">
              <li className="w-fit h-fit hover:cursor-pointer transition-all nav-link">{data.explore.fifthList}<hr />
              </li>
            </Link>
          </ul>
        </div>

        <div className="w-full md:w-1/3">
          <h4 className="font-bold text-sm uppercase tracking-[0.05em] text-text-muted">
            {data.connectWithUs.title}
          </h4>

          <div className="mt-6 flex gap-8 text-text">
            {data.connectWithUs.socialMedia.map((link, index) => {
              const url = link.url.toLowerCase();

              return (
                <Link key={index} href={link.url} target="_blank" rel="noopener noreferrer">
                  <span className="transition-all hover:cursor-pointer hover:text-blue-500">
                    {url.includes("facebook") && <LuFacebook size={34} />}
                    {url.includes("x") && <LuTwitter size={34} />}
                    {url.includes("instagram") && <LuInstagram size={34} />}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="border-t border-border border-outline">
        <div className="w-full px-4 md:px-6 py-5 flex justify-center gap-2 text-sm text-text">
          <p>Digital Partner: {data.digitalPartner}</p>
        </div>
      </div>
    </footer >
  );
}
