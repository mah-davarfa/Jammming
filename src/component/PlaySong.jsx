import React, {useContext} from 'react';
import {AppContext} from '../context/AppContext';

 export const PlaySong = ()=>{
    const {selectedSong,searchResultsAll}=useContext(AppContext);

   
    
    if(searchResultsAll.length>0){
    if (!selectedSong) {
        return (
            <>
            <img 
            className='background-for-playSong' 
            src='../../imag/background.jpg'
            alt='Background'
            width={250} height={250}
            />
        <p>
            No song selected. Click 'Play' on a song to start playing.
            </p>
            </>
            );
             }//i have picture for background cover for css that need to be used and over that this p tag show.
    return (  
        <div className='play-song'>
             <img src={selectedSong.image} alt={selectedSong.name}  width={250} height={250}/>
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

        </div>

    )
}};
export default PlaySong;
