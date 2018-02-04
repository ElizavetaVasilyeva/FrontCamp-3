const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const pug = require('pug');
const log = require('./js/log');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

let users = require('./routes/users');
let blogs = require('./routes/blogs');

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('express-jquery')('/jquery.js'));

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

app.use(require('connect-flash')());
app.use((req, res, next) => {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

app.use(expressValidator({
  errorFormatter: (param, msg, value) => {
    var namespace = param.split('.')
      , root = namespace.shift()
      , formParam = root;

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));

require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

app.get('*', (req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

app.use(function (req, res, next) {
  log.info(req.method, `${req.protocol}://${req.get('host')}${req.originalUrl}`);
  next();
});

app.get('/', (req, res) => {
  res.render('index', { welcoming: 'Welcome to Blogs API!' });
})

app.use('/blogs', blogs);
app.use('/users', users);

app.use(function (err, req, res, next) {
  log.error(err);
  res.render('error', { errorMessage: err.message, status: err.status });
})

app.listen(8008, () => {
  log.info('Blogs API started');
})