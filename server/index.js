// Import necessary modules
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { app, server } from './socket.js'; // Ensure socket.js exports both app and server

// Import routes
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import chatRoutes from './routes/chat.routes.js';

// Initialize environment variables
dotenv.config();

// Define PORT
const PORT = process.env.PORT || 5000;

// Define __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware setup
app.use(cookieParser());
app.use(express.json());
app.use(morgan('common'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, '/client/dist')));

// Handle SPA routing, return index.html for any unknown routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server Running on Port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(`Database connection failed: ${error}`);
    process.exit(1); // Exit process with failure
  });
