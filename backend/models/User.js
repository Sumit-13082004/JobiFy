import mongoose from "mongoose";
import bycrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
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
        minLength: 6,
    },
    avatar: {
        type: String,
        default: null,
    },
    role: {
        type: String,
        enum: ["jobseeker", "employer"],
        required: true,
    },
    companyName: {
        type: String,
        required: true
    },
    companyDescription: {
        type: String,
        required: true,
    },
}, {timestamps: true});

export default mongoose.model("User", userSchema);