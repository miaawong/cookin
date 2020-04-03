const express = require("express");
const router = express();

router.use("/users", require("./users"));
router.use("/recipes", require("./recipes"));
router.use("/auth", require("./auth"));

module.exports = router;
