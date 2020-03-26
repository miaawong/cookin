const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecipeSchema = new Schema(
    {
        recipeName: {
            type: String,
            required: true
        },
        recipeDesc: {
            type: String
        },
        servings: {
            type: Number
        },
        duration: {
            type: Number
        },
        ingredients: {
            type: Object
            // required: true
        },
        instructions: {
            type: String
            // required: true
        },
        img: {
            type: String
        },
        ownerId: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: {
            createdAt: "createdOn"
        }
    }
);

let Recipe = mongoose.model("Recipe", RecipeSchema);
module.exports = Recipe;
