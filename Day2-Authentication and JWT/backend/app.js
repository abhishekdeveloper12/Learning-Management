const express = require('express');
const cors = require('cors');
const instituteRoutes = require('./routes/instituteRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Welcome route
app.get('/', (req, res) => {
  res.json({ message: 'Learning Management System API - Day 2 (Authentication & JWT)' });
});

// Register routes
app.use('/api/v1/institutes', instituteRoutes);
app.use('/api/v1/auth', authRoutes);

// Central error handling middleware
app.use(errorHandler);

module.exports = app;
