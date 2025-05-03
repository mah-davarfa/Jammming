import React, { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [noResult, setNoResult] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [playlistTitle, setPlaylistTitle] = useState("PlayList");
  const [isSaved, setIsSaved] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [addedToPlaylist, setAddedToPlaylist] = useState(null);
  const [playlistLimitReached, setPlaylistLimitReached] = useState(false);
  const [searchResultTag, setSearchResultTag] = useState(false);
  const [continueToSearchAsGuest, setContinueToSearchAsGuest] = useState(false);
  const [continueToSearchAfterLogin, setContinueToSearchAfterLogin] =
    useState(false);
  const [userToken, setUserToken] = useState(null);
  const [searchtype, setSearchType] = useState("search");

  const [searchCommand, setSearchCommand] = useState(() => {
    const storedCommand = localStorage.getItem("command");
    try {
      const parsed = JSON.parse(storedCommand);
      return storedCommand && storedCommand !== "undefined" ? parsed : [null];
    } catch {
      return [null];
    }
  });

  const [name, setName] = useState(() => {
    const stored = localStorage.getItem("name");
    try {
      return stored && stored !== "undefined" ? JSON.parse(stored) : "";
    } catch {
      return "";
    }
  });

  const [submitted, setSubmitted] = useState(() => {
    const storedSubmitted = localStorage.getItem("submitted");
    return storedSubmitted ? JSON.parse(storedSubmitted) : false;
  });

  const [playlist, setPlaylist] = useState(() => {
    const storedPlaylist = localStorage.getItem("playlist");
    try {
      const parsed = JSON.parse(storedPlaylist);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const [searchResultsAll, setSearchResultsAll] = useState(() => {
    const storedSearchResultsAll = localStorage.getItem("searchResultsAll");
    try {
      const parsed = JSON.parse(storedSearchResultsAll);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const [isSearchStarted, setIsSearchStarted] = useState(() => {
    try {
      const stored = localStorage.getItem("isSearchStarted");
      return stored ? JSON.parse(stored) : false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    localStorage.setItem("isSearchStarted", JSON.stringify(isSearchStarted));
  }, [isSearchStarted]);

  useEffect(() => {
    localStorage.setItem("name", JSON.stringify(name));
    localStorage.setItem("submitted", JSON.stringify(submitted));
    localStorage.setItem("playlist", JSON.stringify(playlist));
    localStorage.setItem("command", JSON.stringify(searchCommand));
  }, [name, submitted, playlist, searchCommand]);

  const handleRemove = (id, form) => {
    if (form === "playsong") {
      setSelectedSong(null);
      setCurrentSong(null);
    }
    if (form === "songcard" || form === "albumcard" || form === "artistcard") {
      setSearchResults((prev) => prev.filter((item) => item.id !== id));
      setSearchResultsAll((prevs) => prevs.filter((item) => item.id !== id));
      setSelectedSong(null);
      setCurrentSong(null);
    }
    if (form === "playlist") {
      setPlaylist((pre) => pre.filter((item) => item.id !== id));
    }
  };

  const handlePlay = async (song) => {
    if (!song.preview) {
      try {
        const response = await fetch(
          `https://jammming-backend.onrender.com/api/preview?song=${encodeURIComponent(
            song.name
          )}&artist=${encodeURIComponent(song.artist)}`
        );
        const data = await response.json();
        if (data.success && data.results.length > 0) {
          song.preview = data.results[0].previewUrls[0];
        } else {
          console.warn("No preview found.");
        }
      } catch (err) {
        console.error("Error fetching preview:", err);
      }
    }
    setSelectedSong(song);
  };

  const handleAddToPlaylist = (song) => {
    setIsSaved(false);
    setPlaylist((prev) => {
      if (prev.length >= 10 || prev.some((item) => item.id === song.id)) {
        return prev;
      }
      return [...prev, song];
    });
  };

  useEffect(() => {
    if (selectedSong) {
      setCurrentSong(selectedSong.id);
    }
  }, [selectedSong]);

  useEffect(() => {
    setPlaylistLimitReached(playlist.length >= 10);
  }, [playlist]);

  useEffect(() => {
    setAddedToPlaylist(playlist.map((item) => item.id));
  }, [playlist]);

  const generateRandomString = (length) => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from(
      { length },
      () => chars[Math.floor(Math.random() * chars.length)]
    ).join("");
  };

  const generateChallengeCode = async (verifier) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(verifier);
    const digest = await window.crypto.subtle.digest("SHA-256", data);
    return base64UrlEncode(digest);
  };

  const base64UrlEncode = (buffer) => {
    return btoa(String.fromCharCode(...new Uint8Array(buffer)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  };

  const handleLoginToSpotify = async () => {
    const codeVerifier = generateRandomString(128);
    const codeChallenge = await generateChallengeCode(codeVerifier);
    localStorage.setItem("code_verifier-spotify", codeVerifier);

    const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const redirect_uri = import.meta.env.VITE_REDIRECT_URI;
    const scope = "playlist-modify-public playlist-modify-private";

    const authURL =
      `https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}` +
      `&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(
        redirect_uri
      )}` +
      `&code_challenge_method=S256&code_challenge=${codeChallenge}`;

    window.location.href = authURL;
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const authorizationCode = queryParams.get("code");

    if (authorizationCode) {
      setContinueToSearchAfterLogin(true);

      const getUserToken = async () => {
        const codeVerifier = localStorage.getItem("code_verifier-spotify");
        const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
        const redirect_uri = import.meta.env.VITE_REDIRECT_URI;

        try {
          const response = await fetch(
            "https://accounts.spotify.com/api/token",
            {
              method: "POST",
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              body: new URLSearchParams({
                grant_type: "authorization_code",
                code: authorizationCode,
                redirect_uri: redirect_uri,
                client_id: client_id,
                code_verifier: codeVerifier,
              }),
            }
          );

          const data = await response.json();
          if (response.ok) {
            setUserToken(data.access_token);
          } else {
            console.error("Error fetching access token:", data);
          }
        } catch (error) {
          console.error("Fetch error:", error);
        }
      };

      getUserToken();
    }
  }, []);

  const handlerNameInput = (e) => setName(e.target.value);
  const submitHandler = (e) => {
    e.preventDefault();
    if (name.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <AppContext.Provider
      value={{
        isSearchStarted,
        setIsSearchStarted,
        isSaved,
        setIsSaved,
        searchCommand,
        setSearchCommand,
        searchtype,
        setSearchType,
        name,
        setName,
        submitted,
        setSubmitted,
        userToken,
        setUserToken,
        continueToSearchAsGuest,
        setContinueToSearchAsGuest,
        continueToSearchAfterLogin,
        setContinueToSearchAfterLogin,
        searchResultTag,
        setSearchResultTag,
        addedToPlaylist,
        setAddedToPlaylist,
        currentSong,
        setCurrentSong,
        searchResults,
        setSearchResults,
        isDarkMode,
        setIsDarkMode,
        searchTerm,
        setSearchTerm,
        searchResultsAll,
        setSearchResultsAll,
        noResult,
        setNoResult,
        selectedSong,
        setSelectedSong,
        playlist,
        setPlaylist,
        handleRemove,
        handlePlay,
        handleAddToPlaylist,
        handleLoginToSpotify,
        playlistLimitReached,
        handlerNameInput,
        submitHandler,
        playlistTitle,
        setPlaylistTitle,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
