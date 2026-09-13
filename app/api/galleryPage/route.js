import clientPromise from "@/lib/mongodb";

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("test");

        const galleryPage = await db.collection("galleryPage").findOne({});

        return Response.json(galleryPage);
    }
    catch (error) {
        console.error(error);

        return Response.json(
            { error: "Failed to fetch Gallery Page" },
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

        const result = await db.collection("galleryPage").updateOne(
            {},
            {
                $set: updateData
            },
            {
                upsert: true,
            }
        );

        return Response.json({
            message: "Gallery Page updated successfully",
            result
        });

    } catch (error) {
        console.error(error);

        return Response.json(
            { error: "Failed to update Gallery Page" },
            { status: 500 }
        );
    }
}