import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import clientPromise from "@/lib/mongodb";

export async function POST(req) {

    try {
        const body = await req.json();

        const { donorName, email, phone, amount, remarks } = body;

        if (!donorName || !email || !amount) {
            return NextResponse.json(
                { error: "Name, email & amount are required" },
                { status: 400 }
            );
        }

        if (Number(amount) <= 0) {
            return NextResponse.json(
                { error: "Invalid donation amount" },
                { status: 400 }
            );
        }

        const productCode = process.env.ESEWA_PRODUCT_CODE;
        const secretKey = process.env.ESEWA_SECRET_KEY;
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


        //Generating a unique transaction ID
        const transactionUuid = `DON-${Date.now()}`;


        const totalAmount = Number(amount).toFixed(2);


        //Fields required by eSewa for signature
        const signedFieldNames = "total_amount,transaction_uuid,product_code";

        const message =
            `total_amount=${totalAmount},` +
            `transaction_uuid=${transactionUuid},` +
            `product_code=${productCode}`;

        //Generate HMAC SHA256 signature
        const signature = crypto
            .createHmac("sha256", secretKey)
            .update(message)
            .digest("base64");


        const client = await clientPromise;
        const db = await client.db("test");

        await db.collection("donations").insertOne({
            donorName,
            email,
            phone,
            amount: Number(amount),
            currency: "NPR",

            paymentMethod: "esewa",

            transactionUuid,

            remarks: remarks || "",

            status: "pending",

            createdAt: new Date(),
            updatedAt: new Date(),

        })




        return NextResponse.json({
            amount: totalAmount,
            tax_amount: "0",
            total_amount: totalAmount,

            transaction_uuid: transactionUuid,

            product_code: productCode,

            product_service_charge: "0",
            product_delivery_charge: "0",

            success_url: `${baseUrl}/donate/success`,
            failure_url: `${baseUrl}/donate/failure`,

            signed_field_names: signedFieldNames,
            signature,
        });
    } catch (error) {
        console.error("eSewa initializaiton error: ", error);

        return NextResponse.json(
            { error: "Unable to initialize eSewa payment" },
            { status: 500 }
        );
    }
}