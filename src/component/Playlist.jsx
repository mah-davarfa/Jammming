import React,{useContext} from 'react';
import {AppContext} from '../context/AppContext';
import '../styles/darkmode.css';

const Playlist=()=>{

    const {handlePlay,currentSong,handleRemove,playlist,searchResultsAll}=useContext(AppContext);
   
      if (searchResultsAll.length>0 && playlist.length === 0 ){
        return (<p>Your playlist is empty. Add a song!</p>);
    }
        
    return(
    <div className ='list'>
      
        
    {playlist.length>0 && <h3>Play List</h3>}
        {playlist.map((song, index)=>(
        <div key={index} className ='playlist-item-card'>
            <img src={song.image} alt={song.name}  
            width={200} height={200}/>
            <h3> {song.name}</h3>
            <p>Artist: {song.artist}</p>
            <p>Album: {song.album}</p>
            <p>popularity:{song.popularity}</p>
            <p>uri:{song.uri}</p>
            <p>ID:{song.id}</p>
            <button onClick={()=>handleRemove(song.id)}>Remove this song</button>
            <button>Add to Spotify</button>
            <button onClick={()=>handlePlay(song)}>
                {currentSong===song.id ? 'Now Playing':'Play'}
            </button>
        </div>
      
    ))}
    
    
    </div>
)};
export default Playlist;