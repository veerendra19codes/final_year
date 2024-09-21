'use client'
import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const libraries = ['places'];
// NOTE THAT WHEN WE MAKE THIS APP WE WILL SET THE DEFUALT LOCAITON TO WHATWVER LOCAITON THE BUILDING IS AT
const mapContainerStyle = {
  height: "500px",
  width: "100%",
};

const GoogleMapComponent = ({ apiKey, placesType }) => {
  const [markers, setMarkers] = useState([]);
  const [userLocation, setUserLocation] = useState(null); // Store user location

  // Fetch user's current location using the Geolocation API
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          // Handle error or fallback to default location
          setUserLocation({
            lat: 19.0760, // Default to Mumbai center if geolocation fails
            lng: 72.8777,
          });
        }
      );
    } else {
      // Geolocation API not supported
      setUserLocation({
        lat: 19.0760, // Default location
        lng: 72.8777,
      });
    }
  }, []); // Run only once when the component mounts

  // Fetch nearby places when the map is fully loaded
  const fetchNearbyPlaces = useCallback((map) => {
    if (!userLocation) return;

    const service = new window.google.maps.places.PlacesService(map);

    const request = {
      location: userLocation,
      radius: '5000', // Radius in meters
      type: placesType // 'police', 'hospital', 'subway_station', etc.
    };

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        const newMarkers = results.map((place) => ({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          name: place.name,
        }));
        setMarkers(newMarkers);
      }
    });
  }, [placesType, userLocation]);

  // onLoad callback for GoogleMap to ensure map is ready before fetching places
  const handleMapLoad = (map) => {
    fetchNearbyPlaces(map);
  };

  if (!userLocation) {
    // Show loading state or placeholder while fetching the location
    return <div>Loading map...</div>;
  }

  return (
    <LoadScript googleMapsApiKey={apiKey} libraries={libraries}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        center={userLocation} // Dynamically center the map based on user's location
        onLoad={handleMapLoad} // Fetch places when map loads
      >
        {markers.map((marker, index) => (
          <Marker 
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
            title={marker.name}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;
