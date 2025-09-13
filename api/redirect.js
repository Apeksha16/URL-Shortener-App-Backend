module.exports = (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Only GET method allowed" });
  }

  const { code } = req.query;
  
  if (!code) {
    return res.status(400).json({ error: "Short code is required" });
  }

  // For now, redirect to Google as a test
  // We'll add database lookup once basic function works
  if (code === 'test123') {
    return res.redirect(302, 'https://www.google.com');
  }

  return res.status(404).json({ 
    error: "Short URL not found",
    note: "Database integration will be added once basic functions work",
    testCode: "Try /test123 for a test redirect"
  });
};