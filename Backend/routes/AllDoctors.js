import Doctor from "../models/Doctor.js";
import DoctorsData from "../models/Doctor.js";
import express from "express";
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const doctors = await Doctor.find({});
        res.json(doctors);
        console.log(doctors);
    } 
    catch (error) {
        res.status(500).send('Error fetching doctors data');
    }
});

export default router;

