import { connectdb } from "@/lib/db";
import { NextResponse } from "next/server";
import models from "@/lib/models";
const Society = models.Society;
const User = models.User;

export async function POST(req) {
    try {
        await connectdb();
        const { name, address, secretary, password, image, inviteLink}  = await req.json();
        // const data = await req.json();
        // console.log("body:", data);

        const exists = await Society.findOne({name});
        
        if(exists) {
            console.log("this society already exists: ", exists);
            return NextResponse.json({message: "This society aleady exists"})
        }

        const newsoc = await Society.create({
            name,
            address,
            password,
            secretary,
            image,
            inviteLink,
        })
        console.log("newsoc:", newsoc);

        const updatedUser = await User.findOneAndUpdate({email: secretary}, {
            $set: {
                society: newsoc.name,
                societyId: newsoc.id,
                role: "secretary"
            }
        })


        console.log("updatedUser: ", updatedUser);
        return NextResponse.json({message: "success", data:newsoc})
    } catch (error) {
        console.log("error in registering a new soc: ", error);
        return NextResponse.json({message: "error in adding new society"})
    }
}