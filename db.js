// db.js
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const dbURL = process.env.ATLASDB_URL;
    if (!dbURL) throw new Error('ATLASDB_URL environment variable is not set');

    await mongoose.connect(dbURL);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
