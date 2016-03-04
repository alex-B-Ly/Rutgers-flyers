var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var app = express();
// var sequelize = require('sequelize');
var PORT = process.env.PORT || 3000;
var userstable = require('./models/users.js');
var connection = require('./config/connection.js');

// app.use(session({
//   secret: 'Top Secret',
//   resave: true,
//   saveUninitialized: true,
//   cookie: {
//     secure: false,
//     maxAge: (1000 * 60 * 60 * 4)
//   }
// }));

// app.use(passport.initialize());
// app.use(passport.session());


app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// MIDDLEWARE - Public
app.use('/static', express.static('public'));

// MIDDLEWARE - body parser
app.use(bodyParser.urlencoded({
  extended: false
}));

// ROUTES
app.get('/', function(req, res) {
  res.render('home');
});

app.get('/login', function(req, res) {
  res.render('login');
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
