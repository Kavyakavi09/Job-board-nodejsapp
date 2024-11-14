import express from 'express';
import { applyForJob } from '../controllers/applyJob.js';
import {  verifyJobSeeker } from '../middleware/auth.js';

const router = express.Router();

// Define the routes
router.post('/applyJob',verifyJobSeeker, applyForJob);

export default router;
