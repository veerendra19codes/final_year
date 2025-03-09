import { connectdb } from "@/lib/db";
import models from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";

// Add new announcements to the society, only can be done by committee member or secretary
export async function POST(req) {
  await connectdb();
  try {
    const {title, content, society, societyId, secretary } = await req.json();
    
    console.log({title, content, society, societyId, secretary});

    const newAnnouncement = await  models.Announcements.create({
      title, content, society, societyId, secretary
    });
    console.log("newAnnoucement: ", newAnnouncement);

    return NextResponse.json({ success: true, data: newAnnouncement }, { status: 201 });
  } catch (error) {
    console.error(error);
        return NextResponse.json({ message: "Failed to create event" }, { status: 500 });
  }
}

// PUT request to update an event
export async function PUT(req) {
  await connectdb();
  try {
    const { id, eventname, timings, date } = await req.json(); 
    if (!id) {
      return NextResponse.json({ message: "Event ID is required" }, { status: 400 });
    }

    const event = await models.Event.findById(id); 
    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

   
    if (eventname) event.eventname = eventname;
    if (timings) event.timings = timings;
    if (date) event.date = date;

    
    await event.save();
    return NextResponse.json({ success: true, data: event }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to update event" }, { status: 500 });
  }
}
