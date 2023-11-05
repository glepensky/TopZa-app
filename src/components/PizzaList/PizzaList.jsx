import React, { useEffect, useState } from "react";
import axios from "axios";

function PizzaList() {
  const [pizzaList, setPizzaList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPizzaList();
  }, []);

  const fetchPizzaList = () => {
    axios
      .get("/api/restaurants")
      .then((response) => {
        setPizzaList(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the pizza list:", error);
        setError("Failed to fetch pizza list.");
        setLoading(false);
      });
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading) {
    return <div>Loading pizzas...</div>;
  }

  // Check if the pizza list is empty
  const isListEmpty = pizzaList.length === 0;

  return (
    <div>
      <h2>Your Pizza List</h2>
      {/* Conditional rendering to check if the pizza list is empty */}
      {isListEmpty ? (
        <p>No pizza restaurants added yet. Please add some!</p>
      ) : (
        pizzaList.map((restaurant) => (
          <div key={restaurant.id}>
            <h3>{restaurant.restaurant_name}</h3>{" "}
            {/* Fixed property name to match the database */}
            <p>Location: {restaurant.restaurant_location}</p>{" "}
            {/* Fixed property name to match the database */}
            {/* Additional restaurant details */}
          </div>
        ))
      )}
    </div>
  );
}

export default PizzaList;
