import express from 'express';
import cors from 'cors';
import previewFinder from 'spotify-preview-finder';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
app.use(cors()); // Allow requests from your React frontend

// ✅ NEW: Token fetch route
app.get('/api/token', async (req, res) => {

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  const encoded = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${encoded}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch guest token' });
  }
});

// ✅ Existing preview route
app.get('/api/preview', async (req, res) => {
  const { song, artist } = req.query;
  try {
    const result = await previewFinder(`${song} ${artist}`, 1);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 4000;
app.listen(PORT, () => console.log(`✅ Backend server running on http://localhost:${PORT}`));

/////////////////////////////////////////////

