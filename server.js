const express = require('express');
const bodyParser = require('body-parser');
const pug = require('pug');
const log = require('./log')(module);

const app = express();
const router = express.Router();

app.set('view engine', 'pug');

router.use(function (req, res, next) {
  log.info(req.method, `${req.protocol}://${req.get('host')}${req.originalUrl}`);
  next();
});

app.use(router);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let blogs = [
  {
    id: 1,
    author: 'Kevin',
    context: 'This is first blog'
  },
  {
    id: 2,
    author: 'Jess',
    context: 'This is second blog'
  },
  {
    id: 3,
    author: 'Mark',
    context: 'This is third blog'
  }
]

app.get('/', (req, res) => {
  res.render('index', { welcoming: 'Blogs API!' });
})

app.get('/blogs', (req, res) => {
  res.send(blogs)
})

app.get('/blogs/:id', (req, res) => {
  const id = Number(req.params.id);
  const blog = blogs.find((blog) => {
    return blog.id === id;
  });

  if (!blog) {
    res.sendStatus(404);
    log.warn(`Blog with id=${id} not found`);
    return;
  }

  res.send(blog);
})

app.post('/blogs', (req, res) => {
  let idMax = Math.max(...Array.from(blogs, b => b.id));
  const blog = {
    id: ++idMax,
    author: req.body.author,
    context: req.body.context,
  };
  blogs.push(blog);
  res.sendStatus(200);
})

app.put('/blogs/:id', (req, res) => {
  const id = Number(req.params.id);
  const blog = blogs.find((blog) => {
    return blog.id === id;
  });

  if (!blog) {
    res.sendStatus(404);
    log.warn(`Blog with id=${id} not found`);
    return;
  }

  blog.author = req.body.author;
  blog.context = req.body.context;
  res.sendStatus(200);
})

app.delete('/blogs/:id', (req, res) => {
  const id = Number(req.params.id);
  const blog = blogs.find((blog) => {
    return blog.id === id;
  });

  if (!blog) {
    res.sendStatus(404);
    log.warn(`Blog with id=${id} not found`);
    return;
  }

  blogs = blogs.filter(bl => {
    return bl.id !== blog.id;
  })

  res.sendStatus(200);
})

// app.use('*', (req, res) => {
//     res.send(blogs[0]);
// });

app.use('*', (req, res) => {
  res.render('index', { welcoming: 'Hello from Blogs API!' });
});

app.listen(8008, () => {
  log.info('Blogs API started');
})