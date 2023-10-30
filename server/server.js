const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

// added for API
const axios = require('axios');
const cors = require('cors');

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');



// Route includes
const userRouter = require('./routes/user.router');

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
  // term=pizza instructs Yelp API to filter results for businesses that match
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

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5001;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
