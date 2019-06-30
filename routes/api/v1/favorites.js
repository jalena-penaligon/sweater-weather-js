var express = require("express");
var router = express.Router();
var User = require('../../../models').User;
var Location = require('../../../models').Location;
var Favorite = require('../../../models').Favorite;
const titleize = require('titleize');

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
