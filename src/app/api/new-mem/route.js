import { connectdb } from "@/lib/db";
import models from "@/lib/models";
const Society = models.Society;
import { NextRequest, NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectdb(); 

    const { userId, societyName } = await req.json(); 
    console.log(userId, societyName);

    const society = await Society.findOne({ name: societyName });
    if (!society) {
      return NextResponse.json({ message: "Society not found" }, { status: 404 });
    }

    
    society.members = society.members || [];
    console.log("length is ", society.members.length);

    if (!society.members.includes(userId)) {
     
      console.log(userId + " is already in the members array")
      society.members.push(userId);
    } else {
      return NextResponse.json({ message: "User is already a member of this society" }, { status: 400 });
    }

    await society.save();

    return NextResponse.json({ message: "User added to the society successfully!" }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Something went wrong", error }, { status: 500 });
  }
}
