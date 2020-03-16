const express = require("express");
const app = express();
const { signup, secret, login } = require("../controllers/users");
const passport = require("passport");
const passportConf = require("../passport");
const passportLogin = passport.authenticate("local", { session: false });
const passportJWT = passport.authenticate("jwt", { session: false });

app.post("/", signup);
app.post("/", passportLogin, login);

app.get("/secret", passportJWT, secret);

module.exports = app;
