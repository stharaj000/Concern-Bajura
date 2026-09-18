import clientPromise from "@/lib/mongodb";
import { createActivity } from "@/lib/createActivity";

export async function GET() {

    try {
        const client = await clientPromise;
        const db = await client.db("test");

        const newspage = await db.collection("newspage").findOne({});

        return Response.json(newspage);
    }
    catch (error) {
        console.error(error);

        return Response.json(
            { error: "Failed to fetch News & Event page." },
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

        const result = await db.collection("newspage").updateOne(
            {},
            {
                $set: updateData,
            },
            {
                upsert: true,
            }
        );

        await createActivity({
            type: "newspage",
            action: "News & Event page updated",
            description: "News & Event page content was updated",
        });

        return Response.json({
            message: "News Page page updated successfully",
            result
        });

    } catch (error) {
        console.error(error);

        return Response.json(
            { error: "Failed to update News & Event page" },
            { status: 500 }
        );
    }

}