import clientPromise from "@/lib/mongodb";

export async function GET() {

    try {
        const client = await clientPromise;
        const db = await client.db("test");

        const ourTeamPage = await db.collection("ourTeamPage").findOne({});

        return Response.json(ourTeamPage);
    }
    catch (error) {
        console.error(error);

        return Response.json(
            { error: "Failed to fetch Our Team page." },
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

        const result = await db.collection("ourTeamPage").updateOne(
            {},
            {
                $set: updateData,
            },
            {
                upsert: true,
            }
        );

        return Response.json({
            message: "Our Team page updated successfully",
            result
        });

    } catch (error) {
        console.error(error);

        return Response.json(
            { error: "Failed to update Our Team page" },
            { status: 500 }
        );
    }

}