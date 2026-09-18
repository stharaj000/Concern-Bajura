import clientPromise from "@/lib/mongodb";
import { createActivity } from "@/lib/createActivity";

export async function GET() {

    try {
        const client = await clientPromise;
        const db = await client.db("test");

        const publicationReportpage = await db.collection("publication&reportpage").findOne({});

        return Response.json(publicationReportpage);
    }
    catch (error) {
        console.error(error);

        return Response.json(
            { error: "Failed to fetch Publication & Report page." },
            { status: 500 }
        );
    }
}


export async function PUT(request) {

    try {
        const body = await request.json();

        const client = await clientPromise;
        const db = client.db("test");

        const { _id, ...updateData } = body;

        const result = await db.collection("publication&reportpage").updateOne(
            {},
            {
                $set: updateData,
            },
            {
                upsert: true,
            }
        );

        await createActivity({
            type: "publication & Report",
            action: "Publication & Report page updated",
            description: "Publication & Report content was updated",
        });

        return Response.json({
            message: "Publication & Report page updated successfully",
            result
        });

    } catch (error) {
        console.error(error);

        return Response.json(
            { error: "Failed to update Publication & Report page" },
            { status: 500 }
        );
    }

}