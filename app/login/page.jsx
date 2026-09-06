
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ClientComponent from "./ClientComponent";

export default async function Login() {

    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (session) {
        redirect("/dashboard");
    }

    return (
        <ClientComponent />
    );

}