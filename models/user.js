const mongoose = require('mongoose');
const validators = require('mongoose-validators');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: [validators.isAlphanumeric(), validators.isLength(2, 60)]
  },
  email: {
    type: String,
    required: true,
    validate: validators.isEmail()
  },
  username: {
    type: String,
    required: true,
    validate: [validators.isAlphanumeric(), validators.isLength(3, 60)]
  },
  password: {
    type: String,
    required: true
  },
});

const User = module.exports = mongoose.model('User', userSchema);