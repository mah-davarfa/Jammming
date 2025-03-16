import React,{useState,useEffect,useContext}  from 'react';
import AlbumCard from './AlbumCard';
import SongCard from './SongCard';
import ArtistCard from './ArtistCard';
import {AppContext} from '../context/AppContext';
import '../styles/darkmode.css'


const SearchResults = () => {
 
  const {setNoResult,searchResultsAll,setSearchResultsAll,searchResults,setSearchResultTag,searchResultTag} = useContext(AppContext);
  
  
  useEffect(()=>{

      if(!searchResults)return;

    if(searchResults.length>0){

      setSearchResultsAll((prev)=>{
         const combainResults = [...prev, ...searchResults]
         return [...new Map(combainResults.map((item)=>[item.id,item])).values()];
      })
      setSearchResultTag(true);
      setNoResult(false);

    } else if (searchResultsAll.length > 0 && searchResults.length === 0 && searchResultTag)
      {setNoResult(true);}
    },[searchResults])   
    
  
   return(
    <div>
        {searchResultTag ? <h3 className={'SearchResult-title'}>search results</h3>:null}
        <div className='list'>
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
                  popularity={item.popularity || 'Unknown'}
                  uri={item.uri}
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
    </div>
   )
}
export default SearchResults;