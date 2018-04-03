const winston = require('winston');
const config = require('../../config/config')


//That is settings for winston logging
function getLogger(config) {
  const transports = [
    new winston.transports.Console(config.winston.console),
    new winston.transports.File(config.winston.file)
  ];

  return new winston.Logger({
    transports: transports
  });
}

const log = getLogger(config);
module.exports = log;