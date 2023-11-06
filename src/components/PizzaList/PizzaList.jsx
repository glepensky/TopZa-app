import React, { useEffect, useState } from "react";
import axios from "axios";

function PizzaList() {
  const [pizzaList, setPizzaList] = useState([]);
  const [counters, setCounters] = useState({}); // New state for counters
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
        // Initialize counters for each restaurant
        const initialCounters = response.data.reduce((acc, restaurant) => {
          acc[restaurant.id] = 0;
          return acc;
        }, {});
        setCounters(initialCounters);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the pizza list:", error);
        setError("Failed to fetch pizza list.");
        setLoading(false);
      });
  };

  const incrementCounter = (restaurantId) => {
    setCounters((prevCounters) => ({
      ...prevCounters,
      [restaurantId]: prevCounters[restaurantId] + 1,
    }));
  };

  const decrementCounter = (restaurantId) => {
    setCounters((prevCounters) => ({
      ...prevCounters,
      [restaurantId]: Math.max(prevCounters[restaurantId] - 1, 0),
    }));
  };

  const deleteRestaurant = (restaurantId) => {
    axios
      .delete(`/api/restaurants/${restaurantId}`)
      .then(() => {
        // Remove the restaurant from the state to update the UI
        setPizzaList(pizzaList.filter((restaurant) => restaurant.id !== restaurantId));
        // Also remove the counter for the deleted restaurant
        const updatedCounters = {...counters};
        delete updatedCounters[restaurantId];
        setCounters(updatedCounters);
      })
      .catch((error) => {
        console.error("There was an error deleting the restaurant:", error);
        setError("Failed to delete restaurant.");
      });
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading) {
    return <div>Loading pizzas...</div>;
  }

  const isListEmpty = pizzaList.length === 0;

  return (
    <div>
      <h2>Your Pizza List</h2>
      {isListEmpty ? (
        <p>No pizza restaurants added yet. Please add some!</p>
      ) : (
        pizzaList.map((restaurant) => (
          <div key={restaurant.id}>
            <h3>{restaurant.restaurant_name}</h3>
            <p>Location: {restaurant.restaurant_location}</p>
            <p>Times Visited: {counters[restaurant.id]}</p> {/* Display the counter */}
            {/* Buttons to increment and decrement the counter */}
            <button onClick={() => incrementCounter(restaurant.id)}>+</button>
            <button onClick={() => decrementCounter(restaurant.id)}>-</button>
            {/* Delete button for each restaurant */}
            <button onClick={() => deleteRestaurant(restaurant.id)}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default PizzaList;

