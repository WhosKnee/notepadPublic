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

// get routes from routes folder
var indexRoutes = require("./routes/index.js");
app.use(indexRoutes);

app.listen(3000, function(){
    console.log("The Notepad server has started ");
})