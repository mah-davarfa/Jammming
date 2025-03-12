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
  

const handleRemove=(id)=>{
            if(id===currentSong){
              setSelectedSong(null);
              setCurrentSong(null);
          }
              setSearchResults((prev)=>prev.filter((item)=>item.id !==id));
              setSearchResultsAll((prevs)=>prevs.filter((item)=>item.id !==id));
              setPlaylist((pre)=>pre.filter((item)=>item.id !==id));
      }

      const handlePlay =(song)=>{
              
              setSelectedSong(song);
           }

           const handleAddToPlaylist=(song)=>{
                
            setPlaylist((prev)=>{
                 if(prev.some((item)=>(item.id===song.id))){
                     return prev;
                 } else {
                     return [...prev , song]
                 }
             })
            
         }
           //CHANGING PAY TO NOW PLAYING AND REVERSE
           useEffect(()=>{
            if(selectedSong){
                setCurrentSong(selectedSong.id)
            }
         },[selectedSong,setCurrentSong])
          
         
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
     handleRemove,handlePlay,handleAddToPlaylist}}>
      {children}
    </AppContext.Provider>
  )
}
