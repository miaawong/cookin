const express = require("express");
const app = express();
// const auth = require("../middleware/auth");
const { signup } = require("../controllers/users");

// route    POST api/users
// desc     Register new user
// access   Public
app.post("/", signup);

module.exports = app;
