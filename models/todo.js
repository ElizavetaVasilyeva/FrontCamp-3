const mongoose = require('mongoose');
const validators = require('mongoose-validators');

const todoSchema = mongoose.Schema({
  context: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
    validate: [validators.isAlphanumeric(), validators.isLength(2, 60)]
  },
  status: {
    type: String,
    required: true,
    validate: [validators.isLength(2, 15)]
  },
  createdDate: {
    type: Date,
    required: true,
    validate: validators.isDate()
  },
  resolvedDate: {
    type: Date,
    required: false,
    validate: validators.isDate()
  }
},
  { versionKey: false });

const ToDo = module.exports = mongoose.model('ToDo', todoSchema);