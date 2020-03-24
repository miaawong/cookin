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
    console.log("POST signup");
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
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
            name,
            email,
            password
        });
        await newUser.save();
        const token = signToken(newUser);
        console.log(token);

        res.json({ token, newUser });
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
        console.log("err", err);
        return res.status(500).json({ msg: err });
    }
};
const getUserInfo = async (req, res) => {
    try {
        console.log("getting secret");
        let userData = req.user;
        res.json({ secret: "secret is here", userData });
    } catch (err) {
        console.log(err);
    }
};
module.exports = {
    signup,
    login,
    getUserInfo
};
