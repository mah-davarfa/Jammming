import React, { useState, useEffect ,useContext} from 'react';
import { AppContext } from '../context/AppContext.jsx';
import axios from 'axios';

export default function Data({onSearchTerm}) {
  console.log("Data component mounted!");
    //While up dating fetch i need to use searchTerm to be fetched and Spotify guideline fetching( based on artist song and album)
const [data ,setdata] = useState(null);
const [guestToken ,setGuestToken] = useState(null);  

    const {searchTerm,userToken,
      continueToSearchAsGuest,
      continueToSearchAfterLogin,
      setContinueToSearchAfterLogin,handleLoginToSpotify} = useContext(AppContext);

      const client_id='dc90f37b8774443685687850b885de75' 
      const client_Secret='9b08e01df6924139973772576d03d47b'
            //check if user picked to login or continue as guest
            useEffect(()=>{
      
            ///////checks if user cclicked on guest,then fetch the Client Credentials Flow to get guestToken
                  if (continueToSearchAsGuest){
                    const getGuestToken = async ()=>{
                      const credentials = btoa(`${client_id}:${client_Secret}`);
                      try {
                        const response = await fetch('https://accounts.spotify.com/api/token', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Authorization':`Basic ${credentials}`
                          },
                          body: 'grant_type=client_credentials',
                        });
                        if (response.ok) {
                        const token = await response.json();
                        setGuestToken(token.access_token);
                        console.log("guest token is:" , token.access_token);
                      }
                      throw new Error(`HTTP status:${response.status}`);
                      } catch (error){
                        console.log('Error in fetching gust token:', error);
                      }
                    }
                    getGuestToken(); 
                  }
              
    },[continueToSearchAsGuest] )
    
      useEffect(() => {
            if (!searchTerm) return;
          
            const token = userToken || guestToken;
            if (!token) return;
          
            const isId = /^[0-9a-zA-Z]{22}$/.test(searchTerm);
          
            const fetchData = async () => {
              try {
                const response = await axios.get(
                  isId
                    ? `https://api.spotify.com/v1/artists/${searchTerm}/top-tracks?market=US`
                    
                    :`https://api.spotify.com/v1/search?q=${encodeURIComponent(searchTerm)}&type=album,artist,track&limit=15&include_external=audio`,

                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );
          
                const data = response.data;
                onSearchTerm(data);
                setdata(data);
                console.log(" Fetched data:", data);
              } catch (error) {
                console.error(" Error fetching data:", error);
              }
            };
          
            fetchData();
      }, [searchTerm]);
    

           

    return (
        <div>

        </div>
    )}
     










          //////fetching the searches based on what token need to be use 








  /*  ///different disign///
            useEffect(()=>{
                if (!searchTerm) return;
                fetch('./data.json')
                    .then((res)=>{
                        if(!res.ok){
                            throw new Error(`HTTP error! status:${res.status}`);
                        }
                        return res.json();
                    })
                
                .then((data)=>
                  {setdata(data)
                   onSearchTerm(data)
                  
            })
            .catch((error)=>console.error('Error in fetching:', error));

            },[searchTerm] )
            if (!searchTerm) {return null;}
           else if(!data){
                return <div>Loading...</div>
            }
return
    (
        <div>

        </div>
    )
}



/////////////


import React, { useState, useEffect ,useContext} from 'react';
import { AppContext } from '../context/AppContext.jsx';


export default function Data({onSearchTerm}) {

    //While up dating fetch i need to use searchTerm to be fetched and Spotify guideline fetching( based on artist song and album)
const [data ,setdata] = useState(null);
const [token ,setToken] = useState(null);
   
    const {searchTerm} = useContext(AppContext);

            useEffect (()=>{
                if (!searchTerm) {return;
                }else{
        const getData = async()=>{   
            const client_id='dc90f37b8774443685687850b885de75' 
            const client_Secret='9b08e01df6924139973772576d03d47b'
            grant_type=`${client_id}:${client_Secret}`
            try {

                const token =await fetch('https://accounts.spotify.com/api/token' )
                if(token.ok){
                    const dataToken = await token.json()
                    setToken(dataToken.access_token)
                    console.log(dataToken.access_token)
                } 
                throw new Errore (`HTTP error! status:${token.status}`);
 } 
           catch (error) 
 { 
    console.log('Error in fetching:', error);
} }
} 
    
            getData();
            },[searchTerm] )
            if (!searchTerm) {return null;}
           else if(!data){
                return <div>Loading...</div>
            }
return
    (
        <div>

        </div>
    )
}
  ////////////////////////////////////////////
import React from 'react';

const LoginWithSpotify = () => {
  const handleLogin = () => {
    const clientId = "YOUR_CLIENT_ID"; // Replace with your Spotify client ID
    const redirectUri = "YOUR_REDIRECT_URI"; // Replace with your redirect URI (e.g., http://localhost:5173/)
    const scopes = "user-library-modify scope"; // Add desired scopes
    const state = "unique_state_string"; // Optional for CSRF protection

    const spotifyAuthUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}&state=${state}`;

    // Redirect the user to Spotify's authorization page
    window.location.href = spotifyAuthUrl;
  };

  return (
    <button onClick={handleLogin}>
      Log in with Spotify
    </button>
  );
};

export default LoginWithSpotify;

import React, { useEffect } from 'react';
/////////////////////////////////////////////////////////////////
const Callback = () => {
  useEffect(() => {
    // Extract query parameters from the URL
    const queryString = window.location.search; // Get "?code=AUTHORIZATION_CODE&state=random_state_string"
    const urlParams = new URLSearchParams(queryString);

    // Get the authorization code and state
    const authorizationCode = urlParams.get("code");
    const stateParam = urlParams.get("state");

    if (authorizationCode) {
      console.log("Authorization Code:", authorizationCode);
      console.log("State:", stateParam);

      // Call the function to exchange the code for an access token
      exchangeAuthorizationCodeForToken(authorizationCode);
    } else {
      console.error("Authorization code not found in the URL!");
    }
  }, []);

  const exchangeAuthorizationCodeForToken = async (code) => {
    const clientId = "YOUR_CLIENT_ID"; // Replace with your Spotify app's client ID
    const clientSecret = "YOUR_CLIENT_SECRET"; // Replace with your Spotify app's client secret
    const redirectUri = "http://localhost:5173/callback"; // Your registered redirect URI

    const tokenEndpoint = "https://accounts.spotify.com/api/token";

    try {
      // Make the POST request to Spotify's token endpoint
      const response = await fetch(tokenEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code: code,
          redirect_uri: redirectUri,
          client_id: clientId,
          client_secret: clientSecret,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Access Token:", data.access_token);
        console.log("Refresh Token:", data.refresh_token);

        // Use the access token for Spotify API calls
        // Example: fetch user's profile data
        fetchUserProfile(data.access_token);
      } else {
        const error = await response.json();
        console.error("Error exchanging authorization code:", error);
      }
    } catch (error) {
      console.error("Network error exchanging authorization code:", error);
    }
  };

  const fetchUserProfile = async (accessToken) => {
    const apiEndpoint = "https://api.spotify.com/v1/me";

    try {
      const response = await fetch(apiEndpoint, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const userProfile = await response.json();
        console.log("User Profile:", userProfile);
      } else {
        console.error("Error fetching user profile:", await response.json());
      }
    } catch (error) {
      console.error("Network error fetching user profile:", error);
    }
  };

  return <div>Processing Spotify login and retrieving tokens...</div>;
};

export default Callback;

/////////////////////////////////// 
const [token, setToken] = useState(null);
const [tokenExpiresAt, setTokenExpiresAt] = useState(null); // Optional

useEffect(() => {
  const isTokenExpired = () => {
    if (!tokenExpiresAt) return true;
    return Date.now() > tokenExpiresAt;
  };

  const fetchToken = async () => {
    const clientId = 'dc90f37b8774443685687850b885de75';
    const clientSecret = '9b08e01df6924139973772576d03d47b';
    const credentials = btoa(`${clientId}:${clientSecret}`);

    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${credentials}`,
        },
        body: 'grant_type=client_credentials',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch token');
      }

      const data = await response.json();
      setToken(data.access_token);
      setTokenExpiresAt(Date.now() + data.expires_in * 1000); // Store expiration
      console.log('Fetched new token:', data.access_token);
    } catch (err) {
      console.error('Token fetch error:', err);
    }
  };

  // If token missing or expired, fetch a new one
  if (!token || isTokenExpired()) {
    fetchToken();
  }
}, [token, tokenExpiresAt]);
*/