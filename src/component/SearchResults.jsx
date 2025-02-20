import React  from 'react';
import AlbumCard from './AlbumCard';
import SongCard from './SongCard';
import ArtistCard from './ArtistCard';
const SearchResults = ({searchResults}) => {
    
    
   return(
    <div>
        <h2>search results</h2>
      { searchResults && searchResults.length > 0  ? (
        searchResults.map((item)=>{
            
            if(item.type.trim().toLowerCase()==='album'){
              return  <AlbumCard key={item.id} album={item}/>

            }else if(item.type.trim().toLowerCase()==='track'){
              return  <SongCard key={item.id} song={item}/>

            }else if(item.type.trim().toLowerCase()==='artist'){
              return  <ArtistCard key={item.id} artist={item}/>
           }else {
            return <p key={item.id}>search result not avilable </p>
          }
        })
      ) : (<p>search result not avilable </p>

      )}  
    </div>
   )
}
export default SearchResults;