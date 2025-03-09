"use client";

import { useSession } from "next-auth/react";
import { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import the Room component with SSR disabled
const Room = dynamic(() => import("@/components/Room/Room"), { ssr: false });

export default function MeetingPage() {
  const { data: sessionData, status } = useSession();
  const [email, setEmail] = useState("");
  const [roomId, setRoomId] = useState(null);
  const [enteredRoomId, setEnteredRoomId] = useState("");

  // Set email from session when available
  useEffect(() => {
    if (sessionData?.user?.email) {
      setEmail(sessionData.user.email);
    }
  }, [sessionData]);

  const generateRoomId = useCallback(() => {
    const randomRoomId = Math.floor(1000 + Math.random() * 9000);
    setRoomId(randomRoomId);
  }, []);

  const handleJoinRoom = () => {
    if (enteredRoomId) {
      setRoomId(enteredRoomId);
    }
  };

  // Show loading state while session is loading
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {sessionData?.user ? (
        <>
          <h1 className="text-2xl font-bold mb-4">
            Welcome, {email || sessionData.user.email}
          </h1>
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
              {/* Only render Room when we have necessary data */}
              {typeof window !== "undefined" && (
                <Room roomId={roomId} email={sessionData.user.email} />
              )}
            </>
          )}
        </>
      ) : (
        <div>Please sign in to access meetings</div>
      )}
    </div>
  );
}
