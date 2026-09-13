import clientPromise from "@/lib/mongodb";

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("test");

        const contactPage = await db.collection("contactPage").findOne({});

        return Response.json(contactPage);
    }
    catch (error) {
        console.error(error);

        return Response.json(
            { error: "Failed to fetch Contact Page" },
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

        const result = await db.collection("contactPage").updateOne(
            {},
            {
                $set: updateData
            },
            {
                upsert: true,
            }
        );

        return Response.json({
            message: "Contact Page updated successfully",
            result
        });

    } catch (error) {
        console.error(error);

        return Response.json(
            { error: "Failed to update Contact Page" },
            { status: 500 }
        );
    }
}