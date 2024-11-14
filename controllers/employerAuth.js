import dbConnect from '../db/connectDb.js';
import Employer from '../models/employer.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


// POST route for login
export async function login(req, res) {
    try {
      const { businessEmail, password } = req.body;
      const secret = process.env.JWT_SECRET || 'fallback_secret_key';
  
      // Connect to the database
      await dbConnect();
  
      // Validate input
      if (!businessEmail || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }
  
      // Check if employer exists
      const employer = await Employer.findOne({ businessEmail });
      if (!employer) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Compare passwords
      const isMatch = await bcrypt.compare(password, employer.passwordHash);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Create JWT token
      const token = jwt.sign(
        { employerId: employer._id, businessEmail: employer.businessEmail },
        secret,
        { expiresIn: '1d' }
      );
  
      // Return token to client
      return res.status(200).json({ message: 'Login successful', token, employer });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Something went wrong' });
    }
}
  
  // POST route for registration
  export async function signup(req, res) {
    try {
      // Parse request body
      const { businessName, businessEmail, password, confirmPassword } = req.body;
  
      // Connect to the database
      await dbConnect();
  
      if (!businessName || !businessEmail || !password || !confirmPassword) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      // Check password match
      if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
      }
  
      // Password validation
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/;
      if (!passwordRegex.test(password)) {
        return res.status(400).json({
          message: 'Password must contain 1 uppercase, 1 lowercase, 1 special character, and 1 number',
        });
      }
  
      // Check if business email already exists
      const existingEmployer = await Employer.findOne({ businessEmail });
      if (existingEmployer) {
        return res.status(400).json({ message: 'Email already in use' });
      }
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create employer
      const employer = new Employer({
        businessName,
        businessEmail,
        passwordHash: hashedPassword,
      });
  
      await employer.save();
  
      return res.status(201).json({ message: 'Employer registered successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Something went wrong' });
    }
  }
  