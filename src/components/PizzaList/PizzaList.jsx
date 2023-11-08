import React, { Component } from 'react';
import axios from 'axios';

class PizzaList extends Component {
  state = {
    restaurants: [],
    errorMessage: null,
  };

  componentDidMount() {
    this.fetchRestaurants();
  }

  fetchRestaurants = () => {
    axios.get('/api/restaurants')
      .then(response => {
        this.setState({ restaurants: response.data });
      })
      .catch(error => {
        console.error('There was an error fetching the restaurants:', error);
        this.setState({ errorMessage: 'Failed to load restaurants.' });
      });
  };

  incrementCounter = (restaurantId) => {
    axios.put(`/api/restaurants/${restaurantId}/visit`)
      .then(response => {
        this.setState(prevState => ({
          restaurants: prevState.restaurants.map(r =>
            r.id === restaurantId ? response.data : r
          ),
          errorMessage: null,
        }));
      })
      .catch(error => {
        console.error('There was an error incrementing the times visited:', error);
        this.setState({ errorMessage: 'Failed to increment times visited.' });
      });
  };

  decrementCounter = (restaurantId) => {
    axios.put(`/api/restaurants/${restaurantId}/decrement-visit`)
      .then(response => {
        this.setState(prevState => ({
          restaurants: prevState.restaurants.map(r =>
            r.id === restaurantId ? response.data : r
          ),
          errorMessage: null,
        }));
      })
      .catch(error => {
        console.error('There was an error decrementing the times visited:', error);
        this.setState({ errorMessage: 'Failed to decrement times visited.' });
      });
  };

  renderRestaurantList = () => {
    return this.state.restaurants.map(restaurant => (
      <div key={restaurant.id}>
        <h3>🍕 {restaurant.restaurant_name}</h3>
        <p>📍 {restaurant.restaurant_location}</p>
        <p>Visit Count: {restaurant.times_visited}</p>
        <button onClick={() => this.incrementCounter(restaurant.id)}>
          +
        </button>
        <button onClick={() => this.decrementCounter(restaurant.id)} disabled={restaurant.times_visited === 0}>
          -
        </button>
      </div>
    ));
  };

  render() {
    return (
      <div>
        <h2>Restaurant List</h2>
        {this.renderRestaurantList()}
        {this.state.errorMessage && (
          <div className="error">{this.state.errorMessage}</div>
        )}
      </div>
    );
  }
}

export default PizzaList;


