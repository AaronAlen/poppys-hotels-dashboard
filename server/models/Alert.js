const mongoose = require('mongoose');

const AlertSchema = new mongoose.Schema({
  alertId: { type: String, required: true },
  priority: { type: String, enum: ['HIGH', 'ATTENTION', 'POSITIVE'], required: true },
  branchName: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  recommendation: { type: String, required: true },
  actionLabel: { type: String, required: true },
  actionType: { type: String, required: true },
  timestamp: { type: String, default: 'Just now' },
  isAcknowledged: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.models.Alert || mongoose.model('Alert', AlertSchema);
