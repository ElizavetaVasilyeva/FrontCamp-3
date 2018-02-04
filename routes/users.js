const express = require('express');
const router = express.Router();
const log = require('../js/log');
const constants = require('../helpers/constants');
const bcrypt = require('bcryptjs')
const passport = require('passport');
const expressValidator = require('express-validator');

let User = require('../models/user');

router.use(expressValidator({
  customValidators: {
    isUsernameAvailable(username) {
      return new Promise((resolve, reject) => {
        User.findOne({ username: username }, (err, user) => {
          if (err) throw err;
          if (user == null) {
            resolve();
          } else {
            reject();
          }
        });
      });
    }
  }
})
);

router.get('/register', (req, res) => {
  res.render('register')
});

router.post('/register', (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const password2 = req.body.password2;

  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('username', 'Username already in use').isUsernameAvailable();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  req.asyncValidationErrors().then(() => {
    let newUser = new User({
      name: name,
      email: email,
      username: username,
      password: password
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) {
          log.error(err);
        }
        newUser.password = hash;
        User.create(newUser)
          .then(user => {
            req.flash('success', 'You are registered!')
            res.redirect('/users/login');
          })
          .catch(err => {
            err.message = `Error occured during creating user operation\n${err.message}`;
            next(err);
          });
      });
    });
  })
    .catch((errors) => {
      if (errors) {
        res.render('register', {
          errors: errors
        })
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
  req.flash('info', 'You are logged out!');
  res.redirect('/users/login');
});

module.exports = router;