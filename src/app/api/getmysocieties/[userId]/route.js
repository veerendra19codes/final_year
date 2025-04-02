import { connectdb } from "@/lib/db";
import { NextResponse } from "next/server";
import models from "@/lib/models";

const Society = models.Society;
const User = models.User;

export async function GET(req, { params}) {
    try {
        await connectdb();
        const { userId } = params; 
        console.log("userId: ", userId);
        
        // const { searchParams } = new URL(req.url);
        // const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        const user = await User.findById({ _id: userId});
        console.log('user:', user);

        // Fetch societies where userId is in the members array
        // const societies = await Society.find({ members: userId });

        // Fetch societies where userId is either in the members array or is the secretary
        let societies;
        if(user) {

            societies = await Society.find({
                $or: [
                    { members: userId },
                    { secretary: user.email } // Ensure secretary field stores user ID, not email
                ]
            });
        }
        else {
            societies = await Society.find({ members: userId });
        }

        console.log("my societies:", societies);
        return NextResponse.json({ societies }, { status: 200 });
    } catch (error) {
        console.error("Error fetching societies:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
