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
          var token = helper.createToken(user);
          res.json({
            success: true,
            message: 'User has been created',
            token: token
          });
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
      res.json({
        success: false,
        message: `User with username=${username} not found`
      });
      return;
    }

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        throw err;
      }
      if (isMatch) {
        var token = helper.createToken(user);
        res.json({
          success: true,
          message: "Successfully login",
          token: token
        });
      } else {
        res.json({
          success: false,
          message: `User put wrong password`
        });
      };
    });
  });
});

module.exports = router;