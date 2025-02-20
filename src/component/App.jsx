import React from 'react';
import Banner from './Banner.jsx';
import './Banner.css';
import Data from './exampFetch.jsx';
import SearchBar from './searchBar.jsx';
import './App.css';

export default App

 function App () {

  return (
    <>
    <div className='App'>
    <div className='AppBanner'>
      <Banner/>
     </div>
    <div className='AppSearchBar'> 
      <SearchBar/>
      <Data/>
    </div>
    </div>
    </>
  )
};
