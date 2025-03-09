


"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function ComplaintsPage() {
    const { data: session, status } = useSession();
    const [complaints, setComplaints] = useState([]);
    const [newComplaint, setNewComplaint] = useState({ title: "", description: "" });
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchUserById = async () => {
            try {
                console.log("fetch user")
                console.log(session.user.id)
                const res = await fetch("/api/getuserbyid", {
                    method: "POST",
                    body: JSON.stringify({ id: session.user.id }),
                    headers: {
                        "Content-type": "application/json"
                    }
                })
                console.log('res', res);
                const data = await res.json();
                console.log("data: ", data);

                setUser(data.user);

            } catch (error) {
                console.log("error in fetching user by id: ", error);
            }
        }
        fetchUserById() 
    }, [session]);
    console.log("session:", session);

    useEffect(() => {
        if (session) {
            fetchComplaints();
        }
    }, [user]);

    const fetchComplaints = async () => {
        try {
            const { data } = await axios.get("/api/complaints");
            setComplaints(data);
        } catch (error) {
            console.error("Error fetching complaints", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewComplaint(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/api/complaints", newComplaint);
            fetchComplaints();
            setNewComplaint({ title: "", description: "" });
        } catch (error) {
            console.error("Error submitting complaint", error);
        }
    };

    const handleStatusChange = async (id, status) => {
        try {
            await axios.patch("/api/complaints", { id, status });
            fetchComplaints();
        } catch (error) {
            console.error("Error updating status", error);
        }
    };

    if (status === "loading") return <p>Loading...</p>;
    if (!session) return <p>You must be logged in to view complaints.</p>;

    console.log("user role:", user.role);

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Complaints</h1>

            {/* Members can submit complaints */}
            {user.role === "member" && (
                <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow">
                    <h2 className="text-lg font-semibold mb-2">Add a Complaint</h2>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={newComplaint.title}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border rounded mb-2"
                    />
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={newComplaint.description}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border rounded mb-2"
                    />
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
                </form>
            )}

            {/* List of complaints */}
            <div className="space-y-4">
                {complaints.length === 0 ? (
                    <p>No complaints found.</p>
                ) : (
                    complaints.map((complaint) => (
                        <div key={complaint._id} className="bg-gray-100 p-4 rounded shadow">
                            <h3 className="text-lg font-bold">{complaint.title}</h3>
                            <p className="text-gray-600">{complaint.description}</p>
                            <p className="text-sm text-gray-500">
                                Added: {new Date(complaint.createdAt).toLocaleDateString()} | 
                                Last Updated: {new Date(complaint.updatedAt).toLocaleDateString()}
                            </p>
                            <p className={`inline-block px-2 py-1 rounded text-white ${complaint.status === "pending" ? "bg-yellow-500" : "bg-green-500"}`}>
                                {complaint.status}
                            </p>

                            {/* Secretaries can update status */}
                            {user.role === "secretary" && (
                                <select
                                    value={complaint.status}
                                    onChange={(e) => handleStatusChange(complaint._id, e.target.value)}
                                    className="ml-4 p-1 border rounded"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="resolved">Resolved</option>
                                </select>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
