'use strict';

// Main viewModel
function WeatherViewModel() {
  var self = this;
  self.city = ko.observable('');  // store the current city
  self.temp = ko.observable('');  // store the current temperature
  self.iconClass = ko.observable(''); // store the icon class from weather-icons
  self.sym = '℃'; // default temperature is in Celsius

  // First get the current location, after which
  // get the weather report based on the current
  // location
  $.get("https://ipinfo.io", function (response) {
    self.city(response.city + ', ' + response.country);

    $.get('http://api.openweathermap.org/data/2.5/weather?q=' + self.city() 
          + '&units=metric&APPID=159a04ea6822414e06e035ea47bd0c3b', function (response) {
      self.temp(response.main.temp + ' ' + self.sym);
      self.setIcon(response.weather[0].main.toLowerCase());
    }, "jsonp");
  }, "jsonp");

  // Set the icon class for weather-icons
  self.setIcon = function(currentWeather) {    
    // Check if it's day or night
    let currentTime = (new Date()).getHours();

    if (currentWeather === 'drizzle') {
      currentTime < 12 ? self.iconClass('wi wi-day-sleet') : self.iconClass('wi wi-night-sleet');      
    } else if (currentWeather === 'clouds') {
      currentTime < 12 ? self.iconClass('wi wi-day-cloudy') : self.iconClass('wi wi-night-alt-cloudy');
    } else if (currentWeather === 'rain') {
      currentTime < 12 ? self.iconClass('wi wi-day-rain') : self.iconClass('wi wi-night-alt-rain');      
    } else if (currentWeather === 'snow') {
      currentTime < 12 ? self.iconClass('wi wi-day-snow') : self.iconClass('wi wi-night-alt-snow');      
    } else if (currentWeather === 'clear') {
      currentTime < 12 ? self.iconClass('wi wi-day-sunny') : self.iconClass('wi wi-night-clear');      
    } else if (currentWeather === 'thunderstorm') {
      currentTime < 12 ? self.iconClass('wi wi-thunderstorm') : self.iconClass('wi wi-night-alt-thunderstorm');     
    }
  };

  // Convert the temperature from Celsius to Fahrenheit
  // and vice-versa
  self.convert = function () {
    if (self.sym === '℃') {
      var cToFahr = (parseFloat(self.temp()) * 9 / 5 + 32).toFixed(2);
      self.sym = '℉';
      self.temp(cToFahr + ' ' + self.sym);      
    } else {
      var fToCel = ((parseFloat(self.temp()) - 32) * 5 / 9).toFixed(2);
      self.sym = '℃';
      self.temp(fToCel + ' ' + self.sym);      
    }
  };
}

// instantiate viewModel
ko.applyBindings(new WeatherViewModel());