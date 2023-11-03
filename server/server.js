const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Import userRouter
const userRouter = require('./routes/user.router.js'); // Adjust the path as necessary
const restaurantRouter = require('./routes/restaurant.router.js');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Enable CORS
app.use(cors());

// Yelp API Proxy 
const API_ENDPOINT = "https://api.yelp.com/v3/businesses/search";
const API_KEY = process.env.YELP_API_KEY;

app.get('/search', (req, res) => {
  const location = req.query.location;
  axios.get(`${API_ENDPOINT}?term=pizza&location=${location}`, {
    headers: {
      "Authorization": `Bearer ${API_KEY}`
    }
  })
    .then(response => {
      res.json(response.data);
    })
    .catch(error => {
      console.error("Error fetching pizza places:", error);
      res.status(500).json({ error: 'Failed to fetch data from Yelp' });
    });
});

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/restaurants', restaurantRouter);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back the index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// App Set //
const PORT = process.env.PORT || 5001;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});


