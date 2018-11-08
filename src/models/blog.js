const mongoose = require('mongoose');
const validators = require('mongoose-validators');

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    validate: validators.isLength(3, 100)
  },
  author: {
    type: String,
    required: true,
    validate: [validators.isAlphanumeric(), validators.isLength(2, 60)]
  },
  body: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
    validate: validators.isDate()
  },
},
  { versionKey: false });

const Blog = module.exports = mongoose.model('Blog', blogSchema);