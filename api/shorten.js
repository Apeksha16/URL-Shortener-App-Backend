const { nanoid } = require("nanoid");

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST method allowed" });
  }

  try {
    const { originalUrl } = req.body;

    if (!originalUrl) {
      return res.status(400).json({ error: "Original URL is required" });
    }

    // URL validation
    let validUrl;
    try {
      const urlToTest = originalUrl.startsWith("http") ? originalUrl : `https://${originalUrl}`;
      validUrl = new URL(urlToTest);

      if (!["http:", "https:"].includes(validUrl.protocol)) {
        return res.status(400).json({ error: "Invalid URL format. Only HTTP and HTTPS URLs are allowed" });
      }
    } catch (error) {
      return res.status(400).json({ error: "Invalid URL format" });
    }

    const formattedUrl = validUrl.href;

    // Generate unique short code
    const shortCode = nanoid(8);
    
    // For now, return without saving to database (we'll add MongoDB back once basic function works)
    const baseUrl = process.env.BASE_URL || `https://${req.headers.host}`;

    return res.status(201).json({
      originalUrl: formattedUrl,
      shortUrl: `${baseUrl}/${shortCode}`,
      shortCode: shortCode,
      note: "This is a test response - database integration will be added once basic function works"
    });

  } catch (error) {
    console.error('Error creating short URL:', error);
    return res.status(500).json({ 
      error: "Server error",
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};
