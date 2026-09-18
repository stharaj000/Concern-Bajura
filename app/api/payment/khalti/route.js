import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { createActivity } from "@/lib/createActivity";

export async function POST(req) {
    try {
        const {
            donorName,
            email,
            phone,
            amount,
            remarks,
        } = await req.json();

        // -----------------------------
        // Validate input
        // -----------------------------

        if (!donorName || !email || !amount) {
            return NextResponse.json(
                {
                    error: "Name, email and amount are required",
                },
                { status: 400 }
            );
        }

        const numericAmount = Number(amount);

        if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
            return NextResponse.json(
                {
                    error: "Invalid donation amount",
                },
                { status: 400 }
            );
        }

        // Khalti expects amount in paisa
        const amountInPaisa = Math.round(numericAmount * 100);

        // Unique ID for our donation
        const purchaseOrderId = `DON-KHALTI-${Date.now()}`;

        const secretKey = process.env.KHALTI_SECRET_KEY;
        const khaltiApiUrl = process.env.KHALTI_API_URL;
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

        if (!secretKey || !khaltiApiUrl || !baseUrl) {
            return NextResponse.json(
                {
                    error: "Khalti configuration is missing",
                },
                { status: 500 }
            );
        }

        // -----------------------------
        // Connect MongoDB
        // -----------------------------

        const client = await clientPromise;
        const db = client.db("test");

        const donationsCollection = db.collection("donations");

        // -----------------------------
        // Create pending donation
        // -----------------------------

        const donation = {
            donorName,
            email,
            phone: phone || "",

            // Original donation amount in NPR
            amount: numericAmount,
            currency: "NPR",

            paymentMethod: "Khalti",

            purchaseOrderId,

            remarks: remarks || "",

            status: "pending",

            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const insertResult = await donationsCollection.insertOne(donation);

        console.log(
            "Khalti pending donation created:",
            insertResult.insertedId
        );

        // -----------------------------
        // Initiate Khalti payment
        // -----------------------------

        const khaltiResponse = await fetch(
            `${khaltiApiUrl}/epayment/initiate/`,
            {
                method: "POST",

                headers: {
                    Authorization: `Key ${secretKey}`,
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    return_url:
                        `${baseUrl}/donate/khalti/success`,

                    website_url: baseUrl,

                    amount: amountInPaisa,

                    purchase_order_id: purchaseOrderId,

                    purchase_order_name:
                        "Concern Bajura Donation",

                    customer_info: {
                        name: donorName,
                        email,
                        phone: phone || "",
                    },
                }),
            }
        );

        const khaltiData = await khaltiResponse.json();

        console.log(
            "Khalti initiate response:",
            khaltiData
        );

        // -----------------------------
        // Khalti initiation failed
        // -----------------------------

        if (!khaltiResponse.ok) {
            console.error(
                "Khalti initiate error:",
                khaltiData
            );

            // Mark our pending donation as failed
            await donationsCollection.updateOne(
                {
                    _id: insertResult.insertedId,
                },
                {
                    $set: {
                        status: "failed",
                        updatedAt: new Date(),
                    },
                }
            );

            return NextResponse.json(
                {
                    error:
                        khaltiData.detail ||
                        "Unable to initiate Khalti payment",
                },
                {
                    status: khaltiResponse.status,
                }
            );
        }

        // -----------------------------
        // Save Khalti identifiers
        // -----------------------------

        await donationsCollection.updateOne(
            {
                _id: insertResult.insertedId,
            },
            {
                $set: {
                    pidx: khaltiData.pidx,

                    paymentUrl:
                        khaltiData.payment_url,

                    updatedAt: new Date(),
                },
            }
        );

        console.log(
            "Khalti payment information saved:",
            khaltiData.pidx
        );

        // -----------------------------
        // Return payment URL
        // -----------------------------

        return NextResponse.json({
            success: true,

            paymentUrl:
                khaltiData.payment_url,

            pidx:
                khaltiData.pidx,

            purchaseOrderId,
        });

    } catch (error) {
        console.error(
            "Khalti payment error:",
            error
        );

        return NextResponse.json(
            {
                error:
                    "Unable to initialize Khalti payment",
            },
            {
                status: 500,
            }
        );
    }
}