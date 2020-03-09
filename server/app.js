require("dotenv").config({ path: ".env.development" });
const express = require("express");
const mongoose = require("mongoose");
const { db, port } = require("./config");

const app = express();
// a method inbuilt in express to recognize the incoming request object as a JSON object.
app.use(express.json());

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("mongodb connected"))
    .catch(err => console.log(err));
app.get("/", (req, res) => res.send("App connected"));
app.use("/api", require("./routes/routes"));
app.get("*", (req, res) => {
    res.send("app connected! default undefined routes");
});
app.listen(port, err => {
    console.log(`Server live on port: ${port}`);
});
