'use client'
import React, { useState, useEffect } from 'react';
import GoogleMapComponent from '../../../src/components/GoogleMap.js';

const Neighbourhood = () => {
  const [userLocation, setUserLocation] = useState(null);
  console.log(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY)
  const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY; // Use environment variables in production

  useEffect(() => {
    // Get user's real-time location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error("Error fetching location: ", error);
      }
    );
  }, []);

  if (!userLocation) {
    return <div>Loading your location...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Neighbourhood</h1>

      {/* Police Station Section */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Nearby Police Stations</h2>
        <div className="border rounded-lg p-4 shadow-md">
          <GoogleMapComponent
            apiKey={googleApiKey}
            placesType="police"
            userLocation={userLocation}
          />
        </div>
      </section>

      {/* Hospital Section */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Nearby Hospitals</h2>
        <div className="border rounded-lg p-4 shadow-md">
          <GoogleMapComponent
            apiKey={googleApiKey}
            placesType="hospital"
            userLocation={userLocation}
          />
        </div>
      </section>

      {/* Metro Station Section */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Nearby Metro Stations</h2>
        <div className="border rounded-lg p-4 shadow-md">
          <GoogleMapComponent
            apiKey={googleApiKey}
            placesType="subway_station"
            userLocation={userLocation}
          />
        </div>
      </section>
    </div>
  );
};

export default Neighbourhood;
