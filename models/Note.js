//Dependencies
var mongoose = require('mongoose');

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Creating the note schema
var NoteSchema = new Schema({
  userName: {
    type: string,
    required: true
  },
  note: {
    type: string,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

//Create a model using Mongoose
var Note = mongoose.model('Note', NoteSchema);

//Export the note

module.exports = Note;