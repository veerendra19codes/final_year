"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function ComplaintsPage() {
  const { data: session, status } = useSession();
  const [complaints, setComplaints] = useState([]);
  const [newComplaint, setNewComplaint] = useState({
    title: "",
    description: "",
  });
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUserById = async () => {
      try {
        if (!session?.user?.id) return;
        const res = await fetch("/api/getuserbyid", {
          method: "POST",
          body: JSON.stringify({ id: session.user.id }),
          headers: { "Content-type": "application/json" },
        });
        const data = await res.json();
        setUser(data.user);
      } catch (error) {
        console.error("Error fetching user by ID:", error);
      }
    };
    fetchUserById();
  }, [session]);

  useEffect(() => {
    if (session) {
      fetchComplaints();
    }
  }, [user, session]);

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
    setNewComplaint((prev) => ({ ...prev, [name]: value }));
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

  if (status === "loading")
    return <p className="text-center mt-4">Loading...</p>;
  if (!session)
    return (
      <p className="text-center mt-4">
        You must be logged in to view complaints.
      </p>
    );

  return (
    <div className="w-full min-h-screen p-6 bg-gray-50 text-black flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-center">Complaints</h1>

      {/* Complaint Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-4 rounded-lg shadow-md mb-6"
      >
        <h2 className="text-xl font-semibold mb-3">Add a Complaint</h2>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newComplaint.title}
          onChange={handleInputChange}
          required
          className="w-full p-3 border rounded-md mb-3 focus:ring-2 focus:ring-blue-400"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={newComplaint.description}
          onChange={handleInputChange}
          required
          className="w-full p-3 border rounded-md mb-3 focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>

      {/* List of Complaints */}
      <div className="w-full max-w-lg space-y-4">
        {complaints.length === 0 ? (
          <p className="text-center">No complaints found.</p>
        ) : (
          complaints.map((complaint) => (
            <div
              key={complaint._id}
              className="bg-white p-4 rounded-lg shadow-md"
            >
              <h3 className="text-lg font-bold mb-1">{complaint.title}</h3>
              <p className="text-gray-600 mb-2">{complaint.description}</p>
              <p className="text-sm text-gray-500">
                Added: {new Date(complaint.createdAt).toLocaleDateString()} |
                Last Updated:{" "}
                {new Date(complaint.updatedAt).toLocaleDateString()}
              </p>
              <p
                className={`inline-block px-3 py-1 rounded-md text-white mt-4 ml-2 ${
                  complaint.status === "pending"
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
              >
                {complaint.status}
              </p>

              {/* Secretaries can update status */}
              {user.role === "secretary" && (
                <select
                  value={complaint.status}
                  onChange={(e) =>
                    handleStatusChange(complaint._id, e.target.value)
                  }
                  className="ml-2 p-2  mt-2 border rounded-md focus:ring-2 focus:ring-blue-400"
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
