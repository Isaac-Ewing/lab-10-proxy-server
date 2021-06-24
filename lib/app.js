const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const request = require('superagent');
const { parseLocation, parseWeather, parseReviews } = require('./parse.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // http logging

app.get('/location', async(req, res) => {
  try {
    const city = req.query.search;
    const cityData = await request.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.LOCATION}&q=${city}&format=json`);
    const formattedData = parseLocation(cityData.body);
    res.json(formattedData);  
  } catch(e) {
    res.status(500).json({ message: e.message });
  }
});

app.get('/weather', async(req, res) => {
  try {
    const { latitude, longitude } = req.query;
    const response = await request.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&key=${process.env.WEATHER}`);
    const weather = parseWeather(response.body);
    res.json(weather);

  } catch(e) {
    res.status(500).json({ message: e.message });
  }
});

app.get('/reviews', async(req, res) => {
  try {
    const { latitude, longitude } = req.query;
    const response = await request.get(`https://api.yelp.com/v3/businesses/search?latitude=${latitude}&longitude=${longitude}`)
      .set('Authorization', `Bearer ${process.env.YELP}`)
      .set('Accept', 'application/json');
    const reviews = parseReviews(response.body);
    res.json(reviews);

  } catch(e) {
    res.status(500).json({ message: e.message });
  }
});

app.use(require('./middleware/error'));

module.exports = app;
