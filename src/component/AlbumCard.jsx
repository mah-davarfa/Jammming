import react from 'react';
function AlbumCard({name, artist, image, releaseDate, genre}) {
    return(
        <div className="card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>Artist: {artist}</p>
      <p>Release Date: {releaseDate}</p>
      <p>Genre: {genre}</p>
    </div>
    )
}
export default AlbumCard;