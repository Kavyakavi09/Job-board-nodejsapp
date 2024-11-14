import express from 'express';
import JobApplication from '../models/jobApplication.js';
import JobOpening from '../models/jobPosting.js';
import dbConnect from '../db/connectDb.js';

const router = express.Router();

  // Function to apply for a job
  export const applyForJob = async (req, res) => {
    try {
      const { name, qualification, passedOutYear, experience, resume, jobId, email, phone } = req.body;
  
      // Validate required fields
      if (!name || !qualification || !passedOutYear || !experience || !resume || !jobId || !email || !phone) {
        return res.status(400).json({ message: 'All fields are required.' });
      }
  
      // Connect to the database
      await dbConnect();
  
      // Check if the job exists
      const job = await JobOpening.findById(jobId);
      if (!job) {
        return res.status(404).json({ message: 'Job opening not found.' });
      }
  
      // Create a new job application
      const newApplication = new JobApplication({
        name,
        qualification,
        passedOutYear,
        experience,
        resume,
        jobId,
        email,
        phone,
      });
  
      // Save the application to the database
      await newApplication.save();
  
      return res.status(200).json({ message: 'Job application submitted successfully.' });
    } catch (error) {
      console.error('Error applying for job:', error);
      return res.status(500).json({ message: 'Something went wrong.' });
    }
  };
  

export default router;
