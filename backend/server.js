import express from 'express';
import cors from 'cors';
import previewFinder from 'spotify-preview-finder';
import dotenv from 'dotenv';
dotenv.config();


const app = express();
app.use(cors()); // Allow requests from your React frontend

// API route to fetch preview by song + artist
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
