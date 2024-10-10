import { connectdb } from "@/lib/db";
import models from "@/lib/models";
const Society = models.Society;
import { NextRequest, NextResponse } from "next/server";
//no need for post ,because sare members ka status dikhege
//no need for get,because sare members ka status dikhege again
//we only need to update payment status
export async function PUT(req) {
    const {id,status,datePaid}=await req.json();
    await connectdb();
    try {
        // Update the user's maintenance status and date paid in the database using the User model
        const updateData = {
            maintenanceStatus: status,
        };

        if (status === "paid") {
            updateData.datePaid = datePaid; 
        } else {
            updateData.datePaid = null; 
        }

        const result = await User.updateOne(
            { _id: id }, 
            { $set: updateData } 
        );

        return res.status(200).json({ message: 'User updated successfully' });
        
    } catch (error) {
        console.error(error);
    }

}

//agar delete karna ho tho
//idt iski zarurat padegi
export async function DELETE(req) {
    const { id } = await req.json(); 

    await connectdb();

    try {
       
        const result = await User.deleteOne({ _id: id });

        

        return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
        
    } catch (error) {
        console.error('Error deleting user:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

