"use client";
import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useSession } from "next-auth/react";

const ValidateQRCode = () => {
  const { data: session } = useSession();
  const [scannedData, setScannedData] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const [lastScanned, setLastScanned] = useState("");

  useEffect(() => {
    const config = { fps: 10, qrbox: 250 };

    const scanner = new Html5QrcodeScanner("reader", config, false);
    scanner.render(
      async (decodedText) => {
        if (decodedText === lastScanned) return;

        setLastScanned(decodedText);
        setScannedData(decodedText);

        try {
          const data = JSON.parse(decodedText);
          if (data.name && data.attendingHouse) {
            if (!session?.user?.id) {
              setValidationMessage("❌ User session not found!");
              return;
            }

            const response = await fetch("/api/visitor", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: data.name,
                attendingHouse: data.attendingHouse,
                userId: session.user.id,
              }),
            });

            const result = await response.json();
            if (response.ok) {
              setValidationMessage(`✅ Welcome, ${data.name}! Entry logged successfully.`);
            } else {
              setValidationMessage(`❌ ${result.error || "Failed to log entry."}`);
            }
          } else {
            setValidationMessage("⚠️ Invalid QR Code format (missing required fields).");
          }
        } catch (err) {
          setValidationMessage("❌ Invalid QR Code format.");
        }

        setTimeout(() => setLastScanned(""), 3000);
      },
      (errorMessage) => console.warn("QR Scanner Error:", errorMessage)
    );

    return () => {
      scanner.clear().catch((error) => console.error("Failed to clear scanner.", error));
    };
  }, [session, lastScanned]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg border border-gray-200">
        <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">Scan & Validate QR Code</h2>
        
        {/* Scanner Box */}
        <div id="reader" className="w-full border border-gray-300 rounded-lg overflow-hidden"></div>
        
        {/* Display Scanned Data */}
        {scannedData && (
          <div className="mt-4 p-3 text-sm text-gray-700 bg-gray-50 border border-gray-300 rounded-md">
            <strong>Scanned Data:</strong> {scannedData}
          </div>
        )}

        {/* Validation Message */}
        {validationMessage && (
          <div
            className={`mt-4 p-3 text-sm font-medium rounded-md ${
              validationMessage.startsWith("✅") ? "text-green-700 bg-green-50 border border-green-500" :
              validationMessage.startsWith("⚠️") ? "text-yellow-700 bg-yellow-50 border border-yellow-500" :
              "text-red-700 bg-red-50 border border-red-500"
            }`}
          >
            {validationMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default ValidateQRCode;
