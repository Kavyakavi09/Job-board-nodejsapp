import jwt from 'jsonwebtoken';
import { createError } from '../utils/error.js';

// Employer authorization
// To protect employer API's
export const verifyEmployer = (req, res, next) => {
  const token = req.headers.employerauth || req.headers.EmployerAuth;
  if (!token) return next(createError(401, 'You are not authenticated!'));

  jwt.verify(token, process.env.JWT_SECRET, (err, employer) => {
    if (err) return next(createError(403, 'Token is not valid!'));
    req.employer = employer;

    next();
  });
};

// Job Seeker (User) authorization
// To protect job seeker API's
export const verifyJobSeeker = (req, res, next) => {
  const token = req.headers.jobseekerauth || req.headers.JobSeekerAuth;
  if (!token) return next(createError(401, 'You are not authenticated!'));

  jwt.verify(token, process.env.JWT_SECRET, (err, jobSeeker) => {
    if (err) return next(createError(403, 'Token is not valid!'));
    req.jobSeeker = jobSeeker;

    next();
  });
};
