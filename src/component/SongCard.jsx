import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import Playlist from "./Playlist";
import PlaySong from "./PlaySong";
import "../styles/darkMode.css";

function SongCard({
  name,
  artist,
  album,
  preview,
  popularity,
  uri,
  id,
  image,
}) {
  const {
    handleRemove,
    currentSong,
    handlePlay,
    handleAddToPlaylist,
    addedToPlaylist,
    playlistTitle,
  } = useContext(AppContext);

  const fallbackImg = "/imag/fallbackimg.jpg";
  const [imgSrc, setImgSrc] = useState(image || fallbackImg);

  return (
    <div className="playlist-item-card">
      <img
        src={imgSrc}
        alt={name}
        width={150}
        height={150}
        onError={() => setImgSrc(fallbackImg)}
      />
      <h3>{name}</h3>
      <p>Artist: {artist}</p>
      {album && album !== "Unknown" ? <p>Album: {album}</p> : null}
      {preview ? (
        <audio>
          <source src={preview} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      ) : null}
      {popularity !== "Unknown" ? <p>Popularity: {popularity}</p> : null}

      <button onClick={() => handleRemove(id, "songcard")}>Remove</button>
      <button
        onClick={() =>
          handleAddToPlaylist({
            name,
            artist,
            album,
            preview,
            popularity,
            uri,
            id,
            image,
          })
        }
      >
        {addedToPlaylist.includes(id)
          ? `Already in ${playlistTitle}`
          : `Add To ${playlistTitle}`}
      </button>
      <button
        onClick={() =>
          handlePlay({
            name,
            artist,
            album,
            preview,
            popularity,
            uri,
            id,
            image,
          })
        }
      >
        {currentSong === id ? "Now Playing" : "Play"}
      </button>
    </div>
  );
}

export default SongCard;
