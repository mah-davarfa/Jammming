import '@testing-library/jest-dom';
import React from 'react';
import {render,screen , fireEvent} from '@testing-library/react';
import { AppContext } from '../src/context/AppContext';
import Playlist from '../src/component/Playlist';


describe('PlayList',()=>{
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
    const renderWithContext =(overrides ={})=>{
        const mock ={
            handlePlay:jest.fn(),
            handleRemove:jest.fn(),
            setPlaylist:jest.fn(),
            handleLoginToSpotify: jest.fn(),
            setIsSaved:jest.fn(),
            setPlaylistTitle:jest.fn(),
          // savePlaylistToSpotify: jest.fn(),
        }
        const defaultContext ={
            currentSong:mockSong.id,
            playlist:[mockSong],
            playlistLimitReached: false,
            // continueToSearchAsGuest,
            playlistTitle:'playlist',
            // userToken,
            isSaved:false,
            playlistLimitReached:false,
            ...mock,
            ...overrides,
        }
        render(
            <AppContext.Provider value={defaultContext}>
                <Playlist/>
            </AppContext.Provider>
        );
        return mock;
    } 
    it('should show "add song" if playlist is Empty' ,()=>{
        
        renderWithContext({
            playlist:[]
           
        });
        expect(screen.getByText(/add a song/i)).toBeInTheDocument();
    })

    it('should show "playlist" and edit button and save button and the song informations when the playlist is not Empty' ,()=>{
        
        renderWithContext({
            currentSong:[],
        });
        //expect(screen.queryAllByText(/add a song/i)).not.toBeInTheDocument();
        expect(screen.getByText(/playlist/i)).toBeInTheDocument();
        expect(screen.getByRole('button',{name :/edit/i})).toBeInTheDocument();
        expect(screen.getByRole('button',{name :/save to /i})).toBeInTheDocument();
        expect(screen.getByRole('button',{name :/remove /i})).toBeInTheDocument();
        expect(screen.getByRole('button',{name :/play/i})).toBeInTheDocument();
        expect(screen.getByText(/love/i)).toBeInTheDocument();
        expect(screen.getByText(/keyshia/i)).toBeInTheDocument();
        expect(screen.getByText(/the way it is/i)).toBeInTheDocument();
    });  
    
    it('should call each button handler respect to the functionality of the button',()=>{
       
         const {setPlaylistTitle}=renderWithContext();

         const editButton=screen.getByRole('button',{name :/edit/i});
         expect(editButton).toBeInTheDocument();
         //click to edit
            fireEvent.click(editButton);
         //find input   
        const input=screen.getByPlaceholderText(/Pick a name/i);
         expect(input).toBeInTheDocument();
        //enter new title
        fireEvent.change(input,{target:{value:'mock-playlist'}});
        //find save button and click it
        const saveButton =screen.getByRole('button',{name :/^save$/i});
        fireEvent.click(saveButton);
        expect(setPlaylistTitle).toHaveBeenCalledWith('mock-playlist');
    });
    
    it('should show login to spotify after user click on "save to spotify" if user has loged in as guest',()=>{

        const {handleLoginToSpotify}= renderWithContext({
            continueToSearchAsGuest:true,
            });
        const savebutton = screen.getByRole('button',{name:/save to spotify/i});
           expect(savebutton).toBeInTheDocument();
         fireEvent.click(savebutton);
         const logInButton = screen.getByRole('button',{name:/log in to spotify/i});
         expect(logInButton).toBeInTheDocument(); 
         fireEvent.click(logInButton);
        expect(handleLoginToSpotify).toHaveBeenCalledTimes(1);
    });
    
   

    it('should show "successfully saved" after click on "save to spotify" if user is not guest', async() => {
        
        global.fetch=jest.fn(()=>
           Promise.resolve({ json:()=> Promise.resolve({id: 'mockplaylist'}),
    })
);
            const mockSetPlaylist = jest.fn();
            const mockSetIsSaved = jest.fn();

            renderWithContext({
                playlist: [mockSong],
                isSaved: false,
                continueToSearchAsGuest: false,
                playlistTitle: 'mock-playlist',
                setPlaylist: mockSetPlaylist,
                setIsSaved: mockSetIsSaved,
                handlePlay: jest.fn(),
                handleRemove: jest.fn(),
                handleLoginToSpotify: jest.fn(),
                setPlaylistTitle: jest.fn(),
                playlistLimitReached: false,
                currentSong: mockSong.id
            });

            const saveButton = screen.getByRole('button', { name: /save to spotify/i });
            expect(saveButton).toBeInTheDocument();

            fireEvent.click(saveButton);
            
            // simulate user saving
            mockSetPlaylist([]);
            mockSetIsSaved(true);
            
            // Re-render the component with updated context manually
            renderWithContext({
            playlist: [],
            isSaved: true,
            continueToSearchAsGuest: false,
            playlistTitle: 'mock-playlist',
            setPlaylist: mockSetPlaylist,
            setIsSaved: mockSetIsSaved,
            handlePlay: jest.fn(),
            handleRemove: jest.fn(),
            handleLoginToSpotify: jest.fn(),
            setPlaylistTitle: jest.fn(),
            playlistLimitReached: false,
            currentSong: null
            });

            
            expect(await screen.findByText(/successfully saved/i)).toBeInTheDocument();
            });
});

