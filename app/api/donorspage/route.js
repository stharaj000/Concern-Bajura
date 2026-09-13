import clientPromise from "@/lib/mongodb";

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("test");

        const donorspage = await db.collection("donorspage").findOne({});

        return Response.json(donorspage);
    }
    catch (error) {
        console.error(error);

        return Response.json(
            { error: "Failed to fetch donorspage" },
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

        const result = await db.collection("donorspage").updateOne(
            {},
            {
                $set: updateData
            },
            {
                upsert: true,
            }
        );

        return Response.json({
            message: "donorspage updated successfully",
            result
        });

    } catch (error) {
        console.error(error);

        return Response.json(
            { error: "Failed to update donorspage" },
            { status: 500 }
        );
    }
}