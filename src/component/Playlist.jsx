import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import "../styles/darkMode.css";

const Playlist = () => {
  const {
    handlePlay,
    currentSong,
    handleRemove,
    playlist,
    setPlaylist,
    playlistLimitReached,
    continueToSearchAsGuest,
    handleLoginToSpotify,
    isSaved,
    setIsSaved,
    playlistTitle,
    setPlaylistTitle,
    userToken,
    userId,
    getUserId,
    userPlaylistInPlaylistId, 
    setUserPlaylists,
    setUserPlaylistInPlaylistId
  } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [savingToSpotify, setSavingToSpotify] = useState(false);
  const fallbackImg = "/imag/fallbackimg.jpg"; // Fallback image path

  const handleEdit = () => {
    if (isEditing) {
      if (!playlistTitle.trim()) {
        alert("Playlist name cannot be empty.");
        return;
      }
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handlePlaylistTitle = (e) => {
    setPlaylistTitle(e.target.value);
  };

  if (playlist.length === 0) {
    return (
      <div className={"playlist-empty"}>
        <h2 className="warning-text">{playlistTitle}</h2>
        <p>{`${
          isSaved ? "✅ successfully saved to your Spotify account!" : ""
        } The ${playlistTitle} is empty. Add a song!`}</p>
      </div>
    );
  }
  const handleSaveToSpotify = async() =>{
    setSavingToSpotify(true);

    const uris = playlist.map((song)=>`spotify:track:${song.id}`);
    console.log("uris: ", uris);
    const token = userToken;
    if (userPlaylistInPlaylistId){
      await replaceExistingUserPlaylist(userPlaylistInPlaylistId, uris,token);
    }else{
      if (continueToSearchAsGuest) {
        setIsLoggedIn(true);
        return;
      }
      const id = userId || (await getUserId());
      if (id) {
        await createPlaylistAndPostPlaylist(id, uris,token);
      }
    }
  }
 
  //modifing the existing playlist in spotify 
  //after successful fetching need to 
  // //remove this playlist from userSpotifyPlaylist(userPlaylists) 
  // //reset playlistTitle to playlist 
  // // reset userPlaylistInPlaylistId
  // // clear this playlist
  // // set isSaved to true
  async function replaceExistingUserPlaylist(playlistId, uris,token) {
    try{const res = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uris }),
      }
    );

    if (!res.ok) {
      const err = await res.json();
      console.error("❌ Failed to update playlist:", err);
      alert("Failed to update your playlist on Spotify.");
    } else {
      console.log("✅ Playlist updated on Spotify.");
      //if all the songs deleted by user before save to spotify (safty) and then remove the playlist from userSpotifyPlaylist
      setUserPlaylists((per)=>
        Array.isArray(per)? per.filter((item)=>item.id !== userPlaylistInPlaylistId):[]);
      setPlaylistTitle('Playlist');
      setUserPlaylistInPlaylistId('');
      setPlaylist([]);
      setIsSaved(true);
    }
  } catch (error) {
    console.error("❌ Error updating playlist:", error);
  }
  setSavingToSpotify(false);
  }
  //creating a new playlist and adding songs to it
  // after successful fetching need to
  // // clear this playlist
  // // set isSaved to true
  async function createPlaylistAndPostPlaylist(userId, uris,token) {
    
    // create a new playlist
    try {
      const creatPlaylist = await fetch(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": `application/json`,
          },
          body: JSON.stringify({
            name: `${playlistTitle}`,
            description: `${playlistTitle}`,
            public: true,
          }),
        }
      );
      const playlistId = await creatPlaylist.json();
      const playlistIdValue = playlistId.id;
      console.log("playlist id :", playlistIdValue);

      
      // add songs to created playlist
      const addPlaylistToSpotify = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistIdValue}/tracks`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            uris: uris,
          }),
        }
      );
      setIsSaved(true);
      setPlaylist([]);
    } catch (error) {
      console.error("Error saving playlist to Spotify:", error);
      alert("Playlist DID NOT SAVED to your Spotify account!");
    }
    setSavingToSpotify(false);
  }
 

  return (
    <div className="playlist-container">
      {playlist.length > 0 && (
        <div className="playlist-title">
          <div>
            {playlistLimitReached ? (
              <h3 className="warning-text">
                {` ${playlistTitle} has reached limit of 10 songs. Either Transfer or Remove.`}
              </h3>
            ) : (
              <>
                {!isEditing ? (
                  <h2 className="warning-text">{playlistTitle}</h2>
                ) : (
                  <input
                    onChange={handlePlaylistTitle}
                    value={playlistTitle}
                    type="text"
                    placeholder="Pick a name for title"
                  />
                )}
                <button onClick={handleEdit}>
                  {!isEditing ? "Edit" : "Save"}
                </button>
                <button
                  onClick={handleSaveToSpotify}
                  disabled={playlist.length === 0 || isEditing || savingToSpotify}
                >
                  Save to Spotify
                </button>
                {savingToSpotify ?<p>Saving to spotify...</p>:''}
                {isLoggedIn ? (
                  <div>
                    <h3>
                      {`"To save your ${playlistTitle} to Spotify, please login first."`}
                    </h3>
                    <button onClick={handleLoginToSpotify} type="submit">
                      Log in to Spotify
                    </button>
                    <button onClick={() => setIsLoggedIn(false)}>Cancel</button>
                  </div>
                ) : (
                  ""
                )}
              </>
            )}
          </div>
        </div>
      )}

      <div className="playlist-list">
        {playlist.map((song, index) => (
          <div key={index} className="playlist-item-card">
            <img
              src={song.image || fallbackImg}
              alt={song.name}
              width={150}
              height={150}
              onError={(e) => (e.target.src = fallbackImg)}
            />
            <h3>{song.name}</h3>
            <p>Artist: {song.artist}</p>
            {song.album && song.album !== "" ? (
              <p>Album: {song.album}</p>
            ) : null}
            {song.popularity !== "Unknown" ? (
              <p>popularity: {song.popularity}</p>
            ) : null}
            <button onClick={() => handleRemove(song.id, "playlist")}>
              Remove this song
            </button>

            <button
              onClick={() => {
                handlePlay({...song});
                console.log("🎵 Playlist song clicked in play list:", song);
              }}
            >
              {currentSong === song.id ? "Now Playing" : "Play"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Playlist;
