import { connectdb } from "@/lib/db";
import { NextResponse } from "next/server";
import models from "@/lib/models";
const User = models.User;
import bcrypt from "bcryptjs"

export async function POST(req) {
    try {
        await connectdb();

        const { firstname, lastname, email, password, name } = await req.json();
        console.log("req.body: ", firstname);

        const exists = await User.findOne({email});
        console.log("exists: ", exists);

        if(exists) {
            return NextResponse.json({
                message: "User with this email already exists"
            ,status: 411})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            firstname,
            lastname,
            email,
            name,
            password: hashedPassword
        })
        console.log("newUser: ", newUser);

        return NextResponse.json({message: "successfully registered", status: 200});
    } catch (error) {
        console.log("error in registering: ", error);
        return NextResponse.json({
            message: "Something went wrong",status: 411
        })
    }
}