const express = require('express');
const path = require('path');
const User = require('./models/User');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const app = express();
const Web3 = require('web3');
const cookieParser = require('cookie-parser');


// web3 config

App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
ethereum.enable();
web3 = new Web3(App.web3Provider);

web3.eth.getCoinbase(function(err, account) {
  if (err === null) {
    App.account = account;
  }
});
coinbase = "0x0746b306b201889498da9c69963f42d5b01f864f";
var contractAddress = "0xdbc7ff572a0c0697a53e97179a16b8dc9c81427f";

var contractAbi = [
  {
    "constant": true,
    "inputs":[],
    "name": "getResult",
    "outputs": [
      {
        "name": "_id",
        "type": "uint",
      },
      {
        "name": "_name",
        "type": "string",
      },
      {
        "name": "_voteCount",
        "type": "uint",
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];

Democracy = new web3.eth.Contract(contractAbi, contractAddress);

app.use(express.json());

// Passport Config
require('./config/passport')(passport);


// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true,
      useUnifiedTopology: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));





// Express body parser
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
);


// Passport middleware
app.use(passport.initialize());
app.use(passport.session());



// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// For static front end
app.use(express.static('front-end'));


//GET Login
app.get('/login', (req,res) => res.sendFile(path.join(__dirname,'front-end','login.html')));

//GET Registration page
app.get('/register', (req,res) => res.sendFile(path.join(__dirname,'front-end','register.html')));


// Registration
app.post('/register', (req,res) => {

  const { name, email, password, password2 } = req.body;

  if(password !== password2){
    res.send("Passwords do not match");
  }

  else if(password.length < 6){
    res.send("Password must be at least 6 characters");
  }
  
  else{
    User.findOne({ email: email }).then(user => {
      if (user) {
        res.send("Email already exists");
      }

      else{
        const newUser = new User({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err,salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save().then( () => {res.redirect('/login');}).catch(err => console.log(err));
            
  
              
          });
        });
    }

  });
}

});


 //Function to ensure you're logged in before seeing dashboard
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated())
    return next();
  else
     res.redirect('/login');
}


//GET Dashboard
app.get('/dashboard',ensureAuthenticated, (req,res) => res.sendFile(path.join(__dirname,'front-end','dashboard.html')));

// app.get('/vote', (req,res) => res.sendFile(path.join(__dirname,'blockchain','src/index.html')) );

//login

app.post('/login',(req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login'
  })(req, res, next);
});



//logout
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

    
module.exports = app;
