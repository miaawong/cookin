const express = require("express");
const app = express();
const { signup, login, getUserInfo } = require("../controllers/users");
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

// TO DO
// add a recipe to a user
//app.get('/recipes', passportJWT, addFromUserRecipes)
// delete a recipe from a user
// app.delete('/recipes', passportJWT, deleteFromUserRecipes)
module.exports = app;
