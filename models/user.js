var mongoose = require("mongoose");

// user object will interact with passport for auth
var passportLocalMongoose = require("passport-local-mongoose");

// each user will have a username, password, and notes
var UserSchema= new mongoose.Schema({
    username: String,
    password: String,
    notes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Note"
        }
    ]
});

// add passportLocalMongoose methods to user model
UserSchema.plugin(passportLocalMongoose);

// create user model from Schema
var User = mongoose.model("User", UserSchema);

// export user model
module.exports = User;