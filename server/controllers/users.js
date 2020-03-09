const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

const User = require("../models/User");

const signup = (req, res) => {
    const { fname, lname, email, password } = req.body;
    if (!fname || !lname || !email || !password) {
        return res.status(400).json({ msg: "Please fill out all fields" });
    }
    User.findOne({ email })
        .then(user => {
            if (user) {
                return res.status(400).json({ msg: "User already exists" });
            }
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({ msg: err.message });
        });
    const newUser = new User({
        fname,
        lname,
        email,
        password
    });

    newUser
        .save()
        .then(user => {
            return res.json(user);
        })
        .catch(err => {
            return res.status(404).send("unable to save data to db");
        });
};

module.exports = {
    signup
};
