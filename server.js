const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const log = require('./src/js/log');
const args = require('minimist')(process.argv.slice(2));
const conf = require('./config/config');
var jsonwebtoken = require('jsonwebtoken');
const config = require('config');

const blogs = require('./src/routes/blogs');
const users = require('./src/routes/users');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  log.info(req.method, `${req.protocol}://${req.get('host')}${req.originalUrl}`);
  next();
});


app.use('/api/users', users);

app.use('/api', (req, res, next) => {
  var token = req.query['x-access-token'] || req.headers['x-access-token'];

  // check if token exist
  if (token) {
    jsonwebtoken.verify(token, conf.secretKey, function (err, decoded) {
      if (err) {
        res.status(403).send({ success: false, message: "Failed to authenticate user" });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(403).send({ success: false, message: "No token Provided" });
  }
});

app.get('/api/users/me', (req, res) => {
  res.json(req.decoded);
});

app.use('/api/blogs', blogs);

app.get('*', (req, res, next) => {
  res.sendFile(__dirname + '/public/app/views/index.html')
});

app.use((err, req, res, next) => {
  log.error(err);
  res.render('error', { errorMessage: err.message, status: err.status });
});

var serv = app.listen(args.port, () => {
  log.info('Blog API started');
});

module.exports = serv;