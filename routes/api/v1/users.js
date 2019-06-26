var express = require("express");
var router = express.Router();
var User = require('../../../models').User;
var bcrypt = require('bcrypt');
const saltRounds = 10;
const uuidv4 = require('uuid/v4');

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
  });
});

router.post ("/sessions", function(req, res, next) {
  User.findOne({ where: {email: req.body.email} }).then(user => {
  if (user.password = req.body.password) {
    
  }
})

})

module.exports = router; //this should stay at the bottom of the file
