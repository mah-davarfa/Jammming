import React, {useContext,useEffect} from 'react';
import {AppContext} from '../context/AppContext';
import Playlist from './Playlist';
import PlaySong from './PlaySong';

function SongCard({name,artist,album,preview,popularity,uri,id,image}) {

 const {handleRemove,currentSong,setCurrentSong,
     setSelectedSong,selectedSong,playlist,setPlaylist} =useContext(AppContext);
   
 
    const handlePlay =()=>{
        
        setSelectedSong({
            id,name, artist, album, image, preview,popularity,uri
        });
     }
     useEffect(()=>{
        if(selectedSong){
            setCurrentSong(selectedSong.id)
        }
     },[selectedSong,setCurrentSong])
    

    return(
        <>
        <div className='card'>
                <img src={image} alt={name}  width={250} height={250}/>
                <h3>{name}</h3>
                <p>Artist: {artist}</p>
                <p>Album: {album}</p>
                {preview ? (
                    <audio controls>
                        <source src={preview} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                    ) : (<p>Preview not available</p>)}
   
                <p>popularity:{popularity}</p>
                <p>uri:{uri}</p>
                <p>ID:{id}</p>
                <button onClick={()=>handleRemove(id) }>Remove</button>
                <button >Add to Playlist</button>
                <button onClick={handlePlay}>{currentSong===id ? 'Now Playing' : 'Play'}
                </button>
           
        </div>
        </>
    )
}
export default SongCard;