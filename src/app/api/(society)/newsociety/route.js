import { connectdb } from "@/lib/db";
import { NextResponse } from "next/server";
import models from "@/lib/models";
const Society = models.Society;

export async function POST(req) {
    try {
        await connectdb();
        const { name, address, secretary, password, publicId}  = await req.json();

        const newsoc = await Society.create({
            name,
            address,
            password,
            secretary,
            image_public_id: publicId,
        })
        console.log("newsoc:", newsoc);

        console.log("name: ", name);
        return NextResponse.json({message: "success"})
    } catch (error) {
        console.log("error in registering a new soc: ", error);
    }
}