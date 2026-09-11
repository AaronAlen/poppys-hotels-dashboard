const mongoose = require('mongoose');

const BranchSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  subTitle: { type: String },
  region: { type: String, default: 'Tamil Nadu' },
  roomsTotal: { type: Number, required: true },
  roomsOccupied: { type: Number, required: true },
  occupancyRate: { type: Number, required: true }, // e.g. 84.2
  revenueLakhs: { type: Number, required: true }, // e.g. 11.2
  bookingsCount: { type: Number, required: true },
  foodOrdersCount: { type: Number, required: true },
  rating: { type: Number, required: true }, // e.g. 4.6
  growthPercent: { type: Number, required: true }, // e.g. 16.8
  growthIsPositive: { type: Boolean, default: true },
  operationalStatus: { 
    type: String, 
    enum: ['Strong Performance', 'Moderate', 'Needs Attention', 'Improving', 'Stable'],
    default: 'Moderate'
  },
  staffCount: { type: Number, required: true },
  pinCoords: {
    x: Number,
    y: Number
  },
  executiveNotes: { type: String }
}, { timestamps: true });

module.exports = mongoose.models.Branch || mongoose.model('Branch', BranchSchema);
