
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import "./Chatbot2.css";
import { usePathname } from 'next/navigation'


export default function Chatbot2() {
  const [query, setQuery] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingPlaces, setFetchingPlaces] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState(null);

  // Load history from localStorage on component mount
  useEffect(() => {
    const storedHistory = localStorage.getItem("localPlacesChatHistory");
    if (storedHistory) {
      setChatHistory(JSON.parse(storedHistory));
    }
  }, []);

  // Save chat history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("localPlacesChatHistory", JSON.stringify(chatHistory));
  }, [chatHistory]);

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = "en-US";

      recognitionInstance.addEventListener("result", (event) => {
        const resultTranscript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join("");
        setTranscript(resultTranscript);
        setQuery(resultTranscript);
      });

      recognitionInstance.addEventListener("end", () => {
        setIsRecording(false);
      });

      setRecognition(recognitionInstance);
    }
  }, []);

  const startRecording = (e) => {
    e.preventDefault();
    if (!isRecording && recognition) {
      recognition.start();
      setIsRecording(true);
      setTranscript("");
    }
  };

  const stopRecording = (e) => {
    e.preventDefault();
    if (isRecording && recognition) {
      recognition.stop();
    }
  };

  // Function to fetch and index nearby places
  const fetchPlaces = async () => {
    try {
      setFetchingPlaces(true);
      await axios.post("http://localhost:5000/fetch-places");
      setChatHistory((prev) => [
        ...prev,
        { role: "bot", text: "Places fetched and indexed successfully! You can now ask questions about nearby places." }
      ]);
    } catch (error) {
      console.error("Error fetching places:", error);
      setChatHistory((prev) => [
        ...prev,
        { role: "bot", text: "Failed to fetch places. Please try again." }
      ]);
    } finally {
      setFetchingPlaces(false);
    }
  };

  // Function to query the chatbot
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (!query.trim()) {
      return;
    }

    // Add user's question to the history
    const newQuery = query;
    setChatHistory((prev) => [...prev, { role: "user", text: newQuery }]);
    setQuery("");

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/query", {
        query: newQuery
      });
      
      setChatHistory((prev) => [
        ...prev,
        { role: "bot", text: res.data.response }
      ]);
    } catch (error) {
      console.error("Error querying chatbot:", error);
      setChatHistory((prev) => [
        ...prev,
        { role: "bot", text: "Failed to get a response. Please try again." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const path = usePathname();

  return (
    <div className={`absolute bottom-1 right-0 z-50 ${path == "/login" || path == "/register" ? "hidden" : ""}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-400 rounded-lg px-4 py-2 text-white"
      >
        {isOpen ? "Close Chatbot" : "Open Chatbot"}
      </button>

      {isOpen && (
        <div className="fixed bottom-16 right-4 w-80 h-96 bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col">
          <div className="bg-blue-500 text-white p-2 rounded-t-lg flex justify-between items-center">
            <h3 className="font-medium">📍 Local Places Chatbot</h3>
            <button
              onClick={fetchPlaces}
              disabled={fetchingPlaces}
              className="bg-white text-blue-500 px-2 py-1 rounded-md text-sm hover:bg-gray-100"
            >
              {fetchingPlaces ? "Fetching..." : "Fetch Places"}
            </button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto">
            {chatHistory.map((chat, index) => (
              <div key={index} className={`mb-2 ${chat.role === "user" ? "text-right" : "text-left"}`}>
                <div
                  className={`inline-block p-2 rounded-lg ${
                    chat.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                >
                  {chat.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-center">
                <span className="inline-block w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></span>
              </div>
            )}
          </div>

          <form className="flex flex-col p-2 gap-2" onSubmit={handleSubmit}>
            {/* Voice recording controls */}
            <div className="controls flex flex-col gap-2">
              <div className="flex gap-2 justify-center items-center">
                <button 
                  onClick={startRecording} 
                  disabled={isRecording} 
                  className={`rounded-lg border-[1px] ${isRecording ? 'bg-gray-300 border-gray-400' : 'border-black hover:bg-gray-100'} px-2 py-1 text-sm`}
                >
                  Speak
                </button>
                <button 
                  onClick={stopRecording} 
                  disabled={!isRecording} 
                  className={`rounded-lg border-[1px] ${!isRecording ? 'bg-gray-300 border-gray-400' : 'border-black hover:bg-gray-100'} px-2 py-1 text-sm`}
                >
                  Stop
                </button>
              </div>
              
              {/* Speaking indicator */}
              {isRecording && (
                <div className="text-center text-sm text-red-500 font-medium flex items-center justify-center gap-1">
                  <span className="inline-block w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  You are speaking...
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about nearby places..."
                className="flex-1 border-2 border-gray-300 p-2 rounded-lg resize-none"
                rows={1}
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !query.trim()}
                className={`ml-2 rounded-lg px-4 py-2 text-white ${loading || !query.trim() ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-400'}`}
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}