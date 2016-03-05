debugger;
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var app = express();
var bcrypt = require('bcryptjs');
// var sequelize = require('sequelize');
var PORT = process.env.PORT || 3000;
var userstable = require('./models/users.js');
var connection = require('./config/connection.js');

//Require Passport
var passport = require('passport');
var passportLocal = require('passport-local');

// Initialize Session
var session = require('express-session');

app.use(session({
  secret: 'Top Secret',
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: (1000 * 60 * 60 * 4)
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// MIDDLEWARE - Public
app.use('/static', express.static('public'));

// MIDDLEWARE - body parser
app.use(bodyParser.urlencoded({
  extended: false
}));

passport.use(new passportLocal.Strategy({
  usernameField: 'login_email',
  passwordField: 'login_password'
}, function(username, password, done) {
  userstable.Users.findOne({
    where: {
      email: username
    }
  }).then(function(userData) {
    if (userData) {
      bcrypt.compare(password, userData.dataValues.password, function(err, user) {
        console.log(user)
        if (user) {
          done(null, {id: username, username: username} );
        } else {
          done(null, null);
        }
      });
    } else {
      done(null, null);
    }
  });
}));

//change the object used to authenticate to a smaller token, and protects the server from attacks
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  done(null, {id: id, username: id});
});


// ROUTES
app.get('/', function(req, res) {
  res.render('home', {
    user: req.user,
    isAuthenticated: req.isAuthenticated()
  });
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/login',
  failureRedirect: '/login?msg=Login credentials do not work'
}));

app.get('/login', function(req, res) {
  console.log(req.user);
  res.render('login', {
    user: req.user,
    isAuthenticated: req.isAuthenticated()
  });
});

app.post('/register', function(req, res) {
  // res.render('registration');
  userstable.Users.create(req.body).then(function(result){
    res.redirect('/food');
  }).catch(function(err){
    console.log(err.errors[0].message);
    res.redirect('/');
  })
});

app.get('/food', function(req, res) {
  res.render('food');
});

app.get('/drink', function(req, res) {
  res.render('drink');
});

app.get('/study', function(req, res) {
  res.render('study');
});

connection.sync().then(function() {
  app.listen(PORT, function() {
    console.log("Listening on PORT %s", PORT);
  });
});
