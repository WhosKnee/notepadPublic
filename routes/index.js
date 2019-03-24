var express = require("express");
var router = express.Router({mergeParams: true});
var passport = require("passport");
var User = require("../models/user");

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
    var newUser = new newUser({username:req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            res.redirect("./index/register");
        }
        else {
            passport.authenticate("local")(req, res, function(){
                res.redirect("/dashboard");
            });
        }
    })
})

// Get request to the login page
router.get("/login", function(req, res){
    // error was the keyword used if isLoggedIn middleware failed.
    res.render("./index/login");
})

// Post request to the login page
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "./index/dashboard",
        failureRedirect: "./index/login"
    }), function(req, res){
})

// logout GET request
router.get("/logout", function(req, res){
    res.logout();
    res.redirect("./index/landing");
})

// export these routes
module.exports = router;