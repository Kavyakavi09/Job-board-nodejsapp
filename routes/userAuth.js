import express from 'express';
import { login, register } from '../controllers/userAuth.js';



const router = express.Router();

// Define the routes
router.post('/signup',register );
router.post('/login', login);

export default router;