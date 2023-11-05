import React, { useEffect, useState } from "react";
import axios from "axios";

function SelectedResult() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const storedData = localStorage.getItem("selectedResult");
      if (storedData) {
        const resultData = JSON.parse(storedData);
        setResult(resultData);
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
      alert("No restaurant selected.");
      return;
    }

    // Make an HTTP POST request to your API endpoint
    axios
      .post("/api/restaurants", {
        restaurant_name: result.name,
        restaurant_location: result.location,
      })
      .then((response) => {
        alert("Restaurant added to your Pizza List!");
      })
      .catch((error) => {
        console.error("There was an error adding the restaurant:", error);
        alert("Failed to add the restaurant to your Pizza List.");
      });
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!result) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Selected Pizza Details</h2>
      <div>
        <h3>🍕 {result.name}</h3>
        {result.location && <p>📍 Location: {result.location}</p>}
        <button onClick={handleAddToPizzaList}>Add to Pizza List</button>
      </div>
    </div>
  );
}

export default SelectedResult;
