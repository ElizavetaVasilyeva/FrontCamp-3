const express = require('express');
const router = express.Router();
const log = require('../js/log');
const constants = require('../helpers/constants');
const bcrypt = require('bcryptjs')
const passport = require('passport');
const expressValidator = require('express-validator');
const messages = require('../helpers/messages');
const helper = require('../helpers/helper');
const validator = require('../js/validation');

const User = require('../models/user');

router.use(expressValidator({
  customValidators: {
    isUsernameAvailable(username) {
      return new Promise((resolve, reject) => {
        User.findOne({ username }, (err, user) => {
          if (err) {
            throw err;
          }
          if (user == null) {
            resolve();
          } else {
            reject();
          }
        });
      });
    }
  }
}));

router.get('/register', (req, res) => {
  res.render('register')
});

router.post('/register', (req, res, next) => {
  const { name, email, username, password, password2 } = req.body;

  //ui validation
  validator.ValidateUser(req);

  req.asyncValidationErrors().then(() => {
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
          res.render('register', { errors: error.errors });
        }
        User.create(newUser)
          .then(user => {
            req.flash('success', messages.USER_REGISTERED);
            res.redirect('/users/login');
          })
          .catch(err => {
            helper.prepareError(err, constants.SERVER_ERROR, messages.ERROR_CREATE_USER);
            next(err);
          });
      });
    });
  })
    .catch((errors) => {
      if (errors) {
        res.render('register', { errors })
      }
    });
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('info', messages.LOGOUT);
  res.redirect('/users/login');
});

module.exports = router;