const mongoose = require("mongoose");
const Recipe = require("../models/Recipe");
const User = require("../models/User");
const ObjectId = mongoose.Types.ObjectId;
const upload = require("../services/file-upload");
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const { secretAccessKey, accessKey, region, bucket } = require("../config");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploadImage = (upload.single('file'), (req, res) => {
    const file = req.file; 
   
    
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
    User.findById(req.user.id).then((user) => {
        if (user) {
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
                            user,
                            recipes: {
                                recipeId: recipe.id,
                            },
                            recipe,
                        });
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            res.status(402).json({ msg: "you're not logged in" });
        }
    });
};
const updateRecipe = (req, res) => {
    Recipe.findByIdAndUpdate(
        // need to figure out how to get id into params
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
    console.log("getting recipe");
    Recipe.findById(req.params.recipeId)
        .then((recipe) => {
            console.log(recipe);
            return res.json({ msg: "recipe", recipe });
        })
        .catch((err) => {
            console.log(err, "getrecipe err");
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

module.exports = {
    createRecipe,
    updateRecipe,
    getRecipe,
    deleteRecipe,
    uploadImage,
};
