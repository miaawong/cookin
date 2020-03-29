const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    recipes: [
        {
            type: Schema.Types.ObjectId,
            ref: "Recipe"
        }
    ]
});

// before, 'saving' to db, run this function
// we need 'this' in this function, so we can't use arrow function
UserSchema.pre("save", async function(next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (err) {
        next(err);
    }
});

// create our own method to check if password matches
UserSchema.methods.passwordValid = async function(plainTextPassword) {
    try {
        return await bcrypt.compare(plainTextPassword, this.password);
    } catch (err) {
        throw new err(err);
    }
};
let User = mongoose.model("user", UserSchema);
module.exports = User;
