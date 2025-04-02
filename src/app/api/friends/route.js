import { connectdb } from "@/lib/db";
import { NextResponse } from "next/server";
import models from "@/lib/models";
const { User } = models;


export async function GET(req) {
    try {
        console.log("Fetching friends...");
        await connectdb();

        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        // Get full user details
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        console.log(`User found: ${user.firstname} ${user.lastname}, SocietyId: ${user.societyId}`);

        if (!user.societyId) {
            return NextResponse.json({ error: "User does not belong to a society" }, { status: 400 });
        }

        // Fetch all users in the same society (excluding current user)
        const friends = await User.find({ societyId: user.societyId, _id: { $ne: userId } })
            .select("firstname lastname phoneNumber profileImage"); // Fetch only required fields

        return NextResponse.json(friends, { status: 200 });

    } catch (error) {
        console.error("Error fetching friends:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
