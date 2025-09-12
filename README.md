# URL Shortener Backend

A simple URL shortener backend built with Node.js, Express, and MongoDB.

## Features

- Shorten long URLs to compact codes
- Redirect short URLs to original destinations
- Track click counts for analytics
- Admin endpoint to view all URLs and statistics

## API Endpoints

### POST /api/shorten
Create a shortened URL.

**Request Body:**
```json
{
  "originalUrl": "https://www.example.com/some/very/long/path"
}
```

**Response:**
```json
{
  "originalUrl": "https://www.example.com/some/very/long/path",
  "shortUrl": "http://localhost:3000/abc123xy",
  "shortCode": "abc123xy"
}
```

### GET /:shortCode
Redirects to the original URL and increments click count.

### GET /api/admin/urls
Returns all URLs with statistics (admin endpoint).

**Response:**
```json
[
  {
    "_id": "...",
    "originalUrl": "https://www.example.com/some/very/long/path",
    "shortCode": "abc123xy",
    "clicks": 5,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### GET /api/health
Health check endpoint.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Make sure MongoDB is running locally or update the `MONGODB_URI` in `.env`

3. Start the server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## Environment Variables

- `PORT`: Server port (default: 3000)
- `MONGODB_URI`: MongoDB connection string
- `BASE_URL`: Base URL for shortened links

## Testing

You can test the API using curl or any HTTP client:

```bash
# Create a short URL
curl -X POST http://localhost:3000/api/shorten \
  -H "Content-Type: application/json" \
  -d '{"originalUrl": "https://www.google.com"}'

# Visit the short URL (replace abc123xy with actual code)
curl -L http://localhost:3000/abc123xy

# Get admin stats
curl http://localhost:3000/api/admin/urls
```