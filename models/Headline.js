//Dependencies
var mongoose = require('mongoose');

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

//Creating the headline schema

var HeadlineSchema = new Schema({
  title: {
    type: String,
    unique: true
  },
  link: {
    type: String,
    required: false
  },
  author:{
    type: String,
    required: false
  },
  time: {
    type: Date
  },
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

//Create a model using Mongoose
var Headline = mongoose.model('Headline', HeadlineSchema);

//Export the Headline model
module.exports = Headline;
