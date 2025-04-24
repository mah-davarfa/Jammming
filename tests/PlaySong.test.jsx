import '@testing-library/jest-dom';
import React from 'react';
import {render,screen , fireEvent} from '@testing-library/react';
import { AppContext } from '../src/context/AppContext';
import PlaySong from '../src/component/PlaySong';

describe('PlaySong',()=>{
    const mockSong = {
        name: 'Love',
        artist: 'Keyshia Cole',
        album: 'The Way It Is',
        preview: 'https://...',
        popularity: 83,
        uri: 'spotify:track:1',
        id: '1',
        image: 'https://mockimage.com/cover.jpg'
      };
     
   it('Renders fallback when selectedSong is null ',()=>{
    const renderWithContext =(overrides={})=>{
        const defaultContext ={
            addedToPlaylist:[],
            playlist:[mockSong],
            handleAddToPlaylist:jest.fn(),
            handleRemove:jest.fn(),
            selectedSong:null,
            searchResultsAll:[mockSong],
            playlistTitle:'play list',
            searchCommand:{type: 'search', id: 'taylor' },
            ...overrides
        }
      
      render(
        <AppContext.Provider value={defaultContext}>
           <PlaySong/> 
        </AppContext.Provider>
      );
    }
        renderWithContext();
    expect(screen.getByText(/no song selected/i)).toBeInTheDocument();
       })
    
   it('Renders the songDetails and Buttons when there is a selected song',()=>{
    const renderWithContext =(overrides ={})=>{
        const defaultContext ={
            addedToPlaylist:[],
            playlist:[mockSong],
            handleAddToPlaylist:jest.fn(),
            handleRemove:jest.fn(),
            selectedSong:mockSong,
            searchResultsAll:[mockSong],
            playlistTitle:'play list',
            searchCommand:{type: 'search', id: 'taylor' },
            ...overrides
        }
        render(
        <AppContext.Provider value={defaultContext}>
            <PlaySong/> 
        </AppContext.Provider>
        );
    }
    renderWithContext();
    
    expect(screen.getByText(/playing/i)).toBeInTheDocument();
    expect(screen.getByText(/artist/i)).toBeInTheDocument();
    expect(screen.getByText(/album/i)).toBeInTheDocument();
    expect(screen.getByText(/popularity/i)).toBeInTheDocument();
    expect(screen.getByRole('button',{name:/play/i})).toBeInTheDocument();
    expect(screen.getByRole('button',{name: /add to play list/i})).toBeInTheDocument();
    expect(screen.getByRole('button',{name:/remove/i})).toBeInTheDocument();
  
})
it('calls the correct handlers when buttons are clicked',()=>{
    const handleAddToPlaylist = jest.fn();
    const handleRemove = jest.fn();
    const renderWithContext =(overrides ={})=>{
        const defaultContext ={
            addedToPlaylist:[],
            playlist:[mockSong],
            handleAddToPlaylist:jest.fn(),
            handleRemove:jest.fn(),
            selectedSong:mockSong,
            searchResultsAll:[mockSong],
            playlistTitle:'play list',
            searchCommand:{type: 'search', id: 'taylor' },
            ...overrides
        }
        render(
        <AppContext.Provider value={defaultContext}>
            <PlaySong/> 
        </AppContext.Provider>
        );
    }
    renderWithContext({
        handleAddToPlaylist,
        handleRemove
    })
    fireEvent.click(screen.getByRole('button', { name: /remove/i }));
    expect(handleRemove).toHaveBeenCalledWith(mockSong.id,'playsong');
    fireEvent.click(screen.getByRole('button', { name: /add to play list/i }));
    expect(handleAddToPlaylist).toHaveBeenCalledWith(mockSong);
})

it('renders the fallback image with onError when the song image fails to load',()=>{
  const renderWithContext =(overrides ={})=>{
    const defaultContext ={
        addedToPlaylist:[],
            playlist:[mockSong],
            handleAddToPlaylist:jest.fn(),
            handleRemove:jest.fn(),
            selectedSong: {
                name: 'Love',
                artist: 'Keyshia Cole',
                album: 'The Way It Is',
                preview: 'https://...',
                popularity: 83,
                uri: 'spotify:track:1',
                id: '1',
                image: 'Broken uRL'
              },
            searchResultsAll:[mockSong],
            playlistTitle:'play list',
            searchCommand:{type: 'search', id: 'taylor' },
            ...overrides
    }
    render(
        <AppContext.Provider value={defaultContext}>
            <PlaySong/>
        </AppContext.Provider>
    )
  }
    renderWithContext();
    const img = screen.getByRole('img');
    fireEvent.error(img);
    expect(img.src).toMatch(/vecteezy/i);
})
});
