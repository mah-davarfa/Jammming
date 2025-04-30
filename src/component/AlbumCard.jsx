import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import '../styles/darkMode.css';

function AlbumCard({ name, artist, image, releaseDate, genre, songs, totalOfSongs, id }) {
  const {
    setSearchCommand,
     handleRemove,
    
  } = useContext(AppContext);

  const handleFetchTracks = () => {
   
    setSearchCommand({type:'album', id:id});
  };

  return(
    <div className="playlist-item-card"  >
            <img src={image} alt={name} width={250} height={250}/>
            <h3>Album: {name}</h3>
            <p>Artist: {artist}</p>
            <p>Release Date: {releaseDate}</p>
            {genre !== 'Unknown' ?
            <p>Genre: {genre}</p> : null}
            {totalOfSongs !==0 ? 
             (<p>Total of Songs: {totalOfSongs}</p>) : null}
            {/* <p>ID:{id}</p>*/}
            <button onClick={() => handleRemove(id, 'albumcard')}>
              Remove
            </button>
            <button onClick={handleFetchTracks}>
              Get Songs
            </button>
    </div>

   )
   }

export default AlbumCard;
