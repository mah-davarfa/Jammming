import React, {createContext,useEffect, useState} from 'react';

export const AppContext = createContext();


export const AppProvider = ({children}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [noResult  , setNoResult] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const [searchResultsAll, setSearchResultsAll] = useState([]);
  const[isDarkMode, setIsDarkMode] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [currentSong,setCurrentSong] = useState(null);
  const [addedToPlaylist , setAddedToPlaylist]=useState(null);
  const [playlistLimitReached, setPlaylistLimitReached]=useState(false);  
    
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


return (
    <AppContext.Provider value=
    {{addedToPlaylist , setAddedToPlaylist,
      currentSong,setCurrentSong,
      searchResults, setSearchResults,
      isDarkMode, setIsDarkMode,
      searchTerm, setSearchTerm,
      searchResultsAll, setSearchResultsAll,
     noResult  , setNoResult,
     selectedSong, setSelectedSong, 
     playlist,  setPlaylist,
     handleRemove,handlePlay,handleAddToPlaylist, 
     playlistLimitReached}}>
      {children}
    </AppContext.Provider>
  )
}
