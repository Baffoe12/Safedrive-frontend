const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    time: new Date().toISOString()
  });
});

// Sensor data endpoint
app.get('/api/sensor', (req, res) => {
  res.json({
    device_id: '88:13:BF:0D:59:D8',
    timestamp: new Date().toISOString(),
    lat: 5.6545,
    lng: -0.1869,
    alcohol: 795,
    vibration: 0,
    distance: 189,
    seatbelt: false,
    impact: 9.578304291,
    pulse: 96,
    lcd_display: "D189 A648 I9.6 | HR:96 H96"
  });
});

module.exports = app;
