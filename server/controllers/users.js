const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config");
const passport = require("passport");

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
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
                .save()
                .then(user => {
                    jwt.sign(
                        {
                            email: user.email
                        },
                        jwtSecret,
                        { expiresIn: 3600 },
                        (err, token) => {
                            if (err) throw err;
                            return res.json({ token, user });
                        }
                    );
                })
                .catch(err => {
                    return res.status(404).send("unable to save data to db");
                });
        });
    });
};

module.exports = {
    signup
};
