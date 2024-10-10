import { connectdb } from "@/lib/db";
import { NextResponse } from "next/server";
import models from "@/lib/models";
const Society = models.Society;

export async function GET(req) {
    try {
        await connectdb();

        const socs = await Society.find({});
        console.log("socs: ", socs);
       
        return NextResponse.json({message: "success", socs})
    } catch (error) {

        console.log("error in getting all socs: ", error);
        return NextResponse.json({message: "error in getting all socs"})
    }
}