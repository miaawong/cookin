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
} = require("../controllers/recipes");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// post recipes
app.post("/", passportJWT, createRecipe);
app.post("/upload", upload.single("file"), passportJWT, uploadImage);
// update recipes
app.put("/:recipeId", passportJWT, updateRecipe);
// get one project
app.get("/:recipeId", passportJWT, getRecipe);
//delete a recipe
app.delete("/:recipeId", passportJWT, deleteRecipe);
module.exports = app;
