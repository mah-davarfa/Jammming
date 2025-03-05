import React,{useState,useEffect,useContext}  from 'react';
import AlbumCard from './AlbumCard';
import SongCard from './SongCard';
import ArtistCard from './ArtistCard';
import {AppContext} from '../context/AppContext';



const SearchResults = () => {
 const [searchResultTag, setSearchResultTag] = useState(false);
  const {setNoResult,searchResultsAll,setSearchResultsAll,searchResults,} = useContext(AppContext);
  
  
  useEffect(()=>{

      if(!searchResults)return;

    if(searchResults.length>0){

      setSearchResultsAll((prev)=>{
         const uniqueResults = 
         searchResults.filter((item)=>
        !prev.some((item2)=>
          (item2.id===item.id)));
        
      return [...prev,...uniqueResults];
      })
      setSearchResultTag(true);
      setNoResult(false);

    } else if (searchResultsAll.length > 0 && searchResults.length === 0 && searchResultTag)
      {setNoResult(true);}
    },[searchResults,])   
    
  
   return(
    <div>
        {searchResultTag ? <h2>search results</h2>:null}
      { searchResultsAll && searchResultsAll.length > 0  ? (
        searchResultsAll.map((item)=>{
            
            if(item.type && item.type.toLowerCase()==='album'){
              return (
             <AlbumCard
                  key={item.id} 
                  id={item.id}
                  name={item.name}
                  artist={item.artists[0].name}
                  image={item.images[0]?.url}
                  releaseDate={item.release_date}
                  genre={item.genres?.join(',') || 'Unknown'}
                  songs={item.tracks?.items}
                  totalOfSongs={item.tracks.total}
               />);

            }else if(item.type && item.type.trim().toLowerCase()==='track'){
              
              return  (
              <SongCard 
                  key={item.id}  
                  id={item.id}
                  name={item.name}
                  artist={item.artists[0]?.name}
                  album={item.album?.name}
                  image={item.album?.images[0]?.url}
                 preview={ (!(item.preview_url===null))?item.preview_url:null}
                  genre={item.artists[0]?.genres?.join(',') || 'Unknown'}
              />);

            }else if(item.type && item.type.trim().toLowerCase()==='artist'){
              return  (
              <ArtistCard 
                  key={item.id} 
                  id={item.id}
                  name={item.name}
                  image={item.images[0]?.url}
                  genre={item.genres?.join(',') || 'Unknown'}
                  popularity={item.popularity || 'Unknown'}
                />);
              }           
        })
      ) : null

      }  
    </div>
   )
}
export default SearchResults;