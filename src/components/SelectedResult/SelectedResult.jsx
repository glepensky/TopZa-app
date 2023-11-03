import React, { useEffect, useState } from "react";

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
      </div>
    </div>
  );
}

export default SelectedResult;
