import clientPromise from "@/lib/mongodb";

const DB_NAME = "test";
const COLLECTION_NAME = "activityLogs";

export async function createActivity({
    type,
    action,
    description,
}) {
    try {
        const client = await clientPromise;
        const db = client.db(DB_NAME);

        await db.collection(COLLECTION_NAME).insertOne({
            type,
            action,
            description,
            createdAt: new Date(),
        });
    } catch (error) {
        console.error("Activity log error:", error);
    }
}