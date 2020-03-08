const express = require("express");
const apiRouter = express();

apiRouter.use("/users", require("./users"));

module.exports = apiRouter;
