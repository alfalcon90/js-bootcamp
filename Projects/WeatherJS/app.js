// Init Storage
const storage = new Storage();

// Get stored location data
const weatherLocation = storage.getLocationData();


// Init Weather
const weather = new Weather(weatherLocation.city, weatherLocation.state);

// Init UI
ui = new UI();

// Get weather on DOM load
document.addEventListener('DOMContentLoaded', displayWeather(weatherLocation.state))

// Change location event
document.getElementById('w-change-btn').addEventListener('click', (e) => {
  const city = document.getElementById('city').value;
  const state = document.getElementById('state').value;
  
  // Set location in LS
  storage.setLocationData(city, state);

  // Change location
  weather.changeLocation(city, state);

  // Get and display weather again
  displayWeather(state);

  // Close modal using jQuery
  $('#locModal').modal('hide');

  // Clear input fields
  document.getElementById('city').value = '';
  document.getElementById('state').value = '';
})


// Display weather
function displayWeather(state) {
  weather.getWeather()
  .then(results => {
    console.log(state)
    ui.paint(results, state);
  })
  .catch(err => console.log(err));
}
