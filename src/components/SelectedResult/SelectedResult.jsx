import React from 'react';
import { useLocation } from 'react-router-dom';

function SelectedResult() {
  const location = useLocation();
  console.log('Location state:', location.state);
  const result = location.state ? location.state.result : null; // Accessing the result passed in the state

  if (!result) {
    return <div>Loading...</div>; // You can handle the loading or error state here
  }

  return (
    <div>
      <h1>{result.name}</h1>
      {/* Rest of your component code */}
    </div>
  );
}

export default SelectedResult;

