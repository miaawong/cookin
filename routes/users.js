const express = require("express");
const app = express();
const {
    signup,
    login,
    getUserInfo,
    getUserRecipes
} = require("../controllers/users");
const passport = require("passport");
const passportConf = require("../passport");
const passportLogin = passport.authenticate("local", { session: false });
const passportJWT = passport.authenticate("jwt", { session: false });
// const passportGoogle = passport.authenticate("google", {
//     scope: "https://www.googleapis.com/auth/userinfo.profile"
// });

// sign up
app.post("/", signup);
// login
app.post("/login", passportLogin, login);
// Google OAuth
//app.post("/oauth/google", passportGoogle);
// get user's info
app.get("/user", passportJWT, getUserInfo);
// get all user's projects
app.get("/recipes", passportJWT, getUserRecipes);

module.exports = app;
