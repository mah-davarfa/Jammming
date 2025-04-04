import react, {useState,useContext} from 'react';
import  {AppContext} from '../context/AppContext';
import '../styles/darkmode.css';

function ArtistCard({id, name, image, genre, popularity}){

    const {setSearchTerm,setSearchResults,setSearchResultsAll} = useContext(AppContext);
    const handleRemove =(e)=>{
        e.stopPropagation();
        setSearchResults((prev)=>prev.filter((item)=>item.id !==id));
        setSearchResultsAll((prev)=>prev.filter((item)=>item.id !==id));
    }

    const handelgetSong=()=>{
        setSearchTerm(id);//adjust latter
    };
    
    return(
        <div className='playlist-item-card'>
        <img src={image} alt={name} width={250} height={250}/>
        <h3>{name}<button onClick={handelgetSong}>Get top Songs</button></h3>
        <p>Genre: {genre}</p>   
        <p>Popularity: {popularity}</p>
        {/*<p>id:{id}</p> */}
        <button  onClick={handleRemove}>Remove</button>
        </div>
    )
}
export default ArtistCard;