const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  price: { type: Number, required: true },
});

const taxiSchema = new mongoose.Schema(
  {
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    driverName: { type: String, required: true, trim: true },
    vehicleName: { type: String, required: true, trim: true },
    vehicleType: { type: String, enum: ['Sedan', 'SUV', '4x4 Offroader', 'Mini Bus'], default: 'SUV' },
    capacity: { type: Number, default: 6 },
    destination: { type: String, required: true, index: true },
    routes: [routeSchema],
    pricePerKm: { type: Number, default: 18 },
    dayPackageRate: { type: Number, default: 3500 },
    images: [{ type: String }],
    contactPhone: { type: String },
    rating: { type: Number, default: 4.8 },
    numReviews: { type: Number, default: 15 },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Taxi', taxiSchema);
