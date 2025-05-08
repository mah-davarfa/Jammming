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
          localStorage.setItem("name", JSON.stringify(""));
          localStorage.setItem("submitted", JSON.stringify(false));
          localStorage.removeItem("code_verifier-spotify");
          localStorage.removeItem("isSearchStarted");
          localStorage.removeItem("playlist");
          localStorage.removeItem("searchResultsAll");
          setPlaylistTitle("PlayList");
          setIsDarkMode(true);
          setIsSaved(false);
          setName("");
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
        }}
      >
        Log Out
      </button>
    </div>
  );
};
export default ToggleMode;
