function parseLocation(locationResponse) {
  const location = locationResponse[0];  
  return {
    formatted_query: location.display_name,
    latitude: location.lat,
    longitude: location.lon
  };
}

function parseWeather(weatherResponse) {
  const forecast = weatherResponse.data;
  
  const Forecasts = forecast.map(forecast => {
    return {
      forecast: forecast.weather.description,
      time: new Date(forecast.ts * 1000)
        .toLocaleDateString('en-US', {
          weekday: 'long', 
          year: 'numeric', //I just copied this, I went into Postman before I looked at the code and figured out what to do but I wouldn't have gotten the time conversion stuff
          month: 'long',
          day: 'numeric',
        })
    };
  });
  return Forecasts;
}

function parseReviews(reviewResponse) {
  const reviews = reviewResponse.map(review => {
    return {
      name: review.name,
      reviews: review.review_count
    };
  });
  return reviews;
}
module.exports = {
  parseLocation,
  parseWeather,
  parseReviews
};