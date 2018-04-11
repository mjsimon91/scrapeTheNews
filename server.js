//Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var exphbs = require('express-handlebars');


//Scraping dependencies
var axios = require('axios');
var cheerio = require('cheerio');

//Establish a reference to all of the models
var db = require('./models');

//Set the Port
var PORT = 3000;

//Initialize express
var app = express();

//Change Mongoose default from using callbacks for asynch queries to use promises instead
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scrapeTheNews";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

//Useing body parser in order to handle for submissions
app.use(bodyParser.urlencoded({extended:true}));
// Use express.static to serve the public folder as a static directory
app.use(express.static(__dirname + '/public'));


//The handlebars files are .handlebars
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));


app.set('view engine', 'handlebars');


//Require the API Routes
require('./routes/apiRoutes.js')(app)
require('./routes/htmlRoutes.js')(app)

//Start listening on the server
app.listen(PORT, function(){
  console.log("This app is now running on Port: " + PORT);
});
