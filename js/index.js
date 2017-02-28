'use strict';

function WeatherViewModel() {
  var self = this;
  self.city = ko.observable('');
  self.temp = ko.observable('');
  self.sym = '℃';
  $.get("http://ipinfo.io", function (response) {
    self.city(response.city);

    $.get('http://api.openweathermap.org/data/2.5/weather?q=' + self.city() 
          + '&units=metric&APPID=159a04ea6822414e06e035ea47bd0c3b', function (response) {
      self.temp(response.main.temp + ' ' + self.sym);
    }, "jsonp");
  }, "jsonp");

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

ko.applyBindings(new WeatherViewModel());