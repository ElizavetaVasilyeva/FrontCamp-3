const winston = require('winston');
const config = require('../config/config')
const args = require('minimist')(process.argv.slice(2));

function getLogger(config, flag) {
  if (flag === config.env.dev) {
    var transports = [
      new winston.transports.Console(config.consoleLogger),
      new winston.transports.File(config.fileLogger)
    ];

    return new winston.Logger({
      transports: transports
    });
  } else {
    return new winston.Logger({
      transport: []
    });
  }
}

const log = getLogger(config, args.env);
module.exports = log;