const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config");

const User = require("../models/User");

signToken = user => {
    return jwt.sign(
        {
            id: user.id
        },
        jwtSecret
    );
};
const signup = async (req, res) => {
    try {
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
                return res.status(500).json({ msg: err.message });
            });

        const newUser = new User({
            fname,
            lname,
            email,
            password
        });
        await newUser.save();
        const token = signToken(newUser);
        console.log(token);

        res.json({ token, msg: { newUser } });
    } catch (err) {
        return res.json({ msg: err });
    }
};

//generate token
const login = async (req, res) => {
    try {
        const token = await signToken(req.user);
        res.status(200).json({ token });
        console.log("login successful");
    } catch (err) {
        console.log("err");
        return res.status(500).json({ msg: err });
    }
};
const secret = (req, res) => {
    res.json({ secret: "secret is here" });
};
module.exports = {
    signup,
    login,
    secret
};
