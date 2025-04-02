import { connectdb } from "@/lib/db";
import models from "@/lib/models";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req, { params }) {
    await connectdb();
    console.log("Reach here in get req")
    console.log("The id is:"+params.id)
    const user = await models.User.findById(params.id);
    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });
    return NextResponse.json(user);
}
export async function PUT(req, { params }) {
    await connectdb();

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
        return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
    }

    const data = await req.json();
    console.log("Received Data:", data);

    // Use $set to ensure all fields are updated or added
    const user = await models.User.findByIdAndUpdate(
        params.id,
        { $set: data },  // Ensures missing fields are added
        { new: true, upsert: true }  // upsert: true ensures the user is created if not found
    );

    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

    console.log("Updated User:", user);
    return NextResponse.json(user);
}

