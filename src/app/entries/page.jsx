"use client";
import React, { useState } from "react";

const VisitorEntries = () => {
  const [date, setDate] = useState("");
  const [visitorEntries, setVisitorEntries] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const fetchVisitorEntries = async () => {
    if (!date) {
      setErrorMessage("Please enter a date.");
      return;
    }

    try {
      setErrorMessage("");
      const response = await fetch(`/api/entries?date=${date}`);
      const result = await response.json();

      if (response.ok) {
        setVisitorEntries(result.visitors);
      } else {
        setErrorMessage(result.error || "Failed to fetch data.");
        setVisitorEntries([]);
      }
    } catch (error) {
      setErrorMessage("Error fetching data.");
      setVisitorEntries([]);
    }
  };

  return (
    <div style={{ background: "#fff", padding: "30px", maxWidth: "800px", margin: "40px auto", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
      <h2 style={{ color: "#1976d2", marginBottom: "20px" }}>Visitor Entries for Specific Date</h2>

      <div>
        <input
          type="date"
          value={date}
          onChange={handleDateChange}
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc", marginBottom: "20px", width: "100%" }}
        />
      </div>
      
      <button
        onClick={fetchVisitorEntries}
        style={{
          padding: "10px 20px",
          backgroundColor: "#1976d2",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          width: "100%",
        }}
      >
        Show Entries
      </button>

      {errorMessage && (
        <p style={{ color: "red", fontWeight: "bold", marginTop: "20px" }}>{errorMessage}</p>
      )}

      {visitorEntries.length > 0 && (
        <table style={{ marginTop: "30px", width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f1f1f1" }}>
              <th style={{ padding: "10px", textAlign: "left", border: "1px solid #ddd" }}>Name</th>
              <th style={{ padding: "10px", textAlign: "left", border: "1px solid #ddd" }}>Attending House</th>
              <th style={{ padding: "10px", textAlign: "left", border: "1px solid #ddd" }}>Society ID</th>
              <th style={{ padding: "10px", textAlign: "left", border: "1px solid #ddd" }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {visitorEntries.map((entry) => (
              <tr key={entry._id}>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{entry.name}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{entry.attendingHouse}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{entry.societyId}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {new Date(entry.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default VisitorEntries;
