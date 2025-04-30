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
    playlist,
     setIsSearchStarted, 
    isDarkMode,
    setSearchResults,
    searchResultsAll,
    continueToSearchAfterLogin,
    continueToSearchAsGuest,
    setSearchCommand,searchCommand
  } = useContext(AppContext);
  
 
  const handleSearch =(search)=>{
    
    setSearchCommand({type:'search', id:search}); 
  }
  const handleSearchTerm = (data) => {
    let allItems = [];
  
    //  Case 1: fetched an album by ID
    if ('album_type' in data && data.tracks?.items) {
      allItems = [...data.tracks.items]; // just the songs
      //case 2 : fetched top songs from artistCard
    }else if (Array.isArray(data.tracks)){
      allItems =[...data.tracks];
    }
    // Case 3: standard search (songs + albums + artists)
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
  if(!playlist.length>0 && searchResultsAll.length === 0 ){
    setIsSearchStarted(false); 
  }
},[searchResultsAll,playlist]);
console.log('search command',searchCommand);
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
                    <SearchBar />
                    </div>
                  </div>
                <Data  onSearchTerm={handleSearchTerm}/>
                
                {(!searchCommand ) ? (<div>
                  <video autoPlay muted loop className='startup-Background'>
                      <source src="/video/background2.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                   </video>
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
                <video className='startup-Background' autoPlay muted loop>
                      <source src="/video/background2.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                   </video>
                 
                 
              </div>)}
        </div>
      </div> 
    </>
  )
};
export default App;
