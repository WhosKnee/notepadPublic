var express = require("express");
var router = express.Router({mergeParams: true});
var passport = require("passport");
var User = require("../models/user");
var Note = require("../models/note");

// Because the User will be creating the note using the dashboard page,
// we only need POST requests

router.post("/note/", function(req, res){
    console.log(req.body);
    // lookup the user
    User.findById(req.user._id, function(err, user){
        if(err){
            console.log(err);
        }
        else {
            // create the note object
            Note.create(req.body.note, function(err, newNote){
                if(err){
                    console.log(err);
                }
                else {
                    // save the note to the database
                    newNote.save();
                    // push the note to the User's notes collection
                    user.notes.push(newNote);
                    // save the updated user object
                    user.save();
                }
            })
        }
    })
});

// export these routes
module.exports = router;