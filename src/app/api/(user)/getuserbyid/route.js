import { connectdb } from "@/lib/db";
import { NextResponse } from "next/server";
import models from "@/lib/models";
const User = models.User;

export async function POST(req) {
    try {
        await connectdb();
        const { id } = await req.json();
        console.log("id: ", id);

        const user = await User.findById({_id: id});
        console.log("user: ", user);
        
       
        return NextResponse.json({message: "success", user})
    } catch (error) {

        console.log("error in getting user by id: ", error);
        return NextResponse.json({message: "error in getting user by id"})
    }
}