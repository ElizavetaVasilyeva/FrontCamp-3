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
  env: {
    dev: 'dev',
    prod: 'prod'
  },
  session: {
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  },
  database: 'mongodb://localhost/frontcamp'
}