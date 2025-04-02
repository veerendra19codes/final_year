"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();
  
  return (
    <div className="w-full flex flex-col">
      <div 
        className="hero flex w-full justify-center items-center min-h-screen bg-gradient-to-r from-white to-blue-500"
        style={{
          // background: "linear-gradient(to right, #dceeff, rgba(0, 0, 255, 0))",
          transition: "background 0.5s ease-in-out",
        }}
      >
        <div className="left w-1/2 flex flex-col gap-8 justify-center items-start px-16">
          <h1 className="text-blue-500 font-bold text-5xl text-start">
            Simplify Living, Empower Communities
          </h1>
          <p className="text-blue-400 text-start text-2xl">
            Streamline Society Management with Seamless Communication, Payments, and Support
            —All in One Place
          </p>
          <div className="flex gap-4 justify-center items-start">
            <Link href="/societies" className="rounded-3xl px-8 py-2 bg-blue-500 text-white">
              + Join a society
            </Link>
            {session.status == "authenticated" ? (
              <Link href="/announcements" className="rounded-3xl px-8 py-2 bg-blue-500 text-white">
                See Latest News
              </Link>
            ) : (
              <Link href="/login" className="rounded-3xl px-8 py-2 bg-blue-500 text-white">
                Login
              </Link>
            )}
          </div>
        </div>

        <div className="right w-1/2 flex justify-center items-center pr-16">
          <Image 
            src="/pexels.jpg" 
            alt="hero" 
            width={900} 
            height={900} 
            className="object-cover w-[500px] h-[350px] rounded-xl"
            style={{
              filter: "drop-shadow(0px 10px 30px rgba(0, 0, 0, 0.1))",
            }}
          />
        </div>
      </div>
    </div>
  );
}
