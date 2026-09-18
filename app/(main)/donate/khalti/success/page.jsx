"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

function KhaltiSuccessContent() {
    const searchParams = useSearchParams();

    const [status, setStatus] = useState("verifying");
    const [message, setMessage] = useState("Verifying your payment...");

    useEffect(() => {
        const verifyPayment = async () => {
            const pidx = searchParams.get("pidx");

            console.log("Khalti success page pidx:", pidx);

            if (!pidx) {
                setStatus("error");
                setMessage("Payment identifier is missing.");
                return;
            }

            try {
                const response = await fetch("/api/payment/khalti/verify", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        pidx,
                    }),
                });

                const data = await response.json();

                console.log("Khalti verification result:", data);

                if (!response.ok) {
                    setStatus("error");
                    setMessage(
                        data.error || "Unable to verify payment."
                    );
                    return;
                }

                setStatus("success");
                setMessage(
                    "Your payment has been completed successfully!"
                );
            } catch (error) {
                console.error("Verification error:", error);

                setStatus("error");
                setMessage(
                    "Something went wrong while verifying your payment."
                );
            }
        };

        verifyPayment();
    }, [searchParams]);

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 px-4 py-16 relative top-20">
            <div className="flex min-h-[70vh] items-center justify-center">
                <div className="w-full max-w-md">
                    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60">

                        {/* Top colored bar */}
                        <div
                            className={`h-2 ${status === "success"
                                    ? "bg-success"
                                    : status === "error"
                                        ? "bg-danger"
                                        : "bg-primary"
                                }`}
                        />

                        <div className="px-6 py-10 text-center sm:px-10">

                            {/* Icon */}
                            <div className="mb-6 flex justify-center">

                                {/* Loading */}
                                {status === "verifying" && (
                                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary">
                                        <svg
                                            className="h-10 w-10 animate-spin text-indigo-100"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                        >
                                            <circle
                                                cx="12"
                                                cy="12"
                                                r="9"
                                                stroke="currentColor"
                                                strokeWidth="3"
                                                className="opacity-25"
                                            />

                                            <path
                                                fill="currentColor"
                                                d="M21 12a9 9 0 0 0-9-9v3a6 6 0 0 1 6 6h3Z"
                                            />
                                        </svg>
                                    </div>
                                )}

                                {/* Success */}
                                {status === "success" && (
                                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
                                        <svg
                                            className="h-10 w-10 text-success"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M20 6 9 17l-5-5" />
                                        </svg>
                                    </div>
                                )}

                                {/* Error */}
                                {status === "error" && (
                                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
                                        <svg
                                            className="h-10 w-10 text-danger"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M18 6 6 18" />
                                            <path d="m6 6 12 12" />
                                        </svg>
                                    </div>
                                )}
                            </div>

                            {/* Heading */}
                            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                                {status === "verifying"
                                    ? "Verifying Payment"
                                    : status === "success"
                                        ? "Payment Successful!"
                                        : "Payment Verification Failed"}
                            </h1>

                            {/* Message */}
                            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500 sm:text-base">
                                {message}
                            </p>

                            {/* Success box */}
                            {status === "success" && (
                                <div className="mt-7 rounded-2xl bg-emerald-50 p-4 text-left">
                                    <div className="flex items-start gap-3">

                                        <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                                            <svg
                                                className="h-4 w-4 text-emerald-600"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="3"
                                            >
                                                <path d="m5 12 4 4L19 6" />
                                            </svg>
                                        </div>

                                        <div>
                                            <p className="text-sm font-semibold text-emerald-900">
                                                Transaction confirmed
                                            </p>

                                            <p className="mt-1 text-xs leading-5 text-emerald-700">
                                                Your payment has been
                                                successfully verified.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Error box */}
                            {status === "error" && (
                                <div className="mt-7 rounded-2xl bg-red-50 p-4 text-left">
                                    <div className="flex items-start gap-3">

                                        <svg
                                            className="mt-0.5 h-5 w-5 shrink-0 text-red-500"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <circle
                                                cx="12"
                                                cy="12"
                                                r="9"
                                            />
                                            <path d="M12 8v4" />
                                            <path d="M12 16h.01" />
                                        </svg>

                                        <div>
                                            <p className="text-sm font-semibold text-red-900">
                                                We couldn't confirm your
                                                payment
                                            </p>

                                            <p className="mt-1 text-xs leading-5 text-red-700">
                                                Please try again or contact
                                                support if money was deducted
                                                from your account.
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            )}

                            {/* Home button */}
                            {status !== "verifying" && (
                                <a
                                    href="/"
                                    className={`mt-8 inline-flex w-full items-center justify-center rounded-xl px-5 py-3.5 text-sm font-semibold text-white transition ${status === "success"
                                            ? "bg-primary hover:bg-primary-hover"
                                            : "bg-slate-900 hover:bg-slate-800"
                                        }`}
                                >
                                    {status === "success"
                                        ? "Continue to Home"
                                        : "Return to Home"}
                                </a>
                            )}

                            {/* Security text */}
                            <p className="mt-6 text-xs text-slate-400">
                                Your payment information is securely
                                processed.
                            </p>
                        </div>
                    </div>

                    <p className="mt-6 text-center text-xs text-slate-400">
                        Thank you for your payment.
                    </p>
                </div>
            </div>
        </main>
    );
}

export default function KhaltiSuccessPage() {
    return (
        <Suspense
            fallback={
                <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 px-4 py-16 relative top-20">
                    <div className="flex min-h-[70vh] items-center justify-center">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary">
                            <svg
                                className="h-10 w-10 animate-spin text-indigo-100"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <circle
                                    cx="12"
                                    cy="12"
                                    r="9"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    className="opacity-25"
                                />
                                <path
                                    fill="currentColor"
                                    d="M21 12a9 9 0 0 0-9-9v3a6 6 0 0 1 6 6h3Z"
                                />
                            </svg>
                        </div>
                    </div>
                </main>
            }
        >
            <KhaltiSuccessContent />
        </Suspense>
    );
}