import clientPromise from "@/lib/mongodb";

const DB_NAME = "test";
const COLLECTION_NAME = "activityLogs";

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db(DB_NAME);

        const activities = await db
            .collection(COLLECTION_NAME)
            .find({})
            .sort({ createdAt: -1 })
            .limit(5)
            .toArray();

        const formattedActivities = activities.map((activity) => ({
            ...activity,
            _id: activity._id.toString(),
        }));

        return Response.json({
            success: true,
            activities: formattedActivities,
        });
    } catch (error) {
        console.error("Activity fetch error:", error);

        return Response.json(
            {
                success: false,
                message: "Failed to fetch activities",
            },
            { status: 500 }
        );
    }
}