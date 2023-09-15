import React from 'react';

function BeerList({ beers }) {
  return (
    <div className="beer-list">
      {beers.map((beer) => (
        <div className="beer-card" key={beer.id}>
          <img src={beer.image_url} alt={beer.name} />
          <h3>{beer.name}</h3>
          <p>{beer.tagline}</p>
          <p>ABV: {beer.abv}%</p>
        </div>
      ))}
    </div>
  );
}

export default BeerList;



