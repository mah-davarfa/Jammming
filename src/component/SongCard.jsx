import react from 'react';


function SongCard({name, artist, album, image, preview}) {
    return(
        <>
        <div className='card'>
            <img src={image} alt={name} />
            <h3>{name}</h3>
            <p>Artist: {artist}</p>
            <p>Album: {album}</p>
            { preview ?
                <audio controls>
                <source src={preview} type="audio/mpeg"/>
                Your browser does not support the audio element.
            </audio>: <p>Preview not available</p>}
        </div>
        </>
    )
}
export default SongCard;