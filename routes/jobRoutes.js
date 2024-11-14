import express from 'express';
import { createJobOpening,deleteJobById,getJobById,getJobOpenings, updateJobById } from '../controllers/jobOpenings.js';
import { verifyEmployer } from '../middleware/auth.js';

const router = express.Router();

// Define the routes
router.post('/createJob',verifyEmployer, createJobOpening);
router.get('/getAllJob',verifyEmployer, getJobOpenings);
router.get('/:id',verifyEmployer, getJobById);
router.patch('/:id',verifyEmployer, deleteJobById);
router.put('/:id',verifyEmployer, updateJobById);

export default router;
