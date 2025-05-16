import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";
import axios from "axios";

export default function Data({ onSearchTerm }) {
  console.log("Data component mounted!");

  const [guestToken, setGuestToken] = useState(null);
  const { userToken, continueToSearchAsGuest, searchCommand } = useContext(AppContext);

  //  Securely fetch guest token from your backend
  useEffect(() => {
    if (continueToSearchAsGuest) {
      const getGuestToken = async () => {
        try {
                     //for local version
           //const response = await fetch("http://localhost:4000/api/token"); 
                      //for render for published version
         const response = await fetch("https://jammming-backend.onrender.com/api/token"); 
          const data = await response.json();

          if (data.access_token) {
            setGuestToken(data.access_token);
            console.log("guest token is:", data.access_token);
          } else {
            throw new Error("Failed to retrieve token from backend.");
          }
        } catch (error) {
          console.log("Error fetching guest token from backend:", error);
        }
      };
      getGuestToken();
    }
  }, [continueToSearchAsGuest]);

  //  Fetch Spotify data when a command is triggered
  useEffect(() => {
    if (!searchCommand || !searchCommand.id) return;

    const token = userToken || guestToken;
    if (!token) return;

    const isId = /^[0-9a-zA-Z]{22}$/.test(searchCommand.id);

    const fetchData = async () => {
      try {
        let url = "";

        console.log("searchCommand", searchCommand);

        if (!isId || searchCommand.type === "search") {
          url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(
            searchCommand.id
          )}&type=album,track,artist&limit=5&include_external=audio`;
        } else if (searchCommand.type === "artist") {
          url = `https://api.spotify.com/v1/artists/${searchCommand.id}/top-tracks?market=US`;
        } else if (searchCommand.type === "album") {
          url = `https://api.spotify.com/v1/albums/${searchCommand.id}`;
        } else {
          console.warn("No valid search type defined for ID. Ignoring search.");
          return;
        }

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;
        onSearchTerm(data);
        console.log("Data fetched:", data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [searchCommand, userToken, guestToken]);

  return <div></div>;
}
