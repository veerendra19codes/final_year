"use client";

import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const letterFormats = [
  {
    title: "Additional Car Parking Permission",
    format: "Dear Secretary,\n\nI am writing to request permission for an additional car parking space. [Your reason here]\n\nThank you for your consideration.\n\nSincerely,\n[Your Name]",
    color: "bg-gray-800"
  },
  {
    title: "Home Renovation Permission",
    format: "Dear Secretary,\n\nI am writing to seek permission for home renovation. [Details of renovation]\n\nThank you for your attention to this matter.\n\nBest regards,\n[Your Name]",
    color: "bg-gray-800"
  },
  {
    title: "Guest Stay Permission",
    format: "Dear Secretary,\n\nI would like to request permission for a guest to stay at my residence. [Guest details and duration]\n\nThank you for your understanding.\n\nKind regards,\n[Your Name]",
    color: "bg-gray-800"
  },
  {
    title: "Event Hosting Permission",
    format: "Dear Secretary,\n\nI am writing to request permission to host an event in the society premises. [Event details]\n\nThank you for your cooperation.\n\nSincerely,\n[Your Name]",
    color: "bg-gray-800"
  },
  {
    title: "Pet Ownership Permission",
    format: "Dear Secretary,\n\nI am writing to seek permission to keep a pet in my residence. [Pet details]\n\nThank you for your consideration.\n\nBest wishes,\n[Your Name]",
    color: "bg-gray-800"
  },
  {
    title: "Satellite Dish Installation Permission",
    format: "Dear Secretary,\n\nI would like to request permission to install a satellite dish. [Installation details]\n\nThank you for your attention to this request.\n\nSincerely,\n[Your Name]",
    color: "bg-gray-800"
  },
  {
    title: "Business From Home Permission",
    format: "Dear Secretary,\n\nI am writing to seek permission to operate a small business from my home. [Business details]\n\nThank you for your consideration.\n\nBest regards,\n[Your Name]",
    color: "bg-gray-800"
  }
];

export default function LetterHeads() {
  const [selectedLetter, setSelectedLetter] = useState(null);

  const handleCardClick = (index) => {
    setSelectedLetter(selectedLetter === index ? null : index);
  };

  const handleUploadAndSend = () => {
    const input = document.createElement('input');
    input.type = 'file';

    input.onchange = async (e) => {
      const file = e.target.files[0];

      if (!file) {
        toast.error("Please select a file to upload.");
        return;
      }

      // Simulate the upload process
      toast.info(`Uploading ${file.name}...`);

      // Simulate upload delay
      setTimeout(() => {
        toast.success(`Request for "${file.name}" sent to the secretary.`);
      }, 2000); // Simulate 2 seconds of upload time
    };

    input.click(); // Open the file dialog
  };

  return (
    <div className="min-h-screen bg-cover bg-center p-8" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1920&q=80')" }}>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Society Letter Formats</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {letterFormats.map((letter, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-all duration-300 ${selectedLetter === index ? 'scale-105' : 'hover:scale-105'
                }`}
              onClick={() => handleCardClick(index)}
            >
              <div className={`p-6 border-t-4 ${letter.color}`}>
                <h2 className="text-xl font-semibold text-white mb-2">{letter.title}</h2>
                {selectedLetter === index && (
                  <div className="mt-4">
                    <pre className="whitespace-pre-wrap text-sm text-white">{letter.format}</pre>
                    <button
                      onClick={handleUploadAndSend}
                      className={`mt-4 ${letter.color} text-white font-semibold py-2 px-4 rounded hover:opacity-90 transition-opacity duration-300`}
                    >
                      Upload & Send
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
