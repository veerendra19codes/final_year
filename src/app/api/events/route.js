import { connectdb } from "@/lib/db";
import models from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { societyId } = await req.json(); 
    await connectdb();
    const events = await models.Event.find({ society: societyId }); 
    return NextResponse.json({ data: events }); 
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to fetch events" }, { status: 500 });
  }
}

// Add new events to the society, only can be done by committee member or secretary
export async function POST(req) {
  await connectdb();
  try {
    const { eventname, timings, date, societyId } = await req.json();
    if (!eventname || !timings || !date || !societyId) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }
    const society = await models.Society.findById(societyId);
    if (!society) {
      return NextResponse.json({ message: "Society not found" }, { status: 404 });
    }
    
    const newEvent = new models.Event({
      eventname,
      timings,
      date,
      society: society._id,
    });
    await newEvent.save();
    return NextResponse.json({ success: true, data: newEvent }, { status: 201 });
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
