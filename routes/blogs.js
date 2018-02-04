const express = require('express');
const router = express.Router();
const log = require('../js/log');
const constants = require('../helpers/constants');
const flash = require('connect-flash');
let mongoose = require('mongoose');
let db = require('../js/db');
let Blog = require('../models/blog');
let User = require('../models/user');

router.get('/', checkAuthenticated, (req, res, next) => {
  Blog.find()
    .then(blogs => res.render('blogs', { blogs: blogs }))
    .catch(err => {
      err.status = constants.SERVER_ERROR;
      err.message = `Error occured during getting blogs operation\n${err.message}`;
      next(err);
    })
})

router.get('/add', checkAuthenticated, (req, res) => {
  res.render('createBlog');
});

router.post('/add', checkAuthenticated, (req, res) => {
  req.checkBody('title', 'Title is required').notEmpty();
  req.checkBody('body', 'Body is required').notEmpty();

  let errors = req.validationErrors();

  if (errors) {
    res.render('createBlog', { errors });
  } else {
    let newBlog = new Blog();
    newBlog.title = req.body.title;
    newBlog.author = req.user.name;
    newBlog.body = req.body.body;
    newBlog.date = new Date();

    Blog.create(newBlog)
      .then(blog => {
        req.flash('success', 'Blog added');
        res.redirect('/blogs');
      })
      .catch(err => {
        err.status = constants.SERVER_ERROR;
        err.message = `Error occured during creating blog operation\n${err.message}`;
        next(err);
      });
  }
});

router.get('/:id', checkAuthenticated, (req, res, next) => {
  const id = req.params.id;
  try {
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
        err.status = constants.SERVER_ERROR;
        err.message = `Error occured during getting blog with id=${id} operation\n${err.message}`;
        next(err);
      })
  }
  catch (err) {
    req.flash('danger', `Blog with id=${id} not found`);
    res.redirect('/blogs');
  }
})

router.get('/edit/:id', checkAuthenticated, (req, res, next) => {
  const id = req.params.id;
  try {
    const parsedId = mongoose.Types.ObjectId(id);

    Blog.findById(parsedId)
      .then(blog => {
        if (!blog) {
          req.flash('danger', `Blog with id=${id} not found`);
          res.redirect('/blogs');
          return;
        }
        if (blog.author != req.user.name) {
          req.flash('danger', 'Not Authorized');
          res.redirect('/blogs');
        }
        res.render('editBlog', { blog });
      })
      .catch(err => {
        err.status = constants.SERVER_ERROR;
        err.message = `Error occured during getting blog with id=${id} operation\n${err.message}`;
        next(err);
      })
  }
  catch (err) {
    req.flash('danger', `Blog with id=${id} not found`);
    res.redirect('/blogs');
  }
});

router.post('/edit/:id', checkAuthenticated, (req, res) => {
  const id = req.params.id;
  try {
    const parsedId = mongoose.Types.ObjectId(id);

    let blog = {};
    blog.title = req.body.title;
    blog.author = req.body.author;
    blog.body = req.body.body;
    blog.date = new Date();

    let query = { _id: parsedId };

    Blog.update(query, blog)
      .then(blog => {
        if (blog.n == 0) {
          req.flash('danger', `Blog with id=${id} not found`);
          res.redirect('/blogs');
          return;
        } else {
          req.flash('info', 'Blog updated');
          res.redirect('/blogs/' + req.params.id);
        }
      })
      .catch(err => {
        err.status = constants.SERVER_ERROR;
        err.message = `Error occured during updating blog with id=${id} operation\n${err.message}`;
        next(err);
      })
  }
  catch (err) {
    req.flash('danger', `Blog with id=${id} not found`);
    res.redirect('/blogs');
  }
});

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  try {
    const parsedId = mongoose.Types.ObjectId(id);
    let query = { _id: parsedId };

    Blog.remove(query)
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
        err.status = constants.SERVER_ERROR;
        err.message = `Error occured during deleting blog with id=${id} operation\n${err.message}`;
        next(err);
      })
  }
  catch (err) {
    err.status = constants.BAD_REQUEST;
    err.message = `Bad request with uncorrect id=${id}\n${err.message}`;
    next(err);
  }
})

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash('danger', 'Please, login.');
    res.redirect('/users/login');
  }
}

module.exports = router;