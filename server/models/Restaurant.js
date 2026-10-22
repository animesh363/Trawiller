const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: { type: String, default: 'Main Course' },
  price: { type: Number, required: true, min: 0 },
  description: { type: String },
  isVeg: { type: Boolean, default: true },
  image: { type: String },
  isAvailable: { type: Boolean, default: true },
});

const restaurantSchema = new mongoose.Schema(
  {
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: [true, 'Restaurant name is required'], trim: true },
    destination: { type: String, required: [true, 'Destination is required'], trim: true, index: true },
    cuisine: [{ type: String }],
    address: { type: String, required: true },
    description: { type: String, required: true },
    openingHours: { type: String, default: '08:00 AM - 10:30 PM' },
    priceRange: { type: String, enum: ['$', '$$', '$$$', '$$$$'], default: '$$' },
    images: [{ type: String }],
    contactPhone: { type: String },
    featured: { type: Boolean, default: false },
    rating: { type: Number, default: 4.7 },
    numReviews: { type: Number, default: 24 },
    menu: [dishSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Restaurant', restaurantSchema);
