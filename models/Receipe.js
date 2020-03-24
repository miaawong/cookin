const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    servings: {
        type: Number
    },
    duration: {
        type: Number
    },
    description: {
        type: String
    },
    ingredients: {
        type: Object,
        required: true
    },
    instructions: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

let Recipe = mongoose.model("Recipe", RecipeSchema);
module.exports = Recipe;
