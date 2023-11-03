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

  // Event handler for adding to pizza list
  const handleAddToPizzaList = () => {
    // Implement logic to add the restaurant to the pizza list
    // This might involve updating the state or local storage, or making an API call
    // For example, if using local storage:
    const pizzaList = JSON.parse(localStorage.getItem("pizzaList") || "[]");
    const newPizzaList = [...pizzaList, result];
    localStorage.setItem("pizzaList", JSON.stringify(newPizzaList));

    // Optionally, confirm to the user that it was added
    alert("Added to your Pizza List!");
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
        {/* Add restaurant button */}
        <button onClick={handleAddToPizzaList}>Add to Pizza List</button>
      </div>
    </div>
  );
}

export default SelectedResult;
