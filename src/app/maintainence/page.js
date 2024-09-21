import { Calendar } from 'lucide-react'
import React from 'react'

const Maintainence = () => {
  return (
    <div className="bg-gray-100 min-h-screen text-start items-center px-8 py-24">
      <div className="box flex flex-col bg-white shadow-xl border-[1px] border-gray-100">

        <div className="top flex justify-between p-3 w-full items-center">
            <div className="Heading font-bold">Billing List</div>
            <button className="bg-blue-500 hover:bg-blue-500 p-1 text-white w-[200px] text-center rounded-lg">+ New</button>
        </div>

        <div className="middle w-full border-y-2 border-gray-300 flex justify-center items-center py-4">
            <div className="box flex flex-col gap-2 w-1/2">
                <label className="text-gray-500 text-start w-full">Month</label>

                <div className="filter-search w-full flex gap-4">

                    <div className="input rounded-lg border-[1px] border-gray-500 p-1 w-3/5 flex items-center   justify-between relative">
                        <input type="text" placeholder="May, 2022" className="text-gray-500 border-none outline-none focus:border-none focus:outline-none w-4/5" />
                        <Calendar  className=" right-2 absolute"/>
                    </div>

                    <button className="bg-blue-500 hover:bg-blue-500 p-1   w-2/5 text-center rounded-lg  text-white">Filter</button>
                </div>
            </div>
        </div>

        <div className="bottom flex flex-col gap-2 p-2">

            <div className="pagination flex w-full justify-between items-center">
                <div className="text-gray-500">
                    Show 
                    <select className="border-[1px] border-gray-500 rounded-lg">
                        <option>5</option>
                        <option>10</option>
                        <option>25</option>
                        <option>50</option>
                    </select> 
                    entries
                </div>

                <div className="search">
                    Search: 
                    <input type="text" placeholder="Ramesh" className="text-gray-500 border-[1px] border-gray-500 rounded-lg pl-2" />
                </div>
            </div>

            <table className="border-[1px] border-gray-500">
                <thead>
                    <tr>
                        <th className="p-2 text-start font-bold">Sr no.</th>
                        <th className="p-2 text-start font-bold">Date</th>
                        <th className="p-2 text-start font-bold">Members</th>
                        <th className="p-2 text-start font-bold">Total Amount</th>
                        <th className="p-2 text-start font-bold">Status</th>
                        <th className="p-2 text-start font-bold">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td className="p-2 text-gray-500 text-start">1</td>
                        <td className="p-2 text-gray-500 text-start">May, 2022</td>
                        <td className="p-2 text-gray-500 text-start">Frederick J Baker</td>
                        <td className="p-2 text-gray-500 text-start">1500</td>
                        <td className="p-2  text-center text-red-500">Unpaid</td>
                        <td className="p-2 text-gray-500 flex justify-center items-center gap-2" >
                            <button className="text-blue-500 border-[1px] border-blue-500 px-2">View</button >
                            <button className="text-blue-500 border-[1px] border-blue-500 px-2">Edit</button>
                            <button className="text-red-500 border-[1px] border-red-500 px-2">Delete</button>
                        </td>

                    </tr>
                    <tr>
                        <td className="p-2 text-gray-500 text-start">1</td>
                        <td className="p-2 text-gray-500 text-start">May, 2022</td>
                        <td className="p-2 text-gray-500 text-start">Frederick J Baker</td>
                        <td className="p-2 text-gray-500 text-start">1500</td>
                        <td className="p-2  text-center text-red-500">Unpaid</td>
                        <td className="p-2 text-gray-500 flex justify-center items-center gap-2" >
                            <button className="text-blue-500 border-[1px] border-blue-500 px-2">View</button >
                            <button className="text-blue-500 border-[1px] border-blue-500 px-2">Edit</button>
                            <button className="text-red-500 border-[1px] border-red-500 px-2">Delete</button>
                        </td>

                    </tr>
                </tbody>
            </table>

            <div className="flex justify-between p-2 items-center">
                <div classname="text-gray-500">
                    Showing 1 of 5 entries
                </div>

                <div className="paginationm flex gap-2">
                    <button className="border-[1px] border-gray-500 p-2 rounded-lg">Prev</button>
                    <button className="border-[1px] border-gray-500 p-2 rounded-lg">1</button>
                    <button className="border-[1px] border-gray-500 p-2 rounded-lg">Next</button>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Maintainence
