import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { Readable } from "stream";

export async function POST(request) {
    try {

        const formData = await request.formData();
        const file = formData.get("file");

        if (!file) {
            return NextResponse.json(
                { error: "No file provided" },
                { status: 400 }
            );
        }

        console.log("File received:", file.name);
        console.log("File type:", file.type);
        console.log("File size:", file.size);

        // const bytes = await file.arrayBuffer();
        // const buffer = Buffer.from(bytes);

        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader
                .upload_stream(
                    {
                        folder: "concern-bajura",
                        resource_type: "auto",
                    },
                    (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    }
                );
            Readable.fromWeb(file.stream()).pipe(uploadStream);
        });

        console.log("Cloudinary upload successful:", result.secure_url);



        return NextResponse.json({
            url: result.secure_url,
        });

    } catch (error) {
        console.error("Upload error: ", error);

        return NextResponse.json(
            { error: "Failded to upload file" },
            { status: 500 }
        );
    }
}