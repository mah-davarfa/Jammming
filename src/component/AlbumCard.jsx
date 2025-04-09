import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import '../styles/darkmode.css';

function AlbumCard({ name, artist, image, releaseDate, genre, songs, totalOfSongs, id }) {
  const {
    setSearchCommand,
    setSearchType,
    setSearchTerm,
    handleRemove,
    currentSong,
    handlePlay,
    handleAddToPlaylist,
    addedToPlaylist,
  } = useContext(AppContext);

  const handleFetchTracks = () => {
   // setSearchTerm(id); // if tracks is not in the response triggers new fetch by album ID in Data.jsx
    //setSearchType('artist'); // set search type to album
    setSearchCommand({type:'album', id:id});//must check the console log to see am i getting id for the song?
  };

  return(
    <div className="playlist-item-card"  >
  <img src={image} alt={name} width={250} height={250}/>
  <h3>Album: {name}</h3>
  <p>Artist: {artist}</p>
  <p>Release Date: {releaseDate}</p>
  <p>Genre: {genre}</p>
  {/*<p>Total of Songs: {totalOfSongs}</p>*/}
  <p></p>
 
  <ul>
   
    {songs?.map((song,index)=>(
      <li key={index}>{song.name}<button onClick={handleClick} > Get this song</button></li>
      
  ))}
      
  </ul>
  
 {/* <p>ID:{id}</p>*/}
  <button onClick={() => handleRemove(id, 'albumcard')}>Remove</button>
  <button onClick={handleFetchTracks}>Get Songs</button>
</div>

)
}

export default AlbumCard;
