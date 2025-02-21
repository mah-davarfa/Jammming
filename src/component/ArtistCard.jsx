import react from 'react';


function ArtistCard(){
    
    return(
        <div className='card'>
        <img src={image} alt={name} />
        <h3>{name}</h3>
        <p>Genre: {genre}</p>   
        <p>Popularity: {popularity}</p>
        </div>
    )
}
export default ArtistCard;