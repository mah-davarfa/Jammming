import '@testing-library/jest-dom';
import React from 'react';
import {render,screen , fireEvent} from '@testing-library/react';
import { AppContext } from '../src/context/AppContext';
import AlbumCard from '../src/component/AlbumCard';


describe(AlbumCard,()=>{
   
        const mockAlbum = {
            id: '71wCH1CJ7wh3kmPC3cQH71',
            name: 'Full Circle',
            artist: 'HÆLOS', // From artists[0].name
            image: 'https://link-to-image.jpg', // Pick the first image URL from images[0].url
            releaseDate: '2016-03-18',
            genre: 'Electronic', // You can put any mock genre you want
            songs: [], // Initially empty (because in your AlbumCard you only fetch tracks when clicking)
            totalOfSongs: 11,
          };
          const renderWithContext =(overrides={})=>{

            const mocksearchCommand = jest.fn();
            const mockHandleRemove = jest.fn();
           
            const defaultContext={
                setSearchCommand:mocksearchCommand,
                handleRemove:mockHandleRemove,
                ...overrides
            }
            render(
                <AppContext.Provider value={defaultContext}>
                    <AlbumCard
                        name={mockAlbum.name}
                        artist={mockAlbum.artist}
                        image={mockAlbum.image}
                        releaseDate={mockAlbum.releaseDate}
                        genre={mockAlbum.genre}
                        songs={mockAlbum.songs}
                        totalOfSongs={mockAlbum.totalOfSongs}
                        id={mockAlbum.id}
                    />
                </AppContext.Provider>
            );
                return {mockHandleRemove, mocksearchCommand};
          }   
          it('should render album details correctly',()=>{
            renderWithContext();
        expect(screen.getByText(/album: full circle/i)).toBeInTheDocument(); 
        expect(screen.getByText(/HÆLOS/i)).toBeInTheDocument();
        expect(screen.getByText(/2016-03-18/i)).toBeInTheDocument();
        expect(screen.getByText(/Electronic/i)).toBeInTheDocument();
        expect(screen.getByText(/11/i)).toBeInTheDocument();
        expect(screen.getByRole('button',{name:/remove/i})).toBeInTheDocument();
        expect(screen.getByRole('button' ,{name:/get songs/i})).toBeInTheDocument();
        expect(screen.getByRole('img')).toHaveAttribute('src', mockAlbum.image);
    });

    it('shuld call handler with the respect of the button',()=>{
        const { mockHandleRemove, mocksearchCommand } = renderWithContext();
        const removeButton = screen.getByRole('button', { name: /remove/i });
        const getSongsButton = screen.getByRole('button', { name: /get songs/i });

        fireEvent.click(removeButton);
          expect(mockHandleRemove).toHaveBeenCalledWith(mockAlbum.id, 'albumcard');

        fireEvent.click(getSongsButton);
         expect(mocksearchCommand).toHaveBeenCalledWith({ type: 'album', id: mockAlbum.id });
    });
});