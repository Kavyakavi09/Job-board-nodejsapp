import bcrypt from 'bcrypt';
import dbConnect from '../db/connectDb.js';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';


export async function register(req, res) {
  try {
    const { Name, Email, password, Phone, confirmPassword } = req.body;

    // Connect to the database
    await dbConnect();

    // Validate input
    if (!Name || !Email || !password || !Phone || !confirmPassword) {
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
    const existingUser = await User.findOne({ Email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const user = new User({
      Name,
      Email,
      Phone,
      passwordHash: hashedPassword,
    });

    await user.save();

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
}

export async function login(req, res) {
    try {
      const { Email, password } = req.body;
      const secret = process.env.JWT_SECRET || 'fallback_secret_key';
  
      // Connect to the database
      await dbConnect();
  
      // Validate input
      if (!Email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }
  
      // Check if user exists
      const user = await User.findOne({ Email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.passwordHash);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Create JWT token
      const token = jwt.sign(
        { userId: user._id, Email: user.Email },
        secret,
        { expiresIn: '1d' }
      );
  
      // Return token to client
      return res.status(200).json({ message: 'Login successful', token, user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Something went wrong' });
    }
}