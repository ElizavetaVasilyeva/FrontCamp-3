const express = require('express');
const router = express.Router();
const log = require('../js/log');
const constants = require('../helpers/constants');
const bcrypt = require('bcryptjs')
const messages = require('../helpers/messages');
const helper = require('../helpers/helper');

const User = require('../models/user');

router.post('/register', (req, res, next) => {
  const { name, email, username, password } = req.body;

  const newUser = Object.assign(new User(), { name, email, username, password });

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) {
        log.error(err);
      }
      newUser.password = hash;

      // db validation
      var error = newUser.validateSync();
      if (error && error.errors) {
        res.sendStatus(constants.SERVER_ERROR);
      }

      User.create(newUser)
        .then(user => {
          res.json(newUser.username);
        })
        .catch(err => {
          helper.prepareError(err, constants.SERVER_ERROR, messages.ERROR_CREATE_USER);
          next(err);
        });
    });
  });
});

router.post('/login', (req, res, next) => {
  const { username, password } = req.body;
  User.findOne({ username }, (err, user) => {
    if (err) {
      throw err;
    }
    if (!user) {
      log.warn(`User with username=${username} not found`);
    }

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        throw err;
      }
      if (isMatch) {
        res.json(user);
      } else {
        log.warn(`User put wrong password`);
      };
    });
  });
});

router.get('/:username', (req, res) => {
  User.findOne({ username: req.params.username }, (err, user) => {
    if (err) return console.error(err)
    if (user) {
      res.send({ errors: { username: "Username taken" } })
    } else {
      res.send({})
    }
  })
})

router.post('/checkUser', (req, res, next) => {
  const { username, password } = req.body;
  User.findOne({ username }, (err, user) => {
    if (err) {
      throw err;
    }
    if (!user) {
      res.send({ errors: { username: "No user found" } })
      return;
    }

    if (!password) {
      return;
    }
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        throw err;
      }
      if (isMatch) {
        res.json({});
      } else {
        res.send({ errors: { password: "Wrong password" } })
      };
    });
  });
});

module.exports = router;