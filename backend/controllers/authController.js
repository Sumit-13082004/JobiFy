import User from "../models/User.js";


export const register = async (req, res) => {
    try {
        const { name, email, password, avatar, role } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = await User.create({
            name,
            email,
            password,
            avatar,
            role,
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const login = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getMe = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}