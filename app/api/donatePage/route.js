import clientPromise from "@/lib/mongodb";

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("test");

        const donatePage = await db.collection("donatePage").findOne({});

        return Response.json(donatePage);
    }
    catch (error) {
        console.error(error);

        return Response.json(
            { error: "Failed to fetch Donate Page" },
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

        const result = await db.collection("donatePage").updateOne(
            {},
            {
                $set: updateData
            },
            {
                upsert: true,
            }
        );

        return Response.json({
            message: "Donate Page updated successfully",
            result
        });

    } catch (error) {
        console.error(error);

        return Response.json(
            { error: "Failed to update Donate Page" },
            { status: 500 }
        );
    }
}