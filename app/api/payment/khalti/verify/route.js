import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { createActivity } from "@/lib/createActivity";

export async function POST(req) {
    try {
        const { pidx } = await req.json();

        if (!pidx) {
            return NextResponse.json(
                { error: "Missing payment identifier" },
                { status: 400 }
            );
        }

        const secretKey = process.env.KHALTI_SECRET_KEY;
        const khaltiApiUrl = process.env.KHALTI_API_URL;

        if (!secretKey || !khaltiApiUrl) {
            return NextResponse.json(
                { error: "Khalti configuration is missing" },
                { status: 500 }
            );
        }

        // Connect to MongoDB
        const client = await clientPromise;
        const db = client.db("test");

        // Find the pending donation using pidx
        const donation = await db.collection("donations").findOne({
            pidx,
        });

        if (!donation) {
            return NextResponse.json(
                {
                    error: "Donation record not found",
                },
                { status: 404 }
            );
        }

        // Already verified — treat it as success
        if (donation.status === "completed") {
            return NextResponse.json({
                success: true,
                message: "Payment was already verified",
                alreadyCompleted: true,
            });
        }
        

        // Ask Khalti to verify the payment
        const lookupResponse = await fetch(
            `${khaltiApiUrl}/epayment/lookup/`,
            {
                method: "POST",
                headers: {
                    Authorization: `Key ${secretKey}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    pidx,
                }),
            }
        );

        const lookupData = await lookupResponse.json();

        console.log("Khalti lookup response:", lookupData);

        if (!lookupResponse.ok) {
            return NextResponse.json(
                {
                    error: "Unable to verify Khalti payment",
                    details: lookupData,
                },
                { status: lookupResponse.status }
            );
        }

        // Only Completed is considered successful
        if (lookupData.status !== "Completed") {
            return NextResponse.json(
                {
                    error: "Payment has not been completed",
                    status: lookupData.status,
                },
                { status: 400 }
            );
        }

        // Khalti returns amount in paisa.
        // Our donation.amount is stored in NPR.
        const expectedAmountInPaisa = Math.round(
            Number(donation.amount) * 100
        );

        // Verify the amount returned by Khalti
        if (Number(lookupData.total_amount) !== expectedAmountInPaisa) {
            console.error("Khalti amount mismatch:", {
                expected: expectedAmountInPaisa,
                received: lookupData.total_amount,
            });

            return NextResponse.json(
                {
                    error: "Payment amount does not match donation amount",
                },
                { status: 400 }
            );
        }

        console.log("Khalti payment verified successfully!");

        // Update donation
        const result = await db.collection("donations").updateOne(
            {
                pidx,
                status: "pending",
            },
            {
                $set: {
                    status: "completed",

                    transactionId: lookupData.transaction_id,

                    updatedAt: new Date(),
                    completedAt: new Date(),
                },
            }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json(
                {
                    error: "Donation record not found or already completed",
                },
                { status: 404 }
            );
        }

        // Create dashboard activity
        await createActivity({
            type: "donation",
            action: "New donation received",
            description: `${donation.donorName || "Anonymous Donor"} donated ${donation.currency} ${donation.amount} via Khalti`,
        });

        return NextResponse.json({
            message: "Payment verified successfully",
            success: true,
            lookupData,
        });
    } catch (error) {
        console.error("Khalti verification error:", error);

        return NextResponse.json(
            {
                message: "Unable to verify Khalti payment",
            },
            { status: 500 }
        );
    }
}
