import React, { Component } from "react";
import axios from "axios";
import './PizzaList.css';

class PizzaList extends Component {
  state = {
    restaurants: [],
    errorMessage: null,
  };

  componentDidMount() {
    this.fetchRestaurants();
  }

  fetchRestaurants = () => {
    axios
      .get("/api/restaurants")
      .then((response) => {
        // If the response already contains a full address, just set the state directly
        this.setState({ restaurants: response.data });
      })
      .catch((error) => {
        console.error("There was an error fetching the restaurants:", error);
        this.setState({ errorMessage: "Failed to load restaurants." });
      });
  };

  incrementCounter = (restaurantId) => {
    axios
      .put(`/api/restaurants/${restaurantId}/visit`)
      .then((response) => {
        this.setState((prevState) => ({
          restaurants: prevState.restaurants.map((r) =>
            r.id === restaurantId ? response.data : r
          ),
          errorMessage: null,
        }));
      })
      .catch((error) => {
        console.error(
          "There was an error incrementing the times visited:",
          error
        );
        this.setState({ errorMessage: "Failed to increment times visited." });
      });
  };

  decrementCounter = (restaurantId) => {
    axios
      .put(`/api/restaurants/${restaurantId}/decrement-visit`)
      .then((response) => {
        this.setState((prevState) => ({
          restaurants: prevState.restaurants.map((r) =>
            r.id === restaurantId ? response.data : r
          ),
          errorMessage: null,
        }));
      })
      .catch((error) => {
        console.error(
          "There was an error decrementing the times visited:",
          error
        );
        this.setState({ errorMessage: "Failed to decrement times visited." });
      });
  };

  deleteRestaurant = (restaurantId) => {
    axios
      .delete(`/api/restaurants/${restaurantId}`)
      .then(() => {
        this.setState((prevState) => ({
          restaurants: prevState.restaurants.filter(
            (r) => r.id !== restaurantId
          ),
          errorMessage: null,
        }));
      })
      .catch((error) => {
        console.error("There was an error deleting the restaurant:", error);
        this.setState({ errorMessage: "Failed to delete the restaurant." });
      });
  };
  
  renderRestaurantList = () => {
    if (this.state.restaurants.length === 0) {
      return <p>You have no restaurants listed. Add one!</p>;
    } else {
      return this.state.restaurants.map((restaurant) => {
        // Determine the class to apply based on visit count
        const itemClass = restaurant.times_visited === 0 ? 'highlight-zero-visit' : 'restaurant-item';
  
        return (
          <div key={restaurant.id} className={itemClass}>
            <h3>🍕 {restaurant.restaurant_name}</h3>
            <p>📍 {restaurant.restaurant_location}</p>
            <p>Visit Count: {restaurant.times_visited}</p>
            <button onClick={() => this.incrementCounter(restaurant.id)}>+</button>
            <button
              onClick={() => this.decrementCounter(restaurant.id)}
              disabled={restaurant.times_visited === 0}
            >
              -
            </button>
            <button onClick={() => this.deleteRestaurant(restaurant.id)}>
              Delete
            </button>
          </div>
        );
      });
    }
  };

  render() {
    return (
      <div>
        <br></br>
        <br></br>
        <h2>Restaurant List</h2>
        <br></br>
        {this.state.errorMessage && (
          <div className="error">{this.state.errorMessage}</div>
        )}
        {this.renderRestaurantList()}
      </div>
    );
  }
}

export default PizzaList;
