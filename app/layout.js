

import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";


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

export default function RootLayout({ children }) {
  
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakSans.variable}`}
    >
      <body className="min-h-full flex flex-col relative">{children}</body>

    </html>
  );
}
