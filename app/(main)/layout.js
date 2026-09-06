import { Inter, Plus_Jakarta_Sans } from "next/font/google";
// import "./globals.css";
import Navbar from "@/app/(main)/components/Navbar";
import Footer from "@/app/(main)/components/Footer";

import clientPromise from "@/lib/mongodb";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const plusJakSans = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
});


export const metadata = {
  title: "Concern Bajura - OUR",
  description: "Supporting underprivileged children in Nepal",
};

export default async function RootLayout({ children }) {

  const client = await clientPromise;
  const db = client.db("test");

  const homepage = await db.collection("homepage").findOne({});


  return (
    <html
      lang="en"
    >
      <body className={` ${inter.variable} ${plusJakSans.variable}`}>

        <Navbar />
        <body className="min-h-full flex flex-col relative">{children}</body>
        <Footer data={homepage.footer} />
      </body>
    </html>
  );
}
