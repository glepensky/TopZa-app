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

  return (
    <div>
      <h2>Selected Pizza Details</h2>
      <div>
        <img src={result.image} alt={result.name} />
        <h3>{result.name}</h3>
        <p>Location:</p>
        {/* <ul>
          {result.location.address1 && <li>{result.location.address1}</li>}
          {result.location.address2 && <li>{result.location.address2}</li>}
          {result.location.address3 && <li>{result.location.address3}</li>}
          {result.location.city && <li>{result.location.city}</li>}
          {result.location.zip_code && <li>{result.location.zip_code}</li>}
          {result.location.country && <li>{result.location.country}</li>}
          {result.location.state && <li>{result.location.state}</li>} */}
        {/* </ul> */}
        {/* Display other details as needed */}
      </div>
    </div>
  );
}

export default SelectedResult;
