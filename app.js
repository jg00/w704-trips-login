const express = require('express');
const app = express();

const PORT = 3000;

var session = require('express-session')

// setting up middleware to use the session
app.use(session({
    secret: 'cat',
    resave: false,
    saveUninitialized: false
  }))

const mustacheExpress = require('mustache-express')
// setting the templating engine as mustache
app.engine('mustache',mustacheExpress())
// telling express that all the views (pages) will be inside
// views directory
app.set('views','./views')
// set the view engine to mustache
app.set('view engine','mustache')

const bodyParser = require('body-parser')

// this adds the ability to parse the body
app.use(bodyParser.urlencoded({ extended: false }))

// anything inside public folder can be accessed at the root level
app.use(express.static('css'))



let Trip = require('./trip')

let trips = [];

app.get('/', (req,res) => {
    filteredUserTrips = trips.filter(trip => trip.username === req.session.username)
    res.render('index', {tripList: filteredUserTrips});
});

app.post('/addTrip', (req,res) => {
    let username = req.session.username
    let title = req.body.title;
    let imageUrl = req.body.imageUrl;
    let departureDate = req.body.departureDate;
    let returnDate = req.body.returnDate;

    let trip = new Trip(username, title, imageUrl, departureDate, returnDate);
    
    trips.push(trip)

    res.redirect("/");
});


app.post('/deleteTrip', (req,res) => {

    let id = req.body.id;

    let getObjIfExists = trips.find(function(trip){
        return trip.id === parseInt(id)
    });

    let indexOfObj = trips.indexOf(getObjIfExists)
    trips.splice(indexOfObj,1)

    res.redirect("/");
});


app.get('/login', (req,res) => {
    res.render('login');
}) 


app.post('/login', (req,res) => {
  
    let username = req.body.username
    let password = req.body.password

    if((username == "johndoe" || username == "janedoe") && password == "password") {

        // check if the session is initialized
        if(req.session) {
          // save the username in the session
          req.session.username = username
          // redirect user to root url
          res.redirect("/")     
        }
        // if the user is not authenticated then send them to login page again
      } else {
        res.redirect("/login")
      }

}) 


app.listen(PORT, () => {
    console.log("Server started");
});

