import React, {useState,useContext,useEffect} from 'react';
import Banner from './Banner.jsx';
import Data from './Data.jsx';
import SearchBar from './SearchBar.jsx';
import ToggleMode from './ToggleMode.jsx';
import SearchResults from './SearchResults.jsx';
import { AppContext } from '../context/AppContext.jsx';
import PlaySong from './PlaySong.jsx';
import Playlist from './Playlist.jsx';
import '../styles/darkmode.css';




///

 function App () {
  
 
  const{
    isSearchStarted, 
    setIsSearchStarted, 
    isDarkMode,
    setSearchTerm,
    setSearchType, 
    setSearchResults,
    searchResultsAll,
    continueToSearchAfterLogin,
    continueToSearchAsGuest,
    setSearchCommand
  } = useContext(AppContext);
  
  ///search to term ?
  const handleSearch =(search)=>{
    //setSearchTerm(search);
    //setSearchType('search');
    setSearchCommand({type:'search', id:search});// check to see does search:search works?
  }
  const handleSearchTerm = (data) => {
    let allItems = [];
  
    // ✅ Case 1: fetched an album by ID
    if ('album_type' in data && data.tracks?.items) {
      allItems = [...data.tracks.items]; // just the songs
    }
    // ✅ Case 2: standard search (songs + albums + artists)
    else {
      allItems = [
        ...(data.tracks?.items || []),
        ...(data.albums?.items || []),
        ...(data.artists?.items || [])
      ];
    }
  
    setSearchResults(allItems);
    setIsSearchStarted(true);
    console.log("searchResults", allItems);
  };
  


useEffect(()=>{
  localStorage.setItem('searchResultsAll', JSON.stringify(searchResultsAll));
  if(searchResultsAll.length === 0){
    setIsSearchStarted(false); 
  }
},[searchResultsAll])

  return (
    <>
      <div className={'frame-container'}>
        <div className={isDarkMode ? 'dark-mode' : 'light-mode'}>
              <div >
                <Banner />
                
              </div>
            
              {continueToSearchAsGuest || continueToSearchAfterLogin ?(
              <div>
                  <div className={'SearchToggleBar'}>
                    <div className={"left-SearchToggleBar"}>
                    <ToggleMode /> 
                    </div>
                    <div className={"right-SearchToggleBar"}>
                    <SearchBar onSearch={handleSearch}/>
                    </div>
                  </div>
                <Data  onSearchTerm={handleSearchTerm}/>
                {!isSearchStarted ? (<div>
                  <img src='../../imag/vecteezy_wireframe-landscape-elevation-particle-background-abstract_8009451.jpg' 
                    alt='startup-Background' 
                    className='search-startup-Background'
                  />
                  </div>):(
                <div className='main-container'>
                    <div className={"search-results-c"}>
                       <SearchResults /> 
                    </div>
                    <div  className={"play-song-c"}>
                       <PlaySong />
                    </div>
                    <div className={"playlist-area-c"}>
                      <Playlist/>
                    </div>
                </div>)}
              </div>
              ):(<div>
                <img src='../../imag/vecteezy_wireframe-landscape-elevation-particle-background-abstract_8009451.jpg'
                 alt='startUpBackground' 
                 className='startup-Background'
                 />
              </div>)}
        </div>
      </div> 
    </>
  )
};
export default App;
