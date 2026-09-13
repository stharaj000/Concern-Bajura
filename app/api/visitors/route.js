import clientPromise from "@/lib/mongodb";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const DB_NAME = "test";
const COLLECTION_NAME = "websiteVisitors";


export async function POST() {
    try {
        const cookieStore = await cookies();

        const existingVisitor = cookieStore.get("cb_visitor");

        if (existingVisitor) {
            return NextResponse.json({
                success: true,
                counted: false,
                message: "Visitor already counted",
            })
        }

        const client = await clientPromise;
        const db = client.db(DB_NAME);

        const now = new Date();

        const nepalDate = new Intl.DateTimeFormat("en-CA", {
            timeZone: "Asia/Kathmandu",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        }).format(now);

        await db.collection(COLLECTION_NAME)
            .findOneAndUpdate(
                { date: nepalDate },
                {
                    $inc: { count: 1 },
                    $setOnInsert: {
                        date: nepalDate,
                        createdAt: now,
                    },
                    $set: {
                        updatedAt: now,
                    },
                },

                {
                    upsert: true,
                }
            );

        const response = NextResponse.json({
            success: true,
            counted: true,
            visitor: "Visitor counted",
        });


        response.cookies.set("cb_visitor", crypto.randomUUID(), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24,
            path: "/",
        });

        return response;

    } catch (error) {
        console.error("Visitor tracking error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to track visitor",
            },
            { status: 500 }
        );
    }
}


export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db(DB_NAME);

        const result = await db.collection(COLLECTION_NAME).aggregate([
            {
                $group: {
                    _id: null,
                    totalVisitors: { $sum: "$count" },
                },
            },
        ]).toArray();

        return NextResponse.json({
            totalVisitors: result[0]?.totalVisitors ?? 0,
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { message: "Failed to get website visitors" },
            { status: 500 }
        );
    }
}