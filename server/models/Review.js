const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    tourist: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    touristName: { type: String, required: true },
    itemType: { type: String, enum: ['hotel', 'restaurant', 'activity', 'taxi'], required: true },
    itemId: { type: mongoose.Schema.Types.ObjectId, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Review', reviewSchema);
