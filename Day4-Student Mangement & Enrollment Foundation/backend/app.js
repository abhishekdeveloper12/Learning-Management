const express = require('express');
const cors = require('cors');
const instituteRoutes = require('./routes/instituteRoutes');
const authRoutes = require('./routes/authRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const studentRoutes = require('./routes/studentRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Welcome route
app.get('/', (req, res) => {
  res.json({ message: 'Learning Management System API - Day 4 (Student Management Module)' });
});

// Register routes
app.use('/api/v1/institutes', instituteRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/teachers', teacherRoutes);
app.use('/api/v1/students', studentRoutes);

// Central error handling middleware
app.use(errorHandler);

module.exports = app;
