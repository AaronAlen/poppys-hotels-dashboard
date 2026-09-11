const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const apiRoutes = require('./routes/api');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/poppys_hotels';

// Middleware
app.use(cors());
app.use(express.json());

// Request logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Mount Routes
app.use('/api', apiRoutes);

// Root Healthcheck
app.get('/health', (req, res) => {
  res.json({
    status: 'online',
    system: 'Poppys Hotels Management & AI Analytics Engine',
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'MongoDB Connected' : 'In-Memory Mock Database Active'
  });
});

// Attempt MongoDB Connection (resilient fallback)
mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 2000
})
.then(() => {
  console.log('✅ MongoDB connected successfully to ' + MONGODB_URI);
})
.catch(err => {
  console.log('ℹ️ MongoDB server not available locally, operating in Resilient In-Memory Mode with complete Poppys Hotels group mock data.');
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`🚀 Poppys Hotels REST API Server running on port ${PORT}`);
  console.log(`📡 Endpoints available at http://localhost:${PORT}/api/kpis`);
});
