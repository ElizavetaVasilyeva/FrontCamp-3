const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const log = require('./js/log');
const args = require('minimist')(process.argv.slice(2));
const config = require('./config/config');

const blogs = require('./routes/blogs');
const users = require('./routes/users');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('*', (req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

app.use((req, res, next) => {
  log.info(req.method, `${req.protocol}://${req.get('host')}${req.originalUrl}`);
  next();
});

app.use('/blogs', blogs);
app.use('/users', users);

app.use((err, req, res, next) => {
  log.error(err);
  res.render('error', { errorMessage: err.message, status: err.status });
});

app.listen(args.port, () => {
  log.info('Blogs API started');
});