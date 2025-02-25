import react from 'react';
function AlbumCard({name, artist, image, releaseDate, genre, songs, totalOfSongs}) {
    return(
        <div className="card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>Artist: {artist}</p>
      <p>Release Date: {releaseDate}</p>
      <p>Songs</p>
      <ul>
       
        {songs?.map((song,index)=>{<li key={index}>{song.name}</li>})}
          
        </ul>
      <p>Genre: {genre}</p>
      <p>Total of Songs: {totalOfSongs}</p>
    </div>
    )
}
export default AlbumCard;