import { connectdb } from "@/lib/db";
import { NextResponse } from "next/server";
import models from "@/lib/models";

const Society = models.Society;

export async function GET(req, { params}) {
    try {
        await connectdb();
        const { userId } = params; 
        console.log("userId: ", userId);
        
        // const { searchParams } = new URL(req.url);
        // const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        // Fetch societies where userId is in the members array
        const societies = await Society.find({ members: userId });
        console.log("societies:", societies);
        return NextResponse.json({ societies }, { status: 200 });
    } catch (error) {
        console.error("Error fetching societies:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
