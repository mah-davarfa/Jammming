import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import "../styles/darkMode.css";
import { isDescendantOrSelf } from "@testing-library/user-event/dist/cjs/utils/index.js";

const ToggleMode = () => {
  const {
    isDarkMode,
    setIsDarkMode,
    setUserToken,
    setContinueToSearchAsGuest,
    setContinueToSearchAfterLogin,
    setSubmitted,
    setName,
    setSearchResults,
    setSearchResultsAll,
    setPlaylist,
    setSelectedSong,
    setCurrentSong,
    setSearchCommand,
    setIsSaved,
    setPlaylistTitle,
    setUserPlaylists,
    setTimes,
    setExpairationTime
  } = useContext(AppContext);
  const togglMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div>
      <button
        onClick={togglMode}
        className={!isDarkMode ? "toggle-light-button" : "toggle-dark-button"}
      >
        {isDarkMode ? "Light  Mode" : "Dark Mode"}
      </button>
      
      <button
        onClick={() => {
          localStorage.removeItem("name");
          localStorage.removeItem("submitted");
          localStorage.removeItem("code_verifier-spotify");
          localStorage.removeItem("isSearchStarted");
          localStorage.removeItem("playlist");
          localStorage.removeItem("searchResultsAll");
          localStorage.removeItem("selectedSong");
          localStorage.removeItem("userPlaylists");
          localStorage.removeItem("command");
          localStorage.removeItem("expairationTime");
          setPlaylistTitle("PlayList");
          setIsDarkMode(true);
          setIsSaved(false);
          setName("");
          setTimes(null);
          setExpairationTime(null);
          setSubmitted(false);
          setContinueToSearchAfterLogin(false);
          setUserToken(null);
          setContinueToSearchAsGuest(false);
          setSearchResults([]);
          setSearchResultsAll([]);
          setPlaylist([]);
          setSelectedSong(null);
          setCurrentSong(null);
          setSearchCommand(null);
          setUserPlaylists([]);
          
        }}
      >
        Log Out
      </button>
    </div>
  );
};
export default ToggleMode;
