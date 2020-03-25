const mongoose = require("mongoose");
const Recipe = require("../models/Recipe");
const User = require("../models/User");
const ObjectId = mongoose.Types.ObjectId;

const createRecipe = (req, res) => {
    console.log("creating recipe");
    const {
        recipeName,
        recipeDesc,
        servings,
        duration,
        ingredients,
        instructions,
        img
    } = req.body;
    // find user
    User.findById(req.user.id).then(user => {
        if (user) {
            let ownerId = req.user.id;
            const newRecipe = new Recipe({
                recipeName,
                recipeDesc,
                servings,
                duration,
                ingredients,
                instructions,
                img,
                ownerId
            });

            newRecipe
                .save()
                .then(recipe => {
                    user.recipes.push(ObjectId(recipe.id));
                    user.save();

                    res.json({
                        recipes: {
                            recipeId: recipe.id
                        },
                        recipe
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            res.status(402).json({ msg: "you're not logged in" });
        }
    });
};
const updateRecipe = (req, res) => {
    // LEARNING THIS
    Recipe.findByIdAndUpdate(
        // need to figure out how to get id into params
        req.params.recipeId,
        // prevents the original to be overwritten?
        { $set: { ...req.body } },
        { new: true }
    )
        .then(update => {
            if (update) {
                console.log(update);
                return res.send();
            } else {
                res.json({ errMsg: "couldn't update this recipe, try again" });
            }
        })
        .catch(err => {
            console.log(err);
        });
};
const getRecipe = (req, res) => {
    Recipe.findById(req.params.recipeId)
        .then(recipe => {
            return res.json({ msg: "recipe", recipe });
        })
        .catch(err => {
            res.status(403).json({
                errMsg: "Oops, you're not allowed to see that, please login"
            });
        });
};
module.exports = {
    createRecipe,
    updateRecipe,
    getRecipe
};
