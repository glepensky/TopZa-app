import React, { useEffect, useState } from "react";

// Import axios to make HTTP requests
import axios from 'axios';

function SelectedResult() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const storedData = localStorage.getItem("selectedResult");
      if (storedData) {
        const resultData = JSON.parse(storedData);
        setResult(resultData);
        localStorage.removeItem("selectedResult");
      } else {
        console.log("No data found in local storage.");
      }
    } catch (err) {
      setError("Failed to load data");
      console.error("Error parsing data from local storage:", err);
    }
  }, []);

  const handleAddToPizzaList = () => {

    if (!result) {
        alert('No restaurant selected.');
        return;
      }

    // Make an HTTP POST request to your API endpoint
    axios.post('/api/restaurants', {
      name: result.name,
      location: result.location,
      userId: result.userId 
    })
    .then(response => {
      // Handle success
      alert('Restaurant added to your Pizza List!');
    })
    .catch(error => {
      // Handle error
      console.error('There was an error adding the restaurant:', error);
      alert('Failed to add the restaurant to your Pizza List.');
    });
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!result) {
    return <div>Loading...</div>;
  }

  const location = result.location ? (
    <p>📍 Location: {result.location}</p>
  ) : null;

  return (
    <div>
      <h2>Selected Pizza Details</h2>
      <div>
        <h3>🍕 {result.name}</h3>
        {location}
        {/* Updated Add restaurant button */}
        <button onClick={handleAddToPizzaList}>Add to Pizza List</button>
      </div>
    </div>
  );
}

export default SelectedResult;