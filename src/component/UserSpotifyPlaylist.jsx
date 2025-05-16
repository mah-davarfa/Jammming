import React from "react";
import { AppContext } from "../context/AppContext.jsx";
import { useContext, useState } from "react";
import "../styles/darkMode.css";

const UserSpotifyPlaylist = () => {
  const {
    name,
    userId,
    continueToSearchAsGuest,
    handleLoginToSpotify,
    userToken,
    getUserId,
    handleAddToPlaylist,
    setPlaylistTitle,
    userPlaylistInPlaylistId, 
    setUserPlaylistInPlaylistId,
    setPlaylist,
    userPlaylists, 
    setUserPlaylists
  } = useContext(AppContext);
  const [hasLogedIn, setHasLogedIn] = useState(false);
  
  
const handleRemoveUserPlaylist =(id)=>{
   setUserPlaylists((pre)=>pre.filter((item)=>item.id !==id));
}
  

 
  //check to see if we have user's id or not, if not get user id, if yes fetch user playlist
  const handleFetchPlaylists = async () => {
    if (continueToSearchAsGuest) {
      setHasLogedIn(true);
      return;
    }

    const id = userId || (await getUserId());
    if (id) {
      fetchUserPlaylists(id);
    }
  };
  // Function to fetch user playlists from Spotify API
  async function fetchUserPlaylists(userId) {
    try {
      const userPlaylist = await fetch(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      const userPlaylistsData = await userPlaylist.json();
      console.log("user playlists data :", userPlaylistsData.items);
      setUserPlaylists(
        Array.isArray(userPlaylistsData.items) ? userPlaylistsData.items : []
      );
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
  }
  // fetching user playlist's songs to be added to playlist
  async function handleAddUseraplaylistToPlaylist(playlist) {
   
    if (userPlaylistInPlaylistId && userPlaylistInPlaylistId !== playlist.id) {
      const confirmToReplace = window.confirm(
        `You are about to add songs from ${playlist.name} to your playlist. 
        if you Do This will replace your current playlist and discard unsaved changes. 
        Continue?Do you want to continue?`
      ); if(!confirmToReplace) return;
         }
        
    try {
      const userPlaylistSongs = await fetch(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`,{
        method: 'GET',
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
        
      })
      const userSongsData = await userPlaylistSongs.json();
       const items =Array.isArray(userSongsData.items)? userSongsData.items : [];
        console.log('each play list items:',items);
        setPlaylist([]);
        setPlaylistTitle(playlist.name);
        setUserPlaylistInPlaylistId(playlist.id);
            items.forEach((item)=>{
              const track=item.track;
              if (!track || !track.id) return;
              const formattedTrack={
                id: track.id,
                name: track.name,
                artist: track.artists?.[0]?.name || "Unknown",
                album: track.album?.name || "",
                popularity: track.popularity ?? "Unknown",
                image: track.album?.images?.[0]?.url || "/imag/fallbackimg.jpg",
                preview: track.preview_url || null,
                
              }
              handleAddToPlaylist(formattedTrack);
            })
   
      }catch (error) {
      console.error("Error adding playlist to playlist:", error);
    }
  };

  return (
    <div className="playlist-container">
      <div className="playlist-title">
        <h3>{`${name}'s spotify playList Lists`}</h3>
        <button onClick={handleFetchPlaylists} type="submit" >
          Import My spotify PlayLists
        </button>
        {hasLogedIn ? (
          <div>
            <h3>To import your PlayList, please login first.</h3>
            <button onClick={() => handleLoginToSpotify()} type="submit">
              Log in to Spotify
            </button>
            <button onClick={() => setHasLogedIn(false)}>Cancel</button>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="list">
        <div >
          {userPlaylists.map((playlist) => (
            <div key={playlist.id} className="playlist-item-card">
              <h3>{playlist.name}</h3>

              <img
                src={playlist.images[0]?.url || "/imag/fallbackimg.jpg"}
                alt={playlist.name}
                width={150}
                height={150}
              />
              <p>{`Tracks: ${playlist.tracks?.total}`}</p>
              <button onClick={()=>handleAddUseraplaylistToPlaylist(playlist)}>
                {(userPlaylistInPlaylistId !== playlist.id  ) ? 'add to playlist': 'already added to playlist' }
              </button>
              <button onClick={()=>handleRemoveUserPlaylist(playlist.id)}>
                Remove from playlist
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default UserSpotifyPlaylist;
