import React, {useContext} from 'react';
import {AppContext} from '../context/AppContext';
import Playlist from './Playlist';
import PlaySong from './PlaySong';
import '../styles/darkmode.css';

function SongCard({name,artist,album,preview,popularity,uri,id,image}) {

 const {handleRemove,currentSong,handlePlay,
    handleAddToPlaylist,addedToPlaylist} =useContext(AppContext);
   
 
   
        
           
       
     

    return(
        <>
        <div className='playlist-item-card '>
                <img src={image} alt={name} width={200} height={200}/>
                <h3>{name}</h3>
                <p>Artist: {artist}</p>
                <p>Album: {album}</p>
                {preview ? (
                    <audio >
                        <source src={preview} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                    ) : (<p>Preview not available</p>)}
   
                <p>popularity:{popularity}</p>
                <p>uri:{uri}</p>
                <p>ID:{id}</p>
                <button onClick={()=>handleRemove(id) }>Remove</button>
                <button onClick={()=>handleAddToPlaylist({name,artist,album,preview,popularity,uri,id,image})}>
                    {addedToPlaylist.includes(id) ? 'Already in Playlist':"Add To PlayList"}
                </button>
                <button onClick={()=>handlePlay
                    ({name,artist,album,preview,popularity,uri,id,image})}>
                        {currentSong===id ? 'Now Playing' : 'Play'}
                </button>
           
        </div>
        </>
    )
}
export default SongCard;