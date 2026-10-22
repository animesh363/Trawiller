const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const { errorHandler, notFoundHandler } = require('./middleware/error.middleware');

// Routes imports
const healthRoutes = require('./routes/health.routes');
const authRoutes = require('./routes/auth.routes');
const hotelRoutes = require('./routes/hotel.routes');
const restaurantRoutes = require('./routes/restaurant.routes');
const activityRoutes = require('./routes/activity.routes');
const taxiRoutes = require('./routes/taxi.routes');
const bookingRoutes = require('./routes/booking.routes');
const exploreRoutes = require('./routes/explore.routes');
const aiRoutes = require('./routes/ai.routes');

const app = express();

// Security Middlewares
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
  })
);

// Body Parsing & Logging
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// API Routes Mounting
app.use('/api/v1/health', healthRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/hotels', hotelRoutes);
app.use('/api/v1/restaurants', restaurantRoutes);
app.use('/api/v1/activities', activityRoutes);
app.use('/api/v1/taxis', taxiRoutes);
app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1/explore', exploreRoutes);
app.use('/api/v1/ai', aiRoutes);

// Error Handling Middleware
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
