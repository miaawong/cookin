const express = require("express");
const app = express();
// const { login, getNewJWT } = require("../controllers/auth");
const passport = require("passport");
const passportConf = require("../passport");
const passportLogin = passport.authenticate("local", { session: false });
const jwt = require("jsonwebtoken");
const { verify } = require("jsonwebtoken");
const { jwtSecret, refreshSecret } = require("../config");
const cookieParser = require("cookie-parser");
app.use(cookieParser());

const User = require("../models/User");
signToken = user => {
    return jwt.sign(
        {
            id: user.id
        },
        jwtSecret,
        { expiresIn: "30s" }
    );
};
signRefreshToken = user => {
    return jwt.sign(
        {
            id: user.id,
            tokenVersion: user.tokenVersion
        },
        refreshSecret,
        { expiresIn: "7d" }
    );
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
        .then(foundUser => {
            res.cookie("refreshToken", signRefreshToken(foundUser), {
                httpOnly: true
                // setting cookie to be only valid to this path.. breaks
                // path: "/refresh_token"
            });
            return res.send({ JWToken: signToken(foundUser) });
        })
        .catch(err => {
            console.log(err);
        });
};

//generate token
const login = async (req, res) => {
    console.log("login");
    try {
        console.log("trying");

        const token = await signToken(req.user);
        const refreshToken = signRefreshToken(req.user);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true
            //path: "/refresh_token"
        });
        res.status(200).json({ token: token, refreshToken: refreshToken });
        console.log("login successful");
    } catch (err) {
        console.log("err");
        console.log("err", err);
        return res.status(500).json({ msg: err });
    }
};

// login
app.post("/login", passportLogin, login);
app.post("/refresh_token", getNewJWT);
app.get("/cookies", (req, res) => {
    console.log("cookies", req.cookies);
});

module.exports = app;
