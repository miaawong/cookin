const express = require("express");
const app = express();
const { getUserInfo, getUserRecipes } = require("../controllers/users");
const passport = require("passport");
const passportConf = require("../passport");
const passportLogin = passport.authenticate("local", { session: false });
const passportJWT = passport.authenticate("jwt", { session: false });
// const passportGoogle = passport.authenticate("google", {
//     scope: "https://www.googleapis.com/auth/userinfo.profile"
// });

// Do I need this route.. gets user's info with just JWT
app.get("/user", passportJWT, getUserInfo);
// get all user's projects
app.get("/recipes", passportJWT, getUserRecipes);

module.exports = app;
