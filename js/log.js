const winston = require('winston');
const config = require('../config/config')

function getLogger(config) {
  var transports = [
    new winston.transports.Console(config.winston.console),
    new winston.transports.File(config.winston.file)
  ];

  return new winston.Logger({
    transports: transports
  });
}

const log = getLogger(config);
module.exports = log;