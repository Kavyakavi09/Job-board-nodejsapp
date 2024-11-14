import mongoose from 'mongoose';

const JobPostingSchema = new mongoose.Schema({
  employerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employer',
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 40,
  },
  department: {
    type: String,
    required: true,
    enum: ['Engineering', 'Human Resources', 'Marketing', 'Accounting & Finance'],
  },
  specialization: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
    enum: ['Chennai', 'Coimbatore', 'Erode'],
  },
  isRemote: {
    type: Boolean,
    required: true,
  },
  experienceLevel: {
    type: String,
    required: true,
    enum: ['fresher', '< 1 year', '< 2 years', '< 3 years', '< 4 years', '< 5 years', '> 5 years'],
  },
  keywords: {
    type: [String],
  },
  skills: {
    type: [String],
  },
  jobDescription: {
    type: String,
    required: true,
    minlength: 50,
    maxlength: 2000,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.models.JobPosting || mongoose.model('JobPosting', JobPostingSchema);
