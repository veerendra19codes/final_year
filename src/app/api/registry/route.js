//registry takses 
// in date ,name,in-time,out-time
//only security/higher member in the organization has the
//charge to update the registry
//society bhi chaye konsi haii
import { connectdb } from "@/lib/db";
import models from "@/lib/models";
const Society = models.Society;
import { NextRequest, NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectdb();
    const {date, name, intime, outtime, userId,societyId}=await req.json();
    console.log(req.json());
    if (!date || !name || !intime || !societyId) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    //check role of user who has edited it:
    //then continue with adding your thing
    const user=await models.User.findById(userId);
    if(!user){
        return res.status(401).json({ error: "User not authorized" });
    }
    if(user.role!=="watchman"){
        return res.status(403).json({ error: "Only watchmen can create registry entries" });
    }


     // Ensure society exists before REGISTRY
     const society = await models.Society.findById(societyId);
     if (!society) {
         return res.status(404).json({ success: false, message: 'Society not found' });
     }

    const registryEntry = await models.Registry.create({
        date,
        name,
        intime,
        outtime,
        user: userId,     
        society: society._id, 
    })

  } catch (error) {
        console.log(error);
  }
}
export async function GET(req){
    try{
        await connectdb();
        const {societyId} = await req.json();
        const registries = await models.Registry.find({
            society:societyId
        });
        return res.json(registries);

    }catch (error) {
        console.log(error);
    }
}

export async function PUT(req){
    try {
        await connectdb();
        // every registry has an unique id and we will use that
        const { id, intime, outtime, date, user, society } = req.body;
        let registry=await models.Registry.findById(id);
        
        if (intime) registry.intime = intime;
        if (outtime) registry.outtime = outtime;
        if (date) registry.date = date;
        if (user) registry.user = user; 
        if (society) registry.society = society; 
        // Save the updated registry
        await registry.save();
        return NextResponse(404).json({data:registry});
    } catch (error) {
        console.error(error)
    }
}