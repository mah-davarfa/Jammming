import React, {createContext, useState} from 'react';

export const AppContext = React.createContext();


export const AppProvider = ({children}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [noResult  , setNoResult] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [playlist, setPlaylist] = useState([]);

  return (
    <AppContext.Provider value=
    {{searchTerm, setSearchTerm,
     noResult  , setNoResult,
     selectedSong, setSelectedSong, 
     playlist,  setPlaylist}}>
      {children}
    </AppContext.Provider>
  )
}