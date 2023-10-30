import React, { useState } from "react";

const API_ENDPOINT = "https://api.yelp.com/v3/businesses/search";
const API_KEY = "uwsiEoWwXO42_ciW-yjrkw7bcicIrFVBLOUwNzKoVpVrAF7y8AOP9yoaGlgfOHnesnobuPB5UOYaatX9E5V-dLRnMo2tvDWZz0mdS0x_HcovQ90NYJjD9b4TTCtAZXYx"; // Replace with your actual API key


function searchPizzaPlaces(location) {
    return fetch(`${API_ENDPOINT}?term=pizza&location=${location}`, {
      headers: {
        "Authorization": `Bearer ${API_KEY}`
      }
    })
    .then(response => response.json())
    .then(data => data.businesses)
    .catch(error => {
      console.error("Error fetching pizza places:", error);
    });
  }
  
  function SearchPizza() {
    const [location, setLocation] = useState('');
    const [results, setResults] = useState([]);
  
    const handleSearch = () => {
      searchPizzaPlaces(location).then(data => {
        setResults(data);
      });
    };
  
    return (
      <div>
        <h1>Search for Pizza</h1>
  
        <input 
          type="text" 
          placeholder="Enter location" 
          value={location}
          onChange={e => setLocation(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
  
        <div>
          {results.map(place => (
            <div key={place.id}>
              {place.name} - {place.location.address1}
            </div>
          ))}
        </div>
  
        {/* Any other content you want on this page */}
      </div>
    );
  }

export default SearchPizza;