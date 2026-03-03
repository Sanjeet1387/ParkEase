const mongoose = require("mongoose");
const {Schema} = mongoose;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true
        },
        gender: {
            type: String,
            enum: ["male", "female", "other"],
            required: true
        },
        dateOfBirth: {
            type: Date,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,         // ensures email is unique
            lowercase: true,      // stores email in lowercase
            match: [/.+@.+\..+/, "Please enter a valid email"] // regex for validation
        }
    },
    {
        timestamps: true         // automatically creates createdAt & updatedAt
    }
);
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);