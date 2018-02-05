const mongoose = require('mongoose');
const config = require('../config/config')
const log = require('./log');

mongoose.connect(config.database);
let db = mongoose.connection;

db.once('open', () => log.info('Connected to MongoDB'));

db.on('error', (err) => log.error(`Db error: ${err}`));

module.exports = db;