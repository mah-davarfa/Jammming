
# 🎵 Jammming - Spotify Playlist Creator

Jammming is a full-featured React + Spotify web application that allows users to search for songs, create custom playlists, and manage their Spotify playlists. It uses the Spotify Web API for searching, playing previews, and uploading playlists to a user's Spotify account.

## 🚀 Demo
Watch the full demo on YouTube: [Jammming App Demo]:(https://youtu.be/XlmoQKLAJAQ)
🌐 Live Site:https://jammming-mahmoud.netlify.app/
--------

## 📷 Screenshots
![Screenshot 1](./src/assets/screenshots/Screenshot%201.png)
![Screenshot 2](./src/assets/screenshots/Screenshot%202.png)
![Screenshot 3](./src/assets/screenshots/Screenshot%203.png)
![Screenshot 4](./src/assets/screenshots/Screenshot%204.png)
![Screenshot 6](./src/assets/screenshots/Screenshot%206.png)
![Screenshot 7](./src/assets/screenshots/Screenshot%207.png)
![Screenshot 8](./src/assets/screenshots/Screenshot%208.png)
![Screenshot 9](./src/assets/screenshots/Screenshot%209.png)
![Screenshot 10](./src/assets/screenshots/Screenshot%2010.png)
![Screenshot 11](./src/assets/screenshots/Screenshot%2011.png)
![Screenshot 12](./src/assets/screenshots/Screenshot%2012.png)
![Screenshot 13](./src/assets/screenshots/Screenshot%2013.png)
![Screenshot 14](./src/assets/screenshots/Screenshot%2014.png)
![Screenshot 15](./src/assets/screenshots/Screenshot%2015.png)

## 🔧 Technologies Used
- React + Vite
-  Spotify OAuth (PKCE), Spotify Web API
- Axios
- CSS (Responsive Grid & Flexbox)
- React Context + `localStorage` sync
- Jest & React Testing Library
 **Preview API**: Custom Express backend on Render for fetching 3rd-party preview URLs (when Spotify preview is missing)
- **Deployment**: 
- Frontend: Netlify
  - Backend: Render


## 🔐 Features
- Secure PKCE-based login flow.
 Token Expiration Countdown
- After login, the app retrieves a Spotify access token.
- A real-time countdown timer is displayed, showing how long the session remains valid.
- Countdown is based on a timestamp (`Date.now() + expires_in * 1000`) and is **persisted in `localStorage`** to survive refreshes.
- When time runs out, users are prompted to re-login.
- Load and Edit Existing Spotify Playlists
- Load any of your existing Spotify playlists into the app.
- Add or remove songs.
- Supports guest mode (limited features) or full user login.
- Search by song, album, or artist
- Preview audio clips
- Rename playlists before saving.
- Save new playlists directly to your Spotify account.
- Dark and Light mode toggle
- Fully unit-tested components
###  Replace Existing Playlist on Spotify
- After editing, the updated playlist can **replace the original on Spotify** using Spotify’s `PUT` endpoint.
- Prevents duplicate playlist clutter.

## 🧪 Testing
Built using:
- Jest
- React Testing Library

Tested components:  
`SearchBar`, `SearchResults`, `SongCard`, `PlaySong`, `Playlist`, `AlbumCard`, `ArtistCard`, `Banner`




## 📁 Project Structure

Jammming/ ├── public/ ├── src/ │ ├── components/ │ ├── context/ │ ├── styles/ │ ├── assets/screenshots/ ├── backend/ (Express server for preview support) ├── README.md ├── package.json

## 🛠️ Setup & Run
Make sure to set up the .env file with your Spotify credentials:

VITE_SPOTIFY_CLIENT_ID=your_spotify_client_id
VITE_REDIRECT_URI=http://localhost:5173/



```bash
# Install frontend dependencies
npm install

# Start frontend
npm run dev

### Optional: Run temporary backend for preview URLs

If you want song previews to work using third-party services, run the temporary Express server:

```bash
cd backend
npm install
npm run start

⚠️ This Express backend is optional. It's only used to fetch audio previews from a third-party API. The app works without it, but some previews may not be available.

# Run tests
npm test 

📝 License
This project is licensed under MIT.
Created by Mahmoud Davarfara.