const express = require('express');
const bodyParser = require('body-parser');
const pug = require('pug');
const log = require('./log');
const router = require('./route');

const app = express();
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

app.listen(8008, () => {
  log.info('Blogs API started');
})