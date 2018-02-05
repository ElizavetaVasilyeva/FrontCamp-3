const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const log = require('../js/log');

const localStrategy = new LocalStrategy((username, password, done) => {
  User.findOne({ username }, (err, user) => {
    if (err) {
      throw err;
    }
    if (!user) {
      log.warn(`User with username=${username} not found`);
      return done(null, false, { message: 'No user found' });
    }

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        throw err;
      }
      if (isMatch) {
        return done(null, user);
      } else {
        log.warn(`User put wrong password`);
        return done(null, false, { message: 'Wrong password' });
      };
    });
  });
});

module.exports = passport => {
  passport.use(localStrategy);

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};