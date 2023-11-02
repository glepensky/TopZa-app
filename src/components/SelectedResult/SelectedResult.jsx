import React, { useEffect, useState } from 'react';

function SelectedResult() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      // Retrieve the data from local storage
      const storedData = localStorage.getItem('selectedResult');
      if (storedData) {
        // Parse the data from JSON string to object
        const resultData = JSON.parse(storedData);
  
        // Set the result data to your state
        setResult(resultData);
  
        // Optionally, clear the data from local storage after retrieving it
        localStorage.removeItem('selectedResult');
      } else {
        // Handle the case where there is no data in local storage
        console.log('No data found in local storage.');
        // Set a default state or handle this scenario as needed
      }
    } catch (err) {
      // Handle errors if data retrieval or parsing fails
      setError('Failed to load data');
      console.error('Error parsing data from local storage:', err);
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
      <h1>{result.name}</h1>
      {/* Rest of your component code */}
    </div>
  );
}

export default SelectedResult;



