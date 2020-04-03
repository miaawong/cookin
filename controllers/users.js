const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;
const jwt = require("jsonwebtoken");
const { jwtSecret, refreshSecret } = require("../config");
const bcrypt = require("bcryptjs");

const User = require("../models/User");
let refreshToken = [];
signToken = user => {
    return jwt.sign(
        {
            id: user.id
        },
        jwtSecret,
        { expiresIn: 3600 }
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

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();
        const token = signToken(newUser);
        console.log(token);

        res.json({ token, newUser });
    } catch (err) {
        return res.json({ msg: err + "err" });
    }
};

const getUserInfo = async (req, res) => {
    try {
        console.log("getting secret");
        let userData = req.user;
        res.json({ userData });
    } catch (err) {
        console.log(err);
    }
};

const getUserRecipes = (req, res) => {
    User.findById(req.user.id)
        .populate("recipes")
        .then(user => {
            res.json({ recipe: user.recipes });
        })
        .catch(err => {
            console.log(err);
        });
};

module.exports = {
    signup,

    getUserInfo,
    getUserRecipes
};
