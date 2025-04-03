import react , {useContext , useState} from 'react';
import { AppContext } from '../context/AppContext';
import '../styles/darkmode.css';


function AlbumCard({name, artist, image, releaseDate, genre, songs, totalOfSongs,id}) {

  const {setSearchTerm, setSearchResults, setSearchResultsAll} = useContext(AppContext);
  
  
  const handleRemove = (e) => {
    e.stopPropagation();

    setSearchResults((prevResult)=>prevResult.filter((item)=>item.id !==id));
    
    setSearchResultsAll((prevResults)=>prevResults.filter((items)=>items.id !==id));
  };
  const handleClick = () => {
    setSearchTerm(id);//adjust later
  };
    return(
        <div className="playlist-item-card"  >
      <img src={image} alt={name} width={250} height={250}/>
      <h3>{name}</h3>
      <p>Artist: {artist}</p>
      <p>Release Date: {releaseDate}</p>
      <p>Genre: {genre}</p>
      <p>Total of Songs: {totalOfSongs}</p>
      <p>Songs</p>
     
      <ul>
       
        {songs?.map((song,index)=>(
          <li key={index}>{song.name}<button onClick={handleClick} > Get this song</button></li>
          
      ))}
          
      </ul>
      
      <p>ID:{id}</p>
      <button onClick={handleRemove}>Remove</button>
    </div>
    
    )
}
export default AlbumCard;