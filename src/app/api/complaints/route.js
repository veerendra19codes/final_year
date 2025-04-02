

import { getServerSession } from "next-auth";
import { connectdb } from "@/lib/db";
// import Complaint from "@/models/Complaint";
// import User from "@/models/User";
import models from "@/lib/models";

const Complaint = models.Complaint;
const User = models.User;

export async function GET(req) {
  const session = await getServerSession(req);
  if (!session)
    return Response.json({ error: "Unauthorized" }, { status: 401 });

  await connectdb();

  const user = await User.findOne({ email: session.user.email });
  if (!user) return Response.json({ error: "User not found" }, { status: 404 });

  // Fetch complaints for the user's society
  const complaints = await Complaint.find({
    societyId: user.societyId,
  }).populate("author", "firstname lastname");

  return Response.json(complaints, { status: 200 });
}

export async function POST(req) {
  const session = await getServerSession(req);
  if (!session)
    return Response.json({ error: "Unauthorized" }, { status: 401 });

  await connectdb();

  const user = await User.findOne({ email: session.user.email });
  if (!user) return Response.json({ error: "User not found" }, { status: 404 });

  // if (user.role !== "member") {
  //   return Response.json(
  //     { error: "Only members can create complaints" },
  //     { status: 403 }
  //   );
  // }

  const { title, description } = await req.json();
  const newComplaint = new Complaint({
    title,
    description,
    author: user._id,
    societyId: user.societyId,
  });

  await newComplaint.save();
  return Response.json(newComplaint, { status: 201 });
}

export async function PATCH(req) {
  const session = await getServerSession(req);
  if (!session)
    return Response.json({ error: "Unauthorized" }, { status: 401 });

  await connectdb();

  const user = await User.findOne({ email: session.user.email });
  if (!user) return Response.json({ error: "User not found" }, { status: 404 });

  if (user.role !== "secretary") {
    return Response.json(
      { error: "Only secretaries can update complaints" },
      { status: 403 }
    );
  }

  const { id, status } = await req.json();
  const complaint = await Complaint.findById(id);

  if (!complaint)
    return Response.json({ error: "Complaint not found" }, { status: 404 });
  if (complaint.societyId.toString() !== user.societyId.toString()) {
    return Response.json(
      { error: "Unauthorized to update this complaint" },
      { status: 403 }
    );
  }

  complaint.status = status;
  complaint.updatedAt = new Date();
  await complaint.save();

  return Response.json(complaint, { status: 200 });
}
