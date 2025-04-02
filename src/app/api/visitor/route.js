import { NextResponse } from "next/server";
import { connectdb } from "@/lib/db";
import models from "@/lib/models";
import mongoose from "mongoose";

const { User, Visitor } = models;

export async function POST(req) {
  try {
    console.log("Inside the visitor route");

    await connectdb(); // Ensure DB connection

    const body = await req.json();
    const { name, attendingHouse, userId } = body;

    console.log("Received Data:", name, attendingHouse, userId);

    // Validate input fields
    if (!name || !attendingHouse || !userId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Find user by userId to get societyId
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    
    if (!user.societyId) {
      return NextResponse.json({ error: "User does not belong to any society" }, { status: 400 });
    }

    console.log(`User ${user.firstname} belongs to Society ID: ${user.societyId}`);

    // Convert societyId to ObjectId safely
    const societyObjectId = new mongoose.Types.ObjectId(user.societyId);

    // Create new visitor entry
    const newVisitor = await Visitor.create({
      name,
      attendingHouse,
      societyId: societyObjectId,
    });

    return NextResponse.json({ 
      message: "Visitor logged successfully", 
      visitor: newVisitor 
    }, { status: 201 });

  } catch (error) {
    console.error("Error saving visitor:", error);
    
    return NextResponse.json({ 
      error: error.message || "Internal server error" 
    }, { status: 500 });
  }
}
