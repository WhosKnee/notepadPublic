var express = require("express");
var router = express.Router({mergeParams: true});
var passport = require("passport");
var User = require("../models/user");
var Note = require("../models/note");


// POST request to create note

router.post("/note/", function(req, res){
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
                    // redirect to page
                    res.redirect("/dashboard/" + user.username);
                }
            })
        }
    })
});

// GET note edit page
router.get("/note/:id/edit", function(req, res){
    Note.findById(req.params.id, function(err, note){
        if(err){
            console.log(err);
        }
        else {
            res.render("./notes/edit", {note: note});
        }
    })
})

// UPDATE the note's information
router.put("/note/:id", function(req, res){
    Note.findByIdAndUpdate(req.params.id, req.body.note, function(err, note){
        if(err){
            console.log(err);
        }
        else {
            res.redirect("/dashboard/" + req.user.username);
        }
    })
});

// DELETE the note
router.delete("/note/:id", function(req, res){
    Note.findByIdAndDelete(req.params.id, function(err){
        if(err){
            console.log(err);
        }
        else{
            // delete the note from the User object
            User.findById(req.user._id, function(err, User){
                if(err){
                    console.log(err);
                }
                else{
                    // you have to find the object using the ID and identify the field that you want to update. 
                    console.log(User.notes);
                    // note that in the user object, only the note's ID is stored
                    console.log("user ID is: " + req.user._id + " | " + "note ID is: " + req.params.id)
                    User.update({"_id": req.user._id}, { "$pull": {"notes": req.params.id}});
                    res.redirect("/dashboard/" + req.user.username);
                    console.log(User.notes);
                }
            })   
        }
    })
})

// export these routes
module.exports = router;