import react, {useState,useContext} from 'react';
import  {AppContext} from '../context/AppContext';
import '../styles/darkmode.css';

function ArtistCard({id, name, image, genre, popularity}){

    const {searchCommand , setSearchCommand,setSearchTerm,setSearchResults,setSearchResultsAll,setSearchType} = useContext(AppContext);
    const handleRemove =(e)=>{
        e.stopPropagation();
        setSearchResults((prev)=>prev.filter((item)=>item.id !==id));
        setSearchResultsAll((prev)=>prev.filter((item)=>item.id !==id));
    }

    const handelgetSong=()=>{
       // setSearchTerm(id);//adjust latter
       // setSearchType('artist');
        setSearchCommand({type:'artist', id:id});
    };
    
    return(
      <div className='playlist-item-card'>
                  {image ?
                   (
                       <img src={image} alt={name} width={250} height={250}/>
                    ) : (
                      <div style={{ width: '50px', height: '50px', backgroundColor: '#ddd', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span>No Image</span>
                      </div>
                    )}
                    <h3>{name}</h3>
                    <p>Genre: {genre}</p>   
                    <p>Popularity: {popularity}</p>
                    <button  onClick={handleRemove}>Remove</button>
                    <button onClick={handelgetSong}>Get top Songs</button>
      </div>
    )
}
export default ArtistCard;