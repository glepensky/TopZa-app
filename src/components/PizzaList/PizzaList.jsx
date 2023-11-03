import React, { useEffect, useState } from "react";

function PizzaList() {
  const [pizzaList, setPizzaList] = useState([]);

  useEffect(() => {
    // Load the pizza list from local storage on component mount
    const storedPizzaList = JSON.parse(localStorage.getItem('pizzaList') || '[]');
    setPizzaList(storedPizzaList);
  }, []);

  if (pizzaList.length === 0) {
    return <div>No pizzas in your list yet!</div>;
  }

  return (
    <div>
      <h2>Your Pizza List</h2>
      {pizzaList.map((pizza, index) => (
        <div key={index}>
          <h3>{pizza.name}</h3>
          <p>{pizza.location}</p>
          {/* Additional pizza details */}
        </div>
      ))}
    </div>
  );
}

export default PizzaList;
