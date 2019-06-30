var express = require("express");
var router = express.Router();
var User = require('../../../models').User;
var Location = require('../../../models').Location;
var CurrentWeather = require('../../../models').CurrentWeather;
const fetch = require('node-fetch');

router.get("/", function(req, res, next) {
  var hash = {}
  User.findOne({where: {api_key: req.body.api_key} })
    .then(user => {
      if (user != null) {
        var location = req.query.location.split(",")
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.GOOGLE_KEY}&components=locality:${location[0]}|state:${location[1]}`)
          .then(response => response.json())
          .then(function(data) {
            let city = `${location[0]}, ${location[1]}`
            let lat = data["results"][0]["geometry"]["location"]["lat"]
            let long = data["results"][0]["geometry"]["location"]["lng"]
            Location.findOrCreate({where: {cityState: city, latitude: lat, longitude: long}})
              .then(([loc, created]) => {
                fetch(`https://api.darksky.net/forecast/${process.env.DARKSKY_KEY}/${lat},${long}`)
                .then(response => response.json())
                .then(function(data) {
                  hash.location = loc.cityState;
                  hash.currently = {
                      summary: data["currently"]["summary"],
                      icon: data["currently"]["icon"],
                      precipIntensity: data["currently"]["precipIntensity"],
                      precipProbability: data["currently"]["precipProbability"],
                      temperature: data["currently"]["temperature"],
                      humidity: data["currently"]["humidity"],
                      pressure: data["currently"]["pressure"],
                      windSpeed: data["currently"]["windSpeed"],
                      windGust: data["currently"]["windGust"],
                      windBearing: data["currently"]["windBearing"],
                      cloudCover: data["currently"]["cloudCover"],
                      visibility: data["currently"]["visibility"]
                    }
                  hash.hourly = {
                    summary: data["hourly"]["summary"],
                    icon: data["hourly"]["icon"]
                  }
                  hash.daily = {
                    summary: data["daily"]["summary"],
                    icon: data["daily"]["icon"],
                  }
                  hash.hourly.data = []
                  hash.daily.data = []
                  data["hourly"]["data"].forEach(hourlyWeather);
                  data["daily"]["data"].forEach(dailyWeather);
                  res.status(201).send(hash);
                  function hourlyWeather(hour) {
                    var hour = {
                    time: hour["time"],
                    summary: hour["summary"],
                    icon: hour["icon"],
                    precipIntensity: hour["precipIntensity"],
                    precipProbability: hour["precipProbability"],
                    temperature: hour["temperature"],
                    humidity: hour["humidity"],
                    pressure: hour["pressure"],
                    windSpeed: hour["windSpeed"],
                    windGust: hour["windGust"],
                    windBearing: hour["windBearing"],
                    cloudCover: hour["cloudCover"],
                    visibility: hour["visibility"]
                    }
                    hash.hourly.data.push(hour)
                  }

                  function dailyWeather(day) {
                    var day = {
                    time: day["time"],
                    summary: day["summary"],
                    icon: day["icon"],
                    sunriseTime: day["sunriseTime"],
                    sunsetTime: day["sunsetTime"],
                    precipIntensity: day["precipIntensity"],
                    precipIntensityMax: day["precipIntensityMax"],
                    precipIntensityMaxTime: day["precipIntensityMaxTime"],
                    precipProbability: day["precipProbability"],
                    precipType: day["precipType"],
                    temperatureHigh: day["temperatureHigh"],
                    temperatureLow: day["temperatureLow"],
                    humidity: day["humidity"],
                    pressure: day["pressure"],
                    windSpeed: day["windSpeed"],
                    windGust: day["windGust"],
                    cloudCover: day["cloudCover"],
                    visibility: day["visibility"],
                    temperatureMin: day["temperatureMin"],
                    temperatureMax: day["temperatureMax"]
                    }
                    hash.daily.data.push(day)
                  }
                })
              })
              .catch(error => {
                res.setHeader("Content-Type", "application/json");
                res.status(500).send({ error });
              });
          })
          .catch(error => {
            res.setHeader("Content-Type", "application/json");
            res.status(500).send({ error });
          });
    } else {
      res.setHeader("Content-Type", "application/json");
      res.status(401).send("Unauthorized");
    }

  })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({ error });
    });
});

module.exports = router; //this should stay at the bottom of the file
