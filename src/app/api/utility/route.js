import { connectdb } from "@/lib/db";
import models from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";
export async function PUT(req){
    //this function will return me back all the utilities
    await connectdb();
    try{
        const { societyId } = await req.json();
        console.log("societyId:", societyId);
        const utilities=await models.Utility.find({ societyId});
        console.log("utilities:",utilities)
        return NextResponse.json(utilities); 
    }catch(err){
        console.log("Error in getting utilities: ", err);
        return NextResponse.json({message: "Error in getting utilities", error: err});
    }
}
export async function POST(req){
   try {
    await connectdb();
        console.log("Andhar tho aya");
       const body=await req.json();
       const {
            name,
            description,
            phoneNumber,
            society,
            societyId,
            reviews,
            rating
       } = body;
       console.log("body tho ari hia",body);
       const newUtility=await models.Utility.create({
            name,
            description,
            phoneNumber,
            society,
            societyId,
            reviews,
            rating,
       });
       console.log("New Utility: ", newUtility);
       console.log(newUtility)
       console.log("New utility added successfully")
       return NextResponse.json(newUtility);
    
   } catch (error) {
    console.error("Error saving to database:", error.stack);  // Log full error stack
    return NextResponse.json({ error: 'Failed to create utility' }, { status: 500 });
}


}