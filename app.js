var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");

// connect mongoose to a database
mongoose.connect('mongodb://localhost:27017/notepad_1', { useNewUrlParser: true });

// use bodyparser when fetching input data from a form
app.use(bodyParser.urlencoded({extended: true}));

// set ejs as the view engine
app.set("view engine", "ejs");

// fetch models for user and note
var User = require("./models/user.js");
var Note = require("./models/note.js");

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "this is my secret",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// this will pass currentUser as a variable which can be used in any
// ejs page to access the user
// will have "currentUser" from req.user. I.e {currentUser: req.user}
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
})

// get routes from routes folder
var indexRoutes = require("./routes/index.js");
app.use(indexRoutes);

// get stylesheets, where __dirname is up to /V10
app.use(express.static(__dirname + "/public"))

app.listen(3000, function(){
    console.log("The Notepad server has started ");
})