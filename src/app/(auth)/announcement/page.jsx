import { Input } from "@/components/ui/input"
import { GiHamburgerMenu } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";
export default function announcement(){
    return(
            <div className=" bg-gray-100">
<div className="flex flex-col ">
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
            {/* Add anouncement */}
            <div className="mt-[45px] px-2">
                <button className="w-full border-2 bg-white rounded-full px-6 py-2 text-lg ">Add Announcement</button>
            </div>
            {/* Feb 19 2022 */}
            <div className="flex flex-col mt-[22px] pl-[25px] bg-white">
                <div>
                    <h1 className="text-red-500 font-bold">Feb 19 2022</h1>
                </div>
                <button  className="w-full text-start text-[20px] rounded-[7px]">
                    <h1 className="  font-bold">Society Meeting</h1>
                    <h1 className="">Society meeting is held on 1st march 2022 at 7:00pm in the Society Club house </h1>
                </button>
                <button  className="w-full text-start text-[20px]">
                    <h1 className="  font-bold">Society Meeting</h1>
                    <h1 className="">Society meeting is held on 1st march 2022 at 7:00pm in the Society Club house </h1>
                </button>
                <button  className="w-full text-start text-[20px]">
                    <h1 className="  font-bold">Society Meeting</h1>
                    <h1 className="">Society meeting is held on 1st march 2022 at 7:00pm in the Society Club house </h1>
                </button>
                </div>
            {/* 2nd one */}
            <div className="flex flex-col mt-[22px] pl-[25px] bg-white">
                <div>
                    <h1 className="text-red-500 font-bold">Feb 19 2022</h1>
                </div>
                <button  className="w-full text-start  font-bold text-[20px]">Society Meeting</button>
                <h1>Society meeting is held on 1st march 2022 at 7:00pm in the Society Club house </h1>
                
            </div>
            <div></div>
</div>
            </div>
    )
}
