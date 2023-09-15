// SearchBar.js
import React from 'react';

function SearchBar({ setSearchTerm, fetchRandomBeer }) {
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for beers..."
        onChange={handleChange}
      />
      <button onClick={fetchRandomBeer}>Random Beer</button>
    </div>
  );
}

export default SearchBar;
