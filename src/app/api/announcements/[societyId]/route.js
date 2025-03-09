import { connectdb } from "@/lib/db";
import models from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { societyId } = params; 
    console.log("societyId: ", societyId)
    await connectdb();
    const announcements = await models.Announcements.find({ societyId }); 
    console.log("announcements:", announcements);
    return NextResponse.json({ data: announcements }); 
    // return NextResponse.json({message: "success"})
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to fetch announcements" }, { status: 500 });
  }
}
