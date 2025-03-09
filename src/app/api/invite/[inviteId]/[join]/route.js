import { connectdb } from "@/lib/db";
import { NextResponse } from "next/server";
import models from "@/lib/models";

const Society = models.Society;
const User = models.User;

export async function POST(req, { params }) {
    try {
        await connectdb();
        const { inviteId } = params;
        const { userId } = await req.json();
        console.log(inviteId, userId, `${process.env.NEXT_PUBLIC_BASE_URL}/invite/${inviteId}`);

        const society = await Society.findOne({ inviteLink: `${process.env.NEXT_PUBLIC_BASE_URL}/invite/${inviteId}` });

        if (!society) {
            return NextResponse.json({ error: "Society not found" }, { status: 404 });
        }

        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        console.log(user, society);

        const updatedUser = await User.findByIdAndUpdate(
          { _id: userId },
          {
            $set: {
              society: society.name,
              societyId: society._id,
              role: "member",
            },
          }
        );

        const updatedSociety = await Society.findOneAndUpdate(
          {
            inviteLink: `${process.env.NEXT_PUBLIC_BASE_URL}/invite/${inviteId}`,
          },
          { $addToSet: { members: userId } }
        );
        

        // return NextResponse.json({
        //     updatedUser, updatedSociety
        // });
        return NextResponse.json({
            success: true
        })

    } catch (error) {
        console.error("Error fetching society details:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
