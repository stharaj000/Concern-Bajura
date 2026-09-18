import clientPromise from "@/lib/mongodb";
import { createActivity } from "@/lib/createActivity";

export async function GET() {

    try {
        const client = await clientPromise;
        const db = await client.db("test");

        const ourChildrenPage = await db.collection("ourChildrenPage").findOne({});

        return Response.json(ourChildrenPage);
    }
    catch (error) {
        console.error(error);

        return Response.json(
            { error: "Failed to fetch Our Children page." },
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

        const result = await db.collection("ourChildrenPage").updateOne(
            {},
            {
                $set: updateData,
            },
            {
                upsert: true,
            }
        );

        await createActivity({
            type: "our children page",
            action: "Our Chihldren Page updated",
            description: "Homepage content was updated",
        });

        return Response.json({
            message: "Our Children Page updated successfully",
            result
        });

    } catch (error) {
        console.error(error);

        return Response.json(
            { error: "Failed to update Our Children page" },
            { status: 500 }
        );
    }

}