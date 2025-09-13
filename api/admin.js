module.exports = (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Only GET method allowed" });
  }

  // Return mock data for now
  return res.status(200).json({
    message: "Admin endpoint working",
    note: "Database integration will be added once basic functions work",
    mockData: [
      {
        _id: "mock123",
        originalUrl: "https://www.google.com",
        shortCode: "abc123xy",
        clicks: 5,
        createdAt: new Date().toISOString()
      }
    ]
  });
};