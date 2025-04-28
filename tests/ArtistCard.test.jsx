import '@testing-library/jest-dom';
import React from 'react';
import {render,screen , fireEvent} from '@testing-library/react';
import { AppContext } from '../src/context/AppContext';
import ArtistCard from '../src/component/ArtistCard';

describe(ArtistCard,()=>{
    const mockArtist = {
        id: '123artist',
        name: 'Mock Artist',
        image: 'https://mockimage.com/artist.jpg',
        popularity: 75,
      };

      const renderWithContext =(overrides={})=>{
          const mocSearchCommand=jest.fn();
          const mockHandleRemove = jest.fn();   

          const defaultContext={
            setSearchCommand:mocSearchCommand,
            
            handleRemove:mockHandleRemove,
            ...overrides
          } 

          render(
               <AppContext.Provider value={defaultContext}>
                  <ArtistCard 
                        id={mockArtist.id}
                        name={mockArtist.name}
                        image={mockArtist.image}
                        genre="Pop" // Mock genre
                        popularity={mockArtist.popularity}
                  />

               </AppContext.Provider>
          )
            return {mocSearchCommand, mockHandleRemove};
      }

      it('should render artist details correctly',()=>{
        renderWithContext();
        
        expect(screen.getByText(/mock artist/i)).toBeInTheDocument(); 
        expect(screen.getByText(/popularity: 75/i)).toBeInTheDocument();
        expect(screen.getByRole('button',{name:/remove/i})).toBeInTheDocument();
        expect(screen.getByRole('button' ,{name:/get top songs/i})).toBeInTheDocument();
        expect(screen.getByRole('img')).toHaveAttribute('src', mockArtist.image);
      });

      it('should call handlers when buttons are clicked', () => {
        const { mockHandleRemove, mocSearchCommand } = renderWithContext();
    
        const removeButton = screen.getByRole('button', { name: /remove/i });
        fireEvent.click(removeButton);
        expect(mockHandleRemove).toHaveBeenCalledWith(mockArtist.id, 'artistcard');
    
        const getSongsButton = screen.getByRole('button', { name: /get top songs/i });
        fireEvent.click(getSongsButton);
        expect(mocSearchCommand).toHaveBeenCalledWith({ type: 'artist', id: mockArtist.id });
    });
        it('should render "No Image" placeholder when image is missing', () => {
            render(
            <AppContext.Provider value={{
                setSearchCommand: jest.fn(),
                handleRemove: jest.fn(),
            }}>
                <ArtistCard 
                id={mockArtist.id}
                name={mockArtist.name}
                genre="Pop"
                popularity={mockArtist.popularity}
                image={null} 
                />
            </AppContext.Provider>
            );
        
            expect(screen.getByText(/no image/i)).toBeInTheDocument();
      });
    });
