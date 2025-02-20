import React ,{useState} from 'react';
import './Banner.css';


export default function SearchBar(){
const [search , setSearch] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        
    }
    const handleOnChange = (e) => {
        if((e.target.value).trim()){
            setSearch(e.target.value);
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
                value={search} 
                />
                <button className='bannerButton'
                 type='submit'> Search </button>
            </form>
        </div>
     </>
    )
}