var express = require("express");
var router = express.Router();
var User = require('../../../models').User;
var bcrypt = require('bcrypt');
const saltRounds = 10;
const uuidv4 = require('uuid/v4');

var findUserByEmail = function(email){
  return User.findOne({where: {email: email} })
  .then(user => {
    if(user == null){
      return true;
    } else {
      return false;
    }
  })
};

router.get("/", function(req, res, next) {
  User.findAll()
    .then(users => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(JSON.stringify(users));
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({error})
    });
});

router.post("/", function(req, res, next) {
  bcrypt.hash(req.body.password, saltRounds, function (err,   hash) {
  var key = uuidv4();
  findUserByEmail(req.body.email)
    .then((validUser) => {
      if (validUser == false) {
        res.setHeader("Content-Type", "application/json");
        res.status(400).send("Email is already in use.")
      } else {
        User.create({
          email: req.body.email,
          api_key: key,
          password: hash
        })
        .then(user => {
          res.setHeader("Content-Type", "application/json");
          res.status(201).send({ api_key: user.api_key });
        })
        .catch(error => {
          res.setHeader("Content-Type", "application/json");
          res.status(500).send({ error });
        });
      }
    });
  });
});

module.exports = router; //this should stay at the bottom of the file
