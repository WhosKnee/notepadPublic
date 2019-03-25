var express = require("express");
var router = express.Router({mergeParams: true});
var passport = require("passport");
var User = require("../models/user");
var middleware = require("../middleware/index.js");

// landing page redirection
router.get("/", function(req, res){
    console.log(req.user);
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
    res.logout();
    res.redirect("/landing");
})

// Dashboard GET request
router.get("/dashboard/:name", function(req,res){
    res.render("./dashboard");
})

// export these routes
module.exports = router;