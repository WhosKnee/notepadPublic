// this file contains all the middleware for the Notepad web app
var passport = require("passport");

// create middleware object which will contain
// the required methods
var middlewareObj = [];


// Check if logged in
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated){
        // if already logged in, make sure that the next
        // function from the POST request is called 
        return next();
    }
    releaseEvents.redirect("/login");
}

// export middleware obj
module.exports = middlewareObj; 