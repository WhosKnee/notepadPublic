var express = require("express");
var router = express.Router({mergeParams: true});
var passport = require("passport");
var User = require("../models/user");
var Note = require("../models/note");
var middleware = require("../middleware/index.js");

// landing page redirection
router.get("/", function(req, res){
    res.render("./index/landing");
})

// registration page redirection
router.get("/register", function(req, res){
    res.render("./index/register");
})

// registration page POST request after user has submitted info
router.post("/register", function(req, res) {
    // create user object with it's username first
    var newUser = new User({username:req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            res.redirect("/register");
        }
        else {
            passport.authenticate("local")(req, res, function(){
                res.redirect("/buffer");
            });
        }
    })
})

// GET request to the login page
router.get("/login", function(req, res){
    // error was the keyword used if isLoggedIn middleware failed.
    res.render("./index/login");
})

// POST request to the login page
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/buffer",
        failureRedirect: "/login"
    }),
    function(req, res){
})

// buffer is a GET route which acts an intermediate so that we can access
// req.user between passport auth and redirection
router.get("/buffer", function(req, res){
    res.redirect("/dashboard/" + req.user.username);
})
// logout GET request
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
})

// Dashboard GET request
router.get("/dashboard/:name", function(req,res){
    User.findById(req.user._id).populate("notes").exec(function(err, currUser){
        if(err){
            console.log(err)
        }
        else{
            // renders from views dir as the root folder
            // in app.js we defined current user as a local var in each ejs page
            // target note will be null initially because the user has to trigger the note
            res.render("./dashboard", {currentUser: currUser, targetNote: null});
        }
    });
})

// export these routes
module.exports = router;