import express from "express";
import { createAppointment, getUpcomingAppointments } from "../controllers/appointmentController.js";

const appointmentRouter=express.Router();

appointmentRouter.post('/create',createAppointment);
appointmentRouter.get('/upcoming', getUpcomingAppointments);

export default appointmentRouter;