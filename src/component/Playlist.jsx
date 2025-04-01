import React,{useContext,useState} from 'react';
import {AppContext} from '../context/AppContext';
import '../styles/darkmode.css';

const Playlist=()=>{
   
    const [isEditing,setIsEditing]=useState(false);
   const [playlistTitle,setPlaylistTitle]=useState("PlayList");
   
    const handleEdit =()=>{
        if(isEditing){
            setIsEditing(false);
        }else{
            setIsEditing(true);
        }
    }
    const handlePlaylistTitle=(e)=>{
        setPlaylistTitle(e.target.value);
    }
    
    const {handlePlay,currentSong,handleRemove,playlist,searchResultsAll,playlistLimitReached}=useContext(AppContext);
   
      if (searchResultsAll.length>0 && playlist.length === 0 ){
        return (
        <div className={'playlist-empty'}>
          <p>Your playlist is empty. Add a song!</p>
        </div>
    );
    }
        
    return (
        <div className="playlist-container">
          {playlist.length > 0 && (
            <div className="playlist-title">
              <div >
                {playlistLimitReached ? (
                  <h3 className="warning-text">
                    Playlist has reached limit of 10 songs. Either Transfer or Remove.
                  </h3>
                ) : (
                  <>
                    {!isEditing ? (
                      <h3 className='warning-text'>{playlistTitle}</h3>
                    ) : (
                      <input
                        onChange={handlePlaylistTitle}
                        value={playlistTitle}
                        type="text"
                        placeholder="Pick a name for title"
                      />
                    )}
                    <button onClick={handleEdit}>
                      {!isEditing ? 'Edit' : 'Save'}
                    </button>
                    <button>Save to Spotify if you loged in</button>
                  </>
                )}
              </div>
            </div>
          )}
      
          <div className="playlist-list">
            {playlist.map((song, index) => (
              <div key={index} className="playlist-item-card">
                <img src={song.image} alt={song.name} width={150} height={150} />
                <h3>{song.name}</h3>
                <p>Artist: {song.artist}</p>
                <p>Album: {song.album}</p>
                <p>popularity: {song.popularity}</p>
                <button onClick={() => handleRemove(song.id, 'playlist')}>Remove this song</button>
                <button>Add to Spotify</button>
                <button onClick={() => handlePlay(song)}>
                  {currentSong === song.id ? 'Now Playing' : 'Play'}
                </button>
              </div>
            ))}
          </div>
        </div>
      );
      
  
};
export default Playlist;