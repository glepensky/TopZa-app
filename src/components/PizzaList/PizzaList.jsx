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

  const deleteRestaurant = (restaurantId) => {
    axios
      .delete(`/api/restaurants/${restaurantId}`)
      .then(() => {
        // Remove the restaurant from the state to update the UI
        setPizzaList(
          pizzaList.filter((restaurant) => restaurant.id !== restaurantId)
        );
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
