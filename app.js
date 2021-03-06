// Husni Fareed, husnifareed@mail.utoronto.ca, 2020

var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var methodOverride = require("method-override")
var LocalStrategy = require("passport-local");

// connect mongoose to a database
mongoose.connect('mongodb://localhost:27017/notepad_1', { useNewUrlParser: true });

// use bodyparser when fetching input data from a form
app.use(bodyParser.urlencoded({extended: true}));

// set ejs as the view engine
app.set("view engine", "ejs");

// use method override
app.use(methodOverride("_method"));

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

// get routes from routes folder
var indexRoutes = require("./routes/index.js");
var noteRoutes  = require("./routes/note.js");
app.use(indexRoutes);
app.use(noteRoutes);

// get stylesheets, where __dirname is up to /V10
app.use(express.static(__dirname + "/public"))

app.listen(3000, function(){
    console.log("The Notepad server has started ");
})