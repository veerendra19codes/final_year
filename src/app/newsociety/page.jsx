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

const NewSociety = () => {
    return (
        <div className="min-h-screen bg-black flex justify-center items-center">
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
                        <div className='flex gap-5 w-full'>
                            <div className='flex flex-col w-[50%] '>
                                <Label htmlFor="name">name</Label>
                                <div className='flex border-[1px] rounded border-black items-center gap-2 px-2 bg-white'>
                                    <CgProfile />
                                    <input type="text" placeholder="name" className="w-full border-none outline-none focus:border-none focus:outline-none py-2" value={name}
                                        onChange={(e) => {
                                            setError(false);
                                            setErrorMessage("");
                                            setName(e.target.value)
                                        }
                                        } />
                                </div>
                            </div>
                            <div className='flex flex-col w-[50%]'>

                                <Label htmlFor="lastname">lastname</Label>
                                <div className='flex border-[1px] rounded border-black items-center gap-2 px-2 bg-white'>
                                    <CgProfile />
                                    <input type="text" placeholder="Lastname" className="w-full border-none outline-none focus:border-none focus:outline-none py-2" value={lastname}
                                        onChange={(e) => {
                                            setError(false);
                                            setErrorMessage("");
                                            setLastname(e.target.value)
                                        }
                                        } />
                                </div>
                            </div>
                        </div>


                        {/* email */}

                        <div className='w-full'>
                            <Label htmlFor="email" >Email</Label>
                            <div className='flex border-[1px] rounded border-black items-center gap-2 px-2 bg-white'>
                                <MdEmail />
                                <input type="email" placeholder="Email" className="w-full border-none outline-none focus:border-none focus:outline-none py-2" value={email}
                                    onChange={(e) => {
                                        setError(false);
                                        setErrorMessage("");
                                        setEmail(e.target.value)
                                    }
                                    } />
                            </div>
                        </div>

                        {/* password */}
                        <div className='w-full'>
                            <Label htmlFor="password" >password</Label>
                            <input type="password" placeholder="Password" className="w-full pl-4 py-2 border-[1px] border-black outline-none" value={password}
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

                        <div className="text-gray-500">Already have an account? <Link href="/login" className="text-blue-500 underline hover:text-blue-400">Log in</Link> </div>

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

export default NewSociety
