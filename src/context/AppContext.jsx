import React, {createContext, useState} from 'react';

export const AppContext = createContext();


export const AppProvider = ({children}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [noResult  , setNoResult] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [playlist, setPlaylist] = useState([]);
const [searchResultsAll, setSearchResultsAll] = useState([]);
const[isDarkMode, setIsDarkMode] = useState(false);

  return (
    <AppContext.Provider value=
    {{isDarkMode, setIsDarkMode,
      searchTerm, setSearchTerm,
      searchResultsAll, setSearchResultsAll,
     noResult  , setNoResult,
     selectedSong, setSelectedSong, 
     playlist,  setPlaylist}}>
      {children}
    </AppContext.Provider>
  )
}
