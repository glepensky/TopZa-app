import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PizzaList() {
  const [pizzaList, setPizzaList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPizzaList();
  }, []);

  const fetchPizzaList = () => {
    axios
      .get('/api/restaurants')
      .then((response) => {
        setPizzaList(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('There was an error fetching the pizza list:', error);
        setError('Failed to fetch pizza list.');
        setLoading(false);
      });
  };

  const updateCounter = (restaurantId, increment) => {
    // Determine the endpoint based on whether we are incrementing or decrementing
    const endpoint = increment
      ? `/api/restaurants/${restaurantId}/increment-visit`
      : `/api/restaurants/${restaurantId}/decrement-visit`;

    axios
      .put(endpoint)
      .then((response) => {
        // Use the updated data from the server response to update state
        setPizzaList((currentList) =>
          currentList.map((r) =>
            r.id === restaurantId ? { ...r, times_visited: response.data.times_visited } : r
          )
        );
      })
      .catch((error) => {
        console.error('There was an error updating the times visited:', error);
        setError('Failed to update times visited.');
      });
  };

  const deleteRestaurant = (restaurantId) => {
    axios
      .delete(`/api/restaurants/${restaurantId}`)
      .then(() => {
        setPizzaList((currentList) => currentList.filter((r) => r.id !== restaurantId));
      })
      .catch((error) => {
        console.error('There was an error deleting the restaurant:', error);
        setError('Failed to delete restaurant.');
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
            <p>Times Visited: {restaurant.times_visited}</p>
            <button onClick={() => updateCounter(restaurant.id, true)}>+</button>
            <button onClick={() => updateCounter(restaurant.id, false)} disabled={restaurant.times_visited <= 0}>-</button>
            <button onClick={() => deleteRestaurant(restaurant.id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}

export default PizzaList;



