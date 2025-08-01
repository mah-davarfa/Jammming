import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";
import "../styles/darkMode.css";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [cleanSearch, setCleanSearch] = useState(true);
  const { setSearchCommand, noResult } = useContext(AppContext);

  const handleSubmit = (e) => {
  e.preventDefault();
  const sanitized = search.replace(/[<>/"';]/g, ' ').trim(); // basic sanitization

  if (sanitized) {
    setCleanSearch(false);
    setSearchCommand({ type: "search", id: sanitized });
    setSearch("");
  }
};
  const handleOnChange = (e) => {
    setSearch(e.target.value);
    if (cleanSearch === false) {
      setCleanSearch(true);
    }
  };
  return (
    <>
      <div>
        <form onSubmit={handleSubmit} className={"search-container"}>
          <input
            onChange={handleOnChange}
            type="text"
            placeholder="Search for Artist or Album Name"
            value={cleanSearch ? search : ""}
          />
          <button type="submit" disabled={!search.trim()}>
            Search
          </button>
          {noResult && (
            <p className="no-result">
              "No results to display. Try searching again!"
            </p>
          )}
        </form>
      </div>
    </>
  );
}
