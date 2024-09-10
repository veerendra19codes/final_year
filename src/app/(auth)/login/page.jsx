import React from 'react'
import Image from 'next/image'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button} from "@/components/ui/button"
import { CgProfile } from "react-icons/cg";
import { MdEmail } from "react-icons/md";
export default function Login() {
    return (
        <div className="min-h-screen bg-black flex justify-center items-center">
            <div className=" flex w-[80%] h-[80%] bg-white justify-center items-center rounded-2xl ">
               
                    <div className='bg-blue-500 w-[50%] h-auto'>
                    hi

                    </div>
                    <div className='flex bg-gray-100 w-[50%] items-center justify-center rounded-xl py-8'>
                       
                       
                        {/* form */}
                        <div className=' flex flex-col items-center justify-center p-4 gap-4  w-[80%]' >
                            <div className='flex flex-col justify-center items-center'>
                            <div className='font-semibold text-2xl'>
                                REGISTER
                            </div>
                            <div className='text-gray-400 text-lg'>
                                Enter your info to register
                            </div>
                            </div>
                            {/* name */}
                            <div className='flex gap-5 w-full'>
                                <div className='flex flex-col w-[50%] '>
                                    <Label htmlFor="firstname">firstname</Label>
                                    <div className='flex border-[1px] rounded border-black items-center gap-2 px-2 bg-white'>
                                    <CgProfile />
                                    <Input type="text" placeholder="firstname" className=" border-none outline-none" />
                                    </div>
                                </div>
                                <div className='flex flex-col w-[50%]'>

                                    <Label htmlFor="lastname">lastname</Label>
                                    <div className='flex border-[1px] rounded border-black items-center gap-2 px-2 bg-white'>
                                    <CgProfile />
                                    <Input type="text" placeholder="lastname" className=" border-none outline-none" />
                                    </div>
                                </div>
                            </div>


                        {/* email */}

                        <div className='w-full'>
                            <Label htmlFor="email" >Email</Label>
                            <div className='flex border-[1px] rounded border-black items-center gap-2 px-2 bg-white'>
                            <MdEmail/>
                            <Input type="email"  placeholder="Email"  className="border-transparent  outline-transparent focus:border-transparent focus:outline-transparent focus:ring-0 shadow-none" />
                            </div>
                        </div>
                           
                         {/* password */}
                            <div className='w-full'>
                            <Label htmlFor="email" >password</Label>
                            <Input type="password" placeholder="password" className="border-[1px] border-black" />
                            </div>

                        {/* button */}
                        <div>
                           <Button className="bg-blue-500">Register now</Button>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
