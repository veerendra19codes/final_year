import { connectdb } from "@/lib/db";
import { NextResponse } from "next/server";
import { User } from "@/lib/models";
import bcrypt from "bcryptjs"

export async function POST(req) {
    try {
        await connectdb();

        const { firstname, lastname, email, password } = await req.json();
        console.log("req.body: ", firstname);

        const exists = await User.findOne({email});
        console.log("exists: ", exists);

        // if(exists) {
        //     return NextResponse.status(411).json({
        //         message: "User with this email already exists"
        //     })
        // }

        // const hashedPassword = await bcrypt.hash(password, 10);

        // const newUser = await User.create({
        //     firstname,
        //     lastname,
        //     email,
        //     password: hashedPassword
        // })

        return NextResponse.json({message: "successfully registered"}).status(200);
    } catch (error) {
        console.log("error in registering: ", res);
        return NextResponse.status(411).json({
            message: "Something went wrong"
        })
    }
}