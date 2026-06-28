const express = require('express');
const cors = require('cors');
const instituteRoutes = require('./routes/instituteRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Welcome route
app.get('/', (req, res) => {
  res.json({ message: 'Learning Management System API - Day 1 (Institute CRUD)' });
});

// Register routes
app.use('/api/v1/institutes', instituteRoutes);

// Central error handling middleware
app.use(errorHandler);

module.exports = app;
