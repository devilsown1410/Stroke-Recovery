import express from "express";
import { createAppointment } from "../controllers/appointmentController.js";

const appointmentRouter=express.Router();

appointmentRouter.post('/create',createAppointment);

export default appointmentRouter;