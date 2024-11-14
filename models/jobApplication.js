import mongoose from 'mongoose';

const JobApplicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  passedOutYear: {
    type: Number,
    required: true,
  },
  experience: {
    type: String,
    required: true,
    enum: ['fresher', '< 1 year', '< 2 years', '< 3 years', '< 4 years', '< 5 years', '> 5 years'],
},
  email: {
    type: String,
    required: true,
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'], // Email validation regex
  },
  phone: {
    type: String,
    required: true,
  },
  resume: {
    type: String,
    required: true,
    minlength: 100,
    maxlength: 2000,
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobOpening',
    required: true,
  },
  appliedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the model
export default mongoose.models.JobApplication || mongoose.model('JobApplication', JobApplicationSchema);
