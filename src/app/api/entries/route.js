import { NextResponse } from "next/server";
import { connectdb } from "@/lib/db";
import models from "@/lib/models";
import mongoose from "mongoose";

const { Visitor } = models;

export async function GET(req) {
  try {
    // Extract the date query parameter
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");

    if (!date) {
      return NextResponse.json({ error: "Date is required" }, { status: 400 });
    }

    // Parse the date
    const parsedDate = new Date(date);
    const startOfDay = new Date(parsedDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(parsedDate.setHours(23, 59, 59, 999));

    console.log("Fetching entries for date:", parsedDate);

    // Connect to the database
    await connectdb();

    // Find all visitors whose createdAt is within the given date range
    const visitors = await Visitor.find({
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    }).lean();

    if (visitors.length === 0) {
      return NextResponse.json({ error: "No entries found for this date." }, { status: 404 });
    }

    return NextResponse.json({ visitors });
  } catch (error) {
    console.error("Error fetching visitor entries:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
