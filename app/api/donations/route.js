import clientPromise from "@/lib/mongodb";

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("test");

        const donations = await db
            .collection("donations")
            .find({ status: "completed" })
            .sort({ createdAt: -1 })
            .toArray();

        const formattedDonations = donations.map((donation) => ({
            ...donation,
            _id: donation._id.toString(),
            createdAt: donation.createdAt
                ? donation.createdAt.toISOString()
                : null,
        }));

        return Response.json(formattedDonations);
    } catch (error) {
        console.error("Fetch donations error:", error);

        return Response.json(
            {
                error: "Failed to fetch donations",
            },
            { status: 500 }
        );
    }
}