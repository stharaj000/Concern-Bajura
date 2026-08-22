import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import clientPromise from "./mongodb";

const client = await clientPromise;

try {
    await client.db("admin").command({ ping: 1 });
    console.log("✅ MongoDB Connected");
} catch (err) {
    console.error("❌ MongoDB Connection Failed:", err);
}


const db = client.db();

export const auth = betterAuth({
    database: mongodbAdapter(db),
    emailAndPassword: {
        enabled: true,
    },

    user: {
        additionalFields: {
            role: {
                type: "string",
                defaultValue: "user",
                input: false,
            },
        },
    },
})