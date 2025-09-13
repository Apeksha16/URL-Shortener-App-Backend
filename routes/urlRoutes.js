const express = require("express");
const { nanoid } = require("nanoid");
const Url = require("../models/Url");

const router = express.Router();

// POST /api/shorten - Create shortened URL
router.post("/shorten", async (req, res) => {
  try {
    const { originalUrl } = req.body;

    if (!originalUrl) {
      return res.status(400).json({ error: "Original URL is required" });
    }

    // Basic URL validation - check if it's a valid URL
    let validUrl;
    try {
      // Add protocol if missing
      const urlToTest = originalUrl.startsWith("http")
        ? originalUrl
        : `https://${originalUrl}`;
      validUrl = new URL(urlToTest);

      // Check if it has a valid protocol
      if (!["http:", "https:"].includes(validUrl.protocol)) {
        return res.status(400).json({
          error: "Invalid URL format. Only HTTP and HTTPS URLs are allowed",
        });
      }
    } catch (error) {
      return res.status(400).json({ error: "Invalid URL format" });
    }

    // Use the properly formatted URL
    const formattedUrl = validUrl.href;

    // Check if URL already exists
    let existingUrl = await Url.findOne({ originalUrl: formattedUrl });
    if (existingUrl) {
      return res.json({
        originalUrl: existingUrl.originalUrl,
        shortUrl: `${process.env.BASE_URL}/${existingUrl.shortCode}`,
        shortCode: existingUrl.shortCode,
      });
    }

    // Generate unique short code
    const shortCode = nanoid(8);

    // Create new URL entry
    const newUrl = new Url({
      originalUrl: formattedUrl,
      shortCode,
    });

    await newUrl.save();

    res.status(201).json({
      originalUrl: newUrl.originalUrl,
      shortUrl: `${process.env.BASE_URL}/${newUrl.shortCode}`,
      shortCode: newUrl.shortCode,
    });
  } catch (error) {
    console.error("Error creating short URL:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/admin/urls - Get all URLs (admin only)
router.get("/admin/urls", async (req, res) => {
  try {
    const urls = await Url.find().sort({ createdAt: -1 });
    res.json(urls);
  } catch (error) {
    console.error("Error fetching URLs:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
