import clientPromise from "@/lib/mongodb";

export async function GET() {

    try {
        const client = await clientPromise;
        const db = await client.db("test");

        const aboutpage = await db.collection("aboutpage").findOne({});

        return Response.json(aboutpage);
    }
    catch (error) {
        console.error(error);

        return Response.json(
            { error: "Failed to fetch aboutpage." },
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

        const result = await db.collection("aboutpage").updateOne(
            {},
            {
                $set: updateData,
            },
            {
                upsert: true,
            }
        );

        return Response.json({
            message: "Aboutpage updated successfully",
            result
        });

    } catch (error) {
        console.error(error);

        return Response.json(
            { error: "Failed to update Aboutpage" },
            { status: 500 }
        );
    }

}