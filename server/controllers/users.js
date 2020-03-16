const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config");

const User = require("../models/User");

signToken = user => {
    return jwt.sign(
        {
            email: user.email,
            id: user.id
        },
        jwtSecret
    );
};
const signup = async (req, res) => {
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

    await newUser.save();
    signToken(newUser);
    res.json({ msg: newUser });
};

//generate token
const login = (req, res) => {
    const token = signToken(req.user);
    res.status(200).json({ token });
    console.log("login successful");
};
const secret = (req, res) => {
    res.json({ secret: "secret is here" });
};
module.exports = {
    signup,
    login,
    secret
};
