// import { connectdb } from "@/lib/db";
// import models from "@/lib/models";  // Import models (including Complaint)
// import { NextResponse } from "next/server";



// export async function POST(req) {
//     await connectdb();  // Connect to the database
//     const { desc, date, userid, societyid, status } = await req.json();  // Destructure incoming request data
    
//     try {
//         const newComplaint = new models.Complaint({
//             description: desc,
//             dateAdded: date || Date.now(),  // If no date provided, default to current date
//             user: userid,  // Reference to User
//             society: societyid,  // Reference to Society
//             status: status || "pending"  // Default status is 'pending' if not provided
//         });

//         await newComplaint.save();  // Save the new complaint to the database

//         return NextResponse.json({ message: 'Complaint created successfully' }, { status: 201 });
//     } catch (error) {
//         console.error('Error creating complaint:', error);
//         return NextResponse.json({ error: 'Failed to create complaint' }, { status: 500 });
//     }
// }


// export async function PUT(req) {
//     await connectdb();  // Connect to the database
//     const { desc, date, userid, societyid, status, complaintId } = await req.json();  // Destructure incoming request data
    
//     try {
//         // Prepare the update data object
//         const updateData = {};
//         if (desc) updateData.description = desc;
//         if (date) updateData.dateAdded = date;
//         if (userid) updateData.user = userid;
//         if (societyid) updateData.society = societyid;
//         if (status) updateData.status = status;

//         // Update the complaint with the provided complaintId
//         const updatedComplaint = await models.Complaint.updateOne(
//             { _id: complaintId },  // Find by complaint ID
//             { $set: updateData }  // Update fields with the provided data
//         );

//         if (updatedComplaint.nModified === 0) {
//             return NextResponse.json({ message: 'Complaint not found or no changes made' }, { status: 404 });
//         }

//         return NextResponse.json({ message: 'Complaint updated successfully' }, { status: 200 });
//     } catch (error) {
//         console.error('Error updating complaint:', error);
//         return NextResponse.json({ error: 'Failed to update complaint' }, { status: 500 });
//     }
// }





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

  if (user.role !== "member") {
    return Response.json(
      { error: "Only members can create complaints" },
      { status: 403 }
    );
  }

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
