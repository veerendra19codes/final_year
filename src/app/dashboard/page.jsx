import { Input } from '@/components/ui/input'
import { IoSearch } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import React from 'react'

const Dashboard = () => {
    return (
        <div className="bg-gray-100 flex flex-col justify-start items-center gap-4 min-h-screen">

            {/* topbar */}
            <div className="top-bar w-full h-16 shadow-xl bg-white flex justify-between p-2 items-center">
                <div className="page-name font-bold">Dashboard</div>

                <div className="searchbar flex justify-center items-center gap-2">
                    <Input type="text" placeholder="Search" className="bg-gray-100 text-gray-500 h-12 pl-4 " />
                    <div className="p-3 bg-red-400 flex justify-center items-center cursor-pointer rounded"><IoSearch className="text-white text-2xl" /></div>
                </div>

                <div className="bg-gray-100 p-4 rounded text-gray-500 text-sm h-12 flex items-center">Soham Dubekar</div>
            </div>

            {/* toprow  */}
            <div className="top-row flex flex-wrap justify-center items-center w-[80%] gap-4">

                <div className="box p-4  flex gap-4 justify-between bg-white shadow-sm rounded-lg items-center w-1/5 h-[150px]">
                    <div className="left text-start flex flex-col justify-center">
                        <div className="title font-semibold">Total members</div>
                        <div className="numbers text-2xl font-semibold">
                            14
                        </div>
                    </div>
                    <div className="icons">
                        <CgProfile className="text-red-400 text-[50px]" />
                    </div>
                </div>

                <div className="box p-4 flex gap-4 justify-between bg-white shadow-sm rounded-lg items-center  w-1/5 h-[150px]">
                    <div className="left text-start flex flex-col justify-center">
                        <div className="title font-semibold">Total
                            Committe members</div>
                        <div className="numbers text-2xl font-semibold">
                            5
                        </div>
                    </div>
                    <div className="icons">
                        <CgProfile className="text-red-400 text-[50px]" />
                    </div>
                </div>

                <div className="box p-4  flex gap-4 justify-between bg-white shadow-sm rounded-lg items-center  w-1/5 h-[150px]">
                    <div className="left text-start flex flex-col justify-center">
                        <div className="title font-semibold">Socity Funds</div>
                        <div className="numbers text-2xl font-semibold">
                            9.78L
                        </div>
                    </div>
                    <div className="icons">
                        <CgProfile className="text-red-400 text-[50px]" />
                    </div>
                </div>

                <div className="box p-4  flex gap-4 justify-between bg-white shadow-sm rounded-lg items-center  w-1/5 h-[150px]">
                    <div className="left text-start flex flex-col justify-center">
                        <div className="title font-semibold">Unpaid bills</div>
                        <div className="numbers text-2xl font-semibold">
                            5
                        </div>
                    </div>
                    <div className="icons">
                        <CgProfile className="text-red-400 text-[50px]" />
                    </div>
                </div>


            </div>
            {/* Registry and committe members */}
            <div className="registry-and committee-members flex gap-4 w-[80%]">

                {/* registry  */}
                <div className="registry flex flex-col gap-4 bg-white p-4 shadow-sm w-3/5">
                    <div className="font-bold text-3xl">
                        Registry
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th className="text-xl font-semibold text-start">Date</th>
                                <th className="text-xl font-semibold text-start">Name</th>
                                <th className="text-xl font-semibold text-start">In-time</th>
                                <th className="text-xl font-semibold text-start">Out-time</th>

                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td className="text-start text-gray-500">18-12-2022</td>
                                <td className="text-start text-gray-500">Messi</td>
                                <td className="text-start text-gray-500">9:00</td>
                                <td className="text-start text-gray-500">12:00</td>
                            </tr>
                            <tr>
                                <td className="text-start text-gray-500">18-12-2022</td>
                                <td className="text-start text-gray-500">Messi</td>
                                <td className="text-start text-gray-500">9:00</td>
                                <td className="text-start text-gray-500">12:00</td>
                            </tr>
                            <tr>
                                <td className="text-start text-gray-500">18-12-2022</td>
                                <td className="text-start text-gray-500">Messi</td>
                                <td className="text-start text-gray-500">9:00</td>
                                <td className="text-start text-gray-500">12:00</td>
                            </tr>
                            <tr>
                                <td className="text-start text-gray-500">18-12-2022</td>
                                <td className="text-start text-gray-500">Messi</td>
                                <td className="text-start text-gray-500">9:00</td>
                                <td className="text-start text-gray-500">12:00</td>
                            </tr>
                            <tr>
                                <td className="text-start text-gray-500">18-12-2022</td>
                                <td className="text-start text-gray-500">Messi</td>
                                <td className="text-start text-gray-500">9:00</td>
                                <td className="text-start text-gray-500">12:00</td>
                            </tr>
                            <tr>
                                <td className="text-start text-gray-500">18-12-2022</td>
                                <td className="text-start text-gray-500">Messi</td>
                                <td className="text-start text-gray-500">9:00</td>
                                <td className="text-start text-gray-500">12:00</td>
                            </tr>
                            <tr>
                                <td className="text-start text-gray-500">18-12-2022</td>
                                <td className="text-start text-gray-500">Messi</td>
                                <td className="text-start text-gray-500">9:00</td>
                                <td className="text-start text-gray-500">12:00</td>
                            </tr>
                            <tr>
                                <td className="text-start text-gray-500">18-12-2022</td>
                                <td className="text-start text-gray-500">Messi</td>
                                <td className="text-start text-gray-500">9:00</td>
                                <td className="text-start text-gray-500">12:00</td>
                            </tr>
                            <tr>
                                <td className="text-start text-gray-500">18-12-2022</td>
                                <td className="text-start text-gray-500">Messi</td>
                                <td className="text-start text-gray-500">9:00</td>
                                <td className="text-start text-gray-500">12:00</td>
                            </tr>
                            <tr>
                                <td className="text-start text-gray-500">18-12-2022</td>
                                <td className="text-start text-gray-500">Messi</td>
                                <td className="text-start text-gray-500">9:00</td>
                                <td className="text-start text-gray-500">12:00</td>
                            </tr>
                            <tr>
                                <td className="text-start text-gray-500">18-12-2022</td>
                                <td className="text-start text-gray-500">Messi</td>
                                <td className="text-start text-gray-500">9:00</td>
                                <td className="text-start text-gray-500">12:00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* committe members  */}
                <div className="committee-members flex flex-col gap-4 bg-white p-4 shadow-sm w-2/5">
                    <div className="font-bold text-3xl">
                        Committe Members
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th className="text-xl font-semibold text-start">Name</th>
                                <th className="text-xl font-semibold text-start">Flat no.</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td className="text-start text-gray-500">Ronaldo</td>
                                <td className="text-start text-gray-500">A101</td>
                            </tr>
                            <tr>
                                <td className="text-start text-gray-500">Ronaldo</td>
                                <td className="text-start text-gray-500">A101</td>
                            </tr>
                            <tr>
                                <td className="text-start text-gray-500">Ronaldo</td>
                                <td className="text-start text-gray-500">A101</td>
                            </tr>
                            <tr>
                                <td className="text-start text-gray-500">Ronaldo</td>
                                <td className="text-start text-gray-500">A101</td>
                            </tr>
                            <tr>
                                <td className="text-start text-gray-500">Ronaldo</td>
                                <td className="text-start text-gray-500">A101</td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
