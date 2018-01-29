const express = require('express');
const router = express.Router();
const log = require('./log');
let blogs = require('../mocks/blogs.mock');
const constants = require('./constants');

router.use(function (req, res, next) {
  log.info(req.method, `${req.protocol}://${req.get('host')}${req.originalUrl}`);
  next();
});

router.get('/', (req, res) => {
  res.render('index', { welcoming: 'Blogs API!' });
})

router.get('/blogs', (req, res) => {
  res.send(blogs);
})

router.get('/blogs/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const blog = blogs.find(blog => blog.id === id);

  if (!blog) {
    log.warn(`Blog with id=${id} not found`);
    res.sendStatus(constants.NOT_FOUND);
    return;
  }

  res.send(blog);
})

router.post('/blogs', (req, res) => {
  let idMax = Math.max(...Array.from(blogs, b => b.id));
  const blog = Object.assign({}, {
    id: ++idMax,
    author: req.body.author,
    context: req.body.context,
  });
  blogs.push(blog);
  res.sendStatus(constants.OK);
})

router.put('/blogs/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const blog = blogs.find(blog => blog.id === id);

  if (!blog) {
    log.warn(`Blog with id=${id} not found`);
    res.sendStatus(404);
    return;
  }

  blog.author = req.body.author;
  blog.context = req.body.context;
  res.sendStatus(constants.OK);
})

router.delete('/blogs/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const blog = blogs.find(blog => blog.id === id);

  if (!blog) {
    log.warn(`Blog with id=${id} not found`);
    res.sendStatus(constants.NOT_FOUND);
    return;
  }

  blogs = blogs.filter(bl => bl.id !== blog.id);

  res.sendStatus(constants.OK);
})

router.use('*', (req, res) => {
  res.render('index', { welcoming: 'Hello from Blogs API!' });
});

module.exports = router;