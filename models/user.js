import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 70,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, 'Please use a valid email address'],
  },
  passwordHash: {
    type: String,
    required: true,
  },
  Phone: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
