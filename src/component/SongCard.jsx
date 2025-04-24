import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import Playlist from './Playlist';
import PlaySong from './PlaySong';
import '../styles/darkmode.css';

function SongCard({ name, artist, album, preview, popularity, uri, id, image }) {
  
  //the song info comes as props to here, but the handleRemove, handlePlay,
  //  handleAddToPlaylist, addedToPlaylist, playlistTitle come from the context
  //the handleRemove, handlePlay, handleAddToPlaylist, addedToPlaylist,
  //  playlistTitle are used to remove add the song from the playlist, play the song,
  //  add the song to the play song, check if the song is already in the playlist and in playsong and get 
  // the title of the playlist respectively if changes,
  const {
    handleRemove,
    currentSong,
    handlePlay,
    handleAddToPlaylist,
    addedToPlaylist,
    playlistTitle
  } = useContext(AppContext);

  const fallbackImg = "../../imag/vecteezy_wireframe-landscape-elevation-particle-background-abstract_8009451.jpg";
  const [imgSrc, setImgSrc] = useState(image || fallbackImg);

  return (
    <div className='playlist-item-card'>
        <img
          src={imgSrc}
          alt={name}
          width={150}
          height={150}
          onError={() => setImgSrc(fallbackImg)}
         />
        <h3>{name}</h3>
        <p>Artist: {artist}</p>
        {album && album !== 'Unknown'? (<p>Album: {album}</p>) : null}
        {preview ?
          (
            <audio>
              <source src={preview} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          ) : null}
        {popularity !== 'Unknown'? (<p>Popularity: {popularity}</p>) : null}

        <button onClick={() => handleRemove(id, 'songcard')}>
          Remove
        </button>
        <button onClick={() => handleAddToPlaylist({ name, artist, album, preview, popularity, uri, id, image })}>
          {addedToPlaylist.includes(id) ? `Already in ${playlistTitle}`:`Add To ${playlistTitle}`}
        </button>
        <button onClick={() => handlePlay({ name, artist, album, preview, popularity, uri, id, image })}>
          {currentSong === id ? 'Now Playing' : 'Play'}
        </button>
    </div>
  );
}

export default SongCard;
