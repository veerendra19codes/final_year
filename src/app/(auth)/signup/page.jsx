"use client";

import React, { useState } from 'react'
import Image from 'next/image'
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { CgProfile } from "react-icons/cg";
import { MdEmail } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function Signup() {
    const router = useRouter();
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const name = `${firstname} ${lastname}`;
            const res = await fetch("/api/signup", {
                method: "POST",
                body: JSON.stringify({ firstname, lastname, email, name, password })
            })
            const data = await res.json();

            if (data.status == 200) {
                router.push('/login')
            } else {
                setError(true);
                setErrorMessage(data.message);
            }
        } catch (error) {
            console.log("error in registering: ", error);
        }
    }

    return (
        <div className="min-h-screen bg-white flex justify-center items-center shadow-2xl">
            <div className="flex w-[80%] h-[80%] bg-blue-500 justify-center items-center rounded-2xl ">
                <div className='bg-blue-500 w-[50%] h-full'></div>
                <div className='flex bg-gray-100 w-[50%] items-center justify-center rounded-r-xl py-8'>
                    <form className='text-black flex flex-col items-center justify-center p-4 gap-4 w-[80%]' onSubmit={handleRegister}>
                        <div className='flex flex-col justify-center items-center'>
                            <div className='font-semibold text-2xl'>REGISTER</div>
                            <div className='text-gray-400 text-lg'>Enter your info to register</div>
                        </div>
                        <div className='flex gap-5 w-full'>
                            <div className='flex flex-col w-[50%] '>
                                <Label htmlFor="firstname">Firstname</Label>
                                <div className='flex border-[1px] rounded border-black items-center gap-2 px-2 bg-white text-black'>
                                    <CgProfile />
                                    <input type="text" placeholder="Firstname" className="w-full border-none outline-none py-2" value={firstname} onChange={(e) => { setError(false); setErrorMessage(""); setFirstname(e.target.value) }} />
                                </div>
                            </div>
                            <div className='flex flex-col w-[50%]'>
                                <Label htmlFor="lastname">Lastname</Label>
                                <div className='flex border-[1px] rounded border-black items-center gap-2 px-2 bg-white text-black'>
                                    <CgProfile />
                                    <input type="text" placeholder="Lastname" className="w-full border-none outline-none py-2" value={lastname} onChange={(e) => { setError(false); setErrorMessage(""); setLastname(e.target.value) }} />
                                </div>
                            </div>
                        </div>
                        <div className='w-full'>
                            <Label htmlFor="email">Email</Label>
                            <div className='flex border-[1px] rounded border-black items-center gap-2 px-2 bg-white'>
                                <MdEmail />
                                <input type="email" placeholder="Email" className="w-full border-none outline-none py-2" value={email} onChange={(e) => { setError(false); setErrorMessage(""); setEmail(e.target.value) }} />
                            </div>
                        </div>
                        <div className='w-full'>
                            <Label htmlFor="password">Password</Label>
                            <div className='flex border-[1px] rounded border-black items-center gap-2 px-2 bg-white'>
                                <input type={showPassword ? "text" : "password"} placeholder="Password" className="w-full border-none outline-none py-2" value={password} onChange={(e) => { setError(false); setErrorMessage(""); setPassword(e.target.value) }} />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="focus:outline-none">
                                    {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                </button>
                            </div>
                        </div>
                        <div>
                            <Button className="bg-blue-500 hover:bg-blue-400">Register now</Button>
                        </div>
                        <div className="text-gray-500">Already have an account? <Link href="/login" className="text-blue-500 underline hover:text-blue-400">Log in</Link></div>
                        {error && <Alert variant="destructive"><AlertCircle className="h-4 w-4" /><AlertTitle>Error</AlertTitle><AlertDescription>{errorMessage}</AlertDescription></Alert>}
                    </form>
                </div>
            </div>
        </div>
    )
}
