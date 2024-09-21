import { Input } from "@/components/ui/input"
import { GiHamburgerMenu } from "react-icons/gi";
import { Clock } from 'lucide-react';
import { FaSearch } from "react-icons/fa";
export default function memberList(){
    return(
        <div className="flex flex-col">
            {/* search box */}
            <div className="flex justify-center gap-4 items-center mt-4" >
            <div>
                <h1>Search:</h1>
            </div>
            <input className="justify-center bg-red-50"  type="text" />
            </div>
            {/* individual tables  */}
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg px-[50px]">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">#</th>
                <th scope="col" className="px-6 py-3">Email</th>
                <th scope="col" className="px-6 py-3">Username</th>
                <th scope="col" className="px-6 py-3">Action</th>
            </tr>
        </thead>
        <tbody>
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">1</th>
                <td className="px-6 py-4">user1@example.com</td>
                <td className="px-6 py-4">user1</td>
                <td className="px-6 py-4">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
            </tr>
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">2</th>
                <td className="px-6 py-4">user2@example.com</td>
                <td className="px-6 py-4">user2</td>
                <td className="px-6 py-4">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
            </tr>
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">3</th>
                <td className="px-6 py-4">user3@example.com</td>
                <td className="px-6 py-4">user3</td>
                <td className="px-6 py-4">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
            </tr>
        </tbody>
    </table>
</div>

        </div>
    )
}
