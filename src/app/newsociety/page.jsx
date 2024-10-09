"use client";

import React, { useState } from 'react'
import Image from 'next/image'
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { CgProfile } from "react-icons/cg";
import { MdEmail } from "react-icons/md";
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { useSession } from 'next-auth/react';
import { CldUploadWidget } from 'next-cloudinary';

const NewSociety = () => {
    const session = useSession();

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [publicId, setPublicId] = useState("");
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const reset = () => {
        setName("");
        setAddress("");
        setPassword("");
        setPublicId("");
    }
    const handleRegister = async () => {
        try {
            console.log("name: ", name);
            const res = await axios({
                url: "/api/newsociety",
                data: {
                    name,
                    address,
                    password,
                    publicId,
                    secretary: session.data?.user?.id
                },
                method: "POST"
            })
            console.log("res: ", res);
            reset();
            alert("added");

        } catch (error) {
            console.log("error in registering a society: ", error);
        }
    }


    return (
        <div className="min-h-screen bg-black flex justify-center items-center">
            {session.data?.user &&
                <div className=" flex w-[80%] h-[80%] bg-blue-500 justify-center items-center rounded-2xl ">

                    <div className='bg-blue-500 w-[50%] h-full'>

                    </div>
                    <div className='flex bg-gray-100 w-[50%] items-center justify-center rounded-r-xl py-8'>

                        {/* form */}
                        <div className=' flex flex-col items-center justify-center p-4 gap-4  w-[80%]' >
                            <div className='flex flex-col justify-center items-center'>
                                <div className='font-semibold text-2xl'>
                                    Add a new Society
                                </div>
                                <div className='text-gray-400 text-lg'>
                                    Enter your info to add
                                </div>
                            </div>
                            {/* name */}
                            <div className='w-full'>
                                <Label htmlFor="name">name</Label>
                                <div className='flex border-[1px] rounded border-black items-center gap-2 px-2 bg-white'>
                                    {/* <CgProfile /> */}
                                    <input type="text" placeholder="name" className="w-full border-none outline-none focus:border-none focus:outline-none py-2" value={name}
                                        onChange={(e) => {
                                            setError(false);
                                            setErrorMessage("");
                                            setName(e.target.value)
                                        }
                                        } />
                                </div>
                            </div>

                            <div className='w-full flex flex-col gap-1'>
                                <Label htmlFor="image">Image</Label>
                                <CldUploadWidget uploadPreset="test12" onSuccess={({ info, event }) => {
                                    console.log("event: ", event);
                                    console.log("info: ", info);
                                    if (event === "success") {
                                        setPublicId(info.public_id);
                                        alert("image uploaded")
                                    }
                                }}>
                                    {({ open }) => {
                                        return (
                                            <button onClick={() => open()} className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full">
                                                {publicId ? "Uploaded" : "Upload"}
                                            </button>
                                        );
                                    }}
                                </CldUploadWidget>
                            </div>





                            <div className='w-full'>
                                <Label htmlFor="address" >Address</Label>
                                <div className='flex border-[1px] rounded border-black items-center gap-2 px-2 bg-white'>
                                    {/* <MdEmail /> */}
                                    <input type="address" placeholder="address" className="w-full border-none outline-none focus:border-none focus:outline-none py-2" value={address}
                                        onChange={(e) => {
                                            setError(false);
                                            setErrorMessage("");
                                            setAddress(e.target.value)
                                        }
                                        } />
                                </div>
                            </div>

                            {/* password */}
                            <div className='w-full'>
                                <Label htmlFor="password" >password</Label>
                                <input type="password" placeholder="Password" className="w-full px-2 py-2 border-[1px] border-black outline-none" value={password}
                                    onChange={(e) => {
                                        setError(false);
                                        setErrorMessage("");
                                        setPassword(e.target.value)
                                    }
                                    } />
                            </div>

                            {/* button */}
                            <div>
                                <Button className="bg-blue-500 hover:bg-blue-400" onClick={handleRegister}>Register now</Button>
                            </div>

                            <div className="text-gray-500">Already a society member? <Link href="/joinsociety" className="text-blue-500 underline hover:text-blue-400">Join a society</Link> </div>

                            {error &&
                                <Alert variant="destructive">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertTitle>Error</AlertTitle>
                                    <AlertDescription>
                                        {errorMessage}
                                    </AlertDescription>
                                </Alert>
                            }
                        </div>
                    </div>

                </div>
            }
        </div>
    )
}

export default NewSociety
