"use client";

import Room from "@/components/Room/Room";
import { useSession } from "next-auth/react";
import { useState, useCallback } from "react";

export default function MeetingPage() {
    const session = useSession();
    const [email, setEmail] = useState("");
    const [roomId, setRoomId] = useState(null);
    const [enteredRoomId, setEnteredRoomId] = useState("");

    const generateRoomId = useCallback(() => {
        const randomRoomId = Math.floor(1000 + Math.random() * 9000);
        setRoomId(randomRoomId);
    }, []);

    const handleJoinRoom = () => {
        if (enteredRoomId) {
            setRoomId(enteredRoomId);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            {session?.data?.user && (
                <>
                    <h1 className="text-2xl font-bold mb-4">Welcome, {email}</h1>
                    {!roomId ? (
                        <>
                            {/* Input field to manually enter a room ID */}
                            <input
                                type="text"
                                placeholder="Enter Room ID"
                                value={enteredRoomId}
                                onChange={(e) => setEnteredRoomId(e.target.value)}
                                className="border rounded p-2 mb-4"
                            />
                            <button
                                onClick={handleJoinRoom}
                                className="bg-green-500 hover:bg-green-300 rounded-xl p-2 text-white mb-4"
                            >
                                Join Room
                            </button>
                            <span className="text-lg font-semibold mb-2">OR</span>
                            <button
                                onClick={generateRoomId}
                                className="bg-blue-500 hover:bg-blue-300 rounded-xl p-2 text-white"
                            >
                                Generate Room ID
                            </button>
                        </>
                    ) : (
                        <>
                            <h2 className="text-lg mt-4">Room ID: {roomId}</h2>
                            {/* Render the Room component once roomId is set */}
                            <Room roomId={roomId} email={session?.data?.user?.email} />
                        </>
                    )}
                </>
            )}
        </div>
    );
}
