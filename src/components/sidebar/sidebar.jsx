'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
    ChevronLeft,
    ChevronRight,
    Home,
    Users,
    User,
    Bell,
    AlertTriangle,
    Calendar,
    QrCode,
    MapPin,
    Search,
    Wrench,
    Mail,
    Laptop,
    MessageCircleWarning,
    IndianRupee
} from 'lucide-react'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'

const menuItems = [
    { name: 'Home', icon: Home, path: "/" },
    { name: 'Societies', icon: Users, path: "/societies" },
    { name: 'Announcements', icon: Bell, path: "/announcements" },
    { name: 'Complaints', icon: AlertTriangle, path: "/complaints" },
    { name: 'Events', icon: Calendar, path: "/events" },
    // { name: 'Profile', icon: User, path: "/profile" },
    { name: 'Neighbourhood', icon: MapPin, path: "/neighbourhood" },
    { name: 'Utilities', icon: Wrench, path: "/utilities" },
    { name: 'Letter', icon: Mail, path: "/letters" },
    // { name: 'Meetings', icon: Laptop, path: "/meetings" },
    { name: "Discussions", icon: MessageCircleWarning, path: "/discussion" },
    { name: "Budget", icon: IndianRupee, path: "/budget" },
    {name:"Profile",icon:User,path:"/profile"},
    {name:"Find Members",icon:Search,path:"/friends"},
    {name:"Validate QR code",icon:QrCode,path:"/validate"},
    {name:"Generate QR code",icon:QrCode,path:"/generate"},
    {name:"Entries", icon:QrCode, path:"/entries"}
]


export default function Sidebar() {
    const path = usePathname();
    console.log("path:", path);
    const [isOpen, setIsOpen] = useState(true)

    const session = useSession();
    // console.log("session in sidebar:",session);
    // useEffect(() => {
    //     if(session.data?.user?.role == "guest")
    // })
    return (
        <div className={cn(
            "flex flex-col h-screen bg-blue-700 text-white transition-all duration-300 ease-in-out",
            isOpen ? "w-64" : "w-16", session.status === "unauthenticated" ? "hidden" : ""
        )}>
            <div className="flex justify-between p-4">
                {isOpen ?
                    <div className="flex flex-col w-full justify-center items-center gap-2">

                        <div className="signin/signout w-full flex justify-between gap-4 items-center pl-2">
                            <div>{session?.data?.user?.email}</div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsOpen(!isOpen)}
                                aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                        </div>
                        {session?.data?.user ?
                            <Button variant="destructive" className="hover:bg-red-300 w-full" onClick={() => signOut()}>
                                SignOut
                            </Button>
                            :
                            <Button className="bg-blue-500 hover:bg-blue-300 mx-4 w-full" onClick={() => {
                                console.log("clicked")
                                signIn()
                            }}>
                                SignIn
                            </Button>
                        }
                    </div>

                    :


                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
                    >

                        <ChevronRight className="h-4 w-4" />
                    </Button>
                }
            </div>
            <nav className="flex-1">
                <ul className="space-y-2 py-4 max-h-[80vh] overflow-y-auto">
                    {menuItems.map((item) => (
                        <li key={item.name}>
                            <Link href={item.path}>
                                <Button
                                    variant="ghost"
                                    className={cn(
                                        "w-full justify-start",
                                        isOpen ? "px-4" : "px-0 justify-center",
                                        path == item.path ? "bg-white text-black" : ""
                                    )}
                                >
                                    <item.icon className="h-5 w-5 mr-2" />
                                    {isOpen && <span>{item.name}</span>}
                                </Button>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}