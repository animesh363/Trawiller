const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema(
  {
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: [true, 'Activity title is required'], trim: true },
    category: {
      type: String,
      enum: ['yoga', 'wellness', 'adventure', 'trekking', 'water_sports', 'cultural', 'sightseeing'],
      required: true,
      index: true,
    },
    destination: { type: String, required: [true, 'Destination is required'], trim: true, index: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String, default: '2 Hours' },
    pricePerPerson: { type: Number, required: true, min: 0 },
    maxGroupSize: { type: Number, default: 15 },
    difficulty: { type: String, enum: ['Easy', 'Moderate', 'Challenging'], default: 'Easy' },
    inclusions: [{ type: String }],
    images: [{ type: String }],
    contactPhone: { type: String },
    featured: { type: Boolean, default: false },
    rating: { type: Number, default: 4.9 },
    numReviews: { type: Number, default: 18 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Activity', activitySchema);
