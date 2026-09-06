import clientPromise from "@/lib/mongodb";

export async function GET() {

    try {
        const client = await clientPromise;
        const db = await client.db("test");

        const programProjectpage = await db.collection("program&projectpage").findOne({});

        return Response.json(programProjectpage);
    }
    catch (error) {
        console.error(error);

        return Response.json(
            { error: "Failed to fetch Program & Project page." },
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

        const result = await db.collection("program&projectpage").updateOne(
            {},
            {
                $set: updateData,
            },
            {
                upsert: true,
            }
        );

        return Response.json({
            message: "Program & Project page updated successfully",
            result
        });

    } catch (error) {
        console.error(error);

        return Response.json(
            { error: "Failed to update Program & Project page" },
            { status: 500 }
        );
    }

}