import React, {useContext} from 'react';
import {AppContext} from '../context/AppContext';
import '../styles/darkmode.css';
 
export const PlaySong = ()=>{
    const {addedToPlaylist,handleAddToPlaylist,handleRemove,selectedSong,searchResultsAll,searchResultTag}=useContext(AppContext);
    
    
   
    
    if(searchResultsAll.length>0){
       
    if (!selectedSong ) {
        return (
            <div className='play-song'>
                <p>
                No song selected. Click 'Play' on a song to start playing.
                </p>
                <img 
                className='background-for-playSong' 
                src='../../imag/background.jpg'
                alt='Background'
                width={400} height={380}
                />
            </div>
            
            );
             }
    return (  
        <div className='play-song'>
             <img src={selectedSong.image} alt={selectedSong.name}  width={500} height={500}/>
            <h3>Playing : {selectedSong.name}</h3>
            <p>Artist: {selectedSong.artist}</p>
            <p>Album: {selectedSong.album}</p>
            <p>popularity:{selectedSong.popularity}</p>
            <p>uri:{selectedSong.uri}</p>
            <p>ID:{selectedSong.id}</p>
            {selectedSong.preview ? (
                <audio controls>
                <source src={selectedSong.preview} type="audio/mpeg"/>
                Your browser does not support the audio element.
            </audio>): (<p>This song is not playable from source, try another song.</p>)}
            <button onClick={()=>handleRemove(selectedSong.id,'playsong')}>Remove This Song </button>
            <button onClick={()=>handleAddToPlaylist(selectedSong)}>
                {addedToPlaylist.includes(selectedSong.id) ? 'Already in Playlist':"Add To PlayList"}
                    </button>    
        </div>

    )
}};
export default PlaySong;
