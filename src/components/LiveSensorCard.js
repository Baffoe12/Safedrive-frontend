import React, { useEffect, useState, useCallback } from 'react';
import debounce from 'lodash/debounce';

const LiveSensorCard = () => {
  const [sensorData, setSensorData] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  const updateSensorData = useCallback(
    debounce((newData) => {
      if (!sensorData || newData.id !== sensorData.id) {
        console.log('Received sensor data:', newData);
        setSensorData(newData);
        setLastUpdate(new Date().toISOString());
      }
    }, 500),
    [sensorData]
  );

  useEffect(() => {
    if (!sensorData) return;
    
    console.log('LCD Display value:', sensorData.lcdDisplay || 'HELLO LCD');
    console.log('Timestamp:', lastUpdate);
    console.log('Data ID:', sensorData.id);
  }, [sensorData, lastUpdate]);

  return (
    <div>
      <h1>Live Sensor Data</h1>
      <p>ID: {sensorData?.id}</p>
      <p>Alcohol Level: {sensorData?.alcohol}</p>
      <p>Vibration: {sensorData?.vibration}</p>
      <p>Distance: {sensorData?.distance}</p>
      <p>Seatbelt: {sensorData?.seatbelt ? 'Fastened' : 'Unfastened'}</p>
    </div>
  );
};

export default LiveSensorCard;