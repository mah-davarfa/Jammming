import React ,{useState,useContext} from 'react';
import {AppContext} from '../context/AppContext.jsx';
import '../styles/searchBar.css';
import '../styles/darkmode.css';



export default function SearchBar({onSearch}){
const [search , setSearch] = useState('');
const [cleanSearch , setCleanSearch] = useState(true);
//const [errorSearch , setErrorSearch] = useState(fales);
const {setSearchCommand,noResult,setSearchType} = useContext(AppContext);


const handleSubmit = (e) => {
        e.preventDefault();
        if(search.trim()){
       // onSearch(search);
        setCleanSearch(false);
       // setSearchType('search');
        setSearchCommand({type:'search', id:search});// check to see does search:search works?
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
                    Search result not available
                </p> }
            </form>
        </div>
     </>
    )
}