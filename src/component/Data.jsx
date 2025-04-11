import React, { useState, useEffect ,useContext} from 'react';
import { AppContext } from '../context/AppContext.jsx';
import axios from 'axios';

export default function Data({onSearchTerm}) {
  console.log("Data component mounted!");
    //While up dating fetch i need to use searchTerm to be fetched and Spotify guideline fetching( based on artist song and album)

const [guestToken ,setGuestToken] = useState(null);  

    const {searchType,searchTerm,userToken,
      continueToSearchAsGuest,
      continueToSearchAfterLogin,
      setContinueToSearchAfterLogin,
      handleLoginToSpotify,setSearchResults,
      searchCommand , setSearchCommand} = useContext(AppContext);

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
            if (!searchCommand || !searchCommand.id) return;
          
            const token = userToken || guestToken;
            if (!token) return;
          
            const isId = /^[0-9a-zA-Z]{22}$/.test(searchCommand.id);
          
            const fetchData = async () => {
              try {
                let url = '';
                
                console.log('searchCommand', searchCommand);
               // console.log('searchType:', searchType);
               // console.log('isId:', isId);
                  
                if (!isId || searchCommand.type === 'search') {
                  url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchCommand.id)}&type=album%2Ctrack&limit=5&include_external=audio`;
                } else if (searchCommand.type === 'artist') {
                  url = `https://api.spotify.com/v1/artists/${searchCommand.id}/top-tracks?market=US`;
                } else if (searchCommand.type === 'album') {
                  url = `https://api.spotify.com/v1/albums/${searchCommand.id}`;
                } else {
                  console.warn('No valid search type defined for ID. Ignoring search.');
                  return;
                }
                  
                    const response = await axios.get(url ,{
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  });
          
                  const data = response.data;
                  onSearchTerm(data); // Pass the data to the parent component
                  console.log("Data fetched:", data);
      
                                  } catch (error) {
                       console.error("Error fetching data:", error);
                                  }
                  };
                                
            fetchData();
          
      }, [searchCommand,userToken, guestToken]);
    
    return (
        <div>

        </div>
    )}
 