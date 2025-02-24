import React ,{useState} from 'react';
import './Banner.css';


export default function SearchBar({onSearch}){
const [search , setSearch] = useState('');
const [cleanSearch , setCleanSearch] = useState(true);
//const [errorSearch , setErrorSearch] = useState(fales);

const handleSubmit = (e) => {
        e.preventDefault();
        if(search.trim()){
        onSearch(search);
        setCleanSearch(false);
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
        <div className='banner'>
            <h1>Search for Artist or Album</h1>
            <form onSubmit={handleSubmit}
            className='searchBar'>
                <input 
                className='bannerInput'
                onChange={handleOnChange}
                type='text'
                placeholder='Enter Artist or Album Name' 
                value={cleanSearch ? search : ''} 
                />
                <button className='bannerButton'
                 type='submit' disabled ={!search.trim()}> Search </button>
            </form>
        </div>
     </>
    )
}