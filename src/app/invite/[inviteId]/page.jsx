"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";

export default function InvitePage() {
    const { data: session } = useSession();
    const router = useRouter();
    const { inviteId } = useParams();
    const [society, setSociety] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isMember, setIsMember] = useState(false);

    useEffect(() => {
        if (!inviteId || !session?.user?.id) return;
        
        fetch(`/api/invite/${inviteId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: session.user.id, userEmail: session.user.email }),
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.error) {
                setError(data.error);
            } else {
                // alert("you are a member now")
                setSociety(data.society);
                setIsMember(data.isMember);
            }
            setLoading(false);
            // router.push("/societies")
        })
        .catch(() => {
            setError("Failed to load society details.");
            setLoading(false);
        });
    }, [inviteId, session?.user?.id, session?.user?.email]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Society Invitation</h1>
            {isMember ? (
                <p className="mt-4 text-green-600 font-semibold">
                    ✅ You are already a member of this society!
                </p>
            ) : (
                society && (
                    <div className="mt-6 p-4 border rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold">{society.name}</h2>
                        <p className="mt-2">{society.address}</p>
                        <p className="mt-2">Secretary: {society.secretary}</p>
                        {/* {society.image && <Image src={society.image} alt={society.name} width={100} height={100} className="mt-4 w-64 h-40 object-cover rounded-md" />} */}
                        <button
                            onClick={async () => {
                                console.log(inviteId, session?.user?.id);
                                const res = await fetch(`/api/invite/${inviteId}/join`, {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({ userId: session?.user?.id }),
                                });

                                const data = await res.json();
                                if (data.success) {
                                    alert("You have successfully joined the society!");
                                    router.push("/societies");
                                } else {
                                    alert(data.error || "Failed to join the society.");
                                }
                            }}
                            className="mt-4 p-2 bg-green-500 text-white rounded"
                        >
                            Accept Invitation
                        </button>
                    </div>
                )
            )}
        </div>
    );
}
