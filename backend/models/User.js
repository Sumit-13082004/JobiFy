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
    resume: {
        type: String,
    },
    role: {
        type: String,
        enum: ["jobseeker", "employer"],
        required: true,
    },
    companyName: {
        type: String,
    },
    companyDescription: {
        type: String,
    },
    companyLogo: {
        type: String,
    }
}, {timestamps: true});

userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return next();
    }
    const salt = await bycrypt.genSalt(10);
    this.password = await bycrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bycrypt.compare(enteredPassword, this.password);
}

export default mongoose.model("User", userSchema);