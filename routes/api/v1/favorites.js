var express = require("express");
var router = express.Router();
var User = require('../../../models').User;
var Location = require('../../../models').Location;
var Favorite = require('../../../models').Favorite;
const titleize = require('titleize');
const fetch = require('node-fetch');

var getWeather = function(location) {
  fetch(`https://api.darksky.net/forecast/${process.env.DARKSKY_KEY}/${location.latitude},${location.longitude}`)
  .then(response => response.json())
  .then(function(data) {
    // data now returns the hash from DarkSky that I want
    var pry = require('pryjs'); eval(pry.it)
    return data // this was my attempt to try to get data out of the helper method
  })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.status(500).send({error})
  });
}

var getLocationData = function(location){
  var location = req.query.location.split(",")
  fetch(`https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.GOOGLE_KEY}&components=locality:${location[0]}|state:${location[1]}`)
  .then(response => response.json())
  .then(function(data) {
  })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.status(500).send({error})
  });
}


router.get("/", function(req, res, next) {
  var hash = {}
  User.findOne({where: {api_key: req.body.api_key} })
    .then(user => {
      if (user == null) {
        res.setHeader("Content-Type", "application/json");
        res.status(404).send("Unauthorized")
      } else {
        Favorite.findAll({where: { userId: user.id }})
          .then(favorites => {
            favorites.forEach(findWeather)
            function findWeather(favorite) {
              Location.findOne({where: {id: favorite['dataValues']['id']} })
                .then(location => {
                  if (location.latitude != undefined) {
                    var data = getWeather(location)
                    // data is undefined here
                  } else {
                    getLocationData(location)
                    let lat = data["results"][0]["geometry"]["location"]["lat"]
                    let long = data["results"][0]["geometry"]["location"]["lng"]
                  }
                })
            }
          })
      }
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({error})
    });
});

router.post("/", function(req, res, next) {
  User.findOne({where: {api_key: req.body.api_key} })
    .then(user => {
      if (user == null) {
        res.setHeader("Content-Type", "application/json");
        res.status(404).send("Unauthorized")
      } else {
          Location.findOrCreate({where: {cityState: req.body.location.toLowerCase()}})
            .then(([loc, created]) => {
              Favorite.findOrCreate({where: {userId: user.id, locationId: loc.id}})
                .then(([fav, created]) => {
                  res.setHeader("Content-Type", "application/json");
                  res.status(200).send({"message": `${titleize(loc.cityState)} has been added to your favorites`});
                })
            })
          }
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({error})
    });
});


module.exports = router; //this should stay at the bottom of the file
