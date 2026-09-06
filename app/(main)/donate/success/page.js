"use client";

import { useEffect, useState } from "react";

export default function DonateSuccess() {
    const [status, setStatus] = useState("Verifying your donation...");

    useEffect(() => {
        const verifyPayment = async () => {
            try {
                const params = new URLSearchParams(window.location.search);
                const encodedData = params.get("data");

                if (!encodedData) {
                    setStatus("Invalid payment response.");
                    return;
                }

                const response = await fetch("/api/payment/esewa/verify", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        data: encodedData,
                    }),
                });

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.error);
                }

                setStatus("Donation successful. Thank you!");
            } catch (error) {
                console.error(error);
                setStatus("We could not verify your donation.");
            }
        };

        verifyPayment();
    }, []);

    return (
        <main>
            <h1>{status}</h1>
        </main>
    );
}