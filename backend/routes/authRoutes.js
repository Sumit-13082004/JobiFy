import express from 'express';
import { getMe, login, register } from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';
import User from '../models/User.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleware, getMe);
// log out is not needed i guess, since we are storing the token in local storage, we can just remove it from there to log out the user

router.post('/upload-image', upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

        res.status(200).json({ imageUrl });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})
export default router;