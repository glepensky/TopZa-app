const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// Function to get all restaurants from the database
const getRestaurants = async () => {
  const queryText = 'SELECT * FROM "restaurants"';
  try {
    const result = await pool.query(queryText);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

// Function to add a new restaurant to the database
const addRestaurant = async (restaurantData, userId) => {
  const queryText = 'INSERT INTO "restaurants"("user_id", "restaurant_name", "restaurant_location") VALUES($1, $2, $3) RETURNING *';
  const values = [userId, restaurantData.restaurant_name, restaurantData.restaurant_location];
  try {
    const result = await pool.query(queryText, values);
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

// Function to delete a restaurant from the database
const deleteRestaurant = async (restaurantId) => {
  const queryText = 'DELETE FROM "restaurants" WHERE "id" = $1 RETURNING *';
  const values = [restaurantId];
  try {
    const result = await pool.query(queryText, values);
    return result.rowCount;
  } catch (err) {
    throw err;
  }
};

// Function to increment the times visited count of a restaurant in the database
const incrementRestaurantVisit = async (restaurantId) => {
  const queryText = 'UPDATE "restaurants" SET "times_visited" = "times_visited" + 1 WHERE "id" = $1 RETURNING *';
  const values = [restaurantId];
  try {
    const result = await pool.query(queryText, values);
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

// Function to decrement the times visited count of a restaurant in the database
const decrementRestaurantVisit = async (restaurantId) => {
  const queryText = 'UPDATE "restaurants" SET "times_visited" = "times_visited" - 1 WHERE "id" = $1 AND "times_visited" > 0 RETURNING *';
  const values = [restaurantId];
  try {
    const result = await pool.query(queryText, values);
    if (result.rowCount === 0) {
      throw new Error('Restaurant not found or times visited is already at 0');
    }
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.user) {
    return next();
  }
  res.status(401).send('User is not authenticated');
};

// GET route for retrieving all restaurants
router.get('/', isAuthenticated, async (req, res) => {
  try {
    const restaurants = await getRestaurants();
    res.status(200).json(restaurants);
  } catch (error) {
    console.error('Error getting restaurants:', error);
    res.status(500).json({ error: 'Failed to get restaurants' });
  }
});

// POST route for adding a new restaurant
router.post('/', isAuthenticated, async (req, res) => {
  const userId = req.user.id;
  try {
    const newRestaurant = await addRestaurant(req.body, userId);
    res.status(201).json(newRestaurant);
  } catch (error) {
    console.error('Error adding new restaurant:', error);
    res.status(500).json({ error: 'Failed to add new restaurant' });
  }
});

// PUT route for incrementing the times visited count of a restaurant
router.put('/:id/visit', isAuthenticated, async (req, res) => {
  const restaurantId = req.params.id;
  try {
    const updatedRestaurant = await incrementRestaurantVisit(restaurantId);
    res.status(200).json(updatedRestaurant);
  } catch (error) {
    console.error('Error incrementing times visited:', error);
    res.status(500).json({ error: 'Failed to increment times visited' });
  }
});

// PUT route for decrementing the times visited count of a restaurant
router.put('/:id/decrement-visit', isAuthenticated, async (req, res) => {
  const restaurantId = req.params.id;
  try {
    const updatedRestaurant = await decrementRestaurantVisit(restaurantId);
    res.status(200).json(updatedRestaurant);
  } catch (error) {
    if (error.message === 'Restaurant not found or times visited is already at 0') {
      res.status(404).json({ error: error.message });
    } else {
      console.error('Error decrementing times visited:', error);
      res.status(500).json({ error: 'Failed to decrement times visited' });
    }
  }
});

// DELETE route for removing a restaurant
router.delete('/:id', isAuthenticated, async (req, res) => {
  const restaurantId = req.params.id;
  try {
    const deletedCount = await deleteRestaurant(restaurantId);
    if (deletedCount === 0) {
      res.status(404).json({ error: 'Restaurant not found' });
    } else {
      res.status(200).json({ message: 'Restaurant deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting restaurant:', error);
    res.status(500).json({ error: 'Failed to delete restaurant' });
  }
});

module.exports = router;
