import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';

function PizzaList() {
  const [pizzaList, setPizzaList] = useState([]);
  const [newRestaurantName, setNewRestaurantName] = useState('');
  const [newRestaurantLocation, setNewRestaurantLocation] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPizzaList();
  }, []);

  const fetchPizzaList = () => {
    axios.get('/api/restaurants')
      .then(response => {
        setPizzaList(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the pizza list:', error);
        setError('Failed to fetch pizza list.');
        setLoading(false);
      });
  };

  const addNewRestaurant = (event) => {
    event.preventDefault();
    const newRestaurant = {
      restaurant_name: newRestaurantName,
      restaurant_location: newRestaurantLocation, // Include the location in the post data
    };
    axios.post('/api/restaurants', newRestaurant)
      .then(response => {
        setPizzaList([...pizzaList, response.data]); // Add the new restaurant directly to the list
        setNewRestaurantName(''); // Clear the input field for the name
        setNewRestaurantLocation(''); // Clear the input field for the location
      })
      .catch(error => {
        console.error('There was an error adding the restaurant:', error);
        setError('Failed to add restaurant.');
      });
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading) {
    return <div>Loading pizzas...</div>;
  }

  return (
    <div>
      <h2>Your Pizza List</h2>
      <form onSubmit={addNewRestaurant}>
        <label htmlFor="restaurant_name">Restaurant Name:</label>
        <input
          type="text"
          name="restaurant_name"
          placeholder="Restaurant Name"
          value={newRestaurantName}
          onChange={(e) => setNewRestaurantName(e.target.value)}
          required
        />
        <label htmlFor="restaurant_location">Restaurant Location:</label>
        <input
          type="text"
          name="restaurant_location"
          placeholder="Restaurant Location"
          value={newRestaurantLocation}
          onChange={(e) => setNewRestaurantLocation(e.target.value)}
          required
        />
        <button type="submit">Add New Pizza Restaurant</button>
      </form>
      {pizzaList.map((restaurant) => (
        <div key={restaurant.id}>
          <h3>{restaurant.restaurant_name}</h3>
          <p>Location: {restaurant.restaurant_location}</p>
          {/* Additional restaurant details */}
        </div>
      ))}
    </div>
  );
}

export default PizzaList;




