import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import SideBarClient from "./SideBarClient";



export default async function RootLayout({ children }) {

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== "admin") {
    redirect("/");
  }


  return (
    <>

      <div className="flex min-h-screen w-full">

        <SideBarClient />

        <div className="flex w-full justify-end bg-gray-100 ">
          {children}
        </div>
      </div>
    </>

  );
}
