import express from 'express';
import { login, signup } from '../controllers/employerAuth.js';


const router = express.Router();

// Define the routes
router.post('/signup',signup );
router.post('/signin', login);

export default router;
