import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

export async function POST(request) {

    try {
        const body = await request.json();

        const { fullName, email, phone, message } = body;

        // Basic validation
        if (!fullName || !email || !message) {
            return Response.json(
                {
                    error: "Full name, email and message are required.",
                },
                { status: 400 }
            );
        }


        const client = await clientPromise;
        const db = client.db("test");

        const contactMessage = {
            fullName: fullName.trim(),
            email: email.trim().toLowerCase(),
            phone: phone?.trim() || "",
            message: message.trim(),
            status: "unread",
            createdAt: new Date(),
        };

        const result = await db
            .collection("contactMessages")
            .insertOne(contactMessage);


        return Response.json(
            {
                message: "Message sent successfully.",
                id: result.insertedId,
            },
            { status: 201 }
        );
    }

    catch (error) {
        console.error("Contact message error:", error);

        return Response.json(
            {
                error: "Failed to send message.",
            },
            { status: 500 }
        );
    }
}


export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("test");

        const messages = await db
            .collection("contactMessages")
            .find({})
            .sort({ createdAt: -1 })
            .toArray();

        const formattedMessages = messages.map((message) => ({
            ...message,
            _id: message._id.toString(),
        }));

        return Response.json(formattedMessages);
    } catch (error) {
        console.error("Fetch contact messages error:", error);

        return Response.json(
            {
                error: "Failed to fetch contact messages.",
            },
            { status: 500 }
        );
    }
}


export async function PATCH(request) {
    try {
        const body = await request.json();

        const { id, status } = body;

        if (!id || !status) {
            return Response.json(
                { error: "ID and status are required." },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db("test");

        const result = await db.collection("contactMessages").updateOne(
            { _id: new ObjectId(id) },
            {
                $set: {
                    status,
                },
            }
        );

        if (result.matchedCount === 0) {
            return Response.json(
                { error: "Message not found." },
                { status: 404 }
            );
        }

        return Response.json({
            message: "Message status updated successfully.",
        });
    } catch (error) {
        console.error(error);

        return Response.json(
            { error: "Failed to update message." },
            { status: 500 }
        );
    }
}



export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return Response.json(
                { error: "Message ID is required." },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db("test");

        const result = await db.collection("contactMessages").deleteOne({
            _id: new ObjectId(id),
        });

        if (result.deletedCount === 0) {
            return Response.json(
                { error: "Message not found." },
                { status: 404 }
            );
        }

        return Response.json({
            message: "Message deleted successfully.",
        });
    } catch (error) {
        console.error(error);

        return Response.json(
            { error: "Failed to delete message." },
            { status: 500 }
        );
    }
}