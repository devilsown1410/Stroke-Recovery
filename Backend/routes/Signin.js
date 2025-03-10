import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/UserSchema.js';

dotenv.config();

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { email, username, password, dateOfBirth, gender } = req.body;

        if (!email || !username || !password || !dateOfBirth || !gender) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser!=null) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            dateOfBirth,
            gender,
            contactNumber: '', 
            address: '',  
            streak: 0,  
            diseaseHistory: [],  
        });

        await newUser.save();

        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({
            message: 'User registered successfully',
            user: newUser,
            token,
            email,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Signup failed', error: error.message });
    }
});

export default router;
