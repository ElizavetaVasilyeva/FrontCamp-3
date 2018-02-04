module.exports = {
  consoleLogger: {
    timestamp: () => new Date().toString(),
    colorize: true,
    level: 'info'
  },
  fileLogger: {
    filename: 'debug.log',
    timestamp: () => new Date().toString(),
    level: 'debug'
  },
  env: {
    dev: 'dev',
    prod: 'prod'
  },
}