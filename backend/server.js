const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const pokemonAPIRoutes = require('./routes/Pokemon');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/pokemon', pokemonAPIRoutes);

// Connect to MongoDB
connectDB();

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));