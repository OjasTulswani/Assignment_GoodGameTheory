// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import BeerList from './component/BeerList';
import SearchBar from './component/SearchBar';

function App() {
  const [beers, setBeers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [beersPerPage] = useState(9);

  const fetchBeers = () => {
    axios
      .get(`https://api.punkapi.com/v2/beers?beer_name=${searchTerm}`)
      .then((response) => setBeers(response.data))
      .catch((error) => console.error(error));
  };

  const fetchRandomBeer = () => {
    axios
      .get('https://api.punkapi.com/v2/beers/random')
      .then((response) => setBeers([response.data[0]]))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    // Fetch a random beer when the component mounts (initial page load)
    fetchRandomBeer();
  }, []); // Empty dependency array means this effect runs once, on mount.

  useEffect(() => {
    // Fetch beers when the search term changes
    fetchBeers();
  }, [searchTerm]);

  const indexOfLastBeer = currentPage * beersPerPage;
  const indexOfFirstBeer = indexOfLastBeer - beersPerPage;
  const currentBeers = beers.slice(indexOfFirstBeer, indexOfLastBeer);

  return (
    <div className="App">
      <header>
        <h1 className="title">Punk Beers</h1>
        <SearchBar setSearchTerm={setSearchTerm} fetchRandomBeer={fetchRandomBeer} />
      </header>
      <main>
        <BeerList beers={currentBeers} />
      </main>
      <footer>
        <div className="pagination">
          {beers.length > beersPerPage && (
            <ul>
              {Array(Math.ceil(beers.length / beersPerPage))
                .fill()
                .map((_, index) => (
                  <li
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={currentPage === index + 1 ? 'active' : ''}
                  >
                    {index + 1}
                  </li>
                ))}
            </ul>
          )}
        </div>
      </footer>
    </div>
  );
}

export default App;
