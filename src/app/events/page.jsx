import { Input } from "@/components/ui/input"
import { GiHamburgerMenu } from "react-icons/gi";
import { Clock } from 'lucide-react';
import { FaSearch } from "react-icons/fa";
export default function events(){
    return(
        <div className=" bg-slate-100 min-h-screen">
        <div className="flex flex-col">
                    {/* navbar */}
                    <div className="flex  bg-white flex-row justify-between pl-[30px] pt-[26px] py-[6px]"> 
                
                <div className="flex items-center gap-2">
                <GiHamburgerMenu />
                    <h1>Announcement</h1>
                </div>
                <div className="flex items-center gap-3 justify-center">
                <div className="relative w-full">
          <input
            className="w-full py-2 px-4 pr-10 rounded-lg border focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Search..."
          />
          <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-yellow-700" />
        </div>
                </div>
                <div>
                <button className="border-2 rounded-full px-6 py-2 text-lg">
          Soham Dubewar
        </button>
                </div>
                
            </div>
        {/* 2022 hardcode */}
        <div className="justify-center items-center w-full flex text-gray-500 pt-4">
            <h1>
            2022
            </h1>
            </div>
        {/* single line div */}
        <div>
            <h1 className="bg-black h-[1px]"></h1>
        </div>
        {/* cards of events */}
        <div className="flex flex-col px-[50px] py-[20px] gap-5">
            {/* card starts */}
            <div className="bg-[#DBAE5F] h-[80px] flex-row items-center rounded-2xl  justify-center ">
        <div className="flex h-full items-center ">
        <div className="flex flex-col bg-black h-full w-[70px] rounded-2xl text-white items-center justify-center">
      <h1 className="text-xl ">13</h1>
      <h1 className="text-sm">Jan</h1>
    </div>
        {/* Event content */}
            <div className="flex flex-col px-[35px]">
            <h1 className="text-black w-full  font-bold text-2xl">Lohri</h1>
            <div className="flex bg-[#de8c00]">
            <Clock className="pl-2"/>
            <h1 className="text-black w-full px-3">8:00 pm</h1>
            </div>
            </div>
        </div>
        </div>

        <div className="bg-[#DBAE5F] h-[80px] flex-row items-center rounded-md  justify-center">
        <div className="flex h-full items-center ">
        <div className="flex flex-col bg-black h-full w-[70px] text-white items-center justify-center">
      <h1 className="text-xl">13</h1>
      <h1 className="text-sm">Jan</h1>
    </div>
        {/* Event content */}
            <div className="flex flex-col px-[35px]">
            <h1 className="text-black w-full  font-bold text-2xl">Lohri</h1>
            <h1 className="text-black w-full  bg-[#de8c00] px-4">8:00 pm</h1>
            </div>
        </div>
        </div>

        <div className="bg-[#DBAE5F] h-[80px] flex-row items-center rounded-md  justify-center">
        <div className="flex h-full items-center ">
        <div className="flex flex-col bg-black h-full w-[70px] text-white items-center justify-center">
      <h1 className="text-xl">13</h1>
      <h1 className="text-sm">Jan</h1>
    </div>
        {/* Event content */}
            <div className="flex flex-col px-[35px]">
            <h1 className="text-black w-full  font-bold text-2xl">Lohri</h1>
            <h1 className="text-black w-full  bg-[#de8c00] px-4">8:00 pm</h1>
            </div>
        </div>
        </div>
            </div>
            </div>
            </div>
    )
}
