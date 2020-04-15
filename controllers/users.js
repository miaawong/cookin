const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

const User = require("../models/User");

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
        .then((user) => {
            res.json({ recipe: user.recipes });
        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports = {
    getUserInfo,
    getUserRecipes,
};
