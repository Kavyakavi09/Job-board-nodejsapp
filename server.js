import express from 'express';
import cors from 'cors';
import connect from './db/connectDb.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import jobRoutes from './routes/jobRoutes.js';
import employerRoutes from './routes/employerAuth.js'
import userRoutes from './routes/userAuth.js'
import applyJobRoutes from './routes/applyJob.js'


// web server
const app = express();

app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);

// dotenv environment setup
dotenv.config();

// middlewares

app.use(cookieParser());
app.use(express.json());

app.use('/api/jobs', jobRoutes); 
app.use('/api/employer',employerRoutes); 
app.use('/api/user',userRoutes); 
app.use('/api/apply',applyJobRoutes); 

//error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong!';
  return res.status(status).json({
    success: false,
    status,
    message,
    stack: err.stack,
  });
});

let port = process.env.PORT || 8001;

app.listen(port, () => {
  console.log(`The App is running on the port ${port}!`);
  // connect to the database
  connect();
});