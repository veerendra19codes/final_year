"use client";
import { useState, useEffect, useCallback } from "react";
import io from "socket.io-client";
import ReactPlayer from "react-player";
import peer from "@/service/peer"; // Keep your WebRTC peer service setup

let socket;

const Room = ({ roomId, email }) => {
    const [remoteSocketId, setRemoteSocketId] = useState(null);
    const [myStream, setMyStream] = useState();
    const [remoteStream, setRemoteStream] = useState();

    useEffect(() => {
        // Connect to the Socket.io server
        socket = io();

        socket.emit("room:join", { email, room: roomId });

        socket.on("user:joined", ({ email, id }) => {
            setRemoteSocketId(id);
            console.log(`${email} joined with ID: ${id}`);
        });

        socket.on("incoming:call", async ({ from, offer }) => {
            setRemoteSocketId(from);
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
            setMyStream(stream);
            const ans = await peer.getAnswer(offer);
            socket.emit("call:accepted", { to: from, ans });
        });

        socket.on("call:accepted", ({ from, ans }) => {
            peer.setRemoteAnswer(ans);
            console.log(`Call accepted by ${from}`);
        });

        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, [roomId, email]);

    const handleCallUser = useCallback(async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        setMyStream(stream);
        const offer = await peer.getOffer();
        socket.emit("user:call", { to: remoteSocketId, offer });
    }, [remoteSocketId]);

    return (
        <div className="flex flex-col justify-center items-center p-8 w-full">
            <h1>Room ID: {roomId}</h1>
            {myStream && <button onClick={handleCallUser} className="my-4 font-bold text-2xl">Call</button>}
            <div className="flex gap-8">
                {myStream && (
                    <div>
                        <h1>My Stream</h1>
                        <ReactPlayer playing muted height="250px" width="400px" url={myStream} />
                    </div>
                )}
                {remoteStream && (
                    <div>
                        <h1>Other&apos;s Stream</h1>
                        <ReactPlayer playing muted height="250px" width="400px" url={remoteStream} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Room;
