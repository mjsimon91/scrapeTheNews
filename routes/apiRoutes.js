
//Scraping dependencies
var axios = require('axios');
var cheerio = require('cheerio');

//Establish a reference to all of the models
var db = require('../models');

//Export the api roures
module.exports = function(app){
    //Create a route to scrape the New York Times

    app.get('/stories', function(req,res){
        //use axios nom in order to scrape the New York Times
        axios.get("https://techcrunch.com/").then(function(response){
        // load into cheerio
            var $ = cheerio.load(response.data);
        
            // Grab each story on the New York Times home page
            $('.post-block').each(function(i, element){
        
                var result = {};
        
                //Select the elements and assign to a variable
                result.title = $(element).find('.post-block__title').text();
                result.link = $(element).find('.post-block__title__link').attr('href');
                result.author = $(element).find('.river-byline__authors').text();
                result.time = $(element).find('.river-byline__time').attr('datetime');

                console.log(result);
        
                //Post the scraped data to the database
                db.Headline.create(result, function(error, data){
                    if (error) {
                    console.log(error); 
                    } else {
                    console.log(data);
                    }
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
}

