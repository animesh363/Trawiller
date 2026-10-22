const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  type: { type: String, enum: ['single', 'double', 'suite', 'deluxe', 'family'], default: 'double' },
  pricePerNight: { type: Number, required: true, min: 0 },
  capacity: { type: Number, required: true, default: 2 },
  amenities: [{ type: String }],
  images: [{ type: String }],
  isAvailable: { type: Boolean, default: true },
});

const hotelSchema = new mongoose.Schema(
  {
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: [true, 'Hotel name is required'], trim: true },
    destination: { type: String, required: [true, 'Destination is required'], trim: true, index: true },
    address: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    starRating: { type: Number, min: 1, max: 5, default: 4 },
    amenities: [{ type: String }],
    images: [{ type: String }],
    contactPhone: { type: String },
    featured: { type: Boolean, default: false },
    rating: { type: Number, default: 4.8 },
    numReviews: { type: Number, default: 12 },
    rooms: [roomSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Hotel', hotelSchema);
