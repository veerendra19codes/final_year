"use client";

import React, { useState } from 'react'
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { MdEmail } from "react-icons/md";
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = async () => {
        try {
            const res = await signIn("credentials", {
                redirect: false,
                email,
                password,
            })
            console.log("res:", res);
            // const data = await res.json();

            if (res.status) {
                router.push("/")
            }
            else {
                setError(true);
                setErrorMessage(data.message);
            }
        } catch (error) {
            console.log("error in logging in: ", error);
            setError(true);
            setErrorMessage("Something went wrong")
        }
    }

    return (
        <div className="min-h-screen bg-black flex justify-center items-center">
            <div className=" flex w-[80%] h-[80%] bg-blue-500 justify-center items-center rounded-2xl ">

                <div className='bg-blue-500 w-[50%] h-ful'>

                </div>
                <div className='flex bg-gray-100 w-[50%] items-center justify-center rounded-r-xl py-8'>


                    {/* form */}
                    <div className=' flex flex-col items-center justify-center p-4 gap-4  w-[80%]' >
                        <div className='flex flex-col justify-center items-center'>
                            <div className='font-semibold text-2xl'>
                                LOGIN
                            </div>
                            <div className='text-gray-400 text-lg'>
                                Enter your info to LOGIN
                            </div>
                        </div>



                        {/* email */}

                        <div className='w-full'>
                            <Label htmlFor="email" >Email</Label>
                            <div className='flex border-[1px] rounded border-black items-center gap-2 px-2 bg-white'>
                                <MdEmail />
                                <input type="email" placeholder="Email" className="w-full border-none outline-none focus:border-none focus:outline-none py-2"
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                        setError(false)
                                    }} />
                            </div>
                        </div>

                        {/* password */}
                        <div className='w-full'>
                            <Label htmlFor="email" >password</Label>
                            <input type="password" placeholder="password" className="w-full pl-4 focus:outline-none py-2 border-[1px] border-black"
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                    setError(false)
                                }} />
                        </div>

                        {/* button */}
                        <div>
                            <Button className="bg-blue-500 hover:bg-blue-400" onClick={handleLogin}>Login</Button>
                        </div>

                        <div className="text-gray-500">Don&apos;t have an account? <Link href="/signup" className="text-blue-500 underline hover:text-blue-400">Sign up</Link> </div>

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
        </div>
    )
}
