const express = require('express');
const router = express.Router();
const pool = require('../pool');

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

// Function to add a new restaurant to the database, with dynamic user_id and restaurant_location
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
  const userId = req.user.id; // Or however you access the logged-in user's ID
  try {
    const newRestaurant = await addRestaurant(req.body, userId);
    res.status(201).json(newRestaurant);
  } catch (error) {
    console.error('Error adding new restaurant:', error);
    res.status(500).json({ error: 'Failed to add new restaurant' });
  }
});

// Export the router to be used in the main app file
module.exports = router;





