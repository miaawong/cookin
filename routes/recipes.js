const express = require("express");
const app = express();
const passport = require("passport");
const passportConf = require("../passport");
const passportJWT = passport.authenticate("jwt", { session: false });
const {
    createRecipe,
    updateRecipe,
    getRecipe,
    deleteRecipe
} = require("../controllers/recipes");

// post recipes
app.post("/", passportJWT, createRecipe);
// update recipes
app.put("/:recipeId", passportJWT, updateRecipe);
// get one project
app.get("/:recipeId", passportJWT, getRecipe);
//delete a recipe
app.delete("/:recipeId", passportJWT, deleteRecipe);
module.exports = app;
