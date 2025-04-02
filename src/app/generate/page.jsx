'use client';
import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useSession } from "next-auth/react";

const GenerateQRCode = () => {
  const { data: session } = useSession();
  const [visitorName, setVisitorName] = useState("");
  const [visitorPhone, setVisitorPhone] = useState("");
  const [attendingHouse, setAttendingHouse] = useState("");
  const [qrData, setQrData] = useState("");

  const handleGenerate = () => {
    if (!visitorName || !visitorPhone || !attendingHouse) {
      alert("Please enter all visitor details.");
      return;
    }

    const societyId = session?.user?.societyId || "UNKNOWN_SOCIETY";

    const payload = {
      name: visitorName.trim(),
      phone: visitorPhone.trim(),
      attendingHouse: attendingHouse.trim(),
      societyId,
    };

    setQrData(JSON.stringify(payload));
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md max-w-lg mx-auto">
      <h2 className="text-xl font-bold text-blue-600 mb-4 text-center">Generate Visitor QR Code</h2>

      <input
        type="text"
        value={visitorName}
        onChange={(e) => setVisitorName(e.target.value)}
        placeholder="Visitor Name"
        className="w-full p-2 border rounded mb-3"
      />
      <input
        type="text"
        value={visitorPhone}
        onChange={(e) => setVisitorPhone(e.target.value)}
        placeholder="Visitor Phone"
        className="w-full p-2 border rounded mb-3"
      />
      <input
        type="text"
        value={attendingHouse}
        onChange={(e) => setAttendingHouse(e.target.value)}
        placeholder="Attending House (e.g., A-101)"
        className="w-full p-2 border rounded mb-3"
      />

      <button onClick={handleGenerate} className="w-full bg-blue-600 text-white p-2 rounded">
        Generate QR Code
      </button>

      {qrData && (
        <div className="mt-4 text-center">
          <p className="text-blue-600 mb-2">Scan or share this QR Code with the visitor:</p>
          <QRCodeCanvas value={qrData} size={256} />
          <p className="text-gray-600 text-sm mt-2">Raw QR Data: {qrData}</p>
        </div>
      )}
    </div>
  );
};

export default GenerateQRCode;
