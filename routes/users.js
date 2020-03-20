const express = require("express");
const app = express();
const { signup, login, getUserInfo } = require("../controllers/users");
const passport = require("passport");
const passportConf = require("../passport");
const passportLogin = passport.authenticate("local", { session: false });
const passportJWT = passport.authenticate("jwt", { session: false });
const passportGoogle = passport.authenticate("google", {
    scope: "https://www.googleapis.com/auth/userinfo.profile"
});

app.post("/", signup);
app.post("/login", passportLogin, login);
//app.post("/oauth/google", passportGoogle);

app.get("/user", passportJWT, getUserInfo);
module.exports = app;
