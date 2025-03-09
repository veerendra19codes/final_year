import { connectdb } from "@/lib/db";
import { NextResponse } from "next/server";
import models from "@/lib/models";

const Society = models.Society;
const User = models.User;

export async function POST(req, { params }) {
    try {
        await connectdb();
        const { inviteId } = params;
        const { userId, userEmail } = await req.json();

        const society = await Society.findOne({ inviteLink: `${process.env.NEXT_PUBLIC_BASE_URL}/invite/${inviteId}` });

        if (!society) {
            return NextResponse.json({ error: "Society not found" }, { status: 404 });
        }

        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const isMember = society.members.includes(userId) || society.secretary == userEmail;

        return NextResponse.json({
            society: {
                name: society.name,
                address: society.address,
                image: society.image,
                secretary: society.secretary,
            },
            isMember,
        });

    } catch (error) {
        console.error("Error fetching society details:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
