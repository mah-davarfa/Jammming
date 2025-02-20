import React, { useState, useEffect } from 'react';

export default function Data() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('/data.json') 
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    if (!data) {
        return <p>Loading...</p>;
    }

    return (
      
        <div>
            <h1>original Play List</h1>
            
            
                <ul>
                    {data.playlists.map((playlist, playlistindex) => (
                        <li key={playlistindex}>
                            <strong>Name:</strong> {playlist.name}
                           <strong>Last Modified:</strong> {playlist.last_modified}<br/>
                            <ul>
                                { playlist.tracks.map((track, trackindex) => (
                                <li key={trackindex}>
                                    <strong>Name:</strong> {track.name}, <br/>
                                    <strong> Artist:</strong> {track.artist}, <br/>
                                    <strong> Album:</strong> {track.album}, <br/>
                                    <strong> URL:</strong> {track.uri}
                                </li>
                            ))}
                        </ul>
                    </li>
                    ))}
                </ul>
               
        </div>
    );
    
}
