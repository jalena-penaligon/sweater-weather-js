var express = require("express");
var router = express.Router();
var User = require('../../../models').User;
var bcrypt = require('bcrypt');


router.post("/", function(req, res, next) {
  User.findOne({where: {email: req.body.email} })
    .then(user => {
      if (user == null) {
        res.status(401).send("This user does not exist.");
      } else {
        bcrypt.compare(req.body.password, user.password, function(err, result) {
          if (result == true) {
            res.setHeader("Content-Type", "application/json");
            res.status(201).send({ api_key: user.api_key });
          } else {
            res.setHeader("Content-Type", "application/json");
            res.status(401).send("Incorrect password");
          }
        });
      }
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({ error });
    });
});


module.exports = router; //this should stay at the bottom of the file
