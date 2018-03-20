module.exports = {
  winston: {
    console: {
      timestamp: () => new Date().toString(),
      colorize: true,
      level: 'info'
    },
    file: {
      filename: 'debug.log',
      timestamp: () => new Date().toString(),
      level: 'debug'
    },
  },
  database: 'mongodb://localhost/frontcamp',
  secretKey: "LizasSecretKey"
}