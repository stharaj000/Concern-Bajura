import clientPromise from "@/lib/mongodb";

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("test");

        const homepage = await db.collection("homepage").findOne({});

        return Response.json(homepage);
    }
    catch (error) {
        console.error(error);

        return Response.json(
            { error: "Failed to fetch homepage" },
            { status: 500 }
        );
    }
}


export async function PUT(request) {
    try {
        const body = await request.json();

        const client = await clientPromise;
        const db = client.db("test");

        const result = await db.collection("homepage").updateOne(
            {},
            {
                $set: body
            }
        );

        return Response.json({
            message: "Homepage updated successfully",
            result
        });

    } catch (error) {
        console.error(error);

        return Response.json(
            { error: "Failed to update homepage" },
            { status: 500 }
        );
    }
}