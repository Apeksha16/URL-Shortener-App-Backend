module.exports = (req, res) => {
  return res.status(200).json({
    message: "Test endpoint working!",
    method: req.method,
    url: req.url,
    timestamp: new Date().toISOString()
  });
};