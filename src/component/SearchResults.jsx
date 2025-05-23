import React, { useState, useEffect, useContext } from "react";
import AlbumCard from "./AlbumCard";
import SongCard from "./SongCard";
import ArtistCard from "./ArtistCard";
import { AppContext } from "../context/AppContext";
import "../styles/darkMode.css";

const SearchResults = () => {
  const {
    playlist,
    setNoResult,
    searchResultsAll,
    setSearchResultsAll,
    searchResults,
    setSearchResults,
    setSearchResultTag,
    searchResultTag,
    searchCommand,
  } = useContext(AppContext);

  useEffect(() => {
    if (!searchResults) return;

    if (searchResults.length > 0) {
      setSearchResultsAll((prev) => {
        const combainResults = [...prev, ...searchResults];
        return [
          ...new Map(combainResults.map((item) => [item.id, item])).values(),
        ];
      });
      setSearchResultTag(true);
      setNoResult(false);
    } else if (
      searchResultsAll.length > 0 &&
      searchResults.length === 0 &&
      searchResultTag
    ) {
      setNoResult(true);
    }
  }, [searchResults]);

  console.log("searchResultsAll", searchResultsAll);
  searchResultsAll.map((item, i) => {
    console.log(`Item ${i}:`, item);
    // ...
  });

  return (
    <div>
      <div className={"SearchResult-title"}>
        <h2>search results : {searchResultsAll.length} </h2>
        {searchResultsAll.length === 0 ? (
          <p className="playlist-empty">
            Search Results is Empty! Search For Song or Artist or Album!{" "}
          </p>
        ) : null}
        {searchResultsAll.length > 0 ? (
          <button
            type="button"
            onClick={() => {
              setSearchResultsAll([]);
              setSearchResults([]);
            }}
          >
            Clear Search Results
          </button>
        ) : null}
      </div>

      {searchResultsAll && searchResultsAll.length > 0 ? (
        <div className="list">
          {searchResultsAll.map((item, index) => {
            if (!item) return null;
            if (
              "followers" in item &&
              "genres" in item &&
              item.type === "artist" &&
              !("album" in item) &&
              !("album_type" in item)
            ) {
              console.log("Artist1:", item.type);
              return (
                <ArtistCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  image={item.images[0]?.url}
                  genre={item.genres?.join(",") || "Unknown"}
                  popularity={item.popularity || "Unknown"}
                />
              );
            }

            if (
              "album_type" in item &&
              "total_tracks" in item &&
              !("preview_url" in item)
            ) {
              console.log("Album1:", item.type);
              return (
                <AlbumCard
                  key={index}
                  id={item.id}
                  name={item.name}
                  artist={item.artists[0].name}
                  image={item.images[0]?.url}
                  releaseDate={item.release_date}
                  genre={item.genres?.join(",") || "Unknown"}
                  songs={item.tracks?.items || []}
                  totalOfSongs={item.tracks?.total || 0}
                />
              );
            }
            if (
              ("album" in item || "duration_ms" in item) &&
              typeof item.name === "string" &&
              typeof item.duration_ms === "number"
            ) {
              return (
                <SongCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  artist={item.artists[0]?.name}
                  album={item.album?.name}
                  image={item.album?.images[0]?.url}
                  preview={
                    !(item.preview_url === null) ? item.preview_url : null
                  }
                  genre={item.artists[0]?.genres?.join(",") || "Unknown"}
                  popularity={item.popularity || "Unknown"}
                  uri={item.uri}
                />
              );
            }
          })}
        </div>
      ) : null}
    </div>
  );
};
export default SearchResults;
