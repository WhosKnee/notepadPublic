var mongoose = require("mongoose");

// create note schema
var noteSchema = mongoose.Schema({
    title: String,
    text: String,
    date: String
})

// create note model to export
var Note = mongoose.model("Note", noteSchema);

// export note model
module.exports = Note;