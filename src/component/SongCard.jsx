import react from 'react';


function SongCard(){
    return(
        <div className='card'>
            <img src={image} alt={name} />
            <h3>{name}</h3>
            <p>Artist: {artist}</p>
            <p>Album: {album}</p>
            
        </div>
    )
}
export default SongCard;