import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SongCard from '../src/component/SongCard';
import { AppContext } from '../src/context/AppContext';

describe('SongCard',()=>{
    const mockSong = {
        id: '1',
        name: 'Mock Song',
        artists: [{ name: 'Mock Artist' }],
        album: { name: 'Mock Album', images: [{ url: 'https://mockimage.com/cover.jpg' }] },
        duration_ms: 180000,
        popularity: 85,
        preview_url: 'http://preview.com',
        uri: 'spotify:track:1',
      };
      const renderWithContext =(overrides={})=>{
        const defaultContext = {
            handleRemove: jest.fn(),
            currentSong : null,
            handlePlay : jest.fn(),
            handleAddToPlaylist : jest.fn(),
            addedToPlaylist : [],
            playlistTitle : 'playlist',
            ...overrides
      }
      //the probs: name, artist, album, preview, popularity,  id, image
      render(
        <AppContext.Provider value={defaultContext}>
            <SongCard  
                name={mockSong.name}
                artist={mockSong.artists[0].name}
                album={mockSong.album.name}
                preview={mockSong.preview_url}
                popularity={mockSong.popularity}
                uri={mockSong.uri}
                id={mockSong.id}
                image={mockSong.album.images[0].url} 
            />
        </AppContext.Provider>
      );
      return defaultContext;
  }
  it('renders song details correctly',()=>{
    renderWithContext();
    expect(screen.getByText(mockSong.name)).toBeInTheDocument();
    expect(screen.getByText(`Artist: ${mockSong.artists[0].name}`)).toBeInTheDocument();
    expect(screen.getByText(`Album: ${mockSong.album.name}`)).toBeInTheDocument();
    expect(screen.getByText(`Popularity: ${mockSong.popularity}`)).toBeInTheDocument(); 
  })
    it('calls for buttons handleremove , handleplay, handleaddedtoplaylist',()=>{
        const handleRemove = jest.fn();
        const handlePlay = jest.fn();
        const handleAddToPlaylist = jest.fn();
        renderWithContext({
            handleRemove,
            handlePlay,
            handleAddToPlaylist
        })
        const removeButton = screen.getByRole('button', { name: /remove/i });
        const addToPlayListButton = screen.getByRole('button', { name: /^add to playlist$/i });
        const playButton = screen.getByRole('button', { name: /^play$/i });


        fireEvent.click(removeButton);
        expect(handleRemove).toHaveBeenCalledWith("1", "songcard");
       
        fireEvent.click(playButton);
        expect(handlePlay).toHaveBeenCalledWith(expect.objectContaining({
            name: "Mock Song",
            artist: "Mock Artist",
            id: "1"
        }));


        fireEvent.click(addToPlayListButton);
        expect(handleAddToPlaylist).toHaveBeenCalledWith(expect.objectContaining({
            name: "Mock Song",
            artist: "Mock Artist",
            id: "1"
        }));
    })
});