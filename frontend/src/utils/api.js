const BACKEND_URL = 'https://safedrive-backend-4h5k.onrender.com'; // Replace with your backend URL

async function get(endpoint) {
  try {
    const res = await fetch(`${BACKEND_URL}${endpoint}`, {
      headers: {
        'Accept': 'application/json',
        'Origin': window.location.origin
      },
      credentials: 'include' // for cookies if needed
    });
    
    if (!res.ok) {
      console.error(`API Error: ${res.status}`, await res.text());
      throw new Error(`API error: ${res.status}`);
    }
    
    return res.json();
  } catch (err) {
    console.error(`Failed to fetch ${endpoint}:`, err);
    throw err;
  }
}

export { get };