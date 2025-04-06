import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import '../styles/darkmode.css';

function AlbumCard({ name, artist, image, releaseDate, genre, songs, totalOfSongs, id }) {
  const {
    setSearchType,
    setSearchTerm,
    handleRemove,
    currentSong,
    handlePlay,
    handleAddToPlaylist,
    addedToPlaylist,
  } = useContext(AppContext);

  const handleFetchTracks = () => {
    setSearchTerm(id); // if tracks is not in the response triggers new fetch by album ID in Data.jsx
    setSearchType('album'); // set search type to album
  };

  return (
    <div className="playlist-item-card">
      <img src={image} alt={name} width={250} height={250} />
      <h3>{name}</h3>
      <p>Artist: {artist}</p>
      <p>Release Date: {releaseDate}</p>
      <p>Genre: {genre}</p>
      <p>Total of Songs: {totalOfSongs}</p>

      <div>
        {Array.isArray(songs) && songs.length > 0 ? (
          songs.map((song, index) => {
            const trackId = song.id;
            const trackName = song.name;
            const trackArtist = song.artists?.[0]?.name || artist;
            const trackPreview = song.preview_url;
            const trackPopularity = song.popularity || 'Unknown';
            const trackUri = song.uri;

            return (
              <div key={trackId} className="playlist-item-card">
                <h4>{trackName}</h4>
                {trackPreview ? (
                  <audio controls>
                    <source src={trackPreview} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                ) : (
                  <p>Preview not available</p>
                )}
                <button onClick={() => handleRemove(trackId, 'songcard')}>Remove</button>
                <button
                  onClick={() =>
                    handleAddToPlaylist({
                      name: trackName,
                      artist: trackArtist,
                      album: name,
                      preview: trackPreview,
                      popularity: trackPopularity,
                      uri: trackUri,
                      id: trackId,
                      image,
                    })
                  }
                >
                  {addedToPlaylist.includes(trackId)
                    ? 'Already in Playlist'
                    : 'Add to Playlist'}
                </button>
                <button
                  onClick={() =>
                    handlePlay({
                      name: trackName,
                      artist: trackArtist,
                      album: name,
                      preview: trackPreview,
                      popularity: trackPopularity,
                      uri: trackUri,
                      id: trackId,
                      image,
                    })
                  }
                >
                  {currentSong === trackId ? 'Now Playing' : 'Play'}
                </button>
              </div>
            );
          })
        ) : (
          <button onClick={handleFetchTracks}>Get Album Songs</button>
        )}
      </div>
    </div>
  );
}

export default AlbumCard;
