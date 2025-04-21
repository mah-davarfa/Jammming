import '@testing-library/jest-dom';
import React from 'react';
import {render,screen , fireEvent} from '@testing-library/react';
import SearchBar from '../src/component/SearchBar';
import { AppContext } from '../src/context/AppContext';

describe ('SearchBar',()=>{
    //creating fak function to be independent 
    // from to be provided from context that can be track if component used it correctly,
    const setSearchCommand = jest.fn();
     
    const renderWithContext =()=>{
        render (
            <AppContext.Provider value={{ setSearchCommand, noResult: false }}>
            <SearchBar />
          </AppContext.Provider>
        )
    }
    it('render input and search button does it appear in dom',()=>{
        renderWithContext();
       
        expect(screen.getByRole('button',{name: /search/i})).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Search for Artist or Album Name/i)).toBeInTheDocument();
    });

    it ('if input is empty then button is disable',()=>{
        renderWithContext();
        
        const button = screen.getByRole('button',{name: /search/i});
        
        expect(button).toBeDisabled();
        expect(screen.getByRole('button',{name:/search/i})).toBeDisabled();
    });

    it (' if input is not empty the button is enable',()=>{
        renderWithContext();
        
        const button = screen.getByRole('button',{name:/search/i});
        const input = screen.getByPlaceholderText(/Search for Artist or Album Name/i);

        fireEvent.change(input,{target:{value:'taylor swift'}});
        expect(button).not.toBeDisabled();
    }); 

    it('when user enter input and click on search setSearchCommand is called',()=>{
        renderWithContext();
          
        const button = screen.getByRole('button',{name:/search/i});
            const input = screen.getByPlaceholderText(/Search for Artist or Album Name/i);

            fireEvent.change(input,{target:{value:'taylor swift'}});
            fireEvent.click(button);

            expect(setSearchCommand).toHaveBeenCalledWith({type: 'search' ,id: 'taylor swift'});
    });

})