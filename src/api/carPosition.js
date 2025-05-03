const defaultPosition = {
  latitude: 0,
  longitude: 0,
  timestamp: Date.now(),
  status: 'default'
};

async function getCarPosition(req, res) {
  try {
    const position = await db.getCarPosition(); // your existing database query
    if (!position) {
      // Return default position if no data found instead of error
      return res.status(200).json(defaultPosition);
    }
    res.status(200).json(position);
  } catch (error) {
    console.error('Error fetching car position:', error);
    // Return default position on error
    res.status(200).json(defaultPosition);
  }
}

module.exports = { getCarPosition };
