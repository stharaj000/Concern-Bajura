"use client"

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const signup = async () => {
        if (!name || !email || !password) {
            alert("Please fill all fields");
            return;
        }

        setLoading(true);

        try {

            const { data, error } = await authClient.signUp.email({
                name,
                email,
                password,
            });


            if (error) {
                alert(error.message);
                return;
            }
            
            console.log(data);

            alert("User Created Successfully!");

            router.replace("/dashboard");


        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-lg">
                <h1 className="mb-6 text-center text-2xl font-bold">
                    Register
                </h1>

                <div className="space-y-4">

                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />

                    <button
                        onClick={signup}
                        disabled={loading}
                        className="w-full rounded-lg bg-blue-600 py-2 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
                    >
                        {loading ? "Signing up..." : "Sign up"}
                    </button>

                    <div className="redirectToSignIn">Already have an account? <Link href="/login"><span className="font-bold cursor-pointer text-blue-500">login</span></Link></div>
                </div>
            </div>
        </div>
    );
}