const mongoose = require("mongoose");
const Recipe = require("../models/Recipe");
const User = require("../models/User");
const ObjectId = mongoose.Types.ObjectId;
const AWS = require("aws-sdk");
const { secretAccessKey, accessKey, region, bucket } = require("../config");

const uploadImage = (req, res) => {
    const file = req.file;

    const s3 = new AWS.S3({
        secretAccessKey,
        region,
        accessKeyId: accessKey,
    });

    const params = {
        Bucket: bucket,
        Key: file.originalname,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: "public-read",
    };

    s3.upload(params, (err, data) => {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            res.json({ data });
        }
    });
};
const createRecipe = (req, res) => {
    console.log("creating recipe");
    const {
        recipeName,
        recipeDesc,
        servings,
        duration,
        ingredients,
        temperature,
        directions,
        img,
    } = req.body;
    // find user
    User.findById(req.user.id)
        .then((user) => {
            let ownerId = req.user.id;
            const newRecipe = new Recipe({
                recipeName,
                recipeDesc,
                servings,
                duration,
                ingredients,
                temperature,
                directions,
                img,
                ownerId,
            });

            newRecipe
                .save()
                .then((recipe) => {
                    user.recipes.push(ObjectId(recipe.id));
                    user.save().then((user) => {
                        res.json({
                            user: user.name,
                            recipe,
                        });
                    });
                })
                .catch((err) => {
                    console.log(err, "couldn't save recipe");
                });
        })
        .catch((err) => {
            console.log(err, "couldn't find user");
        });
};
const updateRecipe = (req, res) => {
    Recipe.findByIdAndUpdate(
        req.params.recipeId,
        { $set: { ...req.body } },
        { new: true }
    )
        .then((recipe) => {
            return res.json({ recipe });
        })
        .catch((err) => {
            console.log(err);
        });
};
const getRecipe = (req, res) => {
    Recipe.findById(req.params.recipeId)
        .then((recipe) => {
            User.findById(recipe.ownerId)
                .then((user) => {
                    console.log(recipe);
                    return res.json({ user: user.name, recipe });
                })
                .catch((err) => {
                    console.log(err, "could not find recipe owner");
                });
        })
        .catch((err) => {
            console.log(err, "could not get recipe");
            res.status(403).json({
                errMsg: "Oops, you're not allowed to see that, please login",
            });
        });
};

const deleteRecipe = (req, res) => {
    Recipe.findById(req.params.recipeId)
        .then((recipe) => {
            if (!recipe) {
                return res.status(404).json({ msg: "recipe not found" });
            }
            recipe.remove();
            res.json({ msg: "recipe deleted" });
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({ msg: "something went wrong" });
        });
};
const getAllRecipes = (req, res) => {
    Recipe.find()
        .then((all) => {
            res.json({ all });
        })
        .catch((err) => {
            console.log(err);
        });
};
const likeRecipe = (req, res) => {
    // do i need to find userbyid? to double check that i have the right user?
    User.findById(req.user.id)
        .then((user) => {
            Recipe.findByIdAndUpdate(
                req.params.recipeId,
                { $set: { ...req.body } },
                { new: true }
            )
                .then((recipe) => {
                    recipe.likes.push(ObjectId(user.id));
                    recipe.save().then((data) => {
                        res.json(data);
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        .catch((err) => {
            console.log("hey u aint suppose to be here", err);
        });
};
const unlikeRecipe = (req, res) => {
    // do i need to find userbyid? to double check that i have the right user?
    User.findById(req.user.id)
        .then((user) => {
            Recipe.findByIdAndUpdate(
                req.params.recipeId,

                {
                    $pull: { likes: { $in: [user.id] } },
                },
                { new: true }
            )
                .then((recipe) => {
                    console.log(recipe);
                    recipe.save(recipe.likes);
                    res.json(recipe);
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        .catch((err) => {
            console.log("hey u aint suppose to be here", err);
        });
};

module.exports = {
    createRecipe,
    updateRecipe,
    getRecipe,
    deleteRecipe,
    uploadImage,
    getAllRecipes,
    likeRecipe,
    unlikeRecipe,
};
