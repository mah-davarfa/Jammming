import React, {useState,useContext} from 'react';
import Banner from './Banner.jsx';
import Data from './Data.jsx';
import SearchBar from './SearchBar.jsx';
import ToggleMode from './ToggleMode.jsx';
import SearchResults from './SearchResults.jsx';
import { AppContext } from '../context/AppContext.jsx';
import '../styles/darkmode.css';




///

 function App () {
  const [userName, setUserName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const{isDarkMode} = useContext(AppContext);
  
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
        <Data searchTerm={searchTerm} onSearchTerm={handleSearchTerm}/>
        <SearchResults searchResults={searchResults} /> 
        {/* i must add playList and selectedSong to inside of wrapper after create them!*/}
        
      </div>
      )}
    </div>
    </>
  )
};
export default App;