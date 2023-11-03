const express = require('express');
const pool = require('../modules/pool'); 
const router = express.Router();

// POST route to add a restaurant to the database
router.post('/', async (req, res) => {
  // Extract restaurant details from the request body
  const { restaurantName, location } = req.body;

  // Create SQL query to insert new restaurant
  const queryText = `INSERT INTO restaurants (user_id, restaurant_name)
                     VALUES ($1, $2, $3) RETURNING id`;

  try {
    // Await the result of the query
    const result = await pool.query(queryText, [restaurantName, location]);
    // Send back the ID of the new restaurant
    res.send(result.rows[0]);
  } catch (err) {
    // If an error occurs, send back error response
    console.error('Error adding new restaurant', err);
    res.sendStatus(500);
  }
});

module.exports = router;
