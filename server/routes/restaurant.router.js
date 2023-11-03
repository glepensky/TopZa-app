const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// POST route to add a restaurant to the database
router.post('/', async (req, res) => {
  // Log the request body to help debug any issues with the data being sent
  console.log('Request body:', req.body);

  // Ensure that the restaurantName and userId are present in the request body
  // If your client is sending a different property name for the restaurant, adjust as necessary
  const { name, location } = req.body;

  // Check if restaurantName is provided, if not, return an error response
  if (!name) {
    console.error('name is null or undefined:', name);
    return res.status(400).json({ error: 'Restaurant name is required.' });
  }

  // Create SQL query to insert new restaurant
  // Ensure that your database column names match these field names
  const queryText = `
    INSERT INTO restaurants (user_id, restaurant_name)
    VALUES ($1, $2)
    RETURNING id;
  `;

  try {
    // Await the result of the query
    const result = await pool.query(queryText, [userId, restaurantName]);
    // Send back the ID of the new restaurant
    res.status(201).json(result.rows[0]);
  } catch (err) {
    // If an error occurs, send back an error response
    console.error('Error adding new restaurant', err);
    res.status(500).json({ error: 'Failed to add new restaurant' });
  }
});

module.exports = router;


