
'use client'
import React, { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';

export default function ComplaintCards() {
    // Sample initial complaint data

    const [complaints, setComplaints] = useState([
        {
            id: '1',
            description: 'Broken streetlight on Main St.',
            dateAdded: new Date('2023-05-15'),
            user: 'user123',
            society: 'society456',
            status: 'pending'
        },
        {
            id: '2',
            description: 'Garbage not collected for a week',
            dateAdded: new Date('2023-05-10'),
            user: 'user789',
            society: 'society456',
            status: 'in-progress'
        },
        {
            id: '3',
            description: 'Noise complaint: loud music after 11 PM',
            dateAdded: new Date('2023-05-05'),
            user: 'user101',
            society: 'society789',
            status: 'resolved'
        }
    ]);
    const [newComplaint, setNewComplaint] = useState({
        description: '',
        society: '',
        status: 'pending'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewComplaint(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const complaint = {
            id: Date.now().toString(),
            ...newComplaint,
            dateAdded: new Date(),
            user: 'currentUser' // In a real app, you'd get this from authentication
        };
        setComplaints(prev => [...prev, complaint]);
        setNewComplaint({ description: '', society: '', status: 'pending' });
    };

    const handleDelete = (id) => {
        setComplaints(prev => prev.filter(complaint => complaint.id !== id));
    };

    // useEffect(() => {
    function getStatusColor(status) {
        switch (status) {
            case 'pending':
                return 'bg-yellow-200 text-yellow-800';
            case 'resolved':
                return 'bg-green-200 text-green-800';
            case 'in-progress':
                return 'bg-blue-200 text-blue-800';
            default:
                return 'bg-gray-200 text-gray-800';
        }
    }
    // },[])

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-6">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Complaints</h1>

            {/* Add Complaint Form */}
            <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Add New Complaint</h2>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={newComplaint.description}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="society" className="block text-sm font-medium text-gray-700">Society ID</label>
                    <input
                        type="text"
                        id="society"
                        name="society"
                        value={newComplaint.society}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                        id="status"
                        name="status"
                        value={newComplaint.status}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                    </select>
                </div>
                <button type="submit" className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Add Complaint
                </button>
            </form>

            {/* Complaints Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {complaints?.map((complaint) => (
                    <div key={complaint.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
                        <div className="p-6">
                            <p className="text-gray-600 text-sm mb-2">
                                {new Intl.DateTimeFormat('en-GB', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                }).format(new Date(complaint.dateAdded))}
                            </p>
                            <p className="text-gray-800 font-semibold mb-4">{complaint.description}</p>
                            <div className="flex justify-between items-center">
                                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(complaint.status)}`}>
                                    {complaint.status}
                                </span>
                                <span className="text-gray-600 text-sm">Society ID: {complaint.society}</span>
                            </div>
                            <button
                                onClick={() => handleDelete(complaint.id)}
                                className="mt-4 text-red-600 hover:text-red-800 focus:outline-none"
                                aria-label="Delete complaint"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}