import { connectdb } from "@/lib/db";
import {Society} from "@lib/models" 
import { NextRequest, NextResponse } from "next/server";
export async function POST(req){
    try {
        //connect wiht database each time
        await connectdb();
        //connect
        //destructure your things
        const{name,address,image,secretary}=await req.json();
        console.log(name,address,image,secretary);
        const newSociety=await Society.create({
            name,
            address,
            image,
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