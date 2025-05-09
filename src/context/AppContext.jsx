import React, { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [noResult, setNoResult] = useState(false);
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
  const [userPlaylistInPlaylistId, setUserPlaylistInPlaylistId] = useState("");
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);
  const [expairationTime, setExpairationTime] = useState(null);
  const [times, setTimes] = useState(null);
  const [userPlaylists, setUserPlaylists] = useState(()=>{
    const storePlaylists = localStorage.getItem("userPlaylists");
    try {
      const parsed = JSON.parse(storePlaylists);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const [selectedSong, setSelectedSong] = useState(()=>{
    const storedSong = localStorage.getItem("selectedSong");
    try {
      return storedSong && storedSong !== "undefined" ? JSON.parse(storedSong) : null;
    } catch {
      return null;
    }
  });

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
  const [userId, setUserId] = useState(null);

 useEffect(()=>{
    if (expairationTime) setTimes(expairationTime - Date.now());
 },[expairationTime]);

  useEffect(() => {
    localStorage.setItem("isSearchStarted", JSON.stringify(isSearchStarted));
  }, [isSearchStarted]);

  useEffect(() => {
    localStorage.setItem("userPlaylists", JSON.stringify(userPlaylists));
    localStorage.setItem("selectedSong", JSON.stringify(selectedSong));
    localStorage.setItem("name", JSON.stringify(name));
    localStorage.setItem("submitted", JSON.stringify(submitted));
    localStorage.setItem("playlist", JSON.stringify(playlist));
    localStorage.setItem("command", JSON.stringify(searchCommand));
  }, [name, submitted, playlist, searchCommand,selectedSong,userPlaylists]);

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
      setSelectedSong(song);
      setIsLoadingPreview(true);
      try {
        const response = await fetch(
          `https://jammming-backend.onrender.com/api/preview?song=${encodeURIComponent(
            song.name
          )}&artist=${encodeURIComponent(song.artist)}`
        );
        const data = await response.json();
        if (data.success && data.results.length > 0) {
          song.preview = data.results[0].previewUrls[0];
          setSelectedSong({...song});
        } else {
          console.warn("No preview found.");
        }
      } catch (err) {
        console.error("Error fetching preview:", err);
      }
    }
    
    setIsLoadingPreview(false);
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

    const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID;//for published version and local version
    const redirect_uri = import.meta.env.VITE_REDIRECT_URI; //for published version and local version
    const scope = "playlist-modify-public playlist-modify-private";
   
    const authURL =
    `https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}` +
    `&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirect_uri)}` +
    `&code_challenge_method=S256&code_challenge=${codeChallenge}`;
   
    window.location.href = authURL;
  };
  // when Authorization code is received, dynamically gets the user access token
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const authorizationCode = queryParams.get("code");

    if (authorizationCode) {
      setContinueToSearchAfterLogin(true);
      //get a user token by using authorization code
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
            setExpairationTime (Date.now() + data.expires_in*1000);
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
      // get the user id for playlist and userplaylists
      async function getUserId() {
        try {
          const token = userToken;
          if ( !token) return;
          /// get the user id
          const getUserId = await fetch("https://api.spotify.com/v1/me", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const userIdData = await getUserId.json();
          setUserId(userIdData.id || []);
          console.log("user id :", userIdData.id);
          return userIdData.id;
          
  }catch (error) {
          console.error("Fetching load playlist error:", error);
        }
  }
  useEffect(() => {
    if (playlist.length === 0 && userPlaylistInPlaylistId) {
      setPlaylistTitle("Playlist");
      setUserPlaylistInPlaylistId(""); 
    }
  }, [playlist]);
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
        getUserId,
        playlistLimitReached,
        handlerNameInput,
        submitHandler,
        playlistTitle,
        setPlaylistTitle,
        userId, 
        setUserId,
        userPlaylistInPlaylistId, 
        setUserPlaylistInPlaylistId,
        userPlaylists, 
        setUserPlaylists,
        isLoadingPreview, 
        setIsLoadingPreview,
        expairationTime,
        times, 
        setTimes
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
