const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
    ingName: { type: String },
    amount: { type: Number },
    unit: {
        type: String,
        enum: ["tsp", "tbsp", "cup", "oz", "lbs", "g", "L", "mL", "kg"],
    },
});

const TempSchema = new Schema({
    temp: { type: Number },
    unit: {
        type: String,
        enum: ["F", "C"],
    },
});
const InstructionSchema = new Schema({
    step: [{ type: String }],
});

const RecipeSchema = new Schema(
    {
        recipeName: {
            type: String,
            required: true,
        },
        recipeDesc: {
            type: String,
        },
        servings: {
            type: Number,
        },
        duration: {
            type: Number,
        },
        ingredients: [{ type: IngredientSchema }],
        temperature: {
            type: TempSchema,
        },
        instructions: { type: InstructionSchema },
        img: {
            type: String,
        },
        ownerId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: {
            createdAt: "createdOn",
        },
    }
);
RecipeSchema.pre("remove", function (next) {
    console.log("hi");
    let recipe = this;
    recipe
        .model("User")
        .updateMany(
            { recipes: recipe._id },
            { $pull: { recipes: recipe._id } },
            { multi: true },
            next
        );
});
let Recipe = mongoose.model("Recipe", RecipeSchema, "recipes");
module.exports = Recipe;
