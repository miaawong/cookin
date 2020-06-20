const express = require("express");
const app = express();
const passport = require("passport");
const passportConf = require("../passport");
const passportJWT = passport.authenticate("jwt", { session: false });
const multer = require("multer");
const {
    createRecipe,
    updateRecipe,
    getRecipe,
    deleteRecipe,
    uploadImage,
    getAllRecipes,
    likeRecipe,
    unlikeRecipe,
} = require("../controllers/recipes");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// post recipes
app.post("/", passportJWT, createRecipe);
app.get("/allrecipes", getAllRecipes);
app.post("/upload", upload.single("file"), passportJWT, uploadImage);
// update recipes
app.put("/:recipeId", passportJWT, updateRecipe);
app.put("/:recipeId/like", passportJWT, likeRecipe);
app.put("/:recipeId/unlike", passportJWT, unlikeRecipe);
// get one project
app.get("/:recipeId", getRecipe);
//delete a recipe
app.delete("/:recipeId", passportJWT, deleteRecipe);
module.exports = app;
