import React  from 'react';
import AlbumCard from './AlbumCard';
import SongCard from './SongCard';
import ArtistCard from './ArtistCard';
const SearchResults = ({searchResults}) => {
  const searchResultsArray =
  searchResults && typeof searchResults === "object" && searchResults.type
    ? [searchResults]
    : [];
    
   return(
    <div>
        <h2>search results</h2>
      { searchResultsArray && searchResultsArray.length > 0  ? (
        searchResultsArray.map((item)=>{
            
            if(item.type.toLowerCase()==='album'){
              return (
             <AlbumCard
                  key={item.id} 
                  id={item.id}
                  name={item.name}
                  image={item.images[0]?.url}
                  releaseDate={item.release_date}
                  genre={item.genres?.join(',') || 'Unknown'}
               />);

            }else if(item.type.trim().toLowerCase()==='track'){
              
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

            }else if(item.type.trim().toLowerCase()==='artist'){
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
      ) : (     searchResults && Object.keys(searchResults).length > 0 ? (
        <p>search result not available</p>
      ) : null

      )}  
    </div>
   )
}
export default SearchResults;