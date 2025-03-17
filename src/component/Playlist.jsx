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
        return (<p>Your playlist is empty. Add a song!</p>);
    }
        
    return(
    <div className ='list'>
      
           <div className={'playlist-title'}>
            {playlist.length>0 &&(
               
               <div className={'playlist-header'}>             
                {playlistLimitReached ? (
                <h3 className="warning-text">
                    'Playlist have reached to the limit of 10 songs,Either Transfer to spotify or Remove some songs'
                </h3>
                ):(
                    <div className="playlist-header">
                    {!isEditing? ( <h3>{playlistTitle}</h3>):(<input  onChange={handlePlaylistTitle} value={playlistTitle} type='text' placeholder='pick a name for  Title'></input>) }
                        <button onClick={handleEdit}>{!isEditing ? "Edit" : "save"}</button>
                        <button>Save to Spotify</button>
                    </div>)}
               </div>)}
           </div>
                
        {playlist.map((song, index)=>(
        <div key={index} className ='playlist-item-card'>
            <img src={song.image} alt={song.name}  
            width={150} height={150}/>
            <h3> {song.name}</h3>
            <p>Artist: {song.artist}</p>
            <p>Album: {song.album}</p>
            <p>popularity:{song.popularity}</p>
           { /*<p>uri:{song.uri}</p>*/}
           {/* <p>ID:{song.id}</p>*/}
            <button onClick={()=>handleRemove(song.id,'playlist')}>Remove this song</button>
            <button>Add to Spotify</button>
            <button onClick={()=>handlePlay(song)}>
                {currentSong===song.id ? 'Now Playing':'Play'}
            </button>
        </div>
      
    ))}
    
    
    </div>
)};
export default Playlist;