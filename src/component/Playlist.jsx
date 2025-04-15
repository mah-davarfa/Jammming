import React,{useContext,useState} from 'react';
import {AppContext} from '../context/AppContext';
import '../styles/darkmode.css';

const Playlist=()=>{
  const {handlePlay,
    currentSong,
    handleRemove,
    playlist,
    searchResultsAll,
    playlistLimitReached,
    continueToSearchAsGuest,
    userToken}=useContext(AppContext);
    const [isEditing,setIsEditing]=useState(false);
    const [playlistTitle,setPlaylistTitle]=useState("PlayList");
    const [isLoggedIn,setIsLoggedIn]=useState(false);
   
    const fallbackImg = "../../imag/vecteezy_wireframe-landscape-elevation-particle-background-abstract_8009451.jpg";
   
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
    
   
   
      if (searchResultsAll.length>0 && playlist.length === 0 ){
        return (
        <div className={'playlist-empty'}>
          <p>{`Your ${playlistTitle} is empty. Add a song!`}</p>
        </div>
    );
    }

    const handleSaveToSpotify = () => {
      if (continueToSearchAsGuest){
        setIsLoggedIn(true);
        return;
      } else{
       savePlaylistToSpotify();
    }}
      /// savePlaylistToSpotify function to save the playlist to Spotify
     async function savePlaylistToSpotify() {
      try{
         const token = userToken;
         if(playlist.length === 0 || !token ) return ;
              /// get the user id
         const getUserId = await fetch('https://api.spotify.com/v1/me',{
           method:'GET',
           headers:{
             Authorization: `Bearer ${token}`
           },
          
          });
            const userData = await getUserId.json();
            const userId = userData.id;
            console.log('user id :',userId);
             /// create a new playlist
         const creatPlaylist = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,{
           method:'POST',
           headers:{
             Authorization: `Bearer ${token}`,
            'Content-Type' : `application/json`,
           },
           body:JSON.stringify({
               name: `${playlistTitle}`,
               description: `${playlistTitle}`,
               public: true
         }),
         });
         const playlistId = await creatPlaylist.json()
         const playlistIdValue = playlistId.id
         console.log('playlist id :' , playlistIdValue)

         const uris = playlist.map((song)=> `spotify:track:${song.id}`);
         console.log('songs: ',uris)
            ///// add songs to the playlist
         const addPlaylistToSpotify = await fetch(`https://api.spotify.com/v1/playlists/${playlistIdValue}/tracks`,{
           method:'POST',
           headers:{
             Authorization: `Bearer ${token}`,
             'Content-Type':'application/json',
           },
          
           body:JSON.stringify({
               uris : uris,
         }),
          });
          alert('✅ Playlist saved to your Spotify account!');
      } catch (error){
                  console.error('Error saving playlist to Spotify:', error);
                  alert('Playlist DID NOT SAVED to your Spotify account!');
          }
  };

    return (
        <div className="playlist-container">
          {playlist.length > 0 && (
            <div className="playlist-title">
              <div >
                {playlistLimitReached ? (
                  <h3 className="warning-text">
                  { ` ${playlistTitle} has reached limit of 10 songs. Either Transfer or Remove.`}
                  </h3>
                ) : (
                  <>
                    {!isEditing ? (
                      <h2 className='warning-text'>{playlistTitle}</h2>
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
                    <button
                        onClick={handleSaveToSpotify}
                        disabled={playlist.length === 0}
                      >Save to Spotify 
                    </button>
                   {isLoggedIn ?(
                     <h3>
                      {`"To save your ${playlistTitle} to Spotify, please use The 'log in to Spotify' Tab first."`}
                    </h3>) : ''}
                  </>
                )}
              </div>
            </div>
          )}
      
          <div className="playlist-list">
            {playlist.map((song, index) => (
              <div 
                key={index} 
                className="playlist-item-card">
                  <img 
                  src={song.image || fallbackImg}
                  alt={song.name}
                  width={150} height={150}
                  onError={(e)=>e.target.src = fallbackImg} 
                    />
                  <h3>{song.name}</h3>
                  <p>Artist: {song.artist}</p>
                  {song.album && song.album !==''?
                  (<p>
                    Album: {song.album}
                  </p> ): null}
                  {song.popularity !== 'Unknown' ? 
                  (<p>
                    popularity: {song.popularity}
                  </p>) : null}
                  <button onClick={() => handleRemove(song.id, 'playlist')}>
                    Remove this song
                  </button>
                  
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