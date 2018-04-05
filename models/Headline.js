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
  author:{
    type: String,
    required: false
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
