const messages = require('../helpers/messages');

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash('danger', messages.PLEASE_LOGIN);
    res.redirect('/users/login');
  }
};

module.exports = checkAuthenticated;