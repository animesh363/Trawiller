const mongoose = require('mongoose');
const { CATEGORIES, VERIFICATION_STATUS } = require('../config/constants');

const vendorProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true,
    },
    businessName: {
      type: String,
      required: [true, 'Business name is required'],
      trim: true,
    },
    registrationNumber: {
      type: String,
      required: [true, 'Business registration number is required'],
      trim: true,
    },
    category: {
      type: String,
      enum: Object.values(CATEGORIES),
      required: [true, 'Vendor category is required'],
    },
    destination: {
      type: String,
      required: [true, 'Destination location is required'],
      trim: true,
    },
    address: {
      type: String,
      required: [true, 'Business address is required'],
      trim: true,
    },
    verificationStatus: {
      type: String,
      enum: Object.values(VERIFICATION_STATUS),
      default: VERIFICATION_STATUS.PENDING,
    },
    rejectionReason: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const VendorProfile = mongoose.model('VendorProfile', vendorProfileSchema);

module.exports = VendorProfile;
