import { NextResponse } from "next/server";
import crypto from "crypto";
import clientPromise from "@/lib/mongodb";


function generateEsewaSignature(data, secretKey) {
    const signedFieldNames = data.signed_field_names.split(",");

    const message = signedFieldNames
        .map((field) => `${field}=${data[field]}`)
        .join(",");

    return crypto
        .createHmac("sha256", secretKey)
        .update(message)
        .digest("base64");
}



export async function POST(req) {
    try {
        const { data } = await req.json();

        if (!data) {
            return NextResponse.json(
                { error: "Missing payment response" },
                { status: 400 }
            );
        }

        //Decode Base64 response from eSewa
        const decodedData = Buffer.from(data, "base64").toString("utf-8");

        const paymentData = JSON.parse(decodedData);

        console.log("eSewa response:", paymentData);

        //Get secret key
        const secretKey = process.env.ESEWA_SECRET_KEY;

        const generatedSignature = generateEsewaSignature(
            paymentData,
            secretKey
        )

        //compare signatures
        if (generatedSignature !== paymentData.signature) {
            return NextResponse.json(
                { error: "Invalid payment signature" },
                { status: 400 }
            );
        }

        //Signature is valid
        console.log("Signature verified successfully");


        const productCode = paymentData.product_code;
        const totalAmount = paymentData.total_amount;
        const transactionUuid = paymentData.transaction_uuid;

        const statusUrl = `https://rc.esewa.com.np/api/epay/transaction/status/` +
            `?product_code=${encodeURIComponent(productCode)}` +
            `&total_amount=${encodeURIComponent(totalAmount)}` +
            `&transaction_uuid=${encodeURIComponent(transactionUuid)}`;

        const statusResponse = await fetch(statusUrl);

        const statusData = await statusResponse.json();

        console.log("eSewa status:", statusData);

        // 5. Check transaction status

        if (statusData.status !== "COMPLETE") {
            return NextResponse.json(
                {
                    error: "Payment has not been completed",
                    status: statusData.status,
                },
                { status: 400 }
            );
        }

        console.log("Payment verified successfully!");

        const client = await clientPromise;
        const db = await client.db("test");

        const result = await db.collection("donations").updateOne(
            {
                transactionUuid: paymentData.transaction_uuid,
                status: "pending",
            },
            {
                $set: {
                    status: "completed",

                    transactionCode: paymentData.transactionCode,

                    updatedAt: new Date(),
                    completedAt: new Date(),
                }
            }
        );

        if (result.matchCount === 0) {
            return NextResponse.json(
                {
                    error: "Donation record not found",
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: "Payment verified successfully",
            success: true,
            paymentData,
            statusData,
        });
    } catch (error) {
        console.error("eSewa verification error:", error);

        return NextResponse.json(
            { message: "Unable to verify payment" },
            { status: 500 }
        );
    }
}