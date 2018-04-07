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

//Routes

//Create a route to scrape the New York Times

//Create a route to get the stories from the db
app.get('/stories', function(req,res){
  //use axios nom in order to scrape the New York Times
  axios.get("https://www.nytimes.com").then(function(response){
    // load into cheerio
    var $ = cheerio.load(response.data);

    // Grab each story on the New York Times home page
    $('.story').each(function(i, element){

      var result = {};

      //Select the elements and assign to a variable
       result.title = $(element).find('.story-heading').text();
       result.link = $(this).children('.story-heading a').attr('href')
       result.author = $(this).children('.byline').text();
       result.text = $(this).children('.summary').text();
       result.source = "New York Times"

      ;
       // Create a new headline with what is in the result object
       db.Headline.create(result)
       .then(function(dbHeadline){
       }).catch(function(error){
         //If there was an error, return this to the client
         return res.json(error);
       });
    });
  });
});

//Route to get all of the articles from the db
app.get('/headlines', function(req,res){
  // Find all headlines in the Headlines table
  db.Headline.find({}).then(function(dbHeadline){
    res.json(dbHeadline);
  })
  //If there is an error, return the error
  .catch(function(error){
    res.json(error);
  });
});

//Create a route to get all of the notes from the db for each story
app.get('/headlines/:id', function(req,res){
  db.Headline.findOne({
    _id: req.params.id
  }).then(function(dbHeadline){
    res.json(dbHeadline);
  }).catch(function(error){
    res.json(error);
  });
});

//Create a route to post a note to the db
app.post('/headlines/:id', function(req,res){
  db.Note.create(req.body)
  .then(function(dbNote){
  // / If a Note was created successfully, find one Headline with an `_id` equal to `req.params.id`. Update the Headline to be associated with the new Note
  return db.Headline.findOneAndUpdate({_id: req.params.id}, {note: db.Note._id}, {new: true});
  }).then(function(dbHeadline){
    res.json(dbHeadline);
  }).catch(function(error){
    res.json(errpr);
  });
});



//Start listening on the server
app.listen(PORT, function(){
  console.log("This app is now running on Port: " + PORT);
});
