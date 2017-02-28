'use strict';

function WeatherViewModel() {
  var self = this;
  self.city = ko.observable('');
  self.temp = ko.observable('');
  self.sym = ko.observable('℃');
  $.get("http://ipinfo.io", function (response) {
    self.city(response.city);

    $.get('http://api.openweathermap.org/data/2.5/weather?q=' + self.city() + '&units=metric&APPID=159a04ea6822414e06e035ea47bd0c3b', function (response) {
      self.temp(response.main.temp + self.sym());
    }, "jsonp");
  }, "jsonp");

  self.convert = function () {
    if (self.sym() === '℃') {
      var cToFahr = self.temp() * 9 / 5 + 32;
      self.temp(cToFahr);
    } else {
      var fToCel = (self.temp() - 32) * 5 / 9;
      self.temp(fToCel);
    }
  };
}

ko.applyBindings(new WeatherViewModel());