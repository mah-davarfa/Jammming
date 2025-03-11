import React, {useState,useContext} from 'react';
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
  const [userName, setUserName] = useState('');
  
 
  const{isDarkMode,setSearchTerm, setSearchResults} = useContext(AppContext);
  
  const handleNameSubmit = (name)=>{
    setUserName(name);
  }
  const handleSearch =(search)=>{
    setSearchTerm(search);
  }
const handleSearchTerm = (data) => {
  setSearchResults(Array.isArray(data)? data :[data]);
}
  return (
    <>
    <div className={isDarkMode ? 'dark-mode' : 'light-mode'}>
      <div >
        <Banner onNameSubmit={handleNameSubmit}/>
        <ToggleMode />  
      </div>
     
      {userName &&(
      <div>
        <SearchBar onSearch={handleSearch}/>
        <Data  onSearchTerm={handleSearchTerm}/>
        <div className='main-container'>
        <SearchResults /> 
        <PlaySong />
        <Playlist/>
        </div>
      </div>
      )}
    </div>
    </>
  )
};
export default App;