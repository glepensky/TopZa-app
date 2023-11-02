import React, { useEffect, useState } from 'react';

function SelectedResult() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const resultData = JSON.parse(localStorage.getItem('selectedResult'));
      // showed Marc - believes this is where it's going wrong
      // line 9 - what am I doing? - and asynch?
      let thing = {name:'fixing' };
      console.log(resultData);
      setResult(thing);
      console.log(resultData);
      // Optionally, clear the data from local storage after retrieving it
      localStorage.removeItem('selectedResult');
    } catch (err) {
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



