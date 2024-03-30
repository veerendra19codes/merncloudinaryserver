import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
    }
}, {timestamps: true});

export const User = new mongoose.model("User", userSchema);
