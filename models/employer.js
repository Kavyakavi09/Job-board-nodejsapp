import mongoose from 'mongoose';

const EmployerSchema = new mongoose.Schema({
  businessName: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 70,
  },
  businessEmail: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, 'Please use a valid email address'],
  },
  passwordHash: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Employer || mongoose.model('Employer', EmployerSchema);
