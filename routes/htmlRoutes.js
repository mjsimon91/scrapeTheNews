//Dependencies
var db = require('../models');
var mongoose = require("mongoose");

module.exports = function(app){
    app.get('/', function(req, res){
        //Find all of the data in the database and return to the Handlebar file
        db.Headline.find({})
        .then(function(dbHeadline){
            
            var hbsObject = {
                headlines: dbHeadline
            }
 
            res.render("home", hbsObject)
        }).catch(function(error){
            res.json(error);
        });
    })

    

    
}