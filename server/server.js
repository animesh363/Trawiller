require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

// Connect DB (non-blocking) and start API server
connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Trawiller API Server running on http://localhost:${PORT}`);
  console.log(`📍 Health Check: http://localhost:${PORT}/api/v1/health`);
});
