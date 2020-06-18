// require("dotenv").config({ path: ".env.development" });
const express = require("express");
const mongoose = require("mongoose");
const { db, port } = require("./config");
//
const app = express();
// a method inbuilt in express to recognize the incoming request object as a JSON object.
app.use(express.json());
// allow CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3001"); // update to match the domain you will make the request from
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
});

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("mongodb connected"))
    .catch((err) => console.log(err));
app.get("/", (req, res) => res.send("App connected"));
app.use("/api", require("./routes/routes"));
app.get("*", (req, res) => {
    res.send("app connected! default undefined routes");
});
app.listen(port, (err) => {
    console.log(`Server live on port: ${port}`);
});
