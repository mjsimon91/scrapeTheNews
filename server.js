//Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Scraping dependencies
var axios = require('axios');
var cheerio = require('cheerio');

//Establish a reference to all of the models
var db = require('./models');

//Set the Port
var PORT = 3000;

//Initialize express
var app = express();

//Useing body parser in order to handle for submissions
app.use(bodyParser.urlencoded({extended:true}));
// Use express.static to serve the public folder as a static directory
app.use(express.static('public'));

//Change Mongoose default from using callbacks for asynch queries to use promises instead
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/scrapeTheNews");

//Require the API Routes
require('./routes/apiRoutes.js')(app)

//Start listening on the server
app.listen(PORT, function(){
  console.log("This app is now running on Port: " + PORT);
});
