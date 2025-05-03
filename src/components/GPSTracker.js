import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
  margin: '20px 0'
};

const GPSTracker = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/sensor');
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        console.log('GPS Data received:', data); // Debug log
        
        if (data && typeof data.lat === 'number' && typeof data.lng === 'number') {
          setLocation({
            lat: data.lat,
            lng: data.lng,
            speed: data.speed || 0
          });
          console.log('Location updated:', { lat: data.lat, lng: data.lng });
        } else {
          console.warn('Invalid GPS data format:', data);
        }
      } catch (err) {
        console.error('GPS fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
    const interval = setInterval(fetchLocation, 2000); // Update every 2 seconds
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div>Loading GPS data...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!location) return <div>Waiting for GPS signal...</div>;

  return (
    <div>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={location}
          zoom={18}
        >
          {location && (
            <Marker
              position={location}
              title="Current Location"
            />
          )}
        </GoogleMap>
      </LoadScript>
      <div style={{ marginTop: '10px', padding: '15px' }}>
        <p><strong>Live Location:</strong></p>
        <p>Latitude: {location?.lat?.toFixed(6)}</p>
        <p>Longitude: {location?.lng?.toFixed(6)}</p>
        <p>Speed: {location?.speed} km/h</p>
      </div>
    </div>
  );
};

export default GPSTracker;
