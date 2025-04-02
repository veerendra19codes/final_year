"use client";
import React, { useState, useEffect } from "react";
import GoogleMapComponent from "../../../src/components/GoogleMap.js";

const Neighbourhood = () => {
  const [userLocation, setUserLocation] = useState(null);
  const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => console.error("Error fetching location: ", error)
    );
  }, []);

  if (!userLocation) return <div>Loading your location...</div>;

  return (
    <div className="p-6 bg-white text-black">
      <h1 className="text-3xl font-bold mb-6 text-center">Neighbourhood</h1>

      {["police", "hospital", "subway station"].map((type, index) => (
        <section key={index} className="mb-8 w-[80%] mx-auto">
          <h2 className="text-xl font-bold mb-4 capitalize">Nearby {type}s</h2>
          <div className="border rounded-lg p-4 shadow-md bg-white">
            <GoogleMapComponent apiKey={googleApiKey} placesType={type} userLocation={userLocation} />
          </div>
        </section>
      ))}
    </div>
  );
};

export default Neighbourhood;
