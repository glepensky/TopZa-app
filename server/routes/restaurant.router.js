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





// DELETE route for restaurant
router.delete('/:id', isAuthenticated, async (req, res) => {
  const restaurantId = req.params.id; // Get the ID from the URL parameter
  try {
    const deleteCount = await deleteRestaurant(restaurantId);
    if (deleteCount === 1) {
      res.status(200).json({ message: 'Restaurant deleted successfully' });
    } else {
      res.status(404).json({ error: 'Restaurant not found' });
    }
  } catch (error) {
    console.error('Error deleting restaurant:', error);
    res.status(500).json({ error: 'Failed to delete restaurant' });
  }
});


// Export the router to be used in the main app file
module.exports = router;





