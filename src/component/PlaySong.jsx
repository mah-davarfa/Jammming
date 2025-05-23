import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import '../styles/darkMode.css';
import Playlist from "./Playlist";

export const PlaySong = () => {
  const {
    addedToPlaylist,
    handleAddToPlaylist,
    handleRemove,
    selectedSong,
    playlistTitle,
    searchCommand,
    isLoadingPreview, 
    setIsLoadingPreview
  } = useContext(AppContext);

  const fallbackImg =
    "/imag/fallbackimg.jpg";

  console.log("search command ;", searchCommand);
  console.log("selectedsong :", selectedSong);
  //removed  && searchCommand
  if (!selectedSong ) {
    return (
      <div className="play-song-empty">
        <p>No song selected. Click 'Play' on a song to start playing.</p>
        <video autoPlay muted loop className="startup-Background">
          <source src="/video/background2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }
  return (
    <div className="play-song">
      <img
        src={selectedSong?.image || fallbackImg}
        alt={selectedSong.name}
        width={250}
        height={250}
        onError={(e) => (e.target.src = fallbackImg)}
      />
      <h3>Playing : {selectedSong.name}</h3>
      <p>Artist: {selectedSong.artist}</p>
      {selectedSong.album && selectedSong.album !== "Unknown" ? (
        <p>Album: {selectedSong.album}</p>
      ) : null}
      {selectedSong.popularity !== "Unknown" ? (
        <p>popularity:{selectedSong.popularity}</p>
      ) : null}
      {selectedSong.genre && selectedSong.genre !== "Unknown" ? (
        <p>Genre:{selectedSong.genre}</p>
      ) : null}
      {/* <p>uri:{selectedSong.uri}</p>*/}
      {/* <p>ID:{selectedSong.id}</p>*/}
      {isLoadingPreview ? (<p>...Loading</p>):selectedSong.preview ?(
        <audio key={selectedSong.id} controls>
          <source src={selectedSong.preview} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      ) : (
        <p>This song is not playable from source, try another song.</p>
      )}
      <button onClick={() => handleRemove(selectedSong.id, "playsong")}>
        Remove This Song
      </button>
      <button onClick={() => handleAddToPlaylist(selectedSong)}>
        {addedToPlaylist.includes(selectedSong.id)
          ? `Already in ${playlistTitle}`
          : `Add To ${playlistTitle}`}
      </button>
    </div>
  );
};
export default PlaySong;
