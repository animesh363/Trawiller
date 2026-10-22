const mongoose = require('mongoose');

// Connect to MongoDB database with graceful fallback
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/trawiller',
      {
        serverSelectionTimeoutMS: 3000, // Timeout after 3 seconds if MongoDB is offline
      }
    );
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`⚠️ MongoDB not connected (${error.message}). Running server in Fallback Mock Mode.`);
  }
};

module.exports = connectDB;
