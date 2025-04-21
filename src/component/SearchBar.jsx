import React ,{useState,useContext} from 'react';
import {AppContext} from '../context/AppContext.jsx';
import '../styles/searchBar.css';
import '../styles/darkmode.css';



export default function SearchBar(){
const [search , setSearch] = useState('');
const [cleanSearch , setCleanSearch] = useState(true);
const {setSearchCommand,noResult} = useContext(AppContext);

///in input user search for song album and artist 
// at asme time handleonchange  captres the input and 
// sets the search state .
// handlesubmit after user clicks sets Searchcommand with type and id 
// the Searchcommand  will be use later in data.jsx for fetching base on id and type, 
// then empty out the search state, 
//then cleans the input for next search
const handleSubmit = (e) => {
        e.preventDefault();
        if(search.trim()){
       
        setCleanSearch(false);
        setSearchCommand({type:'search', id:search});
        setSearch('');
    }
    }
    const handleOnChange = (e) => {
        
            setSearch(e.target.value);
            if (cleanSearch===false){
            setCleanSearch(true);
    }
}
    return(
       <>  
        <div >
             <form onSubmit={handleSubmit}
            className='search-container'>
                <input 
                
                    onChange={handleOnChange}
                    type='text'
                    placeholder='Search for Artist or Album Name' 
                    value={cleanSearch ? search : ''} 
                />
                <button 
                    type='submit' 
                    disabled ={!search.trim()}> 
                    Search 
                 </button>
                 {noResult && 
                 <p className='no-result'>
                    "No results to display. Try searching again!"
                </p> }
            </form>
        </div>
     </>
    )
}