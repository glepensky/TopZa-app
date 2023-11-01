import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function SearchPizza() {
  const [location, setLocation] = useState("");
  const [results, setResults] = useState([]);
  const history = useHistory(); // useHistory hook for navigation

  const handleSearch = () => {
    axios
      .get(`/search?location=${location}`)
      .then((response) => {
        if (response.data && response.data.businesses) {
          setResults(response.data.businesses);
        } else {
          setResults([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching pizza places:", error);
      });
  };

  const handleResultClick = (result) => {
    // Navigate to the SelectedResult page with the clicked result data
    console.log("Navigating with result:", result);
    history.push("/selectedresult", { result });

    history.push(`/SelectedResult/${result.id}`, { result });
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
        {results.map((place) => (
          <div
            key={place.id}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
              cursor: "pointer", // To indicate it's clickable
            }}
            onClick={() => handleResultClick(place)} // Click event handler
          >
            <img
              src={place.image_url}
              alt={place.name}
              style={{ width: "100px", marginRight: "10px" }}
            />
            {place.name} - {place.location.address1}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchPizza;
