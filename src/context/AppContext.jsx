import React, {createContext,useEffect, useState} from 'react';

export const AppContext = createContext();


export const AppProvider = ({children}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [noResult  , setNoResult] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const [searchResultsAll, setSearchResultsAll] = useState([]);
  const[isDarkMode, setIsDarkMode] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [currentSong,setCurrentSong] = useState(null);
  const [addedToPlaylist , setAddedToPlaylist]=useState(null);
  const [playlistLimitReached, setPlaylistLimitReached]=useState(false);  
  const [searchResultTag, setSearchResultTag] = useState(false); 
  const [continueToSearchAsGuest , setContinueToSearchAsGuest] = useState(false);
  const [continueToSearchAfterLogin , setContinueToSearchAfterLogin] = useState(false);
  const [userToken ,setUserToken] = useState(null);
  
  const [name, setName] = useState(() => {
    const stored = localStorage.getItem('name');
    try{
      return stored && stored !== 'undefined' ? JSON.parse(stored) : '';
    }catch{
      return '';
    }
  });

  const [submitted ,setSubmitted]=useState(()=>{
    const storedSubmitted = localStorage.getItem('submitted');

    return storedSubmitted ? JSON.parse(storedSubmitted) : false;
  });

  const handlerNameInput = (e) => {setName(e.target.value)};
        
  const submitHandler = (e) => {  
      e.preventDefault();
     if(name.trim()){
      setSubmitted(true);
     
     }
  }
  //useing useEffect to save the logical atate for after re-directing from spotify
  useEffect(()=>{
      localStorage.setItem('name', JSON.stringify(name));
      localStorage.setItem('submitted', JSON.stringify(submitted));
       }, [name,submitted]);
 
  
      const handleRemove=(id,form)=>{
            if(form==='playsong'){
              setSelectedSong(null);
              setCurrentSong(null);
          } 
          if(form==='songcard'){
              setSearchResults((prev)=>prev.filter((item)=>item.id !==id));
              setSearchResultsAll((prevs)=>prevs.filter((item)=>item.id !==id));
              setSelectedSong(null);
              setCurrentSong(null);
          }
          if(form==='playlist'){
             setPlaylist((pre)=>pre.filter((item)=>item.id !==id));
          }  
      }

      const handlePlay =(song)=>{
          setSelectedSong(song);
      } 
        //cap for playlist at 10 song
      const handleAddToPlaylist=(song)=>
                    setPlaylist((prev)=> {      
                      if(prev.length>=10){
                        return prev;
                      }  else {
                        if(prev.some((item)=>(item.id===song.id))){
                            return prev;
                          } else {
                             return [...prev , song]
                            }}
                         })          
                    
           //CHANGING PLAY TO NOW PLAYING AND REVERSE
           useEffect(()=>{
            if(selectedSong){
                setCurrentSong(selectedSong.id)
            }
           },[selectedSong,setCurrentSong])

            //check for fales or true
            useEffect(()=>{
               setPlaylistLimitReached(playlist.length>=10)
            },[playlist])
         
         //changing the add to playlist to already added to playlist
         useEffect(()=>{
          setAddedToPlaylist((playlist.map((item)=>item.id)))
         },[playlist])
         
         
         /////////PKCE AUTHORIZATION CODE FLOW FOR SPOTIFY LOGIN///////////
         //create a random string for the code_verifier
          const generateRandomString =(length)=>{
            const ster = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let result='';
            for(let j=0; j<length; j++){
              const randomSterindex = Math.floor(Math.random()*ster.length);
              result+=ster[randomSterindex];
            }
            return result;
          }
          async function generateChallengeCode (codeVerifier) {
            ///convert string to binary data
            const encoder = new TextEncoder();
            //convert to UTF-8 bytes
            const data =encoder.encode(codeVerifier);
            //hash the bytes using SHA-256
            const digest =await window.crypto.subtle.digest('SHA-256' , data);
            // calling next function to convert to safe base64url
            return base64UrlEncode(digest);
          }
          //convert to safe base64url
          function base64UrlEncode (buffer) {
            //Take a binary buffer, convert it into an array of bytes, then turn those bytes into string into Base64 and 
            // convert or remove(/\+=)
            //new Uint8Array(buffer) will convert the buffer to an array of bytes
            //String.fromCharCode will convert the array of bytes to a string
            //btoa will convert the string to Base64
            return btoa(String.fromCharCode(...new Uint8Array(buffer)))
            .replace(/\+/g,'-')
            .replace(/\//g,'_')
            .replace(/=+$/,'');
          }

         const handleLoginToSpotify =async () => {
          const codeVerifier = generateRandomString(128);
          const codeChallenge = await generateChallengeCode(codeVerifier);
          localStorage.setItem('code_verifier-spotify', codeVerifier); 
          const client_id='dc90f37b8774443685687850b885de75';
          const redirect_uri = "http://localhost:5173/";
          const scope = 'playlist-modify-public playlist-modify-private';
                                             
          const SPOTIFY_AUTH_URL = `https://accounts.spotify.com/authorize` +
          `?response_type=code` +
          `&client_id=${client_id}` +
          `&scope=${encodeURIComponent(scope)}` +
          `&redirect_uri=${encodeURIComponent(redirect_uri)}` +
          `&code_challenge_method=S256` +
          `&code_challenge=${codeChallenge}`;
          window.location.href= SPOTIFY_AUTH_URL;
          }
          useEffect(() => {
            const queryParams = new URLSearchParams(window.location.search);
            const authorizationCode = queryParams.get('code');
          
            if (authorizationCode) {
              console.log('Authorization code found in URL:', authorizationCode);
              setContinueToSearchAfterLogin(true);
          
              const getUserToken = async () => {
                const codeVerifier = localStorage.getItem('code_verifier-spotify');
                const client_id = 'dc90f37b8774443685687850b885de75';
                const redirect_uri = "http://localhost:5173/";
          
                try {
                  const response = await fetch('https://accounts.spotify.com/api/token', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams({
                      grant_type: 'authorization_code',
                      code: authorizationCode,
                      redirect_uri: redirect_uri,
                      client_id: client_id,
                      code_verifier: codeVerifier,
                    }),
                  });
          
                  const data = await response.json();
          
                  if (response.ok) {
                    setUserToken(data.access_token);
                    console.log('User access token:', data.access_token);
                  } else {
                    console.error('Error fetching access token:', data);
                  }
                } catch (error) {
                  console.error('Error in fetch request:', error);
                }
              };
          
              getUserToken();
            }
          }, []);
          
          
          
          
          
return (
    <AppContext.Provider value=
    {{name, setName,submitted ,setSubmitted,
      userToken ,setUserToken,
      continueToSearchAsGuest , setContinueToSearchAsGuest,
      continueToSearchAfterLogin , setContinueToSearchAfterLogin, 
      searchResultTag, setSearchResultTag,
      addedToPlaylist , setAddedToPlaylist,
      currentSong,setCurrentSong,
      searchResults, setSearchResults,
      isDarkMode, setIsDarkMode,
      searchTerm, setSearchTerm,
      searchResultsAll, setSearchResultsAll,
     noResult  , setNoResult,
     selectedSong, setSelectedSong, 
     playlist,  setPlaylist,
     handleRemove,handlePlay,handleAddToPlaylist, 
     handleLoginToSpotify,playlistLimitReached, 
     handlerNameInput,submitHandler}}>
      {children}
    </AppContext.Provider>
  )
}
