// import SocietyListings from '@/components/societylisting/societylisting'
// import React from 'react'

// const joinsociety = () => {
//     return (
//         <div>
//             <SocietyListings />
//         </div>
//     )
// }

// export default joinsociety

"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SocietyPage() {
    const { data: session } = useSession();
    const router = useRouter();
    const [societies, setSocieties] = useState([]);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [image, setImage] = useState("");
    const [inviteLink, setInviteLink] = useState(null);

    const [mysocieties, setMysocieties] = useState([]);

    useEffect(() => {
        if (session) {
            fetch("/api/getallsocieties")
                .then((res) => res.json())
                .then((data) => {
                    setSocieties(data.socs)
                    console.log("data: ", data.socs);
                    
                });
            console.log(session.user.id);
            fetch(`/api/getmysocieties/${session.user.id}`)
                .then((res) => res.json())
                .then((data) => {
                    console.log('data:', data);
                    setMysocieties(data.societies)
                   
                });
        }
    }, [session]);

    const handleCreateSociety = async () => {
        try {
            const inviteLink = `${window.location.origin}/invite/${session?.user?.id}`;
            console.log("body:", name, password, address, image, inviteLink);
            console.log("inviteLink:", inviteLink);
            const res = await fetch("/api/newsociety", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    address,
                    image,
                    password,
                    secretary: session?.user?.email,
                    inviteLink
                }),
            });
            const data = await res.json();
            console.log("data:", data);
            setSocieties([...societies, data.data]);
            setName("");
            setPassword("");
            setAddress("");
            setImage("");

        } catch (error) {
            console.error("Error creating society", error);
        }
    };

    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Society Page</h1>

        <div className="mt-6">
          <h2 className="text-xl font-semibold">Create a Society</h2>

          <input
            type="text"
            placeholder="Society Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full p-2 border rounded-md"
          />

          <input
            type="text"
            placeholder="Society Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full p-2 border rounded-md mt-2"
          />

          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="block w-full p-2 border rounded-md mt-2"
          />

          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="block w-full p-2 border rounded-md mt-2"
          />

          <button
            onClick={handleCreateSociety}
            className="mt-4 p-2 bg-blue-500 text-white rounded"
          >
            Create Society
          </button>
        </div>

        <div className="mt-4">
          {mysocieties && mysocieties.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold">My Societies</h2>
              {mysocieties.map((society) => (
                <div
                  key={society._id}
                  className="p-4 border rounded-lg shadow-md mb-4"
                >
                  <h3 className="text-lg font-bold">{society.name}</h3>
                  <p>{society.address}</p>
                  <p>Secretary: {society.secretary}</p>
                  <p>
                    Invite Link:{" "}
                    <a href={society.inviteLink}>{society.inviteLink}</a>
                  </p>
                  <p>{society.secretary == session.user.email ? "Your are the secretary": "You are a member"}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-4">
          {societies.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold">All Societies</h2>
              {societies.map((society) => (
                <div
                  key={society._id}
                  className="p-4 border rounded-lg shadow-md mb-4"
                >
                  <h3 className="text-lg font-bold">{society.name}</h3>
                  <p>{society.address}</p>
                  <p>Secretary: {society.secretary}</p>
                  <p>
                    Invite Link:{" "}
                    <a href={society.inviteLink}>{society.inviteLink}</a>
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
}
