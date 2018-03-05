const express = require('express');
const router = express.Router();
const log = require('../js/log');
const constants = require('../helpers/constants');
const mongoose = require('mongoose');
const db = require('../js/db');
const Blog = require('../models/blog');
const helper = require('../helpers/helper');
const messages = require('../helpers/messages');

router.get('/', (req, res, next) => {
  Blog.find()
    .then(blogs => {
      res.json(blogs);
    })
    .catch(err => {
      helper.prepareError(err, constants.SERVER_ERROR, messages.ERROR_GET);
      next(err);
    })
});

router.post('/', (req, res, next) => {
  const newBlog = Object.assign(new Blog(), {
    title: req.body.title,
    author: req.body.author,
    body: req.body.body,
    date: new Date(new Date().toISOString()),
  });

  var error = newBlog.validateSync();
  if (error && error.errors) {
    res.sendStatus(constants.SERVER_ERROR);
  }

  Blog.create(newBlog)
    .then(blog => {
      res.json(newBlog);
    })
    .catch(err => {
      helper.prepareError(err, constants.SERVER_ERROR, messages.ERROR_CREATE);
      next(err);
    });
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  if (mongoose.Types.ObjectId.isValid(id)) {
    const parsedId = mongoose.Types.ObjectId(id);

    Blog.findById(parsedId)
      .then(blog => {
        if (!blog) {
          res.sendStatus(constants.BAD_REQUEST);
        } else {
          res.json(blog);
        }
      })
      .catch(err => {
        helper.prepareError(err, constants.SERVER_ERROR, `Error occured during getting blog with id=${id} operation`);
        next(err);
      })
  } else {
    res.sendStatus(constants.BAD_REQUEST);
  }
});

router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  if (mongoose.Types.ObjectId.isValid(id)) {
    const parsedId = mongoose.Types.ObjectId(id);

    const blog = Object.assign(new Blog(), {
      _id: parsedId,
      title: req.body.title,
      author: req.body.author,
      body: req.body.body,
      date: new Date(new Date().toISOString())
    });

    var error = blog.validateSync();
    if (error && error.errors) {
      res.sendStatus(constants.SERVER_ERROR);
    }

    Blog.update({ _id: parsedId }, blog)
      .then(blog => {
        if (blog.n == 0) {
          res.sendStatus(constants.BAD_REQUEST);
        } else {
          res.json(blog);
        }
      })
      .catch(err => {
        helper.prepareError(err, constants.SERVER_ERROR, `Error occured during updating blog with id=${id} operation`);
        next(err);
      })
  } else {
    res.sendStatus(constants.BAD_REQUEST);
  }
});

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  if (mongoose.Types.ObjectId.isValid(id)) {
    const parsedId = mongoose.Types.ObjectId(id);

    Blog.remove({ _id: parsedId })
      .then(blog => {
        if (blog.n == 0) {
          res.sendStatus(constants.SERVER_ERROR);
          return;
        } else {
          res.sendStatus(constants.OK);
        }
      })
      .catch(err => {
        helper.prepareError(err, constants.SERVER_ERROR, `Error occured during deleting blog with id=${id} operation`);
        next(err);
      })
  } else {
    helper.prepareError(err, constants.BAD_REQUEST, `Bad request with uncorrect id=${id}`);
    next(err);
  }
});

module.exports = router;