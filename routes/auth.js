const express = require("express");
const app = express();
const passport = require("passport");
const passportConf = require("../passport");
const passportLogin = passport.authenticate("local", { session: false });
const jwt = require("jsonwebtoken");
const { verify } = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { jwtSecret, refreshSecret } = require("../config");
const cookieParser = require("cookie-parser");
app.use(cookieParser());

const User = require("../models/User");
signToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
        },
        jwtSecret,
        { expiresIn: "15m" }
    );
};
signRefreshToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            tokenVersion: user.tokenVersion,
        },
        refreshSecret,
        { expiresIn: "7d" }
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
            .then((user) => {
                if (user) {
                    return res.status(400).json({ msg: "User already exists" });
                }
            })
            .catch((err) => {
                return res.status(500).json({ msg: err.message });
            });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        const token = signToken(newUser);
        const refreshToken = signRefreshToken(newUser);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            //path: "/refresh_token"
        });
        console.log(token);

        res.json({ token, newUser, refreshToken });
    } catch (err) {
        return res.json({ msg: err + "err" });
    }
};
//generate token
const login = async (req, res) => {
    console.log("login");
    try {
        console.log("trying");
        const token = await signToken(req.user);
        const refreshToken = signRefreshToken(req.user);
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            //path: "/refresh_token"
        });
        let userData = req.user;

        User.findById(req.user.id)
            .populate("recipes")
            .then((user) => {
                res.status(200).json({
                    recipes: user.recipes,
                    token: token,
                    refreshToken: refreshToken,
                    userData: userData,
                });
            })
            .catch((err) => {
                console.log(err);
            });

        console.log("login successful");
    } catch (err) {
        console.log("err");
        console.log("err", err);
        return res.status(500).json({ msg: err });
    }
};
const getNewJWT = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    console.log(refreshToken);
    if (!refreshToken) {
        return res.send({ token: "none" });
    }
    let payload = null;
    try {
        payload = verify(refreshToken, refreshSecret);
    } catch (err) {
        console.log(err);
        return res.send({ token: "that aint right" });
    }
    //refreshtoken is valid, we will send them a new one
    await User.findById(payload.id)
        .then((foundUser) => {
            res.cookie("refreshToken", signRefreshToken(foundUser), {
                httpOnly: true,
                // setting cookie to be only valid to this path.. breaks
                // path: "/refresh_token"
            });
            return res.send({
                JWToken: signToken(foundUser),
                _id: foundUser._id,
                name: foundUser.name,
                email: foundUser.email,
                password: foundUser.password,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};
const logout = async (req, res) => {
    res.clearCookie("refreshToken", { path: "/" });
    return res.sendStatus(200);
};

// login
app.post("/", signup);
app.post("/login", passportLogin, login);
app.post("/refresh_token", getNewJWT);
app.get("/cookies", (req, res) => {
    console.log("cookies", req.cookies);
});
app.post("/logout", logout);
module.exports = app;
