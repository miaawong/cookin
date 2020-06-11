const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    recipes: [
        {
            type: Schema.Types.ObjectId,
            ref: "Recipe",
        },
    ],
    likes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
});

// create our own method to check if password matches
UserSchema.methods.passwordValid = async function (plainTextPassword) {
    try {
        return await bcrypt.compare(plainTextPassword, this.password);
    } catch (err) {
        throw new err(err);
    }
};
let User = mongoose.model("User", UserSchema, "users");
module.exports = User;
