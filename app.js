const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const { db, port } = require("./config");

const app = express();
// a method inbuilt in express to recognize the incoming request object as a JSON object.
app.use(express.json());

//allow CORS
app.use(function (req, res, next) {
    res.header(
        "Access-Control-Allow-Origin",
        "http://cookin-env-1.eba-cvmkzrir.us-east-1.elasticbeanstalk.com"
    ); // update to match the domain you will make the request from
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    next();
});

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("mongodb connected"))
    .catch((err) => console.log(err));
app.get("/", (req, res) =>
    res.sendFile(path.join(__dirname, "client", "build", "index.html"))
);

app.use("/api", require("./routes/routes"));
app.use(express.static("client/build"));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
app.listen(port, (err) => {
    console.log(`Server live on port: ${port}`);
});
