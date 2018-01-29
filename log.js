var winston = require('winston');

module.exports = function (module) {
  return makeLogger(module.filename);
};

function makeLogger(path) {
  if (path.match(/server.js$/)) {
    var transports = [

      new winston.transports.Console({
        timestamp: function () { return new Date().toString() },
        colorize: true,
        level: 'info'
      }),

      new winston.transports.File({
        filename: 'debug.log',
        timestamp: function () { return new Date().toString() },
        level: 'debug'
      })
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