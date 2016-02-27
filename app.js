var express = require('express');
var exphbs = require('express-handlebars');
var app = express();
var PORT = process.env.PORT || 3000;


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

app.get('/', function(req, res) {
  res.render('home');
});

app.get('/login', function(req, res) {
  res.render('login');
});

app.get('/registration', function(req, res) {
  res.render('registration');
});

app.get('/places', function(req, res) {
  res.render('places');
});


app.listen(PORT, function() {
  console.log("Listening on PORT %s", PORT);
});