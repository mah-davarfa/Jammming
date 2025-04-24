import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchResults from '../src/component/SearchResults';
import { AppContext } from '../src/context/AppContext';

describe('SearchResults', () => {
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

  const renderWithContext = (overrides = {}) => {
    const defaultContext = {
      playlist: [],
      searchResultsAll: [mockSong],
      setSearchResultsAll: jest.fn(),
      searchResults: [],
      setSearchResults: jest.fn(),
      searchResultTag: false,
      setSearchResultTag: jest.fn(),
      setNoResult: jest.fn(),
      searchCommand: { type: 'search', id: 'taylor' },
      addedToPlaylist: [],
      handleAddToPlaylist: jest.fn(),
      handleRemove: jest.fn(),
      handlePlay: jest.fn(),
      playlistTitle: 'My Playlist',
      currentSong: null,
      ...overrides 
    };

    render(
      <AppContext.Provider value={defaultContext}>
        <SearchResults />
      </AppContext.Provider>
    );
  };

  it('renders a song card if searchResultsAll has a song', () => {
    renderWithContext();
    expect(screen.getByText(/mock song/i)).toBeInTheDocument();
    expect(screen.getByText(/mock artist/i)).toBeInTheDocument();
    expect(screen.getByText(/mock album/i)).toBeInTheDocument();
  });

  it('renders clear button and calls setSearchResultsAll + setSearchResults on click', () => {
    const setSearchResultsAll = jest.fn();
    const setSearchResults = jest.fn();

    renderWithContext({
      setSearchResultsAll,
      setSearchResults,
      searchCommand: { type: 'search', id: 'mock' },
    });

    const clearBtn = screen.getByRole('button', { name: /clear search results/i });
    fireEvent.click(clearBtn);

    expect(setSearchResultsAll).toHaveBeenCalledWith([]);
    expect(setSearchResults).toHaveBeenCalledWith([]);
  });

  it('does not render Clear button when there are no results and no searchCommand', () => {
    renderWithContext({
      searchResultsAll: [],
      searchCommand: null,
    });

    expect(screen.queryByRole('button', { name: /clear search results/i })).not.toBeInTheDocument();
  });
});
