import { connectdb } from "@/lib/db";
// import Society from "@lib/model"
import models from "@/lib/models"
const Society = models.Society
import { NextRequest, NextResponse } from "next/server";
export async function POST(req){
    try {
        //connect wiht database each time
        await connectdb();
        //connect
        // connect 2
        //destructure your things
        // const body=await req.json();
        const{name,address,images,secretary}=await req.json();
        // console.log(body);
        // console.log(name,address,image,secretary);
        const newSociety=await Society.create({
            name,
            address,
            images,
            secretary
        })
        return NextResponse.json({
            message:"added society details successfully", 
        })
        
    } catch (error) {
        console.error(error.message);
        return NextResponse.status(500).json({
            message:"Error creating Society"
        })
    }
}