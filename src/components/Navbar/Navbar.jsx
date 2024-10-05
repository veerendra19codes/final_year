"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Links from "./Links/Links";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
    const session = useSession();
    const path = usePathname();
    console.log("path: ", path);
    const router = useRouter();

    console.log("session: ", session);
    useEffect(() => {
        if ((path == "login" || path == "signup") && session.status == "authenticated") router.replace("/");
        if (session.status == "unauthenticated") router.replace("/login");
    }, [])

    if (path == "/login" || path == "/signup") return null;

    return (
        <div className="w-full h-16 shadow-xl flex justify-between p-2 items-center">
            <div className="logo mx-4">
                Logo
            </div>
            <Links />
            <div className="signin/signout flex  gap-4 items-center">
                <div>{session?.data?.user?.email}</div>
                {session?.data?.user ?
                    <Button variant="destructive" className="hover:bg-red-300" onClick={() => signOut()}>
                        SignOut
                    </Button>
                    :
                    <Button className="bg-blue-500 hover:bg-blue-300 mx-4" onClick={() => signIn()}>
                        SignIn
                    </Button>
                }
            </div>
        </div>
    )
}

export default Navbar
