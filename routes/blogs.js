const express = require('express');
const router = express.Router();
const log = require('../js/log');
const constants = require('../helpers/constants');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const db = require('../js/db');
const auth = require('../js/auth');
const Blog = require('../models/blog');
const User = require('../models/user');
const helper = require('../helpers/helper');
const messages = require('../helpers/messages');
const validator = require('../js/validation');

router.use('*', (req, res, next) => {
  auth(req, res, next);
});

router.get('/', (req, res, next) => {
  Blog.find()
    .then(blogs => res.render('blogs', { blogs }))
    .catch(err => {
      helper.prepareError(err, constants.SERVER_ERROR, messages.ERROR_GET);
      next(err);
    })
});

router.get('/add', (req, res) => {
  res.render('createBlog');
});

router.post('/add', (req, res) => {
  validator.ValidateBlog(req);

  const errors = req.validationErrors();

  if (errors) {
    res.render('createBlog', { errors });
  } else {
    const newBlog = Object.assign(new Blog(), {
      title: req.body.title,
      author: req.user.name,
      body: req.body.body,
      date: new Date(new Date().toISOString()),
    });

    var error = newBlog.validateSync();
    if (error && error.errors) {
      res.render('createBlog', { errors: error.errors });
    }

    Blog.create(newBlog)
      .then(blog => {
        req.flash('success', messages.BLOG_ADDED);
        res.redirect('/blogs');
      })
      .catch(err => {
        helper.prepareError(err, constants.SERVER_ERROR, messages.ERROR_CREATE);
        next(err);
      });
  }
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  if (mongoose.Types.ObjectId.isValid(id)) {
    const parsedId = mongoose.Types.ObjectId(id);

    Blog.findById(parsedId)
      .then(blog => {
        if (!blog) {
          req.flash('danger', `Blog with id=${parsedId} not found`);
          res.redirect('/blogs');
          return;
        } else {
          User.findOne({ name: blog.author }, (err, user) => {
            res.render('blog', {
              blog,
              author: user.name
            });
          });
        }
      })
      .catch(err => {
        helper.prepareError(err, constants.SERVER_ERROR, `Error occured during getting blog with id=${id} operation`);
        next(err);
      })
  } else {
    req.flash('danger', `Blog with id=${id} not found`);
    res.redirect('/blogs');
  }
});

router.get('/edit/:id', (req, res, next) => {
  const { id } = req.params;
  if (mongoose.Types.ObjectId.isValid(id)) {
    const parsedId = mongoose.Types.ObjectId(id);

    Blog.findById(parsedId)
      .then(blog => {
        if (!blog) {
          req.flash('danger', `Blog with id=${id} not found`);
          res.redirect('/blogs');
          return;
        }
        if (blog.author != req.user.name) {
          req.flash('danger', messages.NOT_AUTORIZED);
          res.redirect('/blogs');
        }
        res.render('editBlog', { blog });
      })
      .catch(err => {
        helper.prepareError(err, constants.SERVER_ERROR, `Error occured during getting blog with id=${id} operation`);
        next(err);
      })
  } else {
    req.flash('danger', `Blog with id=${id} not found`);
    res.redirect('/blogs');
  }
});

router.post('/edit/:id', (req, res) => {
  const { id } = req.params;
  if (mongoose.Types.ObjectId.isValid(id)) {
    const parsedId = mongoose.Types.ObjectId(id);

    validator.ValidateBlog(req);

    const errors = req.validationErrors();

    const blog = Object.assign(new Blog(), {
      title: req.body.title,
      author: req.body.author,
      body: req.body.body,
      date: new Date(new Date().toISOString())
    });

    if (errors) {
      res.render('editBlog', { blog, errors });
    } else {

      var error = blog.validateSync();
      if (error && error.errors) {
        res.render('editBlog', { blog, errors: error.errors });
      }

      Blog.update({ _id: parsedId }, blog)
        .then(blog => {
          if (blog.n == 0) {
            req.flash('danger', `Blog with id=${id} not found`);
            res.redirect('/blogs');
            return;
          } else {
            req.flash('info', messages.BLOG_UPDATED);
            res.redirect('/blogs/' + id);
          }
        })
        .catch(err => {
          helper.prepareError(err, constants.SERVER_ERROR, `Error occured during updating blog with id=${id} operation`);
          next(err);
        })
    }
  } else {
    req.flash('danger', `Blog with id=${id} not found`);
    res.redirect('/blogs');
  }
});

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  if (mongoose.Types.ObjectId.isValid(id)) {
    const parsedId = mongoose.Types.ObjectId(id);

    Blog.remove({ _id: parsedId })
      .then(blog => {
        if (blog.n == 0) {
          req.flash('danger', `Blog with id=${id} not found`);
          res.redirect('/blogs');
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