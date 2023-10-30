import React, { useState } from "react";
import axios from 'axios';

//   Search for pizza place by location

function SearchPizza() {
  const [location, setLocation] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    // Using axios to make the API request to your server's endpoint
    axios.get(`/search?location=${location}`)
      .then(response => {
        if (response.data && response.data.businesses) {
          setResults(response.data.businesses);
        } else {
          setResults([]);
        }
      })
      .catch(error => {
        console.error("Error fetching pizza places:", error);
      });
  };

  return (
    <div>
      <h1>Search for Pizza</h1>

      <input
        type="text"
        placeholder="Enter location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <div>
        {results &&
          results.length > 0 &&
          results.map((place) => (
            <div key={place.id}>
              {place.name} - {place.location.address1}
            </div>
          ))}
      </div>

    </div>
  );
}

export default SearchPizza;
