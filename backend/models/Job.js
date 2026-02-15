import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    requirements: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        // not required because it can be remote
    },
    category: {
        type: String,
        enum: ["Software Development", "Design", "Marketing", "Sales", "Customer Support", "Other"],
    },
    type: {
        type: String,
        enum: ["Remote", "Full-Time", "Part-Time", "Internship", "Contract"],
        required: true,
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    salaryMin: {
        type: Number,
        required: true,
    },
    salaryMax: {
        type: Number,
        required: true,
    },
    isClosed: {
        type: Boolean,
        default: false,
    }
}, {timestamps: true});

export default mongoose.model("Job", jobSchema);