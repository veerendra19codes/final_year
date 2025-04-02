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
    const [image, setImage] = useState(null);
    const [inviteLink, setInviteLink] = useState(null);
    const [mysocieties, setMysocieties] = useState([]);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (session) {
            fetch("/api/getallsocieties")
                .then((res) => res.json())
                .then((data) => setSocieties(data.socs));

            fetch(`/api/getmysocieties/${session.user.id}`)
                .then((res) => res.json())
                .then((data) => setMysocieties(data.societies));
        }
    }, [session]);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            setImage(data.imageUrl);
        } catch (error) {
            console.error("Error uploading image", error);
        }
    };

    const handleCreateSociety = async () => {
        try {
            const inviteLink = `${window.location.origin}/invite/${session?.user?.id}`;
            const res = await fetch("/api/newsociety", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    address,
                    image,
                    password,
                    secretary: session?.user?.email,
                    inviteLink,
                }),
            });
            const data = await res.json();
            setSocieties([...societies, data.data]);
            setName("");
            setPassword("");
            setAddress("");
            setImage(null);
        } catch (error) {
            console.error("Error creating society", error);
        }
    };

    return (
      <div className="min-h-screen bg-white text-blue-600 p-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          Society Management
        </h1>

        <div className="bg-blue-100 p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Create a Society</h2>

          <input
            type="text"
            placeholder="Society Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full p-3 border border-blue-300 rounded-md mb-3"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Society Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full p-3 border border-blue-300 rounded-md mb-3 pr-10"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="block w-full p-3 border border-blue-300 rounded-md mb-3"
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full p-3 border border-blue-300 rounded-md mb-3"
          />

          <button
            onClick={handleCreateSociety}
            className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition"
          >
            Create Society
          </button>
        </div>

        {mysocieties.length > 0 && (
          <div className="mt-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">My Societies</h2>
            {mysocieties.map((society) => (
              <div
                key={society._id}
                className="p-4 border border-blue-300 bg-blue-50 rounded-lg shadow-md mb-4"
              >
                <h3 className="text-xl font-bold">{society.name}</h3>
                <p className="text-blue-700">{society.address}</p>
                <p className="text-sm text-blue-500">
                  Secretary: {society.secretary}
                </p>
                <p className="text-sm">
                  Invite Link:{" "}
                  <a
                    target="_blank"
                    href={society.inviteLink}
                    className="text-blue-500 underline"
                  >
                    {society.inviteLink}
                  </a>
                </p>
                <p className="mt-2 font-semibold">
                  {society.secretary === session.user.email
                    ? "You are the secretary"
                    : "You are a member"}
                </p>
              </div>
            ))}
          </div>
        )}

        {societies.length > 0 && (
          <div className="mt-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">All Societies</h2>
            {societies.map((society) => (
              <div
                key={society._id}
                className="p-4 border border-blue-300 bg-blue-50 rounded-lg shadow-md mb-4"
              >
                <h3 className="text-xl font-bold">{society.name}</h3>
                <p className="text-blue-700">{society.address}</p>
                <p className="text-sm text-blue-500">
                  Secretary: {society.secretary}
                </p>
                <p className="text-sm">
                  Invite Link:{" "}
                  <a
                    href={society.inviteLink}
                    className="text-blue-500 underline"
                    target="_blank"
                  >
                    {society.inviteLink}
                  </a>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
}
