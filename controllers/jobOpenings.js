import dbConnect from '../db/connectDb.js';
import JobPosting from '../models/jobPosting.js';

// Create a job opening (POST)
export const createJobOpening = async (req, res, next) => {
  try {
    await dbConnect();
    const jobPosting = new JobPosting(req.body);

    const savedJob = await jobPosting.save();
    res.status(201).json(savedJob);
  } catch (error) {
    console.error('Error creating job posting:', error);
    next(error);
  }
};

// Get all job openings (GET)
export const getJobOpenings = async (req, res, next) => {
  try {
    await dbConnect();
    const { query } = req;
    const filters = {};
    const page = parseInt(query.page) || 1;
    const perPage = parseInt(query.perPage) || 10;
    const skip = (page - 1) * perPage;

    // Apply filters from query params
    ['department', 'specialization', 'location', 'experienceLevel', 'isRemote'].forEach((key) => {
      if (query[key]) {
        filters[key] = query[key];
      }
    });

    const jobTitleSearch = query.jobTitle;
    if (jobTitleSearch) {
      filters.jobTitle = new RegExp(jobTitleSearch, 'i'); // Case-insensitive regex search
    }

    // Find job postings with the filters applied
    const jobPostings = await JobPosting.find({ ...filters, isDeleted: false })
      .skip(skip)
      .limit(perPage)
      .sort({ createdAt: -1 });

    const totalCount = await JobPosting.countDocuments({ ...filters, isDeleted: false });

    res.status(200).json({ jobPostings, totalCount });
  } catch (error) {
    console.error('Error retrieving job postings:', error);
    next(error); // Pass the error to the error-handling middleware
  }
};

// get single job
export const getJobById = async (req, res) => {
    try {
      await dbConnect();
      const job = await JobPosting.findById(req.params.id);
  
      if (!job || job.isDeleted) {
        return res.status(404).json({ message: 'Job opening not found' });
      }
  
      return res.status(200).json(job);
    } catch (error) {
      console.error('Error retrieving job posting:', error);
      return res.status(500).json({ message: 'Failed to fetch job opening' });
    }
  };
  
  // Soft delete a job posting
  export const deleteJobById = async (req, res) => {
    try {
      await dbConnect();
      const deletedJob = await JobPosting.findByIdAndUpdate(
        req.params.id,
        { isDeleted: true, updatedAt: Date.now() },
        { new: true }
      );
  
      if (!deletedJob) {
        return res.status(404).json({ message: 'Job opening not found' });
      }
  
      return res.status(200).json({ message: 'Job opening deleted successfully' });
    } catch (error) {
      console.error('Error deleting job posting:', error);
      return res.status(500).json({ message: 'Failed to delete job opening' });
    }
  };
  
  // Update a job posting
  export const updateJobById = async (req, res) => {
    try {
      await dbConnect();
      const data = req.body;
      const updatedJob = await JobPosting.findByIdAndUpdate(
        req.params.id,
        { ...data, updatedAt: Date.now() },
        { new: true }
      );
  
      if (!updatedJob) {
        return res.status(404).json({ message: 'Job opening not found' });
      }
  
      return res.status(200).json(updatedJob);
    } catch (error) {
      console.error('Error updating job posting:', error);
      return res.status(500).json({ message: 'Failed to update job opening' });
    }
  };
