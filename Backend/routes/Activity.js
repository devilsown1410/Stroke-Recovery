import express from 'express';
import { completeActivity, fetchActivities } from '../controllers/Activity.js';

const router=express.Router();

router.get('/fetchActivities',fetchActivities);
router.post('/completeActivity/:id',completeActivity);


export default router;